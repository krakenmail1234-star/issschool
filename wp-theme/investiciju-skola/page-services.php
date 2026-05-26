<?php
if (!defined('ABSPATH')) {
    exit;
}
get_header();
?>

<section class="pagehero">
  <div class="container pagehero__inner">
    <div>
      <div class="badge">
        <span class="badge__dot" aria-hidden="true"></span>
        <span data-i18n="services_badge">Services</span>
      </div>
      <h1 class="h1">Mūsu pakalpojumi</h1>
      <p class="lead">Piedāvājam trīs pielāgotas paketes — individuālas apmācības, digitālā transformācija un mārketinga integrācijas ar AI risinājumiem.</p>
    </div>
    <div class="pagehero__panel" aria-hidden="true">
      <div class="glasscard">
        <div class="glasscard__header">
          <div class="chip" data-i18n="services_chip_stack">Offering stack</div>
          <div class="chip chip--muted" data-i18n="services_chip_modular">Modular</div>
        </div>
        <div class="glasscard__body">
          <div class="stack">
            <div class="stack__item"><span class="dot dot--a"></span> Individuālas apmācības</div>
            <div class="stack__item"><span class="dot dot--b"></span> Digitālā transformācija</div>
            <div class="stack__item"><span class="dot dot--c"></span> Mārketinga un AI integrācija</div>
          </div>
        </div>
      </div>
      <div class="orb orb--b"></div>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section__head">
      <h2 class="h2" data-i18n="services_core_h2">Core offerings</h2>
      <p class="sublead" data-i18n="services_core_sublead">Same framework, different intensity.</p>
    </div>
    <div class="cards">
      <article class="card">
        <div class="card__top">
          <div class="icon icon--grid" aria-hidden="true"></div>
          <h3 class="h3">1. Individuālas AI apmācības un mentoringa programma</h3>
        </div>
        <p>Apgūsti mākslīgo intelektu savā tempā ar personīgu atbalstu. Neatkarīgi no tā, vai esi iesācējs vai pieredzējis lietotājs, mūsu individuālās nodarbības ir pielāgotas tieši tev. Mēs ne tikai mācam teoriju, bet arī palīdzam praktiski pielietot AI rīkus, risinot tieši tavus uzdevumus un izaicinājumus.</p>
        <ul class="list">
          <li>Personalizētas apmācību sesijas (2–10 stundas)</li>
          <li>Praktiskas nodarbības ar tavām datu kopām</li>
          <li>Iespēja izvēlēties ilgtermiņa mentoringa programmu (1–3 mēneši)</li>
        </ul>
      </article>
      <article class="card">
        <div class="card__top">
          <div class="icon icon--spark" aria-hidden="true"></div>
          <h3 class="h3">2. Digitālā transformācija: mājaslapas, čatboti un automatizācija</h3>
        </div>
        <p>Paplašini savu biznesu ar inteliģentiem un automatizētiem risinājumiem. Mēs izstrādājam modernas mājaslapas, integrējot AI balstītus čatbotus un pielāgotus tīmekļa robotus. No klientu atbalsta automatizācijas līdz iekšējo datu procesu optimizācijai — mēs radām rīkus, kas ietaupa laiku un uzlabo klientu pieredzi.</p>
        <ul class="list">
          <li>Pielāgoti AI risinājumi</li>
          <li>Čatboti, kas atbilst tavai zīmola balss</li>
          <li>Automatizēti procesi, kas aizstāj manuālo darbu</li>
        </ul>
      </article>
      <article class="card">
        <div class="card__top">
          <div class="icon icon--shield" aria-hidden="true"></div>
          <h3 class="h3">3. Mārketinga un AI integrācijas pakete</h3>
        </div>
        <p>Pacel savu mārketingu nākamajā līmenī. Mēs palīdzam apvienot tradicionālo mārketingu ar moderniem AI rīkiem, ieviešot mārketinga automatizāciju, AI atbalstītu satura radīšanu un datu analīzi.</p>
        <ul class="list">
          <li>Esošo mārketinga procesu analīze</li>
          <li>Apmācības komandai par AI rīkiem satura un sociālo tīklu pārvaldībā</li>
          <li>Stratēģisks plāns AI instrumentu ieviešanai</li>
        </ul>
      </article>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section__head">
      <h2 class="h2">Pakalpojumi un cenas</h2>
      <p class="sublead">Ātrs starts vai konkrēta ieviešana. Pirkums notiek caur Stripe.</p>
    </div>

    <div class="cards">
      <article class="card">
        <div class="card__top">
          <div class="icon icon--spark" aria-hidden="true"></div>
          <h3 class="h3">AI Apmācības</h3>
        </div>
        <p><strong>150 EUR</strong> · Ievadlekcija</p>
        <ul class="list">
          <li>AI pamati + praktiska lietošana</li>
          <li>Prompti, darba plūsmas, šabloni</li>
          <li>Jautājumi un atbildes</li>
        </ul>
        <div class="panel__actions">
          <a class="button" href="#" data-stripe-link="training">Pirkt ar Stripe</a>
        </div>
      </article>

      <article class="card">
        <div class="card__top">
          <div class="icon icon--grid" aria-hidden="true"></div>
          <h3 class="h3">AI Automatizācijas</h3>
        </div>
        <p><strong>150 EUR</strong> · Boti, Aģenti</p>
        <ul class="list">
          <li>Procesu automatizācija</li>
          <li>Čatboti / aģenti konkrētiem uzdevumiem</li>
          <li>Drošības un kvalitātes pārbaudes</li>
        </ul>
        <div class="panel__actions">
          <a class="button" href="#" data-stripe-link="automation">Pirkt ar Stripe</a>
        </div>
      </article>

      <article class="card">
        <div class="card__top">
          <div class="icon icon--shield" aria-hidden="true"></div>
          <h3 class="h3">AI Integrācija / Web izstrāde</h3>
        </div>
        <p><strong>400 EUR</strong></p>
        <ul class="list">
          <li>Integrācijas ar esošām sistēmām</li>
          <li>Web risinājums + AI funkcionalitāte</li>
          <li>Nodevums + īsa apmācība</li>
        </ul>
        <div class="panel__actions">
          <a class="button" href="#" data-stripe-link="integration">Pirkt ar Stripe</a>
        </div>
      </article>
    </div>
  </div>
</section>

<section class="section section--alt">
  <div class="container">
    <div class="section__head">
      <h2 class="h2" data-i18n="services_how_h2">How we work</h2>
      <p class="sublead" data-i18n="services_how_sublead">A clean loop: learn → apply → review → iterate.</p>
    </div>
    <div class="timeline">
      <div class="timeline__item">
        <div class="timeline__k">1</div>
        <div class="timeline__v">
          <div class="timeline__title" data-i18n="services_step1_title">Assess</div>
          <div class="timeline__text" data-i18n="services_step1_text">Where you are now — skill, process, and constraints.</div>
        </div>
      </div>
      <div class="timeline__item">
        <div class="timeline__k">2</div>
        <div class="timeline__v">
          <div class="timeline__title" data-i18n="services_step2_title">Design</div>
          <div class="timeline__text" data-i18n="services_step2_text">A simple plan with rules and conditions that fit your stage.</div>
        </div>
      </div>
      <div class="timeline__item">
        <div class="timeline__k">3</div>
        <div class="timeline__v">
          <div class="timeline__title" data-i18n="services_step3_title">Execute</div>
          <div class="timeline__text" data-i18n="services_step3_text">Repeat the protocol with a calm cadence.</div>
        </div>
      </div>
      <div class="timeline__item">
        <div class="timeline__k">4</div>
        <div class="timeline__v">
          <div class="timeline__title" data-i18n="services_step4_title">Review</div>
          <div class="timeline__text" data-i18n="services_step4_text">Tight feedback cycles that convert variance into learning.</div>
        </div>
      </div>
    </div>

    <div class="callout">
      <div>
        <div class="callout__title" data-i18n="services_callout_title">Want a recommendation?</div>
        <div class="callout__text" data-i18n="services_callout_text">
          Send your goals and current stage — we’ll suggest the right layer.
        </div>
      </div>
      <a class="button" href="<?php echo esc_url(home_url('/contact/')); ?>" data-i18n="cta_contact">Contact</a>
    </div>
  </div>
</section>

<?php get_footer(); ?>
