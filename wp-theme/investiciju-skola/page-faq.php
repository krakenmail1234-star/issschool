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
        <span data-i18n="faq_badge">FAQ</span>
      </div>
      <h1 class="h1" data-i18n="faq_h1">Quick answers. No fluff.</h1>
      <p class="lead" data-i18n="faq_lead">A few common questions about the program, community, and support.</p>
    </div>
    <div class="pagehero__panel" aria-hidden="true">
      <div class="glasscard">
        <div class="glasscard__header">
          <div class="chip" data-i18n="faq_chip_support">Support</div>
          <div class="chip chip--muted" data-i18n="faq_chip_clear">Clear</div>
        </div>
        <div class="glasscard__body">
          <div class="mono" data-i18n="faq_card_education_first">Education-first</div>
          <div class="divider"></div>
          <div class="mono subtle" data-i18n="faq_card_unique_question">If you have a unique question, contact us.</div>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="faq">
      <details class="faq__item">
        <summary data-i18n="faq_q1">Is this financial advice?</summary>
        <div class="faq__body" data-i18n="faq_a1">
          No. This is educational content and support around process and frameworks.
        </div>
      </details>
      <details class="faq__item">
        <summary data-i18n="faq_q2">Do you cover beginners?</summary>
        <div class="faq__body" data-i18n="faq_a2">
          Yes — we start with clean foundations, then build toward execution and review loops.
        </div>
      </details>
      <details class="faq__item">
        <summary data-i18n="faq_q3">What instruments do you focus on?</summary>
        <div class="faq__body" data-i18n="faq_a3">
          FX majors, indices, and crypto — with overviews that emphasize behavior and drivers.
        </div>
      </details>
      <details class="faq__item">
        <summary data-i18n="faq_q4">How do I join the Discord?</summary>
        <div class="faq__body" data-i18n="faq_a4">
          Use the Discord page and click the invite button. The invite URL is configured in the site settings file
          (`scripts/site.js`).
        </div>
      </details>
    </div>

    <div class="callout">
      <div>
        <div class="callout__title" data-i18n="faq_callout_title">Still unsure what you need?</div>
        <div class="callout__text" data-i18n="faq_callout_text">Send a short message with your goals and current stage.</div>
      </div>
      <a class="button" href="<?php echo esc_url(home_url('/contact/')); ?>" data-i18n="cta_contact">Contact</a>
    </div>
  </div>
</section>

<?php get_footer(); ?>
