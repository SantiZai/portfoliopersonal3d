import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { COURT_SECTIONS, calculateBallTrajectory, calculateTennisBounce, Vector3D } from '../utils/tennisMath';
import { createScoreboardTexture, createTennisBallTexture } from './courtTextures';
import {
  buildCourtSideEquipment,
  buildCourtSurface,
  buildGrandstands,
  buildNet,
  buildStadiumFloodlights,
  buildTrophy,
  buildTrophyShopDisplay,
  buildUmpireChair,
} from './stadiumModels';
import { tennisAudio } from '../utils/tennisAudio';

export interface TennisSceneCallbacks {
  onSectionChanged?: (sectionIndex: number) => void;
  onBallHit?: (speedKmh: number) => void;
}

export class TennisScene {
  private container: HTMLElement;
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private isSoftwareGl: boolean = false;
  private animationFrameId: number = 0;
  private callbacks: TennisSceneCallbacks;

  // Camera animation
  private currentCamPos: THREE.Vector3 = new THREE.Vector3(0, 2.2, 16.5);
  private targetCamPos: THREE.Vector3 = new THREE.Vector3(0, 2.2, 16.5);
  private currentLookAt: THREE.Vector3 = new THREE.Vector3(0, 1.2, 0);
  private targetLookAt: THREE.Vector3 = new THREE.Vector3(0, 1.2, 0);

  // Ball animation state
  private ballGroup!: THREE.Group;
  private ballMesh!: THREE.Mesh;
  private shadowMesh!: THREE.Mesh;
  private ballStartPos: THREE.Vector3 = new THREE.Vector3(0, 1.1, 12);
  private ballTargetPos: THREE.Vector3 = new THREE.Vector3(0, 1.1, 12);
  private ballTransitionT: number = 1.0; // 0 to 1
  private ballTransitionDuration: number = 1.2; // seconds
  private ballArcHeight: number = 2.4;
  private isBallInFlight: boolean = false;
  private ballSpinSpeed: number = 0;

  // Interactive free play
  private raycaster: THREE.Raycaster = new THREE.Raycaster();
  private mouse: THREE.Vector2 = new THREE.Vector2();
  private courtPlaneMesh!: THREE.Mesh;
  private interactiveHotspots: THREE.Mesh[] = [];

  // Scoreboard
  private scoreboardMesh!: THREE.Mesh;
  private currentSectionIndex: number = 0;

  // Trophy reference
  private trophyGroup!: THREE.Group;

  // Time tracking
  private lastTime: number = performance.now();
  private startTime: number = performance.now();

  constructor(container: HTMLElement, callbacks: TennisSceneCallbacks = {}) {
    this.container = container;
    this.callbacks = callbacks;

    // Detect software WebGL
    this.isSoftwareGl = (() => {
      try {
        const gl = document.createElement('canvas').getContext('webgl2');
        if (!gl) return true;
        const ext = gl.getExtension('WEBGL_debug_renderer_info');
        const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
        const gpu = String(gl.getParameter(param));
        gl.getExtension('WEBGL_lose_context')?.loseContext();
        return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
      } catch {
        return true;
      }
    })();

    // 1. Scene setup
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x060e1a);
    this.scene.fog = new THREE.FogExp2(0x060e1a, 0.016);

    // 2. Camera setup
    const aspect = container.clientWidth / (container.clientHeight || 1);
    this.camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 100);
    this.camera.position.copy(this.currentCamPos);
    this.camera.lookAt(this.currentLookAt);

    // 3. Renderer setup
    this.renderer = new THREE.WebGLRenderer({
      antialias: !this.isSoftwareGl,
      powerPreference: 'high-performance',
      alpha: false,
    });
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.18;
    this.renderer.setPixelRatio(this.isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(container.clientWidth, container.clientHeight);
    this.renderer.shadowMap.enabled = !this.isSoftwareGl;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(this.renderer.domElement);

    // 4. Studio Environment Lighting
    const pmremGenerator = new THREE.PMREMGenerator(this.renderer);
    this.scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    pmremGenerator.dispose();

    // Warm Key + Cool Fill lighting rig
    const hemiLight = new THREE.HemisphereLight(0x93c5fd, 0x0f172a, 0.85);
    this.scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xffedd5, 1.4);
    keyLight.position.set(12, 18, 14);
    keyLight.castShadow = !this.isSoftwareGl;
    keyLight.shadow.bias = -0.0005;
    keyLight.shadow.normalBias = 0.02;
    keyLight.shadow.camera.left = -16;
    keyLight.shadow.camera.right = 16;
    keyLight.shadow.camera.top = 22;
    keyLight.shadow.camera.bottom = -22;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    this.scene.add(keyLight);

    // 5. Build Stadium Elements
    this.initStadium();

    // 6. Build Tennis Ball
    this.initTennisBall();

    // 7. Event listeners
    window.addEventListener('resize', this.onResize);
    this.container.addEventListener('pointerdown', this.onPointerDown);

    // 8. Pre-compile shaders
    if (!this.isSoftwareGl) {
      this.renderer.compile(this.scene, this.camera);
    }

    // 9. Start loop
    this.animate();
  }

  private initStadium() {
    // Court
    const courtGroup = buildCourtSurface();
    this.scene.add(courtGroup);

    // Invisible raycast ground plane for clicking
    const rayGeo = new THREE.PlaneGeometry(24, 40);
    const rayMat = new THREE.MeshBasicMaterial({ visible: false });
    this.courtPlaneMesh = new THREE.Mesh(rayGeo, rayMat);
    this.courtPlaneMesh.rotation.x = -Math.PI / 2;
    this.scene.add(this.courtPlaneMesh);

    // Net
    const net = buildNet();
    this.scene.add(net);

    // Umpire chair
    const umpire = buildUmpireChair();
    this.scene.add(umpire);

    // Equipment & Racket
    const equip = buildCourtSideEquipment();
    this.scene.add(equip);

    // Grandstands
    const stands = buildGrandstands();
    this.scene.add(stands);

    // Floodlight towers
    const { group: floodlights, lights } = buildStadiumFloodlights();
    this.scene.add(floodlights);
    lights.forEach(l => this.scene.add(l));

    // Pro Shop & Trophy Exhibition Counter
    const shopExhibition = buildTrophyShopDisplay();
    this.scene.add(shopExhibition);

    // Trophy on Section 6 (Match Point & Podium)
    this.trophyGroup = buildTrophy();
    this.trophyGroup.position.set(0, 0, 0);
    this.trophyGroup.visible = false;
    this.scene.add(this.trophyGroup);

    // Scoreboard on the stadium wall
    const scoreTex = createScoreboardTexture(COURT_SECTIONS[0].name, 0);
    const scoreGeo = new THREE.PlaneGeometry(12, 6);
    const scoreMat = new THREE.MeshBasicMaterial({ map: scoreTex });
    this.scoreboardMesh = new THREE.Mesh(scoreGeo, scoreMat);
    this.scoreboardMesh.position.set(0, 7.5, -20.2);
    this.scene.add(this.scoreboardMesh);

    // Create glowing court target rings for each section
    this.initCourtHotspots();
  }

  private initCourtHotspots() {
    const ringGeo = new THREE.RingGeometry(0.5, 0.65, 32);
    COURT_SECTIONS.forEach((sec, idx) => {
      const ringMat = new THREE.MeshBasicMaterial({
        color: idx === 0 ? 0xf59e0b : 0x38bdf8,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.65,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = -Math.PI / 2;
      ring.position.set(sec.ballPos.x, 0.03, sec.ballPos.z);
      ring.userData = { sectionIndex: idx };
      this.interactiveHotspots.push(ring);
      this.scene.add(ring);
    });
  }

  private initTennisBall() {
    const initialSec = COURT_SECTIONS[0];
    this.ballGroup = new THREE.Group();
    this.ballGroup.name = 'HeroTennisBallGroup';

    // 1. Tennis Ball Sphere
    const ballTexture = createTennisBallTexture();
    const ballGeo = new THREE.SphereGeometry(0.18, 24, 24);
    const ballMat = new THREE.MeshStandardMaterial({
      map: ballTexture,
      roughness: 0.65,
      metalness: 0.05,
      bumpScale: 0.02,
    });
    this.ballMesh = new THREE.Mesh(ballGeo, ballMat);
    this.ballMesh.castShadow = !this.isSoftwareGl;
    this.ballGroup.add(this.ballMesh);

    // 2. Soft Contact Shadow Disc (Directly on court surface)
    const shadowGeo = new THREE.CircleGeometry(0.24, 24);
    const shadowMat = new THREE.MeshBasicMaterial({
      color: 0x000000,
      transparent: true,
      opacity: 0.45,
      depthWrite: false,
    });
    this.shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    this.shadowMesh.rotation.x = -Math.PI / 2;
    this.shadowMesh.position.set(initialSec.ballPos.x, 0.02, initialSec.ballPos.z);
    this.scene.add(this.shadowMesh);

    // Initial position on Serve Line
    this.ballStartPos.set(initialSec.ballPos.x, initialSec.ballPos.y, initialSec.ballPos.z);
    this.ballTargetPos.copy(this.ballStartPos);
    this.ballGroup.position.copy(this.ballStartPos);

    this.scene.add(this.ballGroup);
  }

  /**
   * Smoothly navigates the camera and launches the tennis ball to target section
   */
  public goToSection(index: number) {
    if (index < 0 || index >= COURT_SECTIONS.length) return;
    this.currentSectionIndex = index;
    const target = COURT_SECTIONS[index];

    // Trophy only visible on section 6 (Match Point)
    if (this.trophyGroup) {
      this.trophyGroup.visible = index === 6;
    }

    // Set camera targets
    this.targetCamPos.set(target.camPos.x, target.camPos.y, target.camPos.z);
    this.targetLookAt.set(target.camLookAt.x, target.camLookAt.y, target.camLookAt.z);

    // Launch the ball towards this section
    const arcHeight = target.id === 'projects' ? 3.0 : target.id === 'gallery' ? 2.6 : 2.2;
    this.launchBallTo(target.ballPos, arcHeight);

    // Update Scoreboard texture
    const newTex = createScoreboardTexture(target.name, index);
    (this.scoreboardMesh.material as THREE.MeshBasicMaterial).map?.dispose();
    (this.scoreboardMesh.material as THREE.MeshBasicMaterial).map = newTex;
    (this.scoreboardMesh.material as THREE.MeshBasicMaterial).needsUpdate = true;

    // Update hotspots color
    this.interactiveHotspots.forEach((h, idx) => {
      const mat = h.material as THREE.MeshBasicMaterial;
      mat.color.setHex(idx === index ? 0xf59e0b : 0x38bdf8);
      mat.opacity = idx === index ? 0.9 : 0.4;
    });

    // Sound effect
    tennisAudio.playRacketHit(1.0);

    if (this.callbacks.onSectionChanged) {
      this.callbacks.onSectionChanged(index);
    }
  }

  /**
   * Launches the tennis ball along a parabolic 3D arc to destination
   */
  public launchBallTo(target: Vector3D, arcHeight: number = 2.4) {
    this.ballStartPos.copy(this.ballGroup.position);
    this.ballTargetPos.set(target.x, target.y, target.z);
    this.ballTransitionT = 0;
    this.ballArcHeight = arcHeight;
    this.isBallInFlight = true;
    this.ballSpinSpeed = (Math.random() > 0.5 ? 1 : -1) * (15 + Math.random() * 10);
  }

  /**
   * Triggers an interactive user hit (Ace Serve or cross-court shot)
   */
  public hitBallRandomCourtShot() {
    const randomX = (Math.random() - 0.5) * 8;
    const randomZ = (Math.random() - 0.5) * 22;
    const speed = 190 + Math.floor(Math.random() * 45); // 190 - 235 km/h

    this.launchBallTo({ x: randomX, y: 0.18, z: randomZ }, 2.8);
    tennisAudio.playRacketHit(1.2);

    if (this.callbacks.onBallHit) {
      this.callbacks.onBallHit(speed);
    }
  }

  private onPointerDown = (event: MouseEvent) => {
    const rect = this.container.getBoundingClientRect();
    this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    this.raycaster.setFromCamera(this.mouse, this.camera);

    // 1. Check if user clicked a court section hotspot
    const hotspotHits = this.raycaster.intersectObjects(this.interactiveHotspots);
    if (hotspotHits.length > 0) {
      const clickedIdx = hotspotHits[0].object.userData.sectionIndex;
      if (typeof clickedIdx === 'number') {
        this.goToSection(clickedIdx);
        return;
      }
    }

    // 2. Check if user clicked the tennis ball directly
    const ballHits = this.raycaster.intersectObject(this.ballMesh);
    if (ballHits.length > 0) {
      this.hitBallRandomCourtShot();
      return;
    }

    // 3. Check if user clicked on court surface to hit ball there
    const courtHits = this.raycaster.intersectObject(this.courtPlaneMesh);
    if (courtHits.length > 0) {
      const p = courtHits[0].point;
      this.launchBallTo({ x: p.x, y: 0.18, z: p.z }, 2.5);
      tennisAudio.playRacketHit(1.05);
      if (this.callbacks.onBallHit) {
        this.callbacks.onBallHit(205);
      }
    }
  };

  private onResize = () => {
    if (!this.container) return;
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;
    this.camera.aspect = width / (height || 1);
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(this.isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
  };

  private afterDraw = (cb: () => void) => {
    const gl = this.renderer.getContext() as WebGL2RenderingContext;
    const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
    gl.flush();
    const poll = () => {
      const state = sync && gl.getSyncParameter(sync, gl.SYNC_STATUS);
      if (state === gl.UNSIGNALED) {
        this.animationFrameId = window.setTimeout(poll, 5);
      } else {
        if (sync) gl.deleteSync(sync);
        this.animationFrameId = window.setTimeout(cb, 60);
      }
    };
    this.animationFrameId = window.setTimeout(poll, 5);
  };

  private animate = () => {
    const now = performance.now();
    const delta = Math.min((now - this.lastTime) / 1000, 0.1);
    this.lastTime = now;
    const elapsedTime = (now - this.startTime) / 1000;

    // 1. Camera smooth exponential damping
    const camLambda = 3.5;
    this.currentCamPos.x = THREE.MathUtils.damp(this.currentCamPos.x, this.targetCamPos.x, camLambda, delta);
    this.currentCamPos.y = THREE.MathUtils.damp(this.currentCamPos.y, this.targetCamPos.y, camLambda, delta);
    this.currentCamPos.z = THREE.MathUtils.damp(this.currentCamPos.z, this.targetCamPos.z, camLambda, delta);
    this.camera.position.copy(this.currentCamPos);

    this.currentLookAt.x = THREE.MathUtils.damp(this.currentLookAt.x, this.targetLookAt.x, camLambda, delta);
    this.currentLookAt.y = THREE.MathUtils.damp(this.currentLookAt.y, this.targetLookAt.y, camLambda, delta);
    this.currentLookAt.z = THREE.MathUtils.damp(this.currentLookAt.z, this.targetLookAt.z, camLambda, delta);
    this.camera.lookAt(this.currentLookAt);

    // 2. Ball flight & bounce physics
    if (this.isBallInFlight) {
      this.ballTransitionT += delta / this.ballTransitionDuration;

      if (this.ballTransitionT < 1.0) {
        // Parabolic arc in flight
        const pos = calculateBallTrajectory(
          this.ballStartPos,
          this.ballTargetPos,
          this.ballTransitionT,
          this.ballArcHeight
        );
        this.ballGroup.position.set(pos.x, pos.y, pos.z);

        // Spin rotation
        this.ballMesh.rotation.x += this.ballSpinSpeed * delta;
        this.ballMesh.rotation.z += (this.ballSpinSpeed * 0.5) * delta;

        // Ground shadow follows beneath ball on the court plane
        const shadowScale = Math.max(0.3, 1.0 - (pos.y / (this.ballArcHeight * 2.5)));
        this.shadowMesh.position.set(pos.x, 0.02, pos.z);
        this.shadowMesh.scale.set(shadowScale, shadowScale, shadowScale);
        (this.shadowMesh.material as THREE.MeshBasicMaterial).opacity = 0.45 * shadowScale;
      } else {
        // Just landed!
        this.isBallInFlight = false;
        this.ballTransitionT = 1.0;
        this.ballGroup.position.copy(this.ballTargetPos);
        this.shadowMesh.position.set(this.ballTargetPos.x, 0.02, this.ballTargetPos.z);
        this.shadowMesh.scale.set(1, 1, 1);
        (this.shadowMesh.material as THREE.MeshBasicMaterial).opacity = 0.45;

        // Sound on court impact
        tennisAudio.playBounce(1.0);
      }
    } else {
      // Resting / Idle subtle bounce animation
      const idleWave = Math.sin(elapsedTime * 3) * 0.04;
      this.ballMesh.position.y = idleWave;
      this.ballMesh.rotation.y += 0.2 * delta;

      // Shadow stays grounded at base of ball
      this.shadowMesh.position.set(this.ballGroup.position.x, 0.02, this.ballGroup.position.z);

      // Pulse court rings
      this.interactiveHotspots.forEach((h, i) => {
        const pulse = Math.sin(elapsedTime * 2.5 + i) * 0.06;
        h.scale.set(1 + pulse, 1 + pulse, 1);
      });
    }

    // Trophy slow golden rotation on Section 6
    if (this.trophyGroup && this.trophyGroup.visible) {
      this.trophyGroup.rotation.y = elapsedTime * 0.3;
    }

    this.renderer.render(this.scene, this.camera);

    // Schedule next frame: paced when software WebGL, rAF on GPU
    if (this.isSoftwareGl) {
      this.afterDraw(this.animate);
    } else {
      this.animationFrameId = requestAnimationFrame(this.animate);
    }
  };

  public getCurrentSectionIndex(): number {
    return this.currentSectionIndex;
  }

  public dispose() {
    cancelAnimationFrame(this.animationFrameId);
    clearTimeout(this.animationFrameId);
    window.removeEventListener('resize', this.onResize);
    this.container.removeEventListener('pointerdown', this.onPointerDown);

    if (this.renderer) {
      this.renderer.dispose();
      if (this.renderer.domElement && this.renderer.domElement.parentNode) {
        this.renderer.domElement.parentNode.removeChild(this.renderer.domElement);
      }
    }
  }
}
