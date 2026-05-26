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
        <summary data-i18n="faq_q1">Are trainings suitable for beginners?</summary>
        <div class="faq__body" data-i18n="faq_a1">Yes. Programs are tailored from zero to advanced, depending on your team.</div>
      </details>
      <details class="faq__item">
        <summary data-i18n="faq_q2">Do I need programming skills?</summary>
        <div class="faq__body" data-i18n="faq_a2">No — except when we train developers on Cursor and GitHub Copilot.</div>
      </details>
      <details class="faq__item">
        <summary data-i18n="faq_q3">What language are sessions in?</summary>
        <div class="faq__body" data-i18n="faq_a3">Primarily Latvian, with English terminology as standard in the AI field.</div>
      </details>
      <details class="faq__item">
        <summary data-i18n="faq_q4">Can we do on-site training?</summary>
        <div class="faq__body" data-i18n="faq_a4">Yes — in Riga, other Latvian cities, or at your office.</div>
      </details>
      <details class="faq__item">
        <summary data-i18n="faq_q5">How long is a typical session?</summary>
        <div class="faq__body" data-i18n="faq_a5">Intro sessions are usually 1.5–2 hours. Corporate programs are planned around your goals.</div>
      </details>
      <details class="faq__item">
        <summary data-i18n="faq_q6">Which AI tools do you cover?</summary>
        <div class="faq__body" data-i18n="faq_a6">ChatGPT, Claude, Cursor, GitHub Copilot, and others depending on your tasks.</div>
      </details>
      <details class="faq__item">
        <summary data-i18n="faq_q7">How does payment work?</summary>
        <div class="faq__body" data-i18n="faq_a7">You can purchase services online via Stripe. Corporate projects get a custom quote.</div>
      </details>
      <details class="faq__item">
        <summary data-i18n="faq_q8">Is data confidentiality covered?</summary>
        <div class="faq__body" data-i18n="faq_a8">Yes. We work with your materials safely; corporate clients can sign an NDA.</div>
      </details>
      <details class="faq__item">
        <summary data-i18n="faq_q9">Can you train executives only?</summary>
        <div class="faq__body" data-i18n="faq_a9">Yes. Short leadership sessions on AI strategy, risks, and adoption priorities.</div>
      </details>
      <details class="faq__item">
        <summary data-i18n="faq_q10">How do I get started?</summary>
        <div class="faq__body" data-i18n="faq_a10">Email info@intelektaskola.lv, use the contact form, or book via the Services page.</div>
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
