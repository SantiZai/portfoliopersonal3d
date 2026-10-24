import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateBallTrajectory,
  calculateTennisBounce,
  formatTennisScore,
  kmhToMph,
  COURT_SECTIONS,
  getScoreboardStateForSection,
} from './tennisMath';

test('COURT_SECTIONS contains 7 sequential tournament sections including Trophy Shop', () => {
  assert.equal(COURT_SECTIONS.length, 7);
  assert.equal(COURT_SECTIONS[0].id, 'serve');
  assert.equal(COURT_SECTIONS[5].id, 'gallery');
  assert.equal(COURT_SECTIONS[6].id, 'contact');
});

test('getScoreboardStateForSection returns authentic tennis terminology for all sections', () => {
  const s0 = getScoreboardStateForSection(0);
  assert.equal(s0.sectionTerm, 'SAQUE');

  const s1 = getScoreboardStateForSection(1);
  assert.equal(s1.sectionTerm, 'RESTO');

  const s2 = getScoreboardStateForSection(2);
  assert.equal(s2.sectionTerm, 'VOLEA');

  const s5 = getScoreboardStateForSection(5);
  assert.equal(s5.sectionTerm, 'TROFEOS & PRO SHOP');

  const s6 = getScoreboardStateForSection(6);
  assert.equal(s6.sectionTerm, 'MATCH POINT');
  assert.equal(s6.currentPoints, 'MATCH POINT (40-15)');
});

test('calculateBallTrajectory interpolates accurately at start, peak, and finish', () => {
  const p0 = { x: 0, y: 1, z: 10 };
  const p1 = { x: 10, y: 1, z: 0 };
  
  // At t=0
  const start = calculateBallTrajectory(p0, p1, 0, 3);
  assert.equal(start.x, 0);
  assert.equal(start.y, 1);
  assert.equal(start.z, 10);

  // At t=0.5 (apex)
  const mid = calculateBallTrajectory(p0, p1, 0.5, 3);
  assert.equal(mid.x, 5);
  // baseY=1 + 4*3*0.5*0.5 = 1 + 3 = 4
  assert.equal(mid.y, 4);
  assert.equal(mid.z, 5);

  // At t=1
  const end = calculateBallTrajectory(p0, p1, 1, 3);
  assert.equal(end.x, 10);
  assert.equal(end.y, 1);
  assert.equal(end.z, 0);
});

test('calculateTennisBounce decays to zero over time', () => {
  assert.equal(calculateTennisBounce(-0.1), 0);
  assert.equal(calculateTennisBounce(1.0), 0);
  
  const midBounce = calculateTennisBounce(0.1, 1.0);
  assert.ok(midBounce > 0, 'Bounce should be positive during landing window');
  
  const laterBounce = calculateTennisBounce(0.8, 1.0);
  assert.ok(laterBounce < midBounce, 'Bounce amplitude should decay with time');
});

test('formatTennisScore maps tennis point increments correctly', () => {
  assert.equal(formatTennisScore(0), 'LOVE (0)');
  assert.equal(formatTennisScore(1), '15');
  assert.equal(formatTennisScore(2), '30');
  assert.equal(formatTennisScore(3), '40');
  assert.equal(formatTennisScore(4), 'AD (Advantage)');
  assert.equal(formatTennisScore(5), 'GAME');
});

test('kmhToMph converts correctly', () => {
  assert.equal(kmhToMph(200), 124);
  assert.equal(kmhToMph(0), 0);
});
