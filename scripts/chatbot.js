/* Intelekta Skola — "Čatbotka" demo assistant.
 * A polished, on-brand FAQ chatbot: matches visitor questions to a curated
 * knowledge base (keyword scoring) and replies. Trilingual (LV/EN/RU via 'is_lang').
 * Fully client-side — no API key. A "show off" of practical AI for the business.
 */
(function () {
  var L = function () { var l = localStorage.getItem('is_lang') || 'lv'; return ['lv', 'en', 'ru'].indexOf(l) >= 0 ? l : 'lv'; };

  // ---- UI strings ----
  var UI = {
    lv: { name: 'Čatbotka', tag: 'Kurš atvieglos tavu dzīvi', invite: 'Iepazīsties ar Čatbotku',
      greet: 'Sveiks! Esmu Čatbotka — Intelekta Skolas asistents. Kā varu palīdzēt? Jautā par kursiem, cenām vai bezmaksas rīkiem.',
      ph: 'Uzdod jautājumu…', chips: ['Kādi ir kursi?', 'Cik maksā?', 'Kā pieteikties?', 'Bezmaksas rīki'] },
    en: { name: 'Čatbotka', tag: 'Who makes your life easier', invite: 'Meet Čatbotka',
      greet: 'Hi! I\'m Čatbotka — the Intelekta Skola assistant. How can I help? Ask about courses, pricing or free tools.',
      ph: 'Ask a question…', chips: ['What courses?', 'How much?', 'How to apply?', 'Free tools'] },
    ru: { name: 'Čatbotka', tag: 'Который облегчит вашу жизнь', invite: 'Познакомьтесь с Čatbotka',
      greet: 'Привет! Я Čatbotka — ассистент Intelekta Skola. Чем помочь? Спросите о курсах, ценах или бесплатных инструментах.',
      ph: 'Задайте вопрос…', chips: ['Какие курсы?', 'Сколько стоит?', 'Как записаться?', 'Бесплатные инструменты'] },
  };

  // ---- knowledge base ----
  var KB = [
    { kw: ['kas ir intelekta', 'ko darat', 'ko piedav', 'par jums', 'about you', 'what do you do', 'чем вы', 'что вы', 'что такое', 'кто вы', 'о вас', 'чем заним'],
      a: { lv: 'Intelekta Skola māca uzņēmumus un cilvēkus praktiski izmantot mākslīgo intelektu ikdienas darbā — ChatGPT, promptu inženierija, automatizācija un AI ieviešana. Mērķis: ietaupīt laiku un strādāt gudrāk.',
           en: 'Intelekta Skola teaches businesses and people to use AI practically in everyday work — ChatGPT, prompt engineering, automation and AI implementation. The goal: save time and work smarter.',
           ru: 'Intelekta Skola учит компании и людей практически применять ИИ в ежедневной работе — ChatGPT, промпт-инженерия, автоматизация и внедрение ИИ. Цель — экономить время и работать умнее.' } },
    { kw: ['kurs', 'programm', 'course', 'apmac', 'macib', 'курс', 'обуч', 'программ', 'занят', 'чему уч'],
      a: { lv: 'Mums ir 5 kursi: AI ieviešana, ChatGPT un LLM meistarība, AI automatizācija sociālajiem tīkliem, Individuālais AI kurss un Promptu inženierija. Visu vari apskatīt sadaļā “Programma”.',
           en: 'We have 5 courses: AI Implementation, ChatGPT & LLM Mastery, AI Automation for Social Media, the Individual AI Course, and Prompt Engineering. See them all on the “Program” page.',
           ru: 'У нас 5 курсов: внедрение ИИ, мастерство ChatGPT и LLM, автоматизация соцсетей, индивидуальный курс и промпт-инженерия. Все — в разделе «Программа».' } },
    { kw: ['cena', 'cik maks', 'maksa', 'price', 'cost', 'how much', 'цена', 'цены', 'сколько', 'стоит', 'стоимост'],
      a: { lv: 'Cena atkarīga no kursa un formāta. Vislabāk — piesakies bezmaksas konsultācijai, un sagatavosim tev piemērotu piedāvājumu. Spied “Pieteikties”.',
           en: 'Price depends on the course and format. Best is to book a free consultation and we\'ll prepare a tailored offer. Click “Enroll”.',
           ru: 'Цена зависит от курса и формата. Лучше записаться на бесплатную консультацию — подготовим подходящее предложение. Нажмите «Записаться».' } },
    { kw: ['pieteik', 'piesak', 'apply', 'sign up', 'enroll', 'запис', 'заявк', 'регистр', 'как начать', 'как попаст'],
      a: { lv: 'Vienkārši! Spied pogu “Pieteikties” lapas augšā vai raksti uz info@intelektaskola.lv — atbildam 24–48 stundu laikā.',
           en: 'Easy! Click the “Enroll” button at the top, or email info@intelektaskola.lv — we reply within 24–48 hours.',
           ru: 'Просто! Нажмите «Записаться» вверху или напишите на info@intelektaskola.lv — отвечаем в течение 24–48 часов.' } },
    { kw: ['riki', 'rīki', 'bezmaksas', 'tool', 'free', 'инструмент', 'бесплат'],
      a: { lv: 'Jā! Mums ir bezmaksas AI rīki: Promptu darbnīca, Laika kalkulators un Gatavības tests. Atrodi tos sadaļā “Bezmaksas rīki”.',
           en: 'Yes! We have free AI tools: the Prompt Workshop, Time Calculator and Readiness Test. Find them under “Free tools”.',
           ru: 'Да! Есть бесплатные ИИ-инструменты: мастерская промптов, калькулятор времени и тест готовности. Раздел «Бесплатные инструменты».' } },
    { kw: ['kontakt', 'epast', 'e-past', 'email', 'raksti', 'adrese', 'contact', 'контакт', 'связат', 'почт', 'адрес', 'написа', 'телефон'],
      a: { lv: 'Raksti uz info@intelektaskola.lv. Adrese: Akmeņu iela 21b, Rīga.',
           en: 'Email info@intelektaskola.lv. Address: Akmeņu iela 21b, Rīga.',
           ru: 'Пишите на info@intelektaskola.lv. Адрес: Akmeņu iela 21b, Rīga.' } },
    { kw: ['iesacej', 'no nulles', 'beginner', 'newbie', 'начина', 'новичок', 'с нуля', 'без опыт'],
      a: { lv: 'Noteikti! Programmas pielāgojam no nulles līdz pieredzējušiem — priekšzināšanas nav nepieciešamas.',
           en: 'Absolutely! Programs are tailored from zero to advanced — no prior knowledge needed.',
           ru: 'Конечно! Программы — от нуля до продвинутого уровня, предварительных знаний не нужно.' } },
    { kw: ['valod', 'language', 'kada valoda', 'язык', 'на каком', 'какой язык'],
      a: { lv: 'Apmācības galvenokārt notiek latviešu valodā, ar angļu terminoloģiju, kas ir standarts AI jomā.',
           en: 'Training is mainly in Latvian, with English terminology that is standard in the AI field.',
           ru: 'Обучение в основном на латышском, с английской терминологией — стандартом в сфере ИИ.' } },
    { kw: ['klatien', 'attalin', 'online', 'remote', 'очно', 'онлайн', 'удален', 'дистанц', 'format'],
      a: { lv: 'Piedāvājam gan klātienē (Rīgā un citur), gan attālināti — kā tev ērtāk.',
           en: 'We offer both in person (in Rīga and elsewhere) and remotely — whatever suits you.',
           ru: 'Предлагаем как очно (в Риге и не только), так и удалённо — как вам удобнее.' } },
    { kw: ['kas ir ai', 'kas ir maksligais', 'makslig', 'what is ai', 'что такое ии', 'что такое ai', 'искусствен', 'нейросет', 'artificial'],
      a: { lv: 'Mākslīgais intelekts (AI) ir tehnoloģija, kas palīdz automatizēt domāšanas darbu — rakstīt, apkopot, plānot un analizēt. Mēs mācām to izmantot praktiski tavā darbā.',
           en: 'Artificial intelligence (AI) is technology that automates knowledge work — writing, summarizing, planning and analyzing. We teach you to use it practically at work.',
           ru: 'Искусственный интеллект (ИИ) — технология, автоматизирующая умственную работу: писать, обобщать, планировать, анализировать. Мы учим применять это на практике.' } },
    { kw: ['paldies', 'thanks', 'thank you', 'спасибо', 'благодар'],
      a: { lv: 'Prieks palīdzēt! Ja ir vēl jautājumi — droši jautā vai raksti info@intelektaskola.lv.',
           en: 'Happy to help! Any more questions — just ask, or email info@intelektaskola.lv.',
           ru: 'Рад помочь! Если есть ещё вопросы — спрашивайте или пишите на info@intelektaskola.lv.' } },
  ];
  var GREET = ['sveik', 'cau', 'labdien', 'hello', 'hi', 'привет', 'здравств', 'добрый'];
  var FALLBACK = {
    lv: 'Labs jautājums! To vislabāk pārrunāt ar mūsu komandu — raksti uz info@intelektaskola.lv vai spied “Pieteikties”. Varu pastāstīt arī par kursiem, cenām vai bezmaksas rīkiem.',
    en: 'Good question! That\'s best discussed with our team — email info@intelektaskola.lv or click “Enroll”. I can also tell you about courses, pricing or free tools.',
    ru: 'Хороший вопрос! Это лучше обсудить с нашей командой — напишите на info@intelektaskola.lv или нажмите «Записаться». Могу рассказать о курсах, ценах или бесплатных инструментах.',
  };

  function norm(s) {
    s = (s || '').toLowerCase();
    var map = { 'ā': 'a', 'č': 'c', 'ē': 'e', 'ģ': 'g', 'ī': 'i', 'ķ': 'k', 'ļ': 'l', 'ņ': 'n', 'š': 's', 'ū': 'u', 'ž': 'z' };
    return s.replace(/[āčēģīķļņšūž]/g, function (c) { return map[c] || c; });
  }
  function answer(text) {
    var n = norm(text), lang = L();
    var best = null, bestScore = 0;
    KB.forEach(function (item) {
      var score = 0;
      item.kw.forEach(function (k) { if (n.indexOf(norm(k)) >= 0) score++; });
      if (score > bestScore) { bestScore = score; best = item; }
    });
    if (best && bestScore > 0) return { text: best.a[lang], contact: false };
    // greeting?
    for (var i = 0; i < GREET.length; i++) { if (n.indexOf(GREET[i]) >= 0) return { text: UI[lang].greet, contact: false }; }
    // unknown question -> reply with contact info + a contact action
    return { text: FALLBACK[lang], contact: true };
  }

  // ---- styles ----
  var st = document.createElement('style');
  st.textContent =
    '#cbWrap{position:fixed;right:18px;bottom:18px;z-index:115;font-family:Lexend,system-ui,sans-serif}' +
    '#cbBtn{display:flex;align-items:center;gap:10px;border:1px solid rgba(96,165,250,.4);background:linear-gradient(120deg,#60a5fa,#2563eb);color:#fff;border-radius:9999px;padding:10px 16px 10px 12px;font-weight:700;cursor:pointer;box-shadow:0 12px 30px -8px rgba(59,130,246,.6);transition:transform .25s}' +
    '#cbBtn:hover{transform:translateY(-2px)}' +
    '#cbPanel{position:absolute;right:0;bottom:64px;width:min(92vw,380px);height:min(70vh,560px);display:none;flex-direction:column;border-radius:22px;overflow:hidden;border:1px solid rgba(96,165,250,.2);background:linear-gradient(180deg,#0a0f1c,#05070d);box-shadow:0 30px 70px -20px rgba(0,0,0,.8)}' +
    '#cbWrap.open #cbPanel{display:flex;animation:cbIn .3s cubic-bezier(.25,0,0,1) both}' +
    '#cbWrap.open #cbBtn{display:none}' +
    '@keyframes cbIn{from{opacity:0;transform:translateY(12px) scale(.98)}to{opacity:1;transform:none}}' +
    '.cb-head{display:flex;align-items:center;gap:12px;padding:14px 16px;background:linear-gradient(120deg,rgba(59,130,246,.25),rgba(29,78,216,.15));border-bottom:1px solid rgba(96,165,250,.18)}' +
    '.cb-av{display:grid;place-items:center;height:40px;width:40px;border-radius:50%;background:linear-gradient(135deg,#93c5fd,#1d4ed8);color:#fff;font-weight:800}' +
    '.cb-msgs{flex:1;overflow-y:auto;padding:16px;display:flex;flex-direction:column;gap:10px}' +
    '.cb-msgs::-webkit-scrollbar{width:7px}.cb-msgs::-webkit-scrollbar-thumb{background:rgba(96,165,250,.35);border-radius:9px}' +
    '.cb-b{max-width:84%;padding:10px 13px;border-radius:16px;font-size:14px;line-height:1.45}' +
    '.cb-bot{align-self:flex-start;background:rgba(255,255,255,.06);border:1px solid rgba(96,165,250,.15);color:#e7ecf5;border-bottom-left-radius:5px}' +
    '.cb-user{align-self:flex-end;background:linear-gradient(120deg,#3b82f6,#1d4ed8);color:#fff;border-bottom-right-radius:5px}' +
    '.cb-chips{display:flex;flex-wrap:wrap;gap:7px;padding:0 16px 10px}' +
    '.cb-chip{font-size:12.5px;font-weight:600;color:#bfdbfe;background:rgba(59,130,246,.12);border:1px solid rgba(96,165,250,.25);border-radius:9999px;padding:6px 11px;cursor:pointer;transition:background .2s}' +
    '.cb-chip:hover{background:rgba(59,130,246,.25)}' +
    '.cb-form{display:flex;gap:8px;padding:12px;border-top:1px solid rgba(96,165,250,.15)}' +
    '.cb-in{flex:1;background:rgba(255,255,255,.05);border:1px solid rgba(96,165,250,.2);border-radius:12px;padding:10px 13px;color:#e7ecf5;font-size:14px;outline:none}' +
    '.cb-in:focus{border-color:rgba(96,165,250,.6)}' +
    '.cb-send{display:grid;place-items:center;height:42px;width:42px;border:none;border-radius:12px;background:linear-gradient(120deg,#60a5fa,#2563eb);color:#fff;cursor:pointer}' +
    '.cb-typing{display:flex;gap:4px;align-items:center}.cb-dot{height:7px;width:7px;border-radius:50%;background:#93c5fd;animation:cbDot 1s infinite}.cb-dot:nth-child(2){animation-delay:.15s}.cb-dot:nth-child(3){animation-delay:.3s}' +
    '@keyframes cbDot{0%,60%,100%{opacity:.3;transform:translateY(0)}30%{opacity:1;transform:translateY(-3px)}}';
  document.head.appendChild(st);

  var chatSvg = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style="height:20px;width:20px"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-5A8 8 0 1 1 21 12z"/></svg>';

  var d = UI[L()];
  var wrap = document.createElement('div');
  wrap.id = 'cbWrap';
  wrap.innerHTML =
    '<button id="cbBtn" aria-label="' + d.invite + '">' + chatSvg + '<span id="cbBtnTxt">' + d.invite + '</span></button>' +
    '<div id="cbPanel" role="dialog" aria-label="Čatbotka">' +
      '<div class="cb-head">' +
        '<div class="cb-av">Č</div>' +
        '<div style="flex:1"><div style="font-weight:800;color:#fff;line-height:1.1">Čatbotka</div><div id="cbTag" style="font-size:12px;color:#93a3b8">' + d.tag + '</div></div>' +
        '<button id="cbClose" aria-label="Close" style="height:30px;width:30px;border:none;border-radius:50%;background:rgba(255,255,255,.06);color:#94a3b8;cursor:pointer">✕</button>' +
      '</div>' +
      '<div class="cb-msgs" id="cbMsgs"></div>' +
      '<div class="cb-chips" id="cbChips"></div>' +
      '<form class="cb-form" id="cbForm"><input class="cb-in" id="cbIn" autocomplete="off" placeholder="' + d.ph + '" /><button class="cb-send" type="submit" aria-label="Send"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="height:18px;width:18px"><path d="M22 2 11 13M22 2l-7 20-4-9-9-4z"/></svg></button></form>' +
    '</div>';
  document.body.appendChild(wrap);

  var msgs = wrap.querySelector('#cbMsgs');
  var chips = wrap.querySelector('#cbChips');
  var started = false;

  function add(text, who) {
    var b = document.createElement('div');
    b.className = 'cb-b ' + (who === 'user' ? 'cb-user' : 'cb-bot');
    b.textContent = text;
    msgs.appendChild(b); msgs.scrollTop = msgs.scrollHeight;
    return b;
  }
  function typing() {
    var b = document.createElement('div');
    b.className = 'cb-b cb-bot cb-typing';
    b.innerHTML = '<span class="cb-dot"></span><span class="cb-dot"></span><span class="cb-dot"></span>';
    msgs.appendChild(b); msgs.scrollTop = msgs.scrollHeight; return b;
  }
  function contactAction() {
    var lang = L();
    var label = { lv: 'Sazināties ar mums', en: 'Contact us', ru: 'Связаться с нами' }[lang];
    var holder = document.createElement('div');
    holder.style.cssText = 'align-self:flex-start;display:flex;gap:7px;flex-wrap:wrap';
    var btn = document.createElement('button');
    btn.type = 'button'; btn.className = 'cb-chip'; btn.style.fontWeight = '700';
    btn.textContent = label;
    btn.addEventListener('click', function () {
      if (typeof window.ISopenApply === 'function') window.ISopenApply();
      else window.location.href = 'mailto:info@intelektaskola.lv?subject=Jaut%C4%81jums%20-%20Intelekta%20Skola';
    });
    var mail = document.createElement('a');
    mail.href = 'mailto:info@intelektaskola.lv';
    mail.className = 'cb-chip'; mail.style.textDecoration = 'none';
    mail.textContent = 'info@intelektaskola.lv';
    holder.appendChild(btn); holder.appendChild(mail);
    msgs.appendChild(holder); msgs.scrollTop = msgs.scrollHeight;
  }
  function botReply(res) {
    var text = res.text;
    var t = typing();
    setTimeout(function () {
      t.remove(); add(text, 'bot');
      if (res.contact) contactAction();
    }, 600 + Math.min(900, text.length * 8));
  }
  function renderChips() {
    var c = UI[L()];
    chips.innerHTML = '';
    c.chips.forEach(function (q) {
      var el = document.createElement('button'); el.type = 'button'; el.className = 'cb-chip'; el.textContent = q;
      el.addEventListener('click', function () { send(q); });
      chips.appendChild(el);
    });
  }
  function start() {
    if (started) return; started = true;
    add(UI[L()].greet, 'bot');
    renderChips();
  }
  function send(text) {
    text = (text || '').trim(); if (!text) return;
    add(text, 'user');
    botReply(answer(text));
  }

  wrap.querySelector('#cbBtn').addEventListener('click', function () { wrap.classList.add('open'); start(); wrap.querySelector('#cbIn').focus(); });
  wrap.querySelector('#cbClose').addEventListener('click', function () { wrap.classList.remove('open'); });
  wrap.querySelector('#cbForm').addEventListener('submit', function (e) { e.preventDefault(); var i = wrap.querySelector('#cbIn'); send(i.value); i.value = ''; });

  // keep language-synced labels if user switches language while open
  window.addEventListener('storage', function () {
    var u = UI[L()];
    wrap.querySelector('#cbBtnTxt').textContent = u.invite;
    wrap.querySelector('#cbTag').textContent = u.tag;
    wrap.querySelector('#cbIn').placeholder = u.ph;
    if (started) renderChips();
  });
})();
