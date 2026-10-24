import * as THREE from 'three';

/**
 * Procedural texture generators for the tennis stadium (100% zero external assets).
 */

/**
 * Creates the official tennis court markings canvas texture
 */
export function createTennisCourtTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 2048;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(canvas);

  // 1. Outer apron (surround court) - deep tournament navy / blue
  ctx.fillStyle = '#0a2540';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Subtle court texture grit
  ctx.fillStyle = 'rgba(255, 255, 255, 0.03)';
  for (let i = 0; i < 4000; i++) {
    const rx = Math.random() * canvas.width;
    const ry = Math.random() * canvas.height;
    ctx.fillRect(rx, ry, 2, 2);
  }

  // 2. Playable court area - electric vibrant tournament blue
  const courtLeft = 240;
  const courtTop = 160;
  const courtWidth = canvas.width - courtLeft * 2; // 1568
  const courtHeight = canvas.height - courtTop * 2; // 704

  // Inner court gradient
  const grad = ctx.createLinearGradient(courtLeft, 0, courtLeft + courtWidth, 0);
  grad.addColorStop(0, '#0066cc');
  grad.addColorStop(0.5, '#0077ee');
  grad.addColorStop(1, '#0066cc');
  ctx.fillStyle = grad;
  ctx.fillRect(courtLeft, courtTop, courtWidth, courtHeight);

  // Subtle surface wear / brushing along baseline
  ctx.fillStyle = 'rgba(0, 0, 0, 0.06)';
  ctx.fillRect(courtLeft, courtTop + courtHeight - 60, courtWidth, 60);
  ctx.fillRect(courtLeft, courtTop, courtWidth, 60);

  // 3. Lines styling
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 8;
  ctx.lineCap = 'square';

  // Doubles sidelines (outer court border)
  ctx.strokeRect(courtLeft, courtTop, courtWidth, courtHeight);

  // Singles sidelines (inset by 12% top & bottom)
  const singlesInset = courtHeight * 0.125;
  const singlesTop = courtTop + singlesInset;
  const singlesHeight = courtHeight - singlesInset * 2;
  ctx.strokeRect(courtLeft, singlesTop, courtWidth, singlesHeight);

  // Net line (center vertical)
  const netX = courtLeft + courtWidth / 2;
  ctx.beginPath();
  ctx.moveTo(netX, courtTop - 20);
  ctx.lineTo(netX, courtTop + courtHeight + 20);
  ctx.stroke();

  // Service lines (at ~27% from net on each side)
  const serviceDist = courtWidth * 0.27;
  const leftServiceX = netX - serviceDist;
  const rightServiceX = netX + serviceDist;

  // Left service line
  ctx.beginPath();
  ctx.moveTo(leftServiceX, singlesTop);
  ctx.lineTo(leftServiceX, singlesTop + singlesHeight);
  ctx.stroke();

  // Right service line
  ctx.beginPath();
  ctx.moveTo(rightServiceX, singlesTop);
  ctx.lineTo(rightServiceX, singlesTop + singlesHeight);
  ctx.stroke();

  // Center service line (divides service boxes down the middle)
  const centerY = courtTop + courtHeight / 2;
  ctx.beginPath();
  ctx.moveTo(leftServiceX, centerY);
  ctx.lineTo(rightServiceX, centerY);
  ctx.stroke();

  // Baseline center hash marks
  const hashLength = 24;
  ctx.beginPath();
  ctx.moveTo(courtLeft, centerY);
  ctx.lineTo(courtLeft + hashLength, centerY);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(courtLeft + courtWidth, centerY);
  ctx.lineTo(courtLeft + courtWidth - hashLength, centerY);
  ctx.stroke();

  // Add subtle court sponsor / tournament text along apron
  ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
  ctx.font = 'bold 36px "Segoe UI", system-ui, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('• SANTIAGO ZAIDAN GRAND SLAM ARENA •', canvas.width / 2, 70);
  ctx.fillText('• THREE.JS HIGH PERFORMANCE COURT •', canvas.width / 2, canvas.height - 70);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

/**
 * Creates the procedural tennis ball optic-yellow felt + curved seam texture
 */
export function createTennisBallTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(canvas);

  // 1. Optic Yellow Felt Base
  ctx.fillStyle = '#d4f200'; // Vibrant fluorescent tennis ball yellow
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Felt texture grain
  ctx.fillStyle = 'rgba(200, 230, 0, 0.15)';
  for (let i = 0; i < 8000; i++) {
    const rx = Math.random() * canvas.width;
    const ry = Math.random() * canvas.height;
    ctx.fillRect(rx, ry, 2, 2);
  }
  ctx.fillStyle = 'rgba(120, 160, 0, 0.12)';
  for (let i = 0; i < 5000; i++) {
    const rx = Math.random() * canvas.width;
    const ry = Math.random() * canvas.height;
    ctx.fillRect(rx, ry, 1, 1);
  }

  // 2. Iconic Tennis Ball Seam (two interlocking sine waves)
  ctx.strokeStyle = '#f8fafc';
  ctx.lineWidth = 14;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  ctx.shadowColor = 'rgba(50, 70, 0, 0.35)';
  ctx.shadowBlur = 4;

  // Wave 1
  ctx.beginPath();
  for (let x = 0; x <= canvas.width; x += 4) {
    const angle = (x / canvas.width) * Math.PI * 2;
    const y = canvas.height * 0.5 + Math.sin(angle) * (canvas.height * 0.38);
    if (x === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.stroke();

  // Subtle brand mark on the ball
  ctx.shadowBlur = 0;
  ctx.fillStyle = 'rgba(40, 50, 10, 0.4)';
  ctx.font = 'bold 24px monospace';
  ctx.textAlign = 'center';
  ctx.fillText('SZ-1', canvas.width * 0.25, canvas.height * 0.25);
  ctx.fillText('TOUR', canvas.width * 0.75, canvas.height * 0.75);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

/**
 * Creates dynamic scoreboard canvas texture
 */
export function createScoreboardTexture(currentSectionName: string, points: number = 3): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(canvas);

  // Black LED matrix background
  ctx.fillStyle = '#060a12';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Subtle grid mesh
  ctx.strokeStyle = 'rgba(20, 35, 60, 0.4)';
  ctx.lineWidth = 1;
  for (let x = 0; x < canvas.width; x += 16) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
    ctx.stroke();
  }
  for (let y = 0; y < canvas.height; y += 16) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.stroke();
  }

  // Outer border with gold tournament trim
  ctx.strokeStyle = '#eab308';
  ctx.lineWidth = 8;
  ctx.strokeRect(10, 10, canvas.width - 20, canvas.height - 20);

  // Header
  ctx.fillStyle = '#38bdf8';
  ctx.font = 'bold 24px system-ui, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('AI STUDIO GRAND SLAM ARENA • CENTER COURT', canvas.width / 2, 45);

  // Table header
  ctx.fillStyle = '#94a3b8';
  ctx.font = 'bold 18px monospace';
  ctx.textAlign = 'left';
  ctx.fillText('PLAYER', 40, 95);
  ctx.fillText('SET 1', 520, 95);
  ctx.fillText('SET 2', 630, 95);
  ctx.fillText('SET 3', 740, 95);
  ctx.fillText('PTS', 860, 95);

  ctx.strokeStyle = '#1e293b';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(30, 110);
  ctx.lineTo(canvas.width - 30, 110);
  ctx.stroke();

  // Player 1 (Santiago Zaidan)
  ctx.fillStyle = '#fbbf24'; // Server highlight dot
  ctx.beginPath();
  ctx.arc(50, 160, 8, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 32px system-ui, sans-serif';
  ctx.fillText('SANTIAGO ZAIDAN', 75, 170);

  ctx.fillStyle = '#38bdf8';
  ctx.font = 'bold 36px monospace';
  ctx.fillText('6', 535, 172);
  ctx.fillText('7', 645, 172);
  ctx.fillText('4', 755, 172);

  ctx.fillStyle = '#4ade80'; // Current game point
  const ptString = points >= 4 ? 'AD' : points === 3 ? '40' : points === 2 ? '30' : points === 1 ? '15' : '0';
  ctx.fillText(ptString, 865, 172);

  // Player 2 (Visitor / Recruiter)
  ctx.fillStyle = '#cbd5e1';
  ctx.font = 'bold 32px system-ui, sans-serif';
  ctx.fillText('VISITOR / RECRUITER', 75, 240);

  ctx.fillStyle = '#38bdf8';
  ctx.font = 'bold 36px monospace';
  ctx.fillText('4', 535, 242);
  ctx.fillText('6', 645, 242);
  ctx.fillText('3', 755, 242);

  ctx.fillStyle = '#94a3b8';
  ctx.fillText('15', 865, 242);

  // Bottom info strip: Serve speed & Current Section
  ctx.fillStyle = '#111827';
  ctx.fillRect(30, 290, canvas.width - 60, 190);
  ctx.strokeStyle = '#374151';
  ctx.strokeRect(30, 290, canvas.width - 60, 190);

  // Serve radar
  ctx.fillStyle = '#e2e8f0';
  ctx.font = 'bold 20px system-ui, sans-serif';
  ctx.fillText('FASTEST SERVE RADAR', 55, 335);

  ctx.fillStyle = '#f59e0b';
  ctx.font = '900 52px monospace';
  ctx.fillText('218 KM/H', 55, 400);

  ctx.fillStyle = '#10b981';
  ctx.font = 'bold 18px monospace';
  ctx.fillText('ACE SPEED • 135 MPH', 55, 440);

  // Zone status
  ctx.fillStyle = '#e2e8f0';
  ctx.font = 'bold 20px system-ui, sans-serif';
  ctx.fillText('ACTIVE COURT ZONE', 520, 335);

  ctx.fillStyle = '#38bdf8';
  ctx.font = 'bold 30px system-ui, sans-serif';
  ctx.fillText(currentSectionName.toUpperCase(), 520, 385);

  ctx.fillStyle = '#a78bfa';
  ctx.font = 'bold 18px monospace';
  ctx.fillText('• 60 FPS WEBGL SPATIAL ENGINE •', 520, 440);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

/**
 * Creates net mesh alpha & texture
 */
export function createNetTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(canvas);

  // Clear background
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // White net top tape (cord)
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, canvas.width, 24);

  // Black net mesh grid
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
  ctx.lineWidth = 1.5;

  const step = 8;
  for (let x = 0; x < canvas.width; x += step) {
    ctx.beginPath();
    ctx.moveTo(x, 24);
    ctx.lineTo(x, canvas.height);
    ctx.stroke();
  }
  for (let y = 24; y < canvas.height; y += step) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.repeat.set(16, 1);
  return texture;
}
