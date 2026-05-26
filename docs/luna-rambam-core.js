(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) {
    module.exports = api;
  }
  
  root.LunaRambamCore = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  const PARTS_PER_HOUR = 1080;
  const HOURS_PER_DAY = 24;
  const MS_PER_DAY = 86400000;
  const JULIAN_DAY_UNIX_EPOCH = 2440587.5;
  const TRADITIONAL_MONTH_DAYS = 29 + (12 / HOURS_PER_DAY) + (793 / (PARTS_PER_HOUR * HOURS_PER_DAY));
  // Molad Tohu / BaHaRaD in UTC, anchored to Jerusalem mean local time.
  const MOLAD_TOHU_JD = julianCalendarToJulianDay(-3760, 10, 6, 20, 50, 23.1);
  const JERUSALEM_MEAN_OFFSET_MINUTES = 140 + (56.9 / 60);
  const COMPASS_POINTS = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSO', 'SO', 'OSO', 'O', 'ONO', 'NO', 'NNO'];
  const PHASES = [
    { key: 'new', max: 1.5, name: 'Luna nueva tradicional', summary: 'La Luna está muy cerca del molad; normalmente no se ve.' },
    { key: 'waxingCrescent', max: 6.8, name: 'Creciente fina', summary: 'La luz crece desde el borde occidental del disco lunar.' },
    { key: 'firstQuarter', max: 8.4, name: 'Cuarto creciente', summary: 'La Luna aparece aproximadamente medio iluminada y va aumentando.' },
    { key: 'waxingGibbous', max: 13.8, name: 'Gibosa creciente', summary: 'La Luna se acerca a la plenitud.' },
    { key: 'full', max: 15.8, name: 'Luna llena aproximada', summary: 'La Luna está cerca de la oposición al Sol.' },
    { key: 'waningGibbous', max: 21.1, name: 'Gibosa menguante', summary: 'La Luna sigue brillante, pero la iluminación empieza a bajar.' },
    { key: 'lastQuarter', max: 22.7, name: 'Cuarto menguante', summary: 'La Luna vuelve a estar aproximadamente medio iluminada.' },
    { key: 'waningCrescent', max: Infinity, name: 'Menguante fina', summary: 'La Luna se acerca al siguiente molad.' }
  ];

  function degToRad(value) {
    return value * Math.PI / 180;
  }

  function radToDeg(value) {
    return value * 180 / Math.PI;
  }

  function normalizeDegrees(value) {
    return ((value % 360) + 360) % 360;
  }

  function positiveModulo(value, divisor) {
    return ((value % divisor) + divisor) % divisor;
  }

  function julianDayFromDate(date) {
    return date.getTime() / MS_PER_DAY + JULIAN_DAY_UNIX_EPOCH;
  }

  function dateFromJulianDay(julianDay) {
    return new Date((julianDay - JULIAN_DAY_UNIX_EPOCH) * MS_PER_DAY);
  }

  function julianCalendarToJulianDay(year, month, day, hour, minute, second) {
    let y = year;
    let m = month;
    if (m <= 2) {
      y -= 1;
      m += 12;
    }
    const wholeDay = Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + day - 1524.5;
    const dayFraction = ((hour || 0) + ((minute || 0) / 60) + ((second || 0) / 3600)) / 24;
    return wholeDay + dayFraction;
  }

  function getTraditionalMolad(date) {
    const julianDay = julianDayFromDate(date);
    const elapsedMonthsExact = (julianDay - MOLAD_TOHU_JD) / TRADITIONAL_MONTH_DAYS;
    const elapsedMonths = Math.floor(elapsedMonthsExact);
    const previousMoladJd = MOLAD_TOHU_JD + elapsedMonths * TRADITIONAL_MONTH_DAYS;
    const nextMoladJd = previousMoladJd + TRADITIONAL_MONTH_DAYS;
    const ageDays = positiveModulo(julianDay - MOLAD_TOHU_JD, TRADITIONAL_MONTH_DAYS);

    return {
      ageDays,
      elapsedMonths,
      previousMolad: dateFromJulianDay(previousMoladJd),
      nextMolad: dateFromJulianDay(nextMoladJd),
      previousMoladJd,
      nextMoladJd,
      monthLengthDays: TRADITIONAL_MONTH_DAYS
    };
  }

  function getPhase(ageDays) {
    const normalizedAge = ageDays >= 28 ? 0 : ageDays;
    return PHASES.find(phase => normalizedAge <= phase.max) || PHASES[PHASES.length - 1];
  }

  function getIllumination(ageDays) {
    const angle = 2 * Math.PI * (ageDays / TRADITIONAL_MONTH_DAYS);
    return (1 - Math.cos(angle)) / 2;
  }

  function getHebrewDateLabel(date, locale) {
    const options = {
      calendar: 'hebrew',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };

    try {
      return new Intl.DateTimeFormat(locale || 'es-ES-u-ca-hebrew', options).format(date);
    } catch (error) {
      try {
        return new Intl.DateTimeFormat('en-u-ca-hebrew', options).format(date);
      } catch (fallbackError) {
        return 'Calendario hebreo no disponible';
      }
    }
  }

  function getSunEclipticLongitude(julianDay) {
    const t = (julianDay - 2451545.0) / 36525;
    const meanLongitude = normalizeDegrees(280.46646 + 36000.76983 * t + 0.0003032 * t * t);
    const meanAnomaly = normalizeDegrees(357.52911 + 35999.05029 * t - 0.0001537 * t * t);
    const anomalyRad = degToRad(meanAnomaly);
    const center =
      (1.914602 - 0.004817 * t - 0.000014 * t * t) * Math.sin(anomalyRad) +
      (0.019993 - 0.000101 * t) * Math.sin(2 * anomalyRad) +
      0.000289 * Math.sin(3 * anomalyRad);
    return normalizeDegrees(meanLongitude + center);
  }

  function getMeanObliquity(julianDay) {
    const t = (julianDay - 2451545.0) / 36525;
    return 23.439291 - 0.0130042 * t;
  }

  function eclipticToEquatorial(lambdaDegrees, betaDegrees, julianDay) {
    const lambda = degToRad(lambdaDegrees);
    const beta = degToRad(betaDegrees || 0);
    const epsilon = degToRad(getMeanObliquity(julianDay));
    const sinAlpha = Math.sin(lambda) * Math.cos(epsilon) - Math.tan(beta) * Math.sin(epsilon);
    const cosAlpha = Math.cos(lambda);
    const alpha = Math.atan2(sinAlpha, cosAlpha);
    const delta = Math.asin(Math.sin(beta) * Math.cos(epsilon) + Math.cos(beta) * Math.sin(epsilon) * Math.sin(lambda));

    return {
      rightAscension: normalizeDegrees(radToDeg(alpha)),
      declination: radToDeg(delta)
    };
  }

  function getApproxMoonEquatorial(julianDay, ageDays) {
    const daysSinceJ2000 = julianDay - 2451545.0;
    const sunLongitude = getSunEclipticLongitude(julianDay);
    const elongation = 360 * (ageDays / TRADITIONAL_MONTH_DAYS);
    const meanNode = normalizeDegrees(125.04452 - 0.0529538083 * daysSinceJ2000);
    const moonLongitude = normalizeDegrees(sunLongitude + elongation);
    const moonLatitude = 5.145 * Math.sin(degToRad(moonLongitude - meanNode));

    return eclipticToEquatorial(moonLongitude, moonLatitude, julianDay);
  }

  function getLocalSiderealTime(julianDay, longitude) {
    const t = (julianDay - 2451545.0) / 36525;
    const gmst = 280.46061837 + 360.98564736629 * (julianDay - 2451545.0) + 0.000387933 * t * t - (t * t * t) / 38710000;
    return normalizeDegrees(gmst + longitude);
  }

  function getHorizontalCoordinates(date, latitude, longitude, ageDays) {
    const julianDay = julianDayFromDate(date);
    const moon = getApproxMoonEquatorial(julianDay, ageDays);
    const localSiderealTime = getLocalSiderealTime(julianDay, longitude);
    const hourAngle = degToRad(normalizeDegrees(localSiderealTime - moon.rightAscension));
    const latRad = degToRad(latitude);
    const decRad = degToRad(moon.declination);

    const altitude = Math.asin(
      Math.sin(latRad) * Math.sin(decRad) +
      Math.cos(latRad) * Math.cos(decRad) * Math.cos(hourAngle)
    );

    const azimuth = Math.atan2(
      Math.sin(hourAngle),
      Math.cos(hourAngle) * Math.sin(latRad) - Math.tan(decRad) * Math.cos(latRad)
    );

    return {
      altitude: radToDeg(altitude),
      azimuth: normalizeDegrees(radToDeg(azimuth) + 180),
      rightAscension: moon.rightAscension,
      declination: moon.declination
    };
  }

  function getCompassPoint(azimuth) {
    const index = Math.round(normalizeDegrees(azimuth) / 22.5) % COMPASS_POINTS.length;
    return COMPASS_POINTS[index];
  }

  function getAltitudeBand(altitude) {
    if (altitude < -6) return { key: 'below', label: 'bajo el horizonte' };
    if (altitude < 0) return { key: 'nearHorizon', label: 'rozando el horizonte' };
    if (altitude < 10) return { key: 'veryLow', label: 'muy baja' };
    if (altitude < 30) return { key: 'low', label: 'baja' };
    if (altitude < 60) return { key: 'medium', label: 'media' };
    return { key: 'high', label: 'alta' };
  }

  function calculateMoonResult(options) {
    const date = options && options.date ? new Date(options.date) : new Date();
    const latitude = Number(options && options.latitude);
    const longitude = Number(options && options.longitude);

    if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
      throw new Error('Latitud y longitud deben ser números finitos.');
    }

    const molad = getTraditionalMolad(date);
    const phase = getPhase(molad.ageDays);
    const illumination = getIllumination(molad.ageDays);
    const horizontal = getHorizontalCoordinates(date, latitude, longitude, molad.ageDays);
    const altitudeBand = getAltitudeBand(horizontal.altitude);

    return {
      date,
      latitude,
      longitude,
      hebrewDate: getHebrewDateLabel(date, options && options.locale),
      ageDays: molad.ageDays,
      monthLengthDays: molad.monthLengthDays,
      previousMolad: molad.previousMolad,
      nextMolad: molad.nextMolad,
      phaseKey: phase.key,
      phaseName: phase.name,
      phaseSummary: phase.summary,
      illumination,
      illuminationPercent: illumination * 100,
      azimuth: horizontal.azimuth,
      altitude: horizontal.altitude,
      compassPoint: getCompassPoint(horizontal.azimuth),
      altitudeKey: altitudeBand.key,
      altitudeLabel: altitudeBand.label,
      approximate: true
    };
  }

  return {
    PARTS_PER_HOUR,
    TRADITIONAL_MONTH_DAYS,
    MOLAD_TOHU_JD,
    JERUSALEM_MEAN_OFFSET_MINUTES,
    calculateMoonResult,
    dateFromJulianDay,
    degToRad,
    getCompassPoint,
    getHebrewDateLabel,
    getIllumination,
    getPhase,
    getAltitudeBand,
    getTraditionalMolad,
    julianCalendarToJulianDay,
    julianDayFromDate,
    normalizeDegrees,
    radToDeg
  };
});
