const assert = require('assert');
const core = require('../luna-rambam-core.js');

const expectedMonth = 29 + (12 / 24) + (793 / (1080 * 24));
assert.strictEqual(core.TRADITIONAL_MONTH_DAYS, expectedMonth);

const moladTishrei5786 = new Date('2025-09-22T09:49:26.433Z');
const molad = core.getTraditionalMolad(moladTishrei5786);
assert.ok(molad.ageDays < 0.0001 || molad.ageDays > core.TRADITIONAL_MONTH_DAYS - 0.0001);

const fullMoonApprox = core.calculateMoonResult({
  date: new Date('2025-10-07T09:49:26.433Z'),
  latitude: 31.778,
  longitude: 35.2354
});
assert.ok(fullMoonApprox.ageDays > 14.9 && fullMoonApprox.ageDays < 15.1);
assert.ok(fullMoonApprox.illuminationPercent > 99);
assert.ok(Number.isFinite(fullMoonApprox.azimuth));
assert.ok(Number.isFinite(fullMoonApprox.altitude));

assert.strictEqual(core.getCompassPoint(0), 'N');
assert.strictEqual(core.getCompassPoint(90), 'E');
assert.strictEqual(core.getCompassPoint(180), 'S');
assert.strictEqual(core.getCompassPoint(270), 'O');

console.log('luna-rambam-core: ok');
