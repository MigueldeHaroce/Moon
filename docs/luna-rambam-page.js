(function () {
  'use strict';

  const core = window.LunaRambamCore;
  const STORAGE_KEY = 'luna-rambam-language';
  const TRANSLATIONS = {
    es: {
      lang: 'es',
      locale: 'es-ES',
      hebrewLocale: 'es-ES-u-ca-hebrew',
      title: 'Calculos en la luna',
      languageButton: 'English',
      languageAria: 'Cambiar idioma a inglés',
      'nav.refresh': 'Actualizar',
      'nav.back': 'Volver',
      'status.preparing': 'Preparando cálculo lunar...',
      'status.requesting': 'Solicitando permiso de geolocalización del navegador...',
      'status.locationUnavailable': 'No se pudo obtener la ubicación. Puedes introducir coordenadas manualmente.',
      'status.geolocationUnsupported': 'Este navegador no ofrece geolocalización. Introduce coordenadas para calcular.',
      'status.permissionDenied': 'Permiso de ubicación rechazado. Introduce coordenadas para calcular.',
      'status.locationReadError': 'No se pudo leer la ubicación. Introduce coordenadas para calcular.',
      'status.invalidCoords': 'Coordenadas no válidas. Usa latitud entre -90 y 90, longitud entre -180 y 180.',
      'status.browserLocation': 'Ubicación obtenida • cálculo actualizado: {time}',
      'status.manualLocation': 'Coordenadas manuales • cálculo actualizado: {time}',
      'hero.title': 'Calculos en la luna',
      'canvas.moon': 'Representación visual aproximada de la fase lunar',
      'canvas.compass': 'Brújula con la dirección aproximada hacia la Luna',
      'fallback.title': 'Ubicación no disponible',
      'fallback.copy': 'Si rechazaste el permiso o el navegador no pudo leer tu ubicación, introduce coordenadas para calcular el resultado.',
      'fallback.latitude': 'Latitud',
      'fallback.longitude': 'Longitud',
      'fallback.calculate': 'Calcular',
      'fallback.retry': 'Pedir ubicación otra vez',
      'readout.time': 'Fecha judía',
      'readout.location': 'Ubicación',
      'readout.hebrewDate': 'Fecha civil',
      'readout.phase': 'Fase lunar',
      'readout.illumination': 'Iluminación',
      'readout.moon': 'Luna',
      'readout.compass': 'Brújula',
      'readout.altitude': 'Inclinación',
      'readout.molad': 'Molad tradicional',
      'sky.title': 'Hacia dónde mirar',
      'sky.waiting': 'Esperando ubicación para calcular la dirección local.',
      'phase.new': 'Luna nueva tradicional',
      'phase.waxingCrescent': 'Creciente fina',
      'phase.firstQuarter': 'Cuarto creciente',
      'phase.waxingGibbous': 'Gibosa creciente',
      'phase.full': 'Luna llena aproximada',
      'phase.waningGibbous': 'Gibosa menguante',
      'phase.lastQuarter': 'Cuarto menguante',
      'phase.waningCrescent': 'Menguante fina',
      'altitude.below': 'bajo el horizonte',
      'altitude.nearHorizon': 'rozando el horizonte',
      'altitude.veryLow': 'muy baja',
      'altitude.low': 'baja',
      'altitude.medium': 'media',
      'altitude.high': 'alta',
      'altitude.overHorizon': '{band} sobre el horizonte',
      'molad.text': '{age} días desde el molad anterior; próximo molad aprox. {molad}',
      'visibility.below': 'En este momento la Luna estimada está por debajo del horizonte local.',
      'visibility.visible': 'Mira hacia {direction}; la altura estimada es {altitude}.'
    },
    en: {
      lang: 'en',
      locale: 'en-US',
      hebrewLocale: 'en-u-ca-hebrew',
      title: 'Moon calculations',
      languageButton: 'Español',
      languageAria: 'Switch language to Spanish',
      'nav.refresh': 'Refresh',
      'nav.back': 'Back',
      'status.preparing': 'Preparing lunar calculation...',
      'status.requesting': 'Requesting browser geolocation permission...',
      'status.locationUnavailable': 'Location could not be obtained. You can enter coordinates manually.',
      'status.geolocationUnsupported': 'This browser does not offer geolocation. Enter coordinates to calculate.',
      'status.permissionDenied': 'Location permission was denied. Enter coordinates to calculate.',
      'status.locationReadError': 'Location could not be read. Enter coordinates to calculate.',
      'status.invalidCoords': 'Invalid coordinates. Use latitude between -90 and 90, longitude between -180 and 180.',
      'status.browserLocation': 'Location obtained • calculation updated: {time}',
      'status.manualLocation': 'Manual coordinates • calculation updated: {time}',
      'hero.title': 'Moon calculations',
      'canvas.moon': 'Approximate visual representation of the lunar phase',
      'canvas.compass': 'Compass with the approximate direction toward the Moon',
      'fallback.title': 'Location unavailable',
      'fallback.copy': 'If you denied permission or the browser could not read your location, enter coordinates to calculate the result.',
      'fallback.latitude': 'Latitude',
      'fallback.longitude': 'Longitude',
      'fallback.calculate': 'Calculate',
      'fallback.retry': 'Ask for location again',
      'readout.time': 'Jewish date',
      'readout.location': 'Location',
      'readout.hebrewDate': 'Civil date',
      'readout.phase': 'Lunar phase',
      'readout.illumination': 'Illumination',
      'readout.moon': 'Moon',
      'readout.compass': 'Compass',
      'readout.altitude': 'Altitude',
      'readout.molad': 'Traditional molad',
      'sky.title': 'Where to look',
      'sky.waiting': 'Waiting for location to calculate the local direction.',
      'phase.new': 'Traditional new moon',
      'phase.waxingCrescent': 'Waxing crescent',
      'phase.firstQuarter': 'First quarter',
      'phase.waxingGibbous': 'Waxing gibbous',
      'phase.full': 'Approximate full moon',
      'phase.waningGibbous': 'Waning gibbous',
      'phase.lastQuarter': 'Last quarter',
      'phase.waningCrescent': 'Waning crescent',
      'altitude.below': 'below the horizon',
      'altitude.nearHorizon': 'near the horizon',
      'altitude.veryLow': 'very low',
      'altitude.low': 'low',
      'altitude.medium': 'medium',
      'altitude.high': 'high',
      'altitude.overHorizon': '{band} above the horizon',
      'molad.text': '{age} days since the previous molad; next molad approx. {molad}',
      'visibility.below': 'At this moment the estimated Moon is below the local horizon.',
      'visibility.visible': 'Look toward {direction}; the estimated altitude is {altitude}.'
    }
  };

  const COMPASS_POINTS = {
    es: ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSO', 'SO', 'OSO', 'O', 'ONO', 'NO', 'NNO'],
    en: ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW']
  };

  function getStoredLanguage() {
    try {
      return window.localStorage.getItem(STORAGE_KEY);
    } catch (error) {
      return null;
    }
  }

  function storeLanguage(language) {
    try {
      window.localStorage.setItem(STORAGE_KEY, language);
    } catch (error) {
      return;
    }
  }

  const state = {
    coords: null,
    timer: null,
    language: getStoredLanguage() === 'en' ? 'en' : 'es',
    status: { key: 'status.preparing', values: {} }
  };

  const elements = {
    statusTicker: document.getElementById('statusTicker'),
    timeValue: document.getElementById('timeValue'),
    locationValue: document.getElementById('locationValue'),
    phaseValue: document.getElementById('phaseValue'),
    illuminationValue: document.getElementById('illuminationValue'),
    directionValue: document.getElementById('directionValue'),
    altitudeValue: document.getElementById('altitudeValue'),
    hebrewDateValue: document.getElementById('hebrewDateValue'),
    moladValue: document.getElementById('moladValue'),
    visibilityNote: document.getElementById('visibilityNote'),
    languageButton: document.getElementById('languageButton'),
    refreshButton: document.getElementById('refreshButton'),
    retryButton: document.getElementById('retryButton'),
    manualForm: document.getElementById('manualForm'),
    manualLatitude: document.getElementById('manualLatitude'),
    manualLongitude: document.getElementById('manualLongitude'),
    errorPanel: document.getElementById('errorPanel'),
    moonCanvas: document.getElementById('moonCanvas'),
    compassCanvas: document.getElementById('compassCanvas')
  };

  function getDictionary() {
    return TRANSLATIONS[state.language];
  }

  function t(key, values) {
    const dictionary = getDictionary();
    const template = dictionary[key] || TRANSLATIONS.es[key] || key;
    return Object.entries(values || {}).reduce((text, entry) => {
      return text.replaceAll(`{${entry[0]}}`, entry[1]);
    }, template);
  }

  function setStatusKey(key, values) {
    state.status = { key, values: values || {} };
    elements.statusTicker.textContent = t(key, values);
  }

  function updateCurrentStatus() {
    elements.statusTicker.textContent = t(state.status.key, state.status.values);
  }

  function applyLanguage() {
    const dictionary = getDictionary();
    document.documentElement.lang = dictionary.lang;
    document.title = dictionary.title;
    elements.languageButton.textContent = dictionary.languageButton;
    elements.languageButton.setAttribute('aria-label', dictionary.languageAria);

    document.querySelectorAll('[data-i18n]').forEach(element => {
      element.textContent = t(element.dataset.i18n);
    });
    document.querySelectorAll('[data-i18n-aria-label]').forEach(element => {
      element.setAttribute('aria-label', t(element.dataset.i18nAriaLabel));
    });
    updateCurrentStatus();
  }

  function formatNumber(value, decimals) {
    return new Intl.NumberFormat(getDictionary().locale, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    }).format(value);
  }

  function formatDateTime(date) {
    return new Intl.DateTimeFormat(getDictionary().locale, {
      dateStyle: 'medium',
      timeStyle: 'short'
    }).format(date);
  }

  function formatCivilDate(date) {
    return new Intl.DateTimeFormat(getDictionary().locale, {
      dateStyle: 'medium'
    }).format(date);
  }

  function formatMolad(date) {
    return new Intl.DateTimeFormat(getDictionary().locale, {
      weekday: 'short',
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  }

  function getLocalizedCompassPoint(azimuth) {
    const points = COMPASS_POINTS[state.language];
    const index = Math.round(core.normalizeDegrees(azimuth) / 22.5) % points.length;
    return points[index];
  }

  function getPhaseName(result) {
    return t(`phase.${result.phaseKey}`) || result.phaseName;
  }

  function getAltitudeBand(result) {
    return t(`altitude.${result.altitudeKey}`) || result.altitudeLabel;
  }

  function drawMoon(result) {
    const canvas = elements.moonCanvas;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const cx = width / 2;
    const cy = height / 2;
    const radius = Math.min(width, height) * 0.38;
    const phase = result.ageDays / result.monthLengthDays;
    const illumination = result.illumination;
    const waxing = phase <= 0.5;
    const litWidth = Math.max(1, radius * 2 * illumination);

    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = '#f4f4ff';
    ctx.fillRect(0, 0, width, height);
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 4;
    ctx.strokeRect(2, 2, width - 4, height - 4);

    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.clip();

    const shadowGradient = ctx.createRadialGradient(cx - 20, cy - 20, 20, cx, cy, radius);
    shadowGradient.addColorStop(0, '#3d4864');
    shadowGradient.addColorStop(1, '#080b12');
    ctx.fillStyle = shadowGradient;
    ctx.fillRect(cx - radius, cy - radius, radius * 2, radius * 2);

    const litGradient = ctx.createRadialGradient(cx - 28, cy - 32, 16, cx, cy, radius);
    litGradient.addColorStop(0, '#fffbe5');
    litGradient.addColorStop(0.75, '#d9d3a8');
    litGradient.addColorStop(1, '#8e896e');
    ctx.fillStyle = litGradient;
    if (illumination > 0.985) {
      ctx.fillRect(cx - radius, cy - radius, radius * 2, radius * 2);
    } else if (waxing) {
      ctx.fillRect(cx + radius - litWidth, cy - radius, litWidth, radius * 2);
    } else {
      ctx.fillRect(cx - radius, cy - radius, litWidth, radius * 2);
    }

    ctx.restore();
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.fillStyle = '#000';
    ctx.font = 'bold 18px "Times New Roman", serif';
    ctx.textAlign = 'center';
    ctx.fillText(`${formatNumber(result.illuminationPercent, 0)}%`, cx, height - 18);
  }

  function drawCompass(result) {
    const canvas = elements.compassCanvas;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const cx = width / 2;
    const cy = height / 2;
    const radius = Math.min(width, height) * 0.38;
    const azimuthRad = core.degToRad(result.azimuth);
    const arrowX = cx + Math.sin(azimuthRad) * radius * 0.82;
    const arrowY = cy - Math.cos(azimuthRad) * radius * 0.82;

    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, width, height);
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 4;
    ctx.strokeRect(2, 2, width - 4, height - 4);

    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.fillStyle = '#f4f4ff';
    ctx.fill();
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 3;
    ctx.stroke();

    const westLabel = state.language === 'en' ? 'W' : 'O';
    const labels = [
      ['N', 0],
      ['E', 90],
      ['S', 180],
      [westLabel, 270]
    ];

    ctx.font = 'bold 24px "Times New Roman", serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    labels.forEach(([label, degrees]) => {
      const rad = core.degToRad(degrees);
      ctx.fillStyle = degrees === 0 ? '#ff0000' : '#000';
      ctx.fillText(label, cx + Math.sin(rad) * (radius + 26), cy - Math.cos(rad) * (radius + 26));
    });

    for (let degrees = 0; degrees < 360; degrees += 22.5) {
      const rad = core.degToRad(degrees);
      const outer = radius;
      const inner = degrees % 90 === 0 ? radius - 16 : radius - 8;
      ctx.beginPath();
      ctx.moveTo(cx + Math.sin(rad) * inner, cy - Math.cos(rad) * inner);
      ctx.lineTo(cx + Math.sin(rad) * outer, cy - Math.cos(rad) * outer);
      ctx.strokeStyle = '#000';
      ctx.lineWidth = degrees % 90 === 0 ? 3 : 1;
      ctx.stroke();
    }

    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(arrowX, arrowY);
    ctx.strokeStyle = '#4e6db7';
    ctx.lineWidth = 8;
    ctx.lineCap = 'round';
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(arrowX, arrowY, 10, 0, Math.PI * 2);
    ctx.fillStyle = '#00ffff';
    ctx.fill();
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = '#000';
    ctx.font = 'bold 18px "Times New Roman", serif';
    ctx.textAlign = 'right';
    ctx.textBaseline = 'bottom';
    ctx.fillText(`${getLocalizedCompassPoint(result.azimuth)} ${formatNumber(result.azimuth, 0)}°`, width - 12, height - 10);
  }

  function renderResult(coords) {
    const now = new Date();
    const result = core.calculateMoonResult({
      date: now,
      latitude: coords.latitude,
      longitude: coords.longitude,
      locale: getDictionary().hebrewLocale
    });
    const phaseName = getPhaseName(result);
    const compassPoint = getLocalizedCompassPoint(result.azimuth);
    const altitudeBand = getAltitudeBand(result);
    const altitudeWord = result.altitude < 0 ? altitudeBand : t('altitude.overHorizon', { band: altitudeBand });
    const formattedTime = formatDateTime(now);

    elements.timeValue.textContent = result.hebrewDate;
    elements.locationValue.textContent = `${formatNumber(result.latitude, 4)}°, ${formatNumber(result.longitude, 4)}°`;
    elements.phaseValue.textContent = phaseName;
    elements.illuminationValue.textContent = `${formatNumber(result.illuminationPercent, 1)}%`;
    elements.directionValue.textContent = `${compassPoint} (${formatNumber(result.azimuth, 0)}°)`;
    elements.altitudeValue.textContent = `${formatNumber(result.altitude, 1)}°`;
    elements.hebrewDateValue.textContent = formatCivilDate(now);
    elements.moladValue.textContent = t('molad.text', {
      age: formatNumber(result.ageDays, 2),
      molad: formatMolad(result.nextMolad)
    });
    elements.visibilityNote.textContent = result.altitude < 0
      ? t('visibility.below')
      : t('visibility.visible', { direction: compassPoint, altitude: altitudeWord });
    drawMoon(result);
    drawCompass(result);
    setStatusKey(coords.source === 'manual' ? 'status.manualLocation' : 'status.browserLocation', {
      time: formattedTime
    });
  }

  function showManualFallback(statusKey) {
    elements.errorPanel.hidden = false;
    setStatusKey(statusKey || 'status.locationUnavailable');
  }

  function hideManualFallback() {
    elements.errorPanel.hidden = true;
  }

  function updateFromState() {
    if (!state.coords) return;
    renderResult(state.coords);
  }

  function startAutoRefresh() {
    window.clearInterval(state.timer);
    state.timer = window.setInterval(updateFromState, 60000);
  }

  function requestBrowserLocation() {
    hideManualFallback();
    setStatusKey('status.requesting');

    if (!('geolocation' in navigator)) {
      showManualFallback('status.geolocationUnsupported');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      position => {
        state.coords = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          source: 'browser'
        };
        renderResult(state.coords);
        startAutoRefresh();
      },
      error => {
        const denied = error && error.code === error.PERMISSION_DENIED;
        showManualFallback(denied
          ? 'status.permissionDenied'
          : 'status.locationReadError');
      },
      {
        enableHighAccuracy: false,
        timeout: 12000,
        maximumAge: 300000
      }
    );
  }

  elements.refreshButton.addEventListener('click', updateFromState);
  elements.languageButton.addEventListener('click', () => {
    state.language = state.language === 'es' ? 'en' : 'es';
    storeLanguage(state.language);
    applyLanguage();
    if (state.coords) {
      renderResult(state.coords);
    }
  });
  elements.retryButton.addEventListener('click', requestBrowserLocation);
  elements.manualForm.addEventListener('submit', event => {
    event.preventDefault();
    const latitude = Number(elements.manualLatitude.value);
    const longitude = Number(elements.manualLongitude.value);
    if (!Number.isFinite(latitude) || !Number.isFinite(longitude) || Math.abs(latitude) > 90 || Math.abs(longitude) > 180) {
      setStatusKey('status.invalidCoords');
      return;
    }
    hideManualFallback();
    state.coords = { latitude, longitude, source: 'manual' };
    renderResult(state.coords);
    startAutoRefresh();
  });

  applyLanguage();
  requestBrowserLocation();
})();
