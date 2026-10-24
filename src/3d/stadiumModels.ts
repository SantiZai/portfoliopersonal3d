import * as THREE from 'three';
import { createNetTexture, createTennisCourtTexture } from './courtTextures';

/**
 * Builds the complete 3D Tennis Stadium with composite procedural parts (3-12 parts per group).
 */

/**
 * Builds the tennis court surface plane with high-res markings and subtle bevel edges
 */
export function buildCourtSurface(): THREE.Group {
  const group = new THREE.Group();
  group.name = 'CourtSurfaceGroup';

  // 1. Acrylic playing surface
  const courtTexture = createTennisCourtTexture();
  const courtGeo = new THREE.PlaneGeometry(24, 40, 32, 32);
  const courtMat = new THREE.MeshStandardMaterial({
    map: courtTexture,
    roughness: 0.85,
    metalness: 0.05,
  });

  const courtMesh = new THREE.Mesh(courtGeo, courtMat);
  courtMesh.rotation.x = -Math.PI / 2;
  courtMesh.receiveShadow = true;
  group.add(courtMesh);

  // 2. Concrete stadium apron foundation
  const baseGeo = new THREE.BoxGeometry(26, 0.4, 42);
  const baseMat = new THREE.MeshStandardMaterial({
    color: 0x071524,
    roughness: 0.9,
    metalness: 0.1,
  });
  const baseMesh = new THREE.Mesh(baseGeo, baseMat);
  baseMesh.position.y = -0.21;
  baseMesh.receiveShadow = true;
  group.add(baseMesh);

  return group;
}

/**
 * Builds the official net with posts, tensioner, center strap and white headband
 */
export function buildNet(): THREE.Group {
  const group = new THREE.Group();
  group.name = 'TennisNetGroup';

  const netLength = 13.5;
  const netHeight = 1.05;

  // 1. Net mesh
  const netGeo = new THREE.PlaneGeometry(netLength, netHeight, 16, 8);
  const netTexture = createNetTexture();
  const netMat = new THREE.MeshStandardMaterial({
    map: netTexture,
    transparent: true,
    alphaTest: 0.05,
    roughness: 0.4,
    side: THREE.DoubleSide,
  });
  const netMesh = new THREE.Mesh(netGeo, netMat);
  netMesh.position.set(0, netHeight / 2 + 0.02, 0);
  netMesh.castShadow = true;
  group.add(netMesh);

  // 2. White headband top cord
  const cordGeo = new THREE.CylinderGeometry(0.025, 0.025, netLength, 12);
  const cordMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.3,
  });
  const cordMesh = new THREE.Mesh(cordGeo, cordMat);
  cordMesh.rotation.z = Math.PI / 2;
  cordMesh.position.set(0, netHeight + 0.02, 0);
  cordMesh.castShadow = true;
  group.add(cordMesh);

  // 3. Center strap (clamps down the middle of the net to 0.914m / 3 feet)
  const strapGeo = new THREE.BoxGeometry(0.06, netHeight, 0.04);
  const strapMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.4 });
  const strapMesh = new THREE.Mesh(strapGeo, strapMat);
  strapMesh.position.set(0, netHeight / 2, 0);
  group.add(strapMesh);

  // 4. Steel net posts (left and right)
  const postGeo = new THREE.CylinderGeometry(0.06, 0.06, 1.3, 16);
  const postMat = new THREE.MeshStandardMaterial({
    color: 0x1e293b,
    metalness: 0.85,
    roughness: 0.25,
  });

  const leftPost = new THREE.Mesh(postGeo, postMat);
  leftPost.position.set(-netLength / 2, 0.65, 0);
  leftPost.castShadow = true;
  group.add(leftPost);

  const rightPost = new THREE.Mesh(postGeo, postMat);
  rightPost.position.set(netLength / 2, 0.65, 0);
  rightPost.castShadow = true;
  group.add(rightPost);

  // 5. Tensioner crank on post
  const crankGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.18, 8);
  const crankMat = new THREE.MeshStandardMaterial({ color: 0xd97706, metalness: 0.8, roughness: 0.2 });
  const crank = new THREE.Mesh(crankGeo, crankMat);
  crank.rotation.x = Math.PI / 2;
  crank.position.set(netLength / 2 + 0.08, 0.95, 0);
  group.add(crank);

  return group;
}

/**
 * Builds the official Umpire Chair (Silla del Árbitro)
 */
export function buildUmpireChair(): THREE.Group {
  const chairGroup = new THREE.Group();
  chairGroup.name = 'UmpireChair';

  const frameMat = new THREE.MeshStandardMaterial({
    color: 0x0284c7, // Tournament cyan / royal blue
    roughness: 0.35,
    metalness: 0.4,
  });

  const seatMat = new THREE.MeshStandardMaterial({
    color: 0x0f172a,
    roughness: 0.6,
  });

  // Four slanted structural legs
  const legGeo = new THREE.CylinderGeometry(0.035, 0.035, 3.2, 8);
  const legPositions = [
    { x: -0.5, z: -0.5, rotZ: 0.12, rotX: -0.12 },
    { x: 0.5, z: -0.5, rotZ: -0.12, rotX: -0.12 },
    { x: -0.5, z: 0.5, rotZ: 0.12, rotX: 0.12 },
    { x: 0.5, z: 0.5, rotZ: -0.12, rotX: 0.12 },
  ];

  legPositions.forEach(p => {
    const leg = new THREE.Mesh(legGeo, frameMat);
    leg.position.set(p.x, 1.5, p.z);
    leg.rotation.set(p.rotX, 0, p.rotZ);
    leg.castShadow = true;
    chairGroup.add(leg);
  });

  // Ladder rungs (steps)
  for (let y = 0.5; y <= 2.2; y += 0.35) {
    const rungGeo = new THREE.BoxGeometry(0.8, 0.03, 0.05);
    const rung = new THREE.Mesh(rungGeo, frameMat);
    rung.position.set(0, y, 0.45);
    chairGroup.add(rung);
  }

  // Elevated platform
  const platGeo = new THREE.BoxGeometry(1.0, 0.08, 1.0);
  const plat = new THREE.Mesh(platGeo, frameMat);
  plat.position.set(0, 2.5, 0);
  plat.castShadow = true;
  chairGroup.add(plat);

  // Umpire seat & backrest
  const seatGeo = new THREE.BoxGeometry(0.7, 0.08, 0.65);
  const seat = new THREE.Mesh(seatGeo, seatMat);
  seat.position.set(0, 2.65, -0.05);
  chairGroup.add(seat);

  const backGeo = new THREE.BoxGeometry(0.7, 0.65, 0.08);
  const back = new THREE.Mesh(backGeo, seatMat);
  back.position.set(0, 3.0, -0.35);
  chairGroup.add(back);

  // Desk with microphone
  const deskGeo = new THREE.BoxGeometry(0.65, 0.05, 0.35);
  const desk = new THREE.Mesh(deskGeo, frameMat);
  desk.position.set(0, 2.9, 0.3);
  chairGroup.add(desk);

  // Umpire Sun Canopy (Umbrella roof)
  const roofGeo = new THREE.ConeGeometry(1.1, 0.35, 8);
  const roofMat = new THREE.MeshStandardMaterial({
    color: 0xf8fafc,
    roughness: 0.4,
  });
  const roof = new THREE.Mesh(roofGeo, roofMat);
  roof.position.set(0, 3.8, 0);
  chairGroup.add(roof);

  chairGroup.position.set(-7.5, 0, 0);
  return chairGroup;
}

/**
 * Builds player bench, tennis bags, racket and ball basket
 */
export function buildCourtSideEquipment(): THREE.Group {
  const group = new THREE.Group();
  group.name = 'CourtSideEquipment';

  // 1. Player Wooden / Aluminum Bench
  const benchMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.5, metalness: 0.2 });
  const woodMat = new THREE.MeshStandardMaterial({ color: 0xb45309, roughness: 0.7 });

  const seatMesh = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.08, 0.7), woodMat);
  seatMesh.position.set(7.5, 0.45, 2.5);
  seatMesh.castShadow = true;
  group.add(seatMesh);

  const backMesh = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.45, 0.06), woodMat);
  backMesh.position.set(7.5, 0.8, 2.82);
  group.add(backMesh);

  // Bench legs
  const leg1 = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.45, 0.65), benchMat);
  leg1.position.set(6.6, 0.22, 2.5);
  leg1.castShadow = true;
  group.add(leg1);

  const leg2 = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.45, 0.65), benchMat);
  leg2.position.set(8.4, 0.22, 2.5);
  leg2.castShadow = true;
  group.add(leg2);

  // 2. Tennis Racket leaning against bench
  const racketGroup = new THREE.Group();
  racketGroup.name = 'TennisRacket';

  const frameMat = new THREE.MeshStandardMaterial({
    color: 0x111827,
    roughness: 0.25,
    metalness: 0.7,
  });
  const stringMat = new THREE.MeshStandardMaterial({
    color: 0xfef08a,
    roughness: 0.3,
    transparent: true,
    opacity: 0.6,
  });
  const gripMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.8,
  });

  // Racket head (oval torus)
  const headGeo = new THREE.TorusGeometry(0.28, 0.02, 12, 32);
  const head = new THREE.Mesh(headGeo, frameMat);
  head.scale.set(1, 1.35, 1);
  head.position.y = 0.95;
  racketGroup.add(head);

  // String face
  const stringsGeo = new THREE.CircleGeometry(0.26, 24);
  const strings = new THREE.Mesh(stringsGeo, stringMat);
  strings.scale.set(1, 1.32, 1);
  strings.position.y = 0.95;
  racketGroup.add(strings);

  // Throat
  const throatGeo = new THREE.CylinderGeometry(0.02, 0.03, 0.2, 8);
  const throat = new THREE.Mesh(throatGeo, frameMat);
  throat.position.y = 0.52;
  racketGroup.add(throat);

  // Handle / Grip
  const handleGeo = new THREE.CylinderGeometry(0.025, 0.025, 0.45, 8);
  const handle = new THREE.Mesh(handleGeo, gripMat);
  handle.position.y = 0.225;
  racketGroup.add(handle);

  racketGroup.rotation.z = -0.22;
  racketGroup.rotation.y = 0.3;
  racketGroup.position.set(7.0, 0, 2.0);
  racketGroup.castShadow = true;
  group.add(racketGroup);

  // 3. Ball Hopper (basket with tennis balls)
  const hopperGroup = new THREE.Group();
  hopperGroup.name = 'BallHopper';

  const wireMat = new THREE.MeshStandardMaterial({ color: 0x059669, metalness: 0.6, roughness: 0.3 });
  const basketGeo = new THREE.BoxGeometry(0.6, 0.6, 0.6);
  const basket = new THREE.Mesh(basketGeo, wireMat);
  basket.position.set(7.2, 0.9, -2.5);
  hopperGroup.add(basket);

  // Hopper stand legs
  const hopperLeg1 = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.9, 8), wireMat);
  hopperLeg1.position.set(7.0, 0.45, -2.7);
  hopperGroup.add(hopperLeg1);

  const hopperLeg2 = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.9, 8), wireMat);
  hopperLeg2.position.set(7.4, 0.45, -2.3);
  hopperGroup.add(hopperLeg2);

  // 4 practice tennis balls inside hopper
  const ballMat = new THREE.MeshStandardMaterial({ color: 0xccff00, roughness: 0.6 });
  const ballGeo = new THREE.SphereGeometry(0.08, 12, 12);
  const ballOffsets = [
    { x: 0.1, y: 0.2, z: 0.1 },
    { x: -0.12, y: 0.22, z: -0.08 },
    { x: 0.08, y: 0.28, z: -0.12 },
    { x: -0.05, y: 0.31, z: 0.12 },
  ];
  ballOffsets.forEach(bo => {
    const b = new THREE.Mesh(ballGeo, ballMat);
    b.position.set(7.2 + bo.x, 0.9 + bo.y, -2.5 + bo.z);
    hopperGroup.add(b);
  });

  group.add(hopperGroup);

  return group;
}

/**
 * Builds Grandstand seating rows and stadium perimeter
 */
export function buildGrandstands(): THREE.Group {
  const stadium = new THREE.Group();
  stadium.name = 'StadiumGrandstands';

  const seatColor1 = 0x0284c7; // Blue seats
  const seatColor2 = 0x0369a1;
  const concreteMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.9 });
  const seatMat1 = new THREE.MeshStandardMaterial({ color: seatColor1, roughness: 0.5 });
  const seatMat2 = new THREE.MeshStandardMaterial({ color: seatColor2, roughness: 0.5 });

  // North & South tiered grandstands
  const buildSideStand = (isNorth: boolean) => {
    const stand = new THREE.Group();
    const zBase = isNorth ? -22 : 22;
    const zDir = isNorth ? -1 : 1;

    for (let tier = 0; tier < 8; tier++) {
      const stepY = tier * 0.75 + 0.3;
      const stepZ = zBase + tier * 1.8 * zDir;

      // Concrete tier step
      const stepGeo = new THREE.BoxGeometry(32, 0.75, 2.0);
      const stepMesh = new THREE.Mesh(stepGeo, concreteMat);
      stepMesh.position.set(0, stepY, stepZ);
      stepMesh.receiveShadow = true;
      stand.add(stepMesh);

      // Row of seats
      const seatRowGeo = new THREE.BoxGeometry(28, 0.25, 0.6);
      const seatRow = new THREE.Mesh(seatRowGeo, tier % 2 === 0 ? seatMat1 : seatMat2);
      seatRow.position.set(0, stepY + 0.45, stepZ);
      stand.add(seatRow);
    }
    return stand;
  };

  stadium.add(buildSideStand(true));
  stadium.add(buildSideStand(false));

  // East & West grandstands
  const buildFlankStand = (isWest: boolean) => {
    const stand = new THREE.Group();
    const xBase = isWest ? -15 : 15;
    const xDir = isWest ? -1 : 1;

    for (let tier = 0; tier < 6; tier++) {
      const stepY = tier * 0.8 + 0.3;
      const stepX = xBase + tier * 1.9 * xDir;

      const stepGeo = new THREE.BoxGeometry(2.0, 0.8, 38);
      const stepMesh = new THREE.Mesh(stepGeo, concreteMat);
      stepMesh.position.set(stepX, stepY, 0);
      stepMesh.receiveShadow = true;
      stand.add(stepMesh);

      const seatRowGeo = new THREE.BoxGeometry(0.6, 0.25, 34);
      const seatRow = new THREE.Mesh(seatRowGeo, tier % 2 === 0 ? seatMat2 : seatMat1);
      seatRow.position.set(stepX, stepY + 0.45, 0);
      stand.add(seatRow);
    }
    return stand;
  };

  stadium.add(buildFlankStand(true));
  stadium.add(buildFlankStand(false));

  // LED Perimeter advertising boards around court edge
  const boardGeoX = new THREE.BoxGeometry(26, 0.8, 0.2);
  const boardMat = new THREE.MeshStandardMaterial({
    color: 0x0f172a,
    emissive: 0x0284c7,
    emissiveIntensity: 0.25,
    roughness: 0.3,
  });

  const northBoard = new THREE.Mesh(boardGeoX, boardMat);
  northBoard.position.set(0, 0.4, -20.5);
  stadium.add(northBoard);

  const southBoard = new THREE.Mesh(boardGeoX, boardMat);
  southBoard.position.set(0, 0.4, 20.5);
  stadium.add(southBoard);

  const boardGeoZ = new THREE.BoxGeometry(0.2, 0.8, 41);
  const westBoard = new THREE.Mesh(boardGeoZ, boardMat);
  westBoard.position.set(-13.5, 0.4, 0);
  stadium.add(westBoard);

  const eastBoard = new THREE.Mesh(boardGeoZ, boardMat);
  eastBoard.position.set(13.5, 0.4, 0);
  stadium.add(eastBoard);

  return stadium;
}

/**
 * Builds 4 professional stadium floodlight towers with spotlights
 */
export function buildStadiumFloodlights(): { group: THREE.Group; lights: THREE.SpotLight[] } {
  const group = new THREE.Group();
  group.name = 'StadiumFloodlights';
  const lights: THREE.SpotLight[] = [];

  const towerPositions = [
    { x: -14, z: -20, targetX: -2, targetZ: -5 },
    { x: 14, z: -20, targetX: 2, targetZ: -5 },
    { x: -14, z: 20, targetX: -2, targetZ: 5 },
    { x: 14, z: 20, targetX: 2, targetZ: 5 },
  ];

  const trussMat = new THREE.MeshStandardMaterial({
    color: 0x475569,
    metalness: 0.8,
    roughness: 0.3,
  });

  const lampMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    emissive: 0xfef08a,
    emissiveIntensity: 1.0,
    roughness: 0.1,
  });

  towerPositions.forEach((pos, idx) => {
    const tower = new THREE.Group();

    // Steel column
    const columnGeo = new THREE.CylinderGeometry(0.2, 0.35, 14, 8);
    const col = new THREE.Mesh(columnGeo, trussMat);
    col.position.y = 7;
    col.castShadow = true;
    tower.add(col);

    // Cross-arm lighting fixture
    const armGeo = new THREE.BoxGeometry(3.0, 0.4, 1.2);
    const arm = new THREE.Mesh(armGeo, trussMat);
    arm.position.y = 14;
    tower.add(arm);

    // Floodlight lamp clusters (3 rows of bright emitters)
    for (let lx = -1.0; lx <= 1.0; lx += 1.0) {
      const lamp = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.1, 8), lampMat);
      lamp.rotation.x = Math.PI / 2;
      lamp.position.set(lx, 14, 0.6);
      tower.add(lamp);
    }

    // SpotLight projecting down to court
    const spot = new THREE.SpotLight(0xfef9c3, 120, 50, Math.PI / 4.5, 0.35, 1.2);
    spot.position.set(pos.x, 14, pos.z);
    spot.target.position.set(pos.targetX, 0, pos.targetZ);
    group.add(spot.target);
    spot.castShadow = true;
    spot.shadow.bias = -0.0005;
    spot.shadow.mapSize.width = 1024;
    spot.shadow.mapSize.height = 1024;
    lights.push(spot);

    tower.position.set(pos.x, 0, pos.z);
    group.add(tower);
  });

  return { group, lights };
}

/**
 * Builds the Grand Slam Championship Trophy for the Match Point section
 */
export function buildTrophy(): THREE.Group {
  const trophy = new THREE.Group();
  trophy.name = 'ChampionshipTrophy';

  const goldMat = new THREE.MeshPhysicalMaterial({
    color: 0xf59e0b,
    metalness: 0.95,
    roughness: 0.15,
    clearcoat: 1.0,
    clearcoatRoughness: 0.1,
  });

  const baseMat = new THREE.MeshStandardMaterial({
    color: 0x0f172a,
    roughness: 0.3,
    metalness: 0.2,
  });

  // Stepped marble pedestal base
  const b1 = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.55, 0.2, 16), baseMat);
  b1.position.y = 0.1;
  trophy.add(b1);

  const b2 = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.4, 0.25, 16), baseMat);
  b2.position.y = 0.32;
  trophy.add(b2);

  // Trophy Stem
  const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.22, 0.35, 16), goldMat);
  stem.position.y = 0.6;
  trophy.add(stem);

  // Trophy Cup Body
  const cup = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.2, 0.55, 24), goldMat);
  cup.position.y = 1.0;
  trophy.add(cup);

  // Cup Rim
  const rim = new THREE.Mesh(new THREE.TorusGeometry(0.46, 0.03, 12, 24), goldMat);
  rim.rotation.x = Math.PI / 2;
  rim.position.y = 1.28;
  trophy.add(rim);

  // Dual Handles
  const handleGeo = new THREE.TorusGeometry(0.2, 0.03, 8, 16, Math.PI);
  const leftHandle = new THREE.Mesh(handleGeo, goldMat);
  leftHandle.position.set(-0.48, 1.05, 0);
  leftHandle.rotation.z = Math.PI / 2;
  trophy.add(leftHandle);

  const rightHandle = new THREE.Mesh(handleGeo, goldMat);
  rightHandle.position.set(0.48, 1.05, 0);
  rightHandle.rotation.z = -Math.PI / 2;
  trophy.add(rightHandle);

  trophy.position.set(0, 0, 0);
  return trophy;
}

/**
 * Builds the official Pro Shop & Trophy Showcase exhibition counter
 */
export function buildTrophyShopDisplay(): THREE.Group {
  const shopGroup = new THREE.Group();
  shopGroup.name = 'TrophyShopExhibition';

  const woodMat = new THREE.MeshStandardMaterial({
    color: 0x0f172a,
    roughness: 0.4,
    metalness: 0.3,
  });
  const velvetMat = new THREE.MeshStandardMaterial({
    color: 0x064e3b, // Tournament green velvet
    roughness: 0.8,
  });
  const goldMat = new THREE.MeshStandardMaterial({
    color: 0xf59e0b,
    metalness: 0.9,
    roughness: 0.2,
  });
  const glassMat = new THREE.MeshStandardMaterial({
    color: 0x38bdf8,
    transparent: true,
    opacity: 0.45,
    roughness: 0.1,
    metalness: 0.2,
  });

  // Main cabinet counter
  const counterGeo = new THREE.BoxGeometry(3.6, 0.75, 1.4);
  const counter = new THREE.Mesh(counterGeo, woodMat);
  counter.position.y = 0.375;
  counter.castShadow = true;
  counter.receiveShadow = true;
  shopGroup.add(counter);

  // Velvet top mat
  const velvetGeo = new THREE.BoxGeometry(3.4, 0.04, 1.2);
  const velvet = new THREE.Mesh(velvetGeo, velvetMat);
  velvet.position.y = 0.77;
  shopGroup.add(velvet);

  // Four pedestal showcases on the counter
  const pedestalX = [-1.2, -0.4, 0.4, 1.2];

  // 1. Mini Golden Cup (Project 1)
  const p1 = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.18, 0.12, 16), woodMat);
  p1.position.set(pedestalX[0], 0.84, 0);
  shopGroup.add(p1);

  const miniCup = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.08, 0.28, 16), goldMat);
  miniCup.position.set(pedestalX[0], 1.04, 0);
  shopGroup.add(miniCup);

  // 2. Crystal Prism (Project 2 - Real time Analytics)
  const p2 = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.18, 0.12, 16), woodMat);
  p2.position.set(pedestalX[1], 0.84, 0);
  shopGroup.add(p2);

  const prism = new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.32, 4), glassMat);
  prism.position.set(pedestalX[1], 1.06, 0);
  prism.rotation.y = Math.PI / 4;
  shopGroup.add(prism);

  // 3. Mini Micro-Server Tower (Project 3 - Cloud Architecture)
  const p3 = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.18, 0.12, 16), woodMat);
  p3.position.set(pedestalX[2], 0.84, 0);
  shopGroup.add(p3);

  const serverMat = new THREE.MeshStandardMaterial({ color: 0x10b981, metalness: 0.8, roughness: 0.2 });
  const server = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.3, 0.18), serverMat);
  server.position.set(pedestalX[2], 1.05, 0);
  shopGroup.add(server);

  // 4. Collector's Ball Stand (Project 4 - HawkEye)
  const p4 = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.18, 0.12, 16), woodMat);
  p4.position.set(pedestalX[3], 0.84, 0);
  shopGroup.add(p4);

  const goldBall = new THREE.Mesh(new THREE.SphereGeometry(0.1, 16, 16), goldMat);
  goldBall.position.set(pedestalX[3], 1.02, 0);
  shopGroup.add(goldBall);

  // Pro Shop & Trophy Showcase Sign
  const signGeo = new THREE.BoxGeometry(3.6, 0.45, 0.08);
  const signMat = new THREE.MeshStandardMaterial({
    color: 0x0284c7,
    emissive: 0x0369a1,
    emissiveIntensity: 0.5,
  });
  const sign = new THREE.Mesh(signGeo, signMat);
  sign.position.set(0, 1.45, -0.6);
  shopGroup.add(sign);

  shopGroup.position.set(7.8, 0, -6.5);
  return shopGroup;
}
