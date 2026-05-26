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
        <span data-i18n="program_badge">Program</span>
      </div>
      <h1 class="h1" data-i18n="program_h1">A program built like a system.</h1>
      <p class="lead" data-i18n="program_lead">Progressive modules, practical frameworks, and clean mental models.</p>
    </div>
    <div class="pagehero__panel" aria-hidden="true">
      <div class="glasscard">
        <div class="glasscard__header">
          <div class="chip" data-i18n="program_chip_modules">Modules</div>
          <div class="chip chip--muted" data-i18n="program_chip_structured">Structured</div>
        </div>
        <div class="glasscard__body">
          <div class="mono subtle" data-i18n="program_card_loop">Learn → Apply → Review → Iterate</div>
          <div class="divider"></div>
          <div class="mono" data-i18n="program_card_stack">Mechanics · Playbooks · Support</div>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="cards">
      <article class="card">
        <div class="card__top">
          <div class="icon icon--grid" aria-hidden="true"></div>
          <h2 class="h3" data-i18n="program_card1_title">Market mechanics</h2>
        </div>
        <p data-i18n="program_card1_text">
          Order flow concepts, liquidity, sessions, volatility, and why price moves — explained clearly.
        </p>
        <ul class="list">
          <li data-i18n="program_card1_li1">Structure, regimes, and narrative</li>
          <li data-i18n="program_card1_li2">Risk thinking and execution hygiene</li>
          <li data-i18n="program_card1_li3">Review loops and journaling</li>
        </ul>
      </article>
      <article class="card">
        <div class="card__top">
          <div class="icon icon--spark" aria-hidden="true"></div>
          <h2 class="h3" data-i18n="program_card2_title">Playbooks</h2>
        </div>
        <p data-i18n="program_card2_text">Repeatable setups and decision trees — so you know what to do, and when not to.</p>
        <ul class="list">
          <li data-i18n="program_card2_li1">Entry/exit protocols</li>
          <li data-i18n="program_card2_li2">Conditions checklist</li>
          <li data-i18n="program_card2_li3">Post-trade debrief</li>
        </ul>
      </article>
      <article class="card">
        <div class="card__top">
          <div class="icon icon--shield" aria-hidden="true"></div>
          <h2 class="h3" data-i18n="program_card3_title">Support layer</h2>
        </div>
        <p data-i18n="program_card3_text">Feedback, review, and guidance tailored to your stage — from foundations to refinement.</p>
        <ul class="list">
          <li data-i18n="program_card3_li1">1:1 reviews (optional)</li>
          <li data-i18n="program_card3_li2">Actionable improvements</li>
          <li data-i18n="program_card3_li3">Accountability cadence</li>
        </ul>
      </article>
    </div>

    <div class="callout">
      <div>
        <div class="callout__title" data-i18n="program_callout_title">Want a recommended path?</div>
        <div class="callout__text" data-i18n="program_callout_text">
          Send your current stage and goals — we’ll suggest the right starting point.
        </div>
      </div>
      <a class="button" href="<?php echo esc_url(home_url('/contact/')); ?>" data-i18n="cta_contact">Contact</a>
    </div>
  </div>
</section>

<?php get_footer(); ?>
