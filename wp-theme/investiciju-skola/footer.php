<?php
if (!defined('ABSPATH')) {
    exit;
}
?>
    </main>

    <footer class="footer">
      <div class="container footer__inner">
        <div class="footer__left">
          <div class="brand brand--small">
            <img class="brand__logo" src="<?php echo esc_url(get_stylesheet_directory_uri() . '/assets/logo-is.svg'); ?>" alt="" aria-hidden="true" />
            <span class="brand__text">Investiciju Skola</span>
          </div>
          <div class="footer__meta">© <span id="year"></span> · <span data-i18n="footer_tagline">Education & mentorship.</span></div>
        </div>
        <div class="footer__right">
          <a class="footer__link" href="<?php echo esc_url(home_url('/about/')); ?>" data-i18n="nav_about">About</a>
          <a class="footer__link" href="<?php echo esc_url(home_url('/services/')); ?>" data-i18n="nav_services">Services</a>
          <a class="footer__link" href="<?php echo esc_url(home_url('/privacy/')); ?>" data-i18n="nav_privacy">Privacy</a>
          <a class="footer__link" href="<?php echo esc_url(home_url('/contact/')); ?>" data-i18n="nav_contact">Contact</a>
        </div>
      </div>
    </footer>

    <?php wp_footer(); ?>
  </body>
</html>

