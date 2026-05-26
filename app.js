const sections = Array.from(document.querySelectorAll('.section'));
const tabs = Array.from(document.querySelectorAll('.tab'));
const menuButtons = Array.from(document.querySelectorAll('.menu-btn'));
const marqueeText = document.getElementById('marqueeText');

function showSection(id) {
  sections.forEach(section => {
    section.hidden = section.id !== id;
  });
  tabs.forEach(tab => {
    tab.classList.toggle('active', tab.dataset.target === id);
  });
}

tabs.forEach(tab => {
  tab.addEventListener('click', () => showSection(tab.dataset.target));
});

menuButtons.forEach(button => {
  button.addEventListener('click', () => showSection(button.dataset.target));
});

const letters = [
  { symbol: 'א', name: 'Álef', sound: 'Silencio suave / a', audio: '' },
  { symbol: 'ב', name: 'Bet', sound: 'b / v', audio: '' },
  { symbol: 'ג', name: 'Guímel', sound: 'g', audio: '' },
  { symbol: 'ד', name: 'Dálet', sound: 'd', audio: '' },
  { symbol: 'ה', name: 'He', sound: 'h suave', audio: '' },
  { symbol: 'ו', name: 'Vav', sound: 'v / o / u', audio: '' },
  { symbol: 'ז', name: 'Záyin', sound: 'z', audio: '' },
  { symbol: 'ח', name: 'Jet', sound: 'j fuerte (garganta)', audio: '' },
  { symbol: 'ט', name: 'Tet', sound: 't', audio: '' },
  { symbol: 'י', name: 'Yod', sound: 'y / i', audio: '' },
  { symbol: 'כ', name: 'Kaf', sound: 'k / j suave', audio: '' },
  { symbol: 'ל', name: 'Lámed', sound: 'l', audio: '' },
  { symbol: 'מ', name: 'Mem', sound: 'm', audio: '' },
  { symbol: 'נ', name: 'Nun', sound: 'n', audio: '' },
  { symbol: 'ס', name: 'Samej', sound: 's', audio: '' },
  { symbol: 'ע', name: 'Ayin', sound: 'sonido gutural', audio: '' },
  { symbol: 'פ', name: 'Pe', sound: 'p / f', audio: '' },
  { symbol: 'צ', name: 'Tsadi', sound: 'ts', audio: '' },
  { symbol: 'ק', name: 'Kuf', sound: 'k fuerte', audio: '' },
  { symbol: 'ר', name: 'Resh', sound: 'r', audio: '' },
  { symbol: 'ש', name: 'Shin / Sin', sound: 'sh / s', audio: '' },
  { symbol: 'ת', name: 'Tav', sound: 't', audio: '' }
];

const vowels = [
  { name: 'Pataj', symbol: 'ַ', sound: 'a corta' },
  { name: 'Kamatz', symbol: 'ָ', sound: 'a larga' },
  { name: 'Tseré', symbol: 'ֵ', sound: 'e' },
  { name: 'Segol', symbol: 'ֶ', sound: 'e abierta' },
  { name: 'Hirik', symbol: 'ִ', sound: 'i' },
  { name: 'Holam', symbol: 'ֹ', sound: 'o' }
];

const lettersGrid = document.getElementById('lettersGrid');
const bigLetter = document.getElementById('bigLetter');
const letterName = document.getElementById('letterName');
const letterSound = document.getElementById('letterSound');
const letterAudioPlay = document.getElementById('letterAudioPlay');
const letterAudio = new Audio();

let currentLetter = letters[0];
let currentVowel = null;
let activeLetterButton = null;

function hydrateLetterAudioFromHtml() {
  const nodes = document.querySelectorAll('#letterAudioMap audio[data-letter]');
  nodes.forEach(node => {
    const symbol = node.dataset.letter;
    const source = node.querySelector('source');
    const src = node.getAttribute('src') || node.dataset.src || (source ? source.getAttribute('src') : '');
    if (!src) return;
    const match = letters.find(letter => letter.symbol === symbol);
    if (match) {
      match.audio = src;
    }
  });
}

function renderLetter() {
  const vowelSymbol = currentVowel ? currentVowel.symbol : '';
  bigLetter.textContent = `${currentLetter.symbol}${vowelSymbol}`;
  letterName.textContent = currentLetter.name;
  letterSound.textContent = currentLetter.sound;
  letterAudioPlay.disabled = !currentLetter.audio;
}

letters.forEach(letter => {
  const btn = document.createElement('button');
  btn.className = 'letter-btn';
  btn.type = 'button';
  btn.textContent = letter.symbol;
  btn.addEventListener('click', () => {
    if (activeLetterButton) {
      activeLetterButton.classList.remove('active');
    }
    activeLetterButton = btn;
    activeLetterButton.classList.add('active');
    currentLetter = letter;
    renderLetter();
  });
  if (letter === currentLetter) {
    activeLetterButton = btn;
    activeLetterButton.classList.add('active');
  }
  lettersGrid.appendChild(btn);
});

const vowelsWrap = document.getElementById('vowels');
const vowelInfo = document.getElementById('vowelInfo');

vowels.forEach(vowel => {
  const btn = document.createElement('button');
  btn.className = 'vowel-btn';
  btn.type = 'button';
  btn.innerHTML = `<span>${vowel.name}</span><span class="vowel-symbol">${vowel.symbol}</span>`;
  btn.addEventListener('click', () => {
    currentVowel = vowel;
    vowelInfo.textContent = `${vowel.name}: sonido ${vowel.sound}`;
    renderLetter();
  });
  vowelsWrap.appendChild(btn);
});

letterAudioPlay.addEventListener('click', () => {
  if (!currentLetter.audio) return;
  letterAudio.src = currentLetter.audio;
  letterAudio.currentTime = 0;
  letterAudio.play().catch(() => {});
});

const easyExercises = letters.map(letter => ({
  title: `${letter.name} — ${letter.sound}`,
  text: letter.symbol,
  audio: '',
  audioSlow: ''
}));

const mediumWords = [
  'בָּיִת',
  'סֵפֶר',
  'יֶלֶד',
  'יַלְדָּה',
  'מִשְׁפָּחָה',
  'מַיִם',
  'לֶחֶם',
  'תַּפּוּחַ',
  'מְלַמֵּד',
  'תַּלְמִיד',
  'חָבֵר',
  'תּוֹרָה',
  'שָׁלוֹם',
  'בּוֹקֶר',
  'לַיְלָה',
  'חַלּוֹן',
  'דֶּלֶת',
  'שֻׁלְחָן',
  'כִּסֵּא',
  'שָׁמַיִם',
  'אֶרֶץ',
  'כּוֹכָב',
  'דָּג',
  'כֶּלֶב',
  'חָתוּל',
  'תַּפּוּז',
  'מַפָּה',
  'מוֹרֶה',
  'תַּלְמִידָה',
  'עֵץ'
];

const mediumExercises = mediumWords.map((word, index) => ({
  title: `Palabra ${index + 1}`,
  text: word,
  audio: '',
  audioSlow: ''
}));

const easyPhraseNouns = [
  'סֵפֶר',
  'כּוֹכָב',
  'יֶלֶד',
  'בַּיִת',
  'תַּפּוּחַ',
  'לֶחֶם',
  'כִּסֵּא',
  'כֶּלֶב',
  'שֻׁלְחָן',
  'דָּג'
];

const easyPhraseAdjs = [
  'טוֹב',
  'גָּדוֹל',
  'קָטָן',
  'חָדָשׁ',
  'יָפֶה',
  'מָתוֹק',
  'חָם',
  'קַר',
  'חָזָק',
  'אָדוֹם'
];

const easyPhrases = [];

for (const noun of easyPhraseNouns) {
  for (const adj of easyPhraseAdjs) {
    easyPhrases.push(`זֶה ${noun} ${adj}`);
  }
}

const easyPhraseItems = easyPhrases.slice(0, 30).map((text, index) => ({
  title: `Frase fácil ${index + 1}`,
  text,
  audio: '',
  audioSlow: ''
}));

const longPhraseSubjects = [
  'אֲנִי',
  'אֲנַחְנוּ',
  'הַמּוֹרֶה',
  'הַתַּלְמִידָה',
  'הַחָבֵר',
  'הַמִּשְׁפָּחָה'
];

const longPhraseVerbs = [
  'לוֹמֵד',
  'קוֹרֵא',
  'כּוֹתֵב',
  'מְדַבֵּר',
  'מַקְשִׁיב',
  'מִתְאַמֵּן'
];

const longPhraseObjects = [
  'עִבְרִית בְּכָל יוֹם',
  'בַּבַּיִת בְּשֶׁקֶט',
  'סֵפֶר קָצָר וּבָרוּר',
  'שִׁיר יָפֶה וְרַגּוּעַ',
  'מִלִּים חֲדָשׁוֹת בְּקַלּוּת',
  'שֵׁם וּמִשְׁפָּחָה בְּהֲבָנָה'
];

const longPhraseAdds = [
  'כְּדֵי לְהִשְׁתַּפֵּר',
  'עִם חָבֵר טוֹב',
  'בְּבֹקֶר טוֹב',
  'בְּעֶרֶב שָׁקֵט',
  'בְּסַבְלָנוּת גְּדוֹלָה',
  'בְּכָל שָׁבוּעַ'
];

const longPhraseItems = Array.from({ length: 30 }, (_, index) => {
  const subject = longPhraseSubjects[index % longPhraseSubjects.length];
  const verb = longPhraseVerbs[index % longPhraseVerbs.length];
  const object = longPhraseObjects[index % longPhraseObjects.length];
  const add = longPhraseAdds[index % longPhraseAdds.length];
  return {
    title: `Frase larga ${index + 1}`,
    text: `${subject} ${verb} ${object} ${add}`,
    audio: '',
    audioSlow: ''
  };
});

const multiLineLine1 = [
  'בַּבֹּקֶר הַיּוֹם',
  'עַכְשָׁו אֲנִי לוֹמֵד',
  'בַּבַּיִת שֶׁלִּי',
  'בְּכִתָּה הַקְּטַנָּה',
  'בַּדֶּרֶךְ לַבַּיִת',
  'לְיַד הַשֻּׁלְחָן',
  'בְּסוֹף הַיּוֹם',
  'בְּתוֹךְ הַסֵּפֶר',
  'עַל הַלּוּחַ',
  'מִחוּץ לַדֶּלֶת'
];

const multiLineLine2 = [
  'אֲנִי קוֹרֵא מִלִּים חֲדָשׁוֹת',
  'הַמּוֹרֶה מַסְבִּיר בִּסְבָלָנוּת',
  'אֲנַחְנוּ מַקְשִׁיבִים לַשִּׁיעוּר',
  'הַתַּלְמִידִים כּוֹתְבִים בְּמַחְבֶּרֶת',
  'הַחָבֵר שֶׁלִּי שׁוֹאֵל שְׁאֵלוֹת',
  'אֲנִי מְתַרְגֵּל בְּקֶצֶב אִטִּי',
  'אֲנַחְנוּ חוֹזְרִים עַל הָאוֹתִיּוֹת',
  'הַמִּלִּים נִרְאוֹת בְּרוּרוֹת יוֹתֵר',
  'אֲנִי מַרְגִּישׁ בִּטָּחוֹן',
  'הַשִּׁיר נִשְׁמַע נָעִים'
];

const multiLineLine3 = [
  'וְאַחַר כָּךְ אֲנִי מִתְרַגֵּל',
  'כְּדֵי לְהִשְׁתַּפֵּר בִּקְרִיאָה',
  'וְזֶה עוֹזֵר לִי מְאֹד',
  'וְאֲנִי מַמְשִׁיךְ לְלַמֵּד',
  'וּבַסּוֹף אֲנִי מְסַכֵּם',
  'וְכָךְ הַשִּׁיעוּר נֶעֱשֶׂה קַל',
  'וְזֶה מְחַזֵּק אֶת הַזִּכָּרוֹן',
  'וְאֲנִי שָׂמֵחַ לִלְמוֹד',
  'וְאֲנַחְנוּ מִתְקַדְּמִים לְאַט',
  'וְהַיּוֹם מֻצְלָח'
];

const multiLineItems = Array.from({ length: 30 }, (_, index) => {
  const line1 = multiLineLine1[index % multiLineLine1.length];
  const line2 = multiLineLine2[index % multiLineLine2.length];
  const line3 = multiLineLine3[index % multiLineLine3.length];
  const text = index % 3 === 0 ? `${line1}\n${line2}\n${line3}` : `${line1}\n${line2}`;
  return {
    title: `Frase multilínea ${index + 1}`,
    text,
    audio: '',
    audioSlow: ''
  };
});

const difficultExercises = easyPhraseItems.concat(longPhraseItems, multiLineItems);

const readingData = {
  ejercicios: {
    facil: easyExercises,
    medio: mediumExercises,
    dificil: difficultExercises
  }
};

const exerciseList = document.getElementById('exerciseList');
const difficultyButtons = Array.from(document.querySelectorAll('.difficulty-btn'));
const exerciseAudio = new Audio();

const currentLevels = {
  ejercicios: 'facil'
};

function playItemAudio(item, slow) {
  const src = slow && item.audioSlow ? item.audioSlow : item.audio;
  if (!src) return;
  exerciseAudio.src = src;
  exerciseAudio.playbackRate = slow && !item.audioSlow ? 0.5 : 1;
  exerciseAudio.currentTime = 0;
  exerciseAudio.play().catch(() => {});
}

function renderList(items, container) {
  container.innerHTML = '';
  items.forEach(item => {
    const card = document.createElement('div');
    card.className = 'exercise-item';

    const title = document.createElement('div');
    title.className = 'exercise-title';
    title.textContent = item.title;

    const text = document.createElement('div');
    text.className = 'exercise-text';
    text.textContent = item.text;

    const actions = document.createElement('div');
    actions.className = 'exercise-actions';

    const playBtn = document.createElement('button');
    playBtn.className = 'play-btn';
    playBtn.textContent = 'Pronunciar';
    playBtn.disabled = !item.audio;
    playBtn.addEventListener('click', () => playItemAudio(item, false));

    const slowBtn = document.createElement('button');
    slowBtn.className = 'play-btn';
    slowBtn.textContent = 'Lento x0.5';
    slowBtn.disabled = !item.audio && !item.audioSlow;
    slowBtn.addEventListener('click', () => playItemAudio(item, true));

    actions.appendChild(playBtn);
    actions.appendChild(slowBtn);

    card.appendChild(title);
    card.appendChild(text);
    card.appendChild(actions);

    container.appendChild(card);
  });
}

function updateDifficultyActive(group) {
  difficultyButtons
    .filter(btn => btn.dataset.group === group)
    .forEach(btn => {
      btn.classList.toggle('active', btn.dataset.level === currentLevels[group]);
    });
}

function renderGroup(group) {
  const list = readingData[group][currentLevels[group]];
  renderList(list, exerciseList);
}

difficultyButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const group = btn.dataset.group;
    const level = btn.dataset.level;
    if (!group || !level) return;
    currentLevels[group] = level;
    updateDifficultyActive(group);
    renderGroup(group);
  });
});

const psalms = Array.from({ length: 150 }, (_, index) => ({
  number: index + 1,
  image: '',
  audio: ''
}));

const psalmsGrid = document.getElementById('psalmsGrid');
const psalmsOverlay = document.getElementById('psalmsOverlay');
const psalmAudio = new Audio();
let expandedPsalmCard = null;

function collapsePsalm() {
  if (expandedPsalmCard) {
    expandedPsalmCard.classList.remove('expanded');
    expandedPsalmCard = null;
  }
  psalmsOverlay.hidden = true;
}

function expandPsalm(card) {
  if (expandedPsalmCard && expandedPsalmCard !== card) {
    expandedPsalmCard.classList.remove('expanded');
  }
  expandedPsalmCard = card;
  card.classList.add('expanded');
  psalmsOverlay.hidden = false;
}

psalmsOverlay.addEventListener('click', collapsePsalm);

function renderPsalms() {
  psalmsGrid.innerHTML = '';
  psalms.forEach(psalm => {
    const card = document.createElement('div');
    card.className = 'psalm-card';

    const number = document.createElement('div');
    number.className = 'psalm-number';
    number.textContent = `Salmo ${psalm.number}`;

    const imageWrap = document.createElement('div');
    imageWrap.className = 'psalm-image';

    if (psalm.image) {
      const img = document.createElement('img');
      img.src = psalm.image;
      img.alt = `Salmo ${psalm.number} en hebreo`;
      imageWrap.appendChild(img);
    } else {
      const placeholder = document.createElement('div');
      placeholder.textContent = 'Imagen aquí';
      imageWrap.appendChild(placeholder);
    }

    const playBtn = document.createElement('button');
    playBtn.className = 'psalm-play';
    playBtn.textContent = 'Reproducir audio';
    playBtn.disabled = !psalm.audio;
    playBtn.addEventListener('click', event => {
      event.stopPropagation();
      if (!psalm.audio) return;
      psalmAudio.src = psalm.audio;
      psalmAudio.currentTime = 0;
      psalmAudio.play().catch(() => {});
    });

    card.addEventListener('click', () => {
      if (expandedPsalmCard === card) return;
      expandPsalm(card);
    });

    card.appendChild(number);
    card.appendChild(imageWrap);
    card.appendChild(playBtn);

    psalmsGrid.appendChild(card);
  });
  collapsePsalm();
}

const candleIcon = '(|)';

const tehilimSchedule = [
  { start: '1', end: '9' },
  { start: '10', end: '17' },
  { start: '18', end: '22' },
  { start: '23', end: '28' },
  { start: '29', end: '34' },
  { start: '35', end: '38' },
  { start: '39', end: '43' },
  { start: '44', end: '48' },
  { start: '49', end: '54' },
  { start: '55', end: '59' },
  { start: '60', end: '65' },
  { start: '66', end: '68' },
  { start: '69', end: '71' },
  { start: '72', end: '76' },
  { start: '77', end: '78' },
  { start: '79', end: '82' },
  { start: '83', end: '87' },
  { start: '88', end: '89' },
  { start: '90', end: '96' },
  { start: '97', end: '103' },
  { start: '104', end: '105' },
  { start: '106', end: '107' },
  { start: '108', end: '112' },
  { start: '113', end: '118' },
  { start: '119:1', end: '119:96' },
  { start: '119:97', end: '119:176' },
  { start: '120', end: '134' },
  { start: '135', end: '139' },
  { start: '140', end: '144' },
  { start: '145', end: '150' }
];

function getHebrewDayOfMonth(date, tzid) {
  try {
    const formatter = new Intl.DateTimeFormat('en-u-ca-hebrew', {
      timeZone: tzid || 'UTC',
      day: 'numeric',
      month: 'numeric',
      year: 'numeric'
    });
    const parts = formatter.formatToParts(date);
    const dayPart = parts.find(part => part.type === 'day');
    return dayPart ? Number(dayPart.value) : null;
  } catch (error) {
    return null;
  }
}

function isLastHebrewDayOfMonth(date, tzid) {
  const day = getHebrewDayOfMonth(date, tzid);
  if (!day) return false;
  const nextDate = new Date(date.getTime() + 36 * 60 * 60 * 1000);
  const nextDay = getHebrewDayOfMonth(nextDate, tzid);
  return nextDay === 1;
}

function getTehilimRange(day, combineLast) {
  if (!day || day < 1 || day > 30) return null;
  if (day === 29 && combineLast) {
    return { start: '140', end: '150' };
  }
  return tehilimSchedule[day - 1] || null;
}

function formatDateKey(date, tzid) {
  const formatter = new Intl.DateTimeFormat('en-CA', {
    timeZone: tzid || 'UTC',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
  return formatter.format(date);
}

function formatTime(date, tzid) {
  return new Intl.DateTimeFormat('es-ES', {
    timeZone: tzid || 'UTC',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  }).format(date);
}

function pickNextEvent(items, now) {
  const normalized = items
    .map(item => ({ item, time: new Date(item.date).getTime() }))
    .filter(entry => !Number.isNaN(entry.time))
    .sort((a, b) => a.time - b.time);
  const upcoming = normalized.find(entry => entry.time >= now.getTime());
  return (upcoming || normalized[0] || {}).item || null;
}

async function getLocationFromIp() {
  const response = await fetch('https://api.ip.sb/geoip');
  if (!response.ok) {
    throw new Error('No se pudo obtener ubicación por IP');
  }
  const data = await response.json();
  if (!data || !data.latitude || !data.longitude) {
    throw new Error('IP sin ubicación');
  }
  return {
    latitude: data.latitude,
    longitude: data.longitude,
    tzid: data.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone
  };
}

async function getLocation() {
  try {
    return await getLocationFromIp();
  } catch (error) {
    if (!('geolocation' in navigator)) {
      throw error;
    }
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        position => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            tzid: Intl.DateTimeFormat().resolvedOptions().timeZone
          });
        },
        err => reject(err),
        { timeout: 5000 }
      );
    });
  }
}

async function fetchHebcalCalendar(location) {
  const now = new Date();
  const endDate = new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000);
  const start = formatDateKey(now, location.tzid);
  const end = formatDateKey(endDate, location.tzid);
  const params = new URLSearchParams({
    v: '1',
    cfg: 'json',
    start,
    end,
    s: 'on',
    c: 'on',
    b: '18',
    M: 'on',
    latitude: String(location.latitude),
    longitude: String(location.longitude),
    tzid: location.tzid
  });
  const url = `https://www.hebcal.com/hebcal?${params.toString()}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Hebcal error');
  }
  return response.json();
}

function updateMarquee(data, tzid) {
  if (!marqueeText) return;
  const items = Array.isArray(data.items) ? data.items : [];
  const now = new Date();

  const parshaItem = items.find(item => item.category === 'parashat');
  const parsha = parshaItem ? parshaItem.title : '—';

  const hebrewDay = getHebrewDayOfMonth(now, tzid);
  const combineLast = hebrewDay === 29 && isLastHebrewDayOfMonth(now, tzid);
  const tehilimRange = getTehilimRange(hebrewDay, combineLast);
  const tehilim = tehilimRange ? `${tehilimRange.start} -- ${tehilimRange.end}` : '—';

  const candleItem = pickNextEvent(items.filter(item => item.category === 'candles'), now);
  const havdalahItem = pickNextEvent(items.filter(item => item.category === 'havdalah'), now);

  const candleTime = candleItem ? formatTime(new Date(candleItem.date), tzid) : '--:--';
  const havdalahTime = havdalahItem ? formatTime(new Date(havdalahItem.date), tzid) : '--:--';

  marqueeText.textContent = `✡︎ Bienvenido • ${parsha} • Tehilim: ${tehilim} • Velas Shabat: ${candleIcon} ${candleTime} / ${havdalahTime} ${candleIcon} ✡︎`;
}

async function initMarquee() {
  if (!marqueeText) return;
  try {
    const location = await getLocation();
    const data = await fetchHebcalCalendar(location);
    const tzid = (data.location && data.location.tzid) || location.tzid;
    updateMarquee(data, tzid);
  } catch (error) {
    marqueeText.textContent = 'Bienvenido • Calendario no disponible';
  }
}

hydrateLetterAudioFromHtml();
updateDifficultyActive('ejercicios');
renderGroup('ejercicios');
renderPsalms();
renderLetter();
showSection('inicio');
initMarquee();








