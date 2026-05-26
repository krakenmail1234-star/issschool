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
            <img class="brand__logo" src="<?php echo esc_url('https://i.imgur.com/bsQTVXQ.png'); ?>" alt="" aria-hidden="true" />
            <span class="brand__text">Investiciju Skola</span>
          </div>
          <div class="footer__meta">© <span id="year"></span> · <span data-i18n="footer_tagline">Education & support.</span></div>
          <div class="footer__social">
            <span class="footer__social-label" data-i18n="footer_social_label">Follow us</span>
            <div class="footer__social-links">
              <a class="socialicon" href="https://www.facebook.com/intelektaskola" data-social="facebook" target="_blank" rel="noopener noreferrer" data-i18n-aria="aria_social_facebook">
                <svg class="socialicon__svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a class="socialicon" href="https://www.instagram.com/intelektaskola/" data-social="instagram" target="_blank" rel="noopener noreferrer" data-i18n-aria="aria_social_instagram">
                <svg class="socialicon__svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
              <a class="socialicon" href="https://www.linkedin.com/company/intelektaskola" data-social="linkedin" target="_blank" rel="noopener noreferrer" data-i18n-aria="aria_social_linkedin">
                <svg class="socialicon__svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 010-4.124 2.062 2.062 0 010 4.124zM7.114 20.452H3.56V9h3.554v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
            </div>
          </div>
        </div>
        <div class="footer__faq">
          <h2 class="footer__faq-title" data-i18n="footer_faq_title">BUJ</h2>
          <div class="footer__faq-list faq faq--compact">
            <details class="faq__item">
              <summary data-i18n="faq_q1">Vai apmācības ir piemērotas iesācējiem?</summary>
              <div class="faq__body" data-i18n="faq_a1">Jā. Programmas tiek veidotas atbilstoši dalībnieku līmenim.</div>
            </details>
            <details class="faq__item">
              <summary data-i18n="faq_q2">Vai ir nepieciešamas programmēšanas zināšanas?</summary>
              <div class="faq__body" data-i18n="faq_a2">Nē, izņemot gadījumos, kad apmācām programmētājus ar Cursor un Copilot.</div>
            </details>
            <details class="faq__item">
              <summary data-i18n="faq_q3">Kādā valodā notiek apmācības?</summary>
              <div class="faq__body" data-i18n="faq_a3">Galvenokārt latviešu valodā, ar angļu terminoloģiju.</div>
            </details>
            <details class="faq__item">
              <summary data-i18n="faq_q4">Vai varam saņemt apmācības klātienē?</summary>
              <div class="faq__body" data-i18n="faq_a4">Jā – Rīgā, citās Latvijas pilsētās vai jūsu birojā.</div>
            </details>
            <details class="faq__item">
              <summary data-i18n="faq_q5">Kā ilgi ilgst viena apmācība?</summary>
              <div class="faq__body" data-i18n="faq_a5">Ievadlekcija parasti 1,5–2 stundas. Korporatīvās programmas tiek plānotas pēc jūsu mērķiem.</div>
            </details>
            <details class="faq__item">
              <summary data-i18n="faq_q6">Kādus AI rīkus jūs apgūstat?</summary>
              <div class="faq__body" data-i18n="faq_a6">ChatGPT, Claude, Cursor, GitHub Copilot un citus rīkus atbilstoši uzdevumiem.</div>
            </details>
            <details class="faq__item">
              <summary data-i18n="faq_q7">Kā notiek apmaksa?</summary>
              <div class="faq__body" data-i18n="faq_a7">Pakalpojumus var iegādāties tiešsaistē caur Stripe. Korporatīvajiem projektiem — individuāls piedāvājums.</div>
            </details>
            <details class="faq__item">
              <summary data-i18n="faq_q8">Vai dati un konfidencialitāte ir nodrošināta?</summary>
              <div class="faq__body" data-i18n="faq_a8">Jā. Strādājam ar jūsu materiāliem droši; korporatīvajiem klientiem varam parakstīt NDA.</div>
            </details>
            <details class="faq__item">
              <summary data-i18n="faq_q9">Vai ir iespējama apmācība tikai vadībai?</summary>
              <div class="faq__body" data-i18n="faq_a9">Jā. Īsas sesijas vadītājiem par AI stratēģiju un ieviešanas prioritātēm.</div>
            </details>
            <details class="faq__item">
              <summary data-i18n="faq_q10">Kā pieteikties?</summary>
              <div class="faq__body" data-i18n="faq_a10">Rakstiet uz info@intelektaskola.lv, izmantojiet kontaktu formu vai rezervējiet caur Pakalpojumi lapu.</div>
            </details>
          </div>
          <a class="footer__faq-more" href="<?php echo esc_url(home_url('/faq/')); ?>" data-i18n="footer_faq_more">Visi jautājumi →</a>
        </div>
        <div class="footer__right">
          <a class="footer__link" href="<?php echo esc_url(home_url('/program/')); ?>" data-i18n="nav_program">Program</a>
          <a class="footer__link" href="<?php echo esc_url(home_url('/services/')); ?>" data-i18n="nav_services">Services</a>
          <a class="footer__link" href="<?php echo esc_url(home_url('/musu-darbi/')); ?>" data-i18n="nav_work">Our work</a>
          <a class="footer__link" href="<?php echo esc_url(home_url('/faq/')); ?>" data-i18n="nav_faq">FAQ</a>
          <a class="footer__link" href="<?php echo esc_url(home_url('/privacy/')); ?>" data-i18n="nav_privacy">Privacy</a>
          <a class="footer__link" href="<?php echo esc_url(home_url('/contact/')); ?>" data-i18n="nav_contact">Contact</a>
        </div>
      </div>
    </footer>

    <?php wp_footer(); ?>
  </body>
</html>

