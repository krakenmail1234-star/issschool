<?php
if (!defined('ABSPATH')) {
    exit;
}
get_header();
?>

<section class="pagehero">
  <div class="container pagehero__inner">
    <div>
      <h1 class="h1" data-i18n="privacy_title">Privacy & cookies</h1>
      <p class="lead" data-i18n="privacy_intro">
        This site is an education-focused demo. We do not run accounts, payments, or analytics trackers in this
        static build.
      </p>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <article class="panel">
      <p class="sublead" style="margin: 0" data-i18n="privacy_cookies">
        The cookie banner records your choice in local storage (accepted / essential-only). Language selection is
        stored the same way. No third-party ad cookies are set by this template.
      </p>
    </article>
  </div>
</section>

<?php get_footer(); ?>
