// Promptu Darbnīca — interactive prompt builder (LV / EN / RU).
// Language follows the shared 'is_lang' choice; switch in the header.

/* ------------------------------------------------------------------ *
 * UI chrome strings
 * ------------------------------------------------------------------ */
const UI = {
  lv: {
    allTools: '← Visi rīki', navHome: 'Sākums', navProducts: 'Produkti', navAbout: 'Par mums', navBlog: 'Blogs', navContact: 'Kontakti', badge: 'Bezmaksas rīks · AI ikdienas darbam',
    lead: 'Izvēlies ikdienas biznesa uzdevumu, ieraksti dažus vārdus — un saņem gatavu, profesionālu AI promptu, ko vari uzreiz izmantot ChatGPT vai Claude. Bez reģistrācijas.',
    step1: 'Izvēlies scenāriju', step2: 'Aizpildi detaļas', step3: 'Tavs prompts',
    readyBadge: 'Gatavs prompts', copy: 'Kopēt', copied: 'Nokopēts!',
    promptHint: 'Ielīmē šo ChatGPT vai Claude. Aizvieto [kvadrātiekavās] ar saviem datiem, ja vēlies.',
    beforeAfter: 'Pirms / Pēc', beforeLabel: 'Pirms (tava melnraksta doma)', afterLabel: 'Pēc (ko AI atgriež)',
    flipExample: '↻ Skatīt piemēru', flipPrompt: '↻ Skatīt promptu', chooseCta: 'Izvēlēties →',
    ctaH: 'Patika? Tā ir tikai sākums.',
    ctaP: 'Intelekta Skola māca komandas un uzņēmumus ieviest AI ikdienas darbā — ar izmērāmu rezultātu. Pieteikies bezmaksas konsultācijai un pārrunāsim tavu konkrēto gadījumu.',
    ctaBtn: 'Pieteikties konsultācijai', ctaHome: 'Uz sākumlapu',
  },
  en: {
    allTools: '← All tools', navHome: 'Home', navProducts: 'Products', navAbout: 'About us', navBlog: 'Blog', navContact: 'Contact', badge: 'Free tool · AI for everyday work',
    lead: 'Pick an everyday business task, type a few words — and get a ready, professional AI prompt you can paste straight into ChatGPT or Claude. No sign-up.',
    step1: 'Choose a scenario', step2: 'Fill in the details', step3: 'Your prompt',
    readyBadge: 'Ready prompt', copy: 'Copy', copied: 'Copied!',
    promptHint: 'Paste this into ChatGPT or Claude. Replace [in brackets] with your details if you like.',
    beforeAfter: 'Before / After', beforeLabel: 'Before (your rough note)', afterLabel: 'After (what AI returns)',
    flipExample: '↻ See example', flipPrompt: '↻ See prompt', chooseCta: 'Choose →',
    ctaH: 'Liked it? This is only the start.',
    ctaP: 'Intelekta Skola teaches teams and businesses to adopt AI in everyday work — with measurable results. Book a free consultation and we\'ll discuss your specific case.',
    ctaBtn: 'Book a consultation', ctaHome: 'Back to home',
  },
  ru: {
    allTools: '← Все инструменты', navHome: 'Главная', navProducts: 'Продукты', navAbout: 'О нас', navBlog: 'Блог', navContact: 'Контакты', badge: 'Бесплатный инструмент · ИИ для работы',
    lead: 'Выберите ежедневную бизнес-задачу, впишите пару слов — и получите готовый профессиональный ИИ-промпт для ChatGPT или Claude. Без регистрации.',
    step1: 'Выберите сценарий', step2: 'Заполните детали', step3: 'Ваш промпт',
    readyBadge: 'Готовый промпт', copy: 'Копировать', copied: 'Скопировано!',
    promptHint: 'Вставьте это в ChatGPT или Claude. При желании замените [в скобках] своими данными.',
    beforeAfter: 'До / После', beforeLabel: 'До (ваша черновая мысль)', afterLabel: 'После (что вернёт ИИ)',
    flipExample: '↻ Смотреть пример', flipPrompt: '↻ Смотреть промпт', chooseCta: 'Выбрать →',
    ctaH: 'Понравилось? Это только начало.',
    ctaP: 'Intelekta Skola учит команды и компании внедрять ИИ в ежедневную работу — с измеримым результатом. Запишитесь на бесплатную консультацию, и мы обсудим ваш случай.',
    ctaBtn: 'Записаться на консультацию', ctaHome: 'На главную',
  },
};

const T = (o, l) => (o && (o[l] || o.lv)) || '';

/* ------------------------------------------------------------------ *
 * Scenarios (trilingual). prompt(values, lang) -> string.
 * ------------------------------------------------------------------ */
const SCENARIOS = [
  {
    id: 'email', icon: 'mail',
    title: { lv: 'Klienta e-pasts', en: 'Client email', ru: 'Письмо клиенту' },
    sub: { lv: 'Pārvērt īsu domu pieklājīgā, pārliecinošā e-pastā.', en: 'Turn a short note into a polite, persuasive email.', ru: 'Превратите короткую мысль в вежливое убедительное письмо.' },
    fields: [
      { id: 'recipient', type: 'text', label: { lv: 'Kam raksti?', en: 'Who is it for?', ru: 'Кому пишете?' }, ph: { lv: 'piem. potenciālais klients Jānis', en: 'e.g. prospective client John', ru: 'напр. потенциальный клиент Ян' } },
      { id: 'points', type: 'textarea', label: { lv: 'Galvenās domas (katra jaunā rindā)', en: 'Key points (one per line)', ru: 'Ключевые мысли (по одной в строке)' }, ph: { lv: 'Piedāvājam atlaidi\nVēlamies tikšanos nākamnedēļ', en: 'We offer a discount\nWe want a meeting next week', ru: 'Предлагаем скидку\nХотим встречу на следующей неделе' } },
      { id: 'tone', type: 'select', label: { lv: 'Tonis', en: 'Tone', ru: 'Тон' }, options: { lv: ['Profesionāls', 'Draudzīgs', 'Pārliecinošs', 'Atvainojošs'], en: ['Professional', 'Friendly', 'Persuasive', 'Apologetic'], ru: ['Профессиональный', 'Дружелюбный', 'Убедительный', 'Извиняющийся'] } },
    ],
    prompt: (v, l) => ({
      lv: `Tu esi pieredzējis biznesa komunikācijas speciālists. Uzraksti latviešu valodā e-pastu šādam adresātam: ${v.recipient || '[adresāts]'}.\n\nTonis: ${v.tone}.\nGalvenās domas, kas jāietver:\n${bullets(v.points) || '- [tava doma]'}\n\nPrasības:\n- Skaidrs temata lauks (Subject).\n- Personalizēts uzrunas teikums.\n- Maks. 120 vārdi, īsas rindkopas.\n- Beigās konkrēts aicinājums uz darbību (CTA).\n- Pieklājīgs noslēgums ar parakstu [Tavs vārds, uzņēmums].`,
      en: `You are an experienced business communication specialist. Write an email in English to: ${v.recipient || '[recipient]'}.\n\nTone: ${v.tone}.\nKey points to include:\n${bullets(v.points) || '- [your point]'}\n\nRequirements:\n- A clear Subject line.\n- A personalised greeting.\n- Max 120 words, short paragraphs.\n- End with a specific call to action (CTA).\n- A polite sign-off with [Your name, company].`,
      ru: `Вы — опытный специалист по деловой коммуникации. Напишите письмо на русском языке адресату: ${v.recipient || '[адресат]'}.\n\nТон: ${v.tone}.\nКлючевые мысли:\n${bullets(v.points) || '- [ваша мысль]'}\n\nТребования:\n- Чёткая тема письма (Subject).\n- Персональное приветствие.\n- Макс. 120 слов, короткие абзацы.\n- В конце — конкретный призыв к действию (CTA).\n- Вежливое завершение с подписью [Ваше имя, компания].`,
    }[l]),
    example: {
      before: { lv: '«pajautāt klientam vai der otrdiena, atgādināt par piedāvājumu»', en: '"ask the client if Tuesday works, remind about the offer"', ru: '«спросить клиента, подходит ли вторник, напомнить о предложении»' },
      after: {
        lv: 'Temats: Tikšanās otrdien + jūsu piedāvājums\n\nLabdien, Jāni!\n\nVēlos pārliecināties, vai otrdiena plkst. 14:00 jums būtu ērts laiks īsai 20 min sarunai. Vēlreiz pievēršu uzmanību mūsu piedāvājumam — tas spēkā līdz piektdienai.\n\nVai apstiprināt otrdienu?\n\nAr cieņu,\n[Tavs vārds]',
        en: 'Subject: Tuesday meeting + your offer\n\nHi John,\n\nI wanted to check whether Tuesday at 2 PM works for a short 20-min call. A quick reminder about our offer — it\'s valid until Friday.\n\nShall I confirm Tuesday?\n\nKind regards,\n[Your name]',
        ru: 'Тема: Встреча во вторник + ваше предложение\n\nЗдравствуйте, Ян!\n\nХотел уточнить, удобно ли вам во вторник в 14:00 для короткого 20-мин разговора. Напоминаю о нашем предложении — оно действует до пятницы.\n\nПодтвердить вторник?\n\nС уважением,\n[Ваше имя]',
      },
    },
  },
  {
    id: 'summary', icon: 'notes',
    title: { lv: 'Sapulces kopsavilkums', en: 'Meeting summary', ru: 'Итоги встречи' },
    sub: { lv: 'No haotiskām piezīmēm uz strukturētu kopsavilkumu ar uzdevumiem.', en: 'From messy notes to a structured summary with action items.', ru: 'Из хаотичных заметок — структурированное резюме с задачами.' },
    fields: [
      { id: 'notes', type: 'textarea', label: { lv: 'Ielīmē neapstrādātas piezīmes', en: 'Paste raw notes', ru: 'Вставьте черновые заметки' }, ph: { lv: 'runājām par budžetu, Anna paņem dizainu, deadline 20. jūnijs...', en: 'talked about budget, Anna takes design, deadline June 20...', ru: 'говорили о бюджете, Анна берёт дизайн, дедлайн 20 июня...' } },
    ],
    prompt: (v, l) => ({
      lv: `Tu esi precīzs projektu vadības asistents. Apkopo šādas sapulces piezīmes skaidrā kopsavilkumā latviešu valodā.\n\nNeapstrādātās piezīmes:\n"""\n${v.notes || '[ielīmē piezīmes]'}\n"""\n\nAtgriez šādā struktūrā:\n1. **Galvenie lēmumi** — punktveidā.\n2. **Uzdevumi** — tabula: Uzdevums | Atbildīgais | Termiņš.\n3. **Atvērtie jautājumi** — kas vēl jāizlemj.\nEsi konkrēts. Neizdomā informāciju, kuras nav piezīmēs.`,
      en: `You are a precise project-management assistant. Summarise the following meeting notes into a clear summary in English.\n\nRaw notes:\n"""\n${v.notes || '[paste notes]'}\n"""\n\nReturn this structure:\n1. **Key decisions** — bullet points.\n2. **Action items** — table: Task | Owner | Due date.\n3. **Open questions** — what still needs deciding.\nBe specific. Do not invent information that isn\'t in the notes.`,
      ru: `Вы — точный ассистент по управлению проектами. Сделайте из этих заметок чёткое резюме на русском языке.\n\nЧерновые заметки:\n"""\n${v.notes || '[вставьте заметки]'}\n"""\n\nВерните такую структуру:\n1. **Ключевые решения** — пунктами.\n2. **Задачи** — таблица: Задача | Ответственный | Срок.\n3. **Открытые вопросы** — что ещё нужно решить.\nБудьте конкретны. Не выдумывайте информацию, которой нет в заметках.`,
    }[l]),
    example: {
      before: { lv: '«runājām par budžetu, Anna paņem dizainu, deadline 20. jūnijs»', en: '"talked about budget, Anna takes design, deadline June 20"', ru: '«говорили о бюджете, Анна берёт дизайн, дедлайн 20 июня»' },
      after: {
        lv: 'Galvenie lēmumi:\n• Apstiprināts budžeta virziens Q3.\n\nUzdevumi:\n| Dizaina makets | Anna | 20.06 |\n\nAtvērtie jautājumi:\n• Gala cena klientam — jāprecizē.',
        en: 'Key decisions:\n• Q3 budget direction approved.\n\nAction items:\n| Design mockup | Anna | Jun 20 |\n\nOpen questions:\n• Final client price — to be confirmed.',
        ru: 'Ключевые решения:\n• Утверждено направление бюджета на Q3.\n\nЗадачи:\n| Макет дизайна | Анна | 20.06 |\n\nОткрытые вопросы:\n• Финальная цена для клиента — уточнить.',
      },
    },
  },
  {
    id: 'offer', icon: 'briefcase',
    title: { lv: 'Piedāvājums klientam', en: 'Client offer', ru: 'Предложение клиенту' },
    sub: { lv: 'Sagatavo pārdošanas piedāvājumu, kas uzsver ieguvumu.', en: 'Draft a sales offer that highlights the benefit.', ru: 'Подготовьте предложение, подчёркивающее выгоду.' },
    fields: [
      { id: 'product', type: 'text', label: { lv: 'Produkts / pakalpojums', en: 'Product / service', ru: 'Продукт / услуга' }, ph: { lv: 'mājaslapas izstrāde', en: 'website development', ru: 'разработка сайта' } },
      { id: 'price', type: 'text', label: { lv: 'Cena / nosacījumi', en: 'Price / terms', ru: 'Цена / условия' }, ph: { lv: 'no 900 €, 3 nedēļas', en: 'from €900, 3 weeks', ru: 'от 900 €, 3 недели' } },
      { id: 'benefit', type: 'text', label: { lv: 'Galvenais ieguvums klientam', en: 'Main benefit for the client', ru: 'Главная выгода для клиента' }, ph: { lv: 'vairāk pieteikumu no mājaslapas', en: 'more leads from the website', ru: 'больше заявок с сайта' } },
    ],
    prompt: (v, l) => ({
      lv: `Tu esi B2B pārdošanas teksta autors. Uzraksti īsu, pārliecinošu piedāvājumu latviešu valodā.\n\nProdukts/pakalpojums: ${v.product || '[produkts]'}\nCena/nosacījumi: ${v.price || '[cena]'}\nGalvenais ieguvums: ${v.benefit || '[ieguvums]'}\n\nStruktūra:\n- Virsraksts, kas uzrunā ieguvumu (nevis funkciju).\n- 3 punkti “Ko jūs iegūstat”.\n- Cena un termiņš skaidri.\n- Riska mazinātājs (garantija / nesaistoša saruna).\n- CTA viena teikuma garumā.\nTonis: pārliecinošs, bez liekas pārspīlēšanas.`,
      en: `You are a B2B sales copywriter. Write a short, persuasive offer in English.\n\nProduct/service: ${v.product || '[product]'}\nPrice/terms: ${v.price || '[price]'}\nMain benefit: ${v.benefit || '[benefit]'}\n\nStructure:\n- A headline that speaks to the benefit (not the feature).\n- 3 bullets "What you get".\n- Price and timeline, clearly.\n- A risk reducer (guarantee / no-obligation call).\n- A one-sentence CTA.\nTone: persuasive, without overhyping.`,
      ru: `Вы — копирайтер B2B-продаж. Напишите короткое убедительное предложение на русском языке.\n\nПродукт/услуга: ${v.product || '[продукт]'}\nЦена/условия: ${v.price || '[цена]'}\nГлавная выгода: ${v.benefit || '[выгода]'}\n\nСтруктура:\n- Заголовок про выгоду (а не функцию).\n- 3 пункта «Что вы получаете».\n- Цена и срок — чётко.\n- Снижение риска (гарантия / необязывающий разговор).\n- Призыв к действию в одно предложение.\nТон: убедительный, без лишнего пафоса.`,
    }[l]),
    example: {
      before: { lv: '«piedāvāt mājaslapu par 900 eur»', en: '"offer a website for 900 eur"', ru: '«предложить сайт за 900 евро»' },
      after: {
        lv: 'Mājaslapa, kas atved klientus, nevis tikai izskatās labi\n\nKo jūs iegūstat:\n• Pieteikumu formu, kas pārvērš apmeklētājus zvanos\n• Ātru ielādi un mobilo versiju\n• Gatavu rezultātu 3 nedēļās\n\nIeguldījums: no 900 €. Sākam ar nesaistošu 20 min sarunu.',
        en: 'A website that brings in clients, not just looks good\n\nWhat you get:\n• A lead form that turns visitors into calls\n• Fast loading and a mobile version\n• A finished result in 3 weeks\n\nInvestment: from €900. We start with a no-obligation 20-min call.',
        ru: 'Сайт, который приводит клиентов, а не просто красиво выглядит\n\nЧто вы получаете:\n• Форму заявок, превращающую посетителей в звонки\n• Быструю загрузку и мобильную версию\n• Готовый результат за 3 недели\n\nИнвестиция: от 900 €. Начнём с необязывающего 20-мин разговора.',
      },
    },
  },
  {
    id: 'social', icon: 'megaphone',
    title: { lv: 'Sociālo tīklu ieraksts', en: 'Social media post', ru: 'Пост для соцсетей' },
    sub: { lv: 'Viena ideja → gatavs ieraksts ar āķi un aicinājumu.', en: 'One idea → a finished post with a hook and a CTA.', ru: 'Одна идея → готовый пост с зацепкой и призывом.' },
    fields: [
      { id: 'topic', type: 'text', label: { lv: 'Par ko ieraksts?', en: 'What is the post about?', ru: 'О чём пост?' }, ph: { lv: 'jauns pakalpojums / akcija', en: 'new service / promotion', ru: 'новая услуга / акция' } },
      { id: 'platform', type: 'select', label: { lv: 'Platforma', en: 'Platform', ru: 'Платформа' }, options: { lv: ['Facebook', 'Instagram', 'LinkedIn'], en: ['Facebook', 'Instagram', 'LinkedIn'], ru: ['Facebook', 'Instagram', 'LinkedIn'] } },
      { id: 'goal', type: 'select', label: { lv: 'Mērķis', en: 'Goal', ru: 'Цель' }, options: { lv: ['Vairāk pieteikumu', 'Atpazīstamība', 'Iesaiste (komentāri)'], en: ['More leads', 'Awareness', 'Engagement (comments)'], ru: ['Больше заявок', 'Узнаваемость', 'Вовлечённость (комментарии)'] } },
    ],
    prompt: (v, l) => ({
      lv: `Tu esi SMM speciālists. Uzraksti ${v.platform} ierakstu latviešu valodā.\n\nTēma: ${v.topic || '[tēma]'}\nMērķis: ${v.goal}\n\nPrasības:\n- Spēcīgs āķis pirmajā rindā (aptur skrollēšanu).\n- 3–5 īsas rindkopas, viegli lasāmas.\n- 1 skaidrs CTA.\n- 3–5 atbilstoši hashtagi.\n- Pielāgo garumu un toni ${v.platform} auditorijai.`,
      en: `You are an SMM specialist. Write a ${v.platform} post in English.\n\nTopic: ${v.topic || '[topic]'}\nGoal: ${v.goal}\n\nRequirements:\n- A strong hook in the first line (stops the scroll).\n- 3–5 short, easy-to-read paragraphs.\n- 1 clear CTA.\n- 3–5 relevant hashtags.\n- Adapt the length and tone to the ${v.platform} audience.`,
      ru: `Вы — SMM-специалист. Напишите пост для ${v.platform} на русском языке.\n\nТема: ${v.topic || '[тема]'}\nЦель: ${v.goal}\n\nТребования:\n- Сильная зацепка в первой строке (останавливает скролл).\n- 3–5 коротких, легко читаемых абзацев.\n- 1 чёткий призыв к действию.\n- 3–5 подходящих хэштегов.\n- Адаптируйте длину и тон под аудиторию ${v.platform}.`,
    }[l]),
    example: {
      before: { lv: '«pateikt ka ir jauns AI kurss uzņēmumiem»', en: '"say there is a new AI course for businesses"', ru: '«сказать, что есть новый ИИ-курс для компаний»' },
      after: {
        lv: 'Tava komanda joprojām raksta e-pastus ar rokām?\n\nMēs apmācām uzņēmumus izmantot AI ikdienas darbā — un ietaupīt stundas katru nedēļu.\n\nPieraksties bezmaksas konsultācijai — saite bio.\n\n#AI #bizness #produktivitāte',
        en: 'Is your team still writing emails by hand?\n\nWe train businesses to use AI in everyday work — and save hours every week.\n\nBook a free consultation — link in bio.\n\n#AI #business #productivity',
        ru: 'Ваша команда всё ещё пишет письма вручную?\n\nМы обучаем компании использовать ИИ в ежедневной работе — и экономить часы каждую неделю.\n\nЗапишитесь на бесплатную консультацию — ссылка в профиле.\n\n#ИИ #бизнес #продуктивность',
      },
    },
  },
  {
    id: 'complaint', icon: 'lifebuoy',
    title: { lv: 'Atbilde uz sūdzību', en: 'Complaint reply', ru: 'Ответ на жалобу' },
    sub: { lv: 'Nomierini neapmierinātu klientu un saglabā attiecības.', en: 'Calm an unhappy customer and keep the relationship.', ru: 'Успокойте недовольного клиента и сохраните отношения.' },
    fields: [
      { id: 'complaint', type: 'textarea', label: { lv: 'Klienta sūdzība', en: 'The customer\'s complaint', ru: 'Жалоба клиента' }, ph: { lv: 'pasūtījums kavējās 5 dienas un neviens neatbildēja', en: 'the order was 5 days late and no one replied', ru: 'заказ опоздал на 5 дней и никто не ответил' } },
      { id: 'fix', type: 'text', label: { lv: 'Ko piedāvā kā risinājumu?', en: 'What solution do you offer?', ru: 'Какое решение предлагаете?' }, ph: { lv: 'atlaide nākamajam pasūtījumam + piegāde šodien', en: 'discount on the next order + delivery today', ru: 'скидка на следующий заказ + доставка сегодня' } },
    ],
    prompt: (v, l) => ({
      lv: `Tu esi pieredzējis klientu attiecību speciālists. Uzraksti empātisku atbildi latviešu valodā uz šo sūdzību.\n\nSūdzība:\n"""\n${v.complaint || '[sūdzība]'}\n"""\nPiedāvātais risinājums: ${v.fix || '[risinājums]'}\n\nPrasības:\n- Sāc ar patiesu atvainošanos un atzīsti problēmu.\n- Neaizstāvies, neattaisno.\n- Skaidri pasaki, ko darīsi (risinājums + termiņš).\n- Noslēdz pozitīvi, atjauno uzticību.\n- Tonis: silts, profesionāls, īss.`,
      en: `You are an experienced customer-relations specialist. Write an empathetic reply in English to this complaint.\n\nComplaint:\n"""\n${v.complaint || '[complaint]'}\n"""\nProposed solution: ${v.fix || '[solution]'}\n\nRequirements:\n- Start with a genuine apology and acknowledge the problem.\n- Don\'t get defensive or make excuses.\n- Clearly state what you will do (solution + timing).\n- End positively, rebuild trust.\n- Tone: warm, professional, brief.`,
      ru: `Вы — опытный специалист по работе с клиентами. Напишите эмпатичный ответ на русском языке на эту жалобу.\n\nЖалоба:\n"""\n${v.complaint || '[жалоба]'}\n"""\nПредлагаемое решение: ${v.fix || '[решение]'}\n\nТребования:\n- Начните с искренних извинений и признайте проблему.\n- Не оправдывайтесь.\n- Чётко скажите, что вы сделаете (решение + срок).\n- Завершите позитивно, восстановите доверие.\n- Тон: тёплый, профессиональный, краткий.`,
    }[l]),
    example: {
      before: { lv: '«atvainoties par kavēšanos un piedāvāt atlaidi»', en: '"apologise for the delay and offer a discount"', ru: '«извиниться за задержку и предложить скидку»' },
      after: {
        lv: 'Labdien!\n\nVispirms — patiesi atvainojos par kavēšanos un to, ka nesaņēmāt atbildi. Tas neatbilst mūsu standartam.\n\nJūsu pasūtījumu nosūtām jau šodien, un nākamajam pasūtījumam piešķiram 15% atlaidi.\n\nPaldies par pacietību — labosim šo.',
        en: 'Hello,\n\nFirst — I sincerely apologise for the delay and for not getting a reply. That\'s not our standard.\n\nWe\'re shipping your order today, and we\'re giving you 15% off your next order.\n\nThank you for your patience — we\'ll make this right.',
        ru: 'Здравствуйте!\n\nПрежде всего — искренне извиняюсь за задержку и за отсутствие ответа. Это не соответствует нашему стандарту.\n\nВаш заказ отправляем сегодня, а на следующий заказ даём скидку 15%.\n\nСпасибо за терпение — мы всё исправим.',
      },
    },
  },
  {
    id: 'job', icon: 'users',
    title: { lv: 'Darba sludinājums', en: 'Job posting', ru: 'Вакансия' },
    sub: { lv: 'Pievelkošs sludinājums, kas piesaista īstos kandidātus.', en: 'An attractive posting that draws the right candidates.', ru: 'Привлекательная вакансия для нужных кандидатов.' },
    fields: [
      { id: 'role', type: 'text', label: { lv: 'Amats', en: 'Role', ru: 'Должность' }, ph: { lv: 'pārdošanas vadītājs', en: 'sales manager', ru: 'менеджер по продажам' } },
      { id: 'company', type: 'text', label: { lv: 'Uzņēmums (īsi)', en: 'Company (briefly)', ru: 'Компания (кратко)' }, ph: { lv: 'augoša IT kompānija Rīgā', en: 'a growing IT company in Rīga', ru: 'растущая IT-компания в Риге' } },
      { id: 'must', type: 'text', label: { lv: 'Svarīgākās prasības', en: 'Key requirements', ru: 'Ключевые требования' }, ph: { lv: 'B2B pieredze, latviešu + angļu', en: 'B2B experience, Latvian + English', ru: 'опыт B2B, латышский + английский' } },
    ],
    prompt: (v, l) => ({
      lv: `Tu esi HR copywriter. Uzraksti darba sludinājumu latviešu valodā amatam: ${v.role || '[amats]'}.\n\nUzņēmums: ${v.company || '[uzņēmums]'}\nSvarīgākās prasības: ${v.must || '[prasības]'}\n\nStruktūra:\n- Āķīgs virsraksts ar amatu.\n- 2 teikumi par uzņēmumu un kāpēc te ir labi strādāt.\n- “Tavi pienākumi” — 4 punkti.\n- “Ko sagaidām” — 4 punkti.\n- “Ko piedāvājam” — 3 punkti (konkrēti, ne klišejas).\n- CTA pieteikties.\nTonis: cilvēcīgs, enerģisks, bez korporatīvām klišejām.`,
      en: `You are an HR copywriter. Write a job posting in English for the role: ${v.role || '[role]'}.\n\nCompany: ${v.company || '[company]'}\nKey requirements: ${v.must || '[requirements]'}\n\nStructure:\n- A catchy headline with the role.\n- 2 sentences about the company and why it\'s a good place to work.\n- "Your responsibilities" — 4 bullets.\n- "What we expect" — 4 bullets.\n- "What we offer" — 3 bullets (specific, no clichés).\n- A CTA to apply.\nTone: human, energetic, no corporate clichés.`,
      ru: `Вы — HR-копирайтер. Напишите вакансию на русском языке для должности: ${v.role || '[должность]'}.\n\nКомпания: ${v.company || '[компания]'}\nКлючевые требования: ${v.must || '[требования]'}\n\nСтруктура:\n- Цепляющий заголовок с должностью.\n- 2 предложения о компании и почему здесь хорошо работать.\n- «Ваши задачи» — 4 пункта.\n- «Что мы ждём» — 4 пункта.\n- «Что предлагаем» — 3 пункта (конкретно, без клише).\n- Призыв откликнуться.\nТон: человечный, энергичный, без корпоративных клише.`,
    }[l]),
    example: {
      before: { lv: '«meklējam pārdošanas vadītāju ar pieredzi»', en: '"looking for a sales manager with experience"', ru: '«ищем менеджера по продажам с опытом»' },
      after: {
        lv: 'Pārdošanas vadītājs, kas mīl slēgt darījumus\n\nMēs esam augoša IT kompānija Rīgā...\n\nTavi pienākumi:\n• Vadīt B2B pārdošanas ciklu\n...\nKo piedāvājam:\n• Bonusu sistēma bez “griestiem”\n\nPieteikies — atbildam 3 dienu laikā!',
        en: 'A sales manager who loves closing deals\n\nWe\'re a growing IT company in Rīga...\n\nYour responsibilities:\n• Run the B2B sales cycle\n...\nWhat we offer:\n• An uncapped bonus system\n\nApply — we reply within 3 days!',
        ru: 'Менеджер по продажам, который любит закрывать сделки\n\nМы — растущая IT-компания в Риге...\n\nВаши задачи:\n• Вести цикл B2B-продаж\n...\nЧто предлагаем:\n• Бонусная система без «потолка»\n\nОткликайтесь — отвечаем в течение 3 дней!',
      },
    },
  },
];

/* ------------------------------------------------------------------ *
 * Helpers
 * ------------------------------------------------------------------ */
const $ = (sel, root = document) => root.querySelector(sel);
function bullets(text) {
  if (!text) return '';
  return text.split('\n').map((l) => l.trim()).filter(Boolean).map((l) => `- ${l}`).join('\n');
}
function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

let lang = (function () { var l = localStorage.getItem('is_lang') || 'lv'; return ['lv', 'en', 'ru'].indexOf(l) >= 0 ? l : 'lv'; })();
let activeScenario = null;

/* ---------- render scenario cards ---------- */
function renderScenarioGrid() {
  const grid = $('#scenarioGrid');
  grid.innerHTML = SCENARIOS.map(
    (s) => `
    <button data-id="${s.id}" type="button"
      class="group text-left rounded-3xl glass glow-hover p-5 focus:outline-none focus:ring-2 focus:ring-brand ${activeScenario && activeScenario.id === s.id ? 'ring-2 ring-brand' : ''}">
      <div>
        <div class="mb-3 grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-brand to-electric text-white shadow-depth">${isIcon(s.icon, 'h-7 w-7')}</div>
        <h3 class="text-lg font-bold leading-tight">${T(s.title, lang)}</h3>
        <p class="mt-1 text-sm text-muted">${T(s.sub, lang)}</p>
        <span class="mt-3 inline-flex items-center gap-1 text-sm font-bold text-electric opacity-0 transition group-hover:opacity-100">${UI[lang].chooseCta}</span>
      </div>
    </button>`
  ).join('');
  grid.querySelectorAll('[data-id]').forEach((btn) => btn.addEventListener('click', () => selectScenario(btn.dataset.id)));
}

/* ---------- builder ---------- */
function selectScenario(id) {
  activeScenario = SCENARIOS.find((s) => s.id === id);
  if (!activeScenario) return;
  document.querySelectorAll('#scenarioGrid [data-id]').forEach((b) => {
    b.classList.toggle('ring-2', b.dataset.id === id);
    b.classList.toggle('ring-brand', b.dataset.id === id);
  });
  $('#builderIcon').innerHTML = isIcon(activeScenario.icon, 'h-6 w-6');
  $('#builderTitle').textContent = T(activeScenario.title, lang);
  $('#builderSub').textContent = T(activeScenario.sub, lang);
  const form = $('#builderForm');
  form.innerHTML = activeScenario.fields.map((f) => fieldHtml(f)).join('');
  form.querySelectorAll('input, textarea, select').forEach((el) => el.addEventListener('input', updateOutput));
  $('#workbench').classList.remove('hidden');
  updateOutput();
  $('#workbench').scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function fieldHtml(f) {
  const base = 'field w-full rounded-xl px-3 py-2.5 text-sm text-zinc-100 [&>option]:bg-ink2 [&>option]:text-zinc-100 transition';
  let control;
  if (f.type === 'textarea') control = `<textarea id="f_${f.id}" rows="4" placeholder="${escapeHtml(T(f.ph, lang))}" class="${base} resize-none"></textarea>`;
  else if (f.type === 'select') control = `<select id="f_${f.id}" class="${base}">${T(f.options, lang).map((o) => `<option value="${escapeHtml(o)}">${escapeHtml(o)}</option>`).join('')}</select>`;
  else control = `<input id="f_${f.id}" type="text" placeholder="${escapeHtml(T(f.ph, lang))}" class="${base}" />`;
  return `<label class="block"><span class="mb-1.5 block text-sm font-semibold text-zinc-100">${T(f.label, lang)}</span>${control}</label>`;
}

function updateOutput() {
  if (!activeScenario) return;
  const values = {};
  activeScenario.fields.forEach((f) => { const el = $(`#f_${f.id}`); values[f.id] = el ? el.value : ''; });
  $('#promptOut').textContent = activeScenario.prompt(values, lang);
  $('#beforeOut').textContent = T(activeScenario.example.before, lang);
  $('#afterOut').textContent = T(activeScenario.example.after, lang);
}

/* ---------- i18n apply + language switch ---------- */
function applyLang() {
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const v = UI[lang][el.getAttribute('data-i18n')];
    if (typeof v === 'string') el.textContent = v;
  });
  // flip button reflects current side
  const flipped = $('#flipCard').classList.contains('is-flipped');
  $('#flipBtn').textContent = flipped ? UI[lang].flipPrompt : UI[lang].flipExample;
  document.querySelectorAll('.langseg [data-lang]').forEach((b) => b.classList.toggle('is-active', b.dataset.lang === lang));
  renderScenarioGrid();
  if (activeScenario) selectScenario(activeScenario.id);
}

document.querySelectorAll('.langseg [data-lang]').forEach((b) =>
  b.addEventListener('click', () => { lang = b.dataset.lang; localStorage.setItem('is_lang', lang); applyLang(); })
);

/* ---------- flip + copy + toast ---------- */
$('#flipBtn').addEventListener('click', () => {
  const card = $('#flipCard');
  card.classList.toggle('is-flipped');
  $('#flipBtn').textContent = card.classList.contains('is-flipped') ? UI[lang].flipPrompt : UI[lang].flipExample;
});

$('#copyBtn').addEventListener('click', async () => {
  const text = $('#promptOut').textContent;
  try { await navigator.clipboard.writeText(text); }
  catch { const ta = document.createElement('textarea'); ta.value = text; document.body.appendChild(ta); ta.select(); document.execCommand('copy'); ta.remove(); }
  showToast();
});

let toastTimer;
function showToast() {
  const t = $('#toast');
  t.textContent = UI[lang].copied;
  t.style.opacity = '1';
  t.classList.remove('translate-y-4');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { t.style.opacity = '0'; t.classList.add('translate-y-4'); }, 1800);
}

$('#year').textContent = new Date().getFullYear();
applyLang();
