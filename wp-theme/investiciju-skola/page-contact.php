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
        <span data-i18n="contact_badge">Contact</span>
      </div>
      <h1 class="h1" data-i18n="contact_h1">Let’s talk.</h1>
      <p class="lead" data-i18n="contact_lead">
        Send a message and we’ll get you the right next step: education, overviews, or support.
      </p>
    </div>
    <div class="pagehero__panel" aria-hidden="true">
      <div class="glasscard">
        <div class="glasscard__header">
          <div class="chip" data-i18n="contact_chip_response">Response</div>
          <div class="chip chip--muted" data-i18n="contact_chip_sla">24–48h</div>
        </div>
        <div class="glasscard__body">
          <div class="mono subtle" data-i18n="contact_email_label">Email</div>
          <div class="mono" data-contact-email>hello@example.com</div>
          <div class="fineprint">
            <button class="button button--ghost" type="button" data-copy-email data-i18n="contact_copy_email">
              Copy email
            </button>
          </div>
          <div class="divider"></div>
          <div class="mono subtle" data-i18n="contact_discord_label">Discord</div>
          <div class="mono" data-i18n="contact_discord_note">Invite link in Discord page</div>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="section section--alt">
  <div class="container">
    <div class="contact">
      <form class="form" id="contactForm">
        <div class="form__row">
          <label class="field">
            <span class="field__label" data-i18n="contact_form_name">Name</span>
            <input class="field__input" name="name" autocomplete="name" required />
          </label>
          <label class="field">
            <span class="field__label" data-i18n="contact_form_email">Email</span>
            <input class="field__input" name="email" type="email" autocomplete="email" required />
          </label>
        </div>
        <label class="field">
          <span class="field__label" data-i18n="contact_form_topic">Topic</span>
          <select class="field__input" name="topic" required>
            <option value="" selected disabled data-i18n="contact_form_choose">Choose one</option>
            <option value="consult" data-i18n="topic_consult">Free consultation</option>
            <option value="corporate" data-i18n="topic_corporate">Corporate training</option>
            <option value="individual" data-i18n="topic_individual">Individual training / mentoring</option>
            <option value="other" data-i18n="topic_other">Other question</option>
          </select>
        </label>
        <label class="field">
          <span class="field__label" data-i18n="contact_form_message">Message</span>
          <textarea class="field__input field__input--area" name="message" rows="6" required></textarea>
        </label>
        <div class="form__actions">
          <button class="button" type="submit" data-i18n="contact_form_send">Send message</button>
          <a class="button button--ghost" href="<?php echo esc_url(home_url('/program/')); ?>" data-i18n="cta_program">Program</a>
        </div>
        <div class="fineprint" data-i18n="contact_form_fineprint">
          Default behavior opens your email client (mailto). Replace it with a backend endpoint later without
          changing the page layout.
        </div>
      </form>

      <aside class="aside">
        <div class="aside__card">
          <div class="aside__title" data-i18n="contact_quicklinks">Quick links</div>
          <div class="aside__line"><a class="link" href="<?php echo esc_url(home_url('/program/')); ?>" data-i18n="nav_program">Program</a></div>
          <div class="aside__line"><a class="link" href="<?php echo esc_url(home_url('/services/')); ?>" data-i18n="nav_services">Services</a></div>
          <div class="aside__line">
            <a class="link" href="<?php echo esc_url(home_url('/services/')); ?>" data-i18n="nav_services">Services</a>
          </div>
        </div>
        <div class="aside__card">
          <div class="aside__title" data-i18n="contact_boundary_title">Boundary</div>
          <div class="aside__text" data-i18n="contact_boundary_text">
            Education only — no guaranteed results, no promised signals.
          </div>
        </div>
      </aside>
    </div>
  </div>
</section>

<?php get_footer(); ?>
