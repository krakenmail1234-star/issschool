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
        <span data-i18n="discord_badge">Discord</span>
      </div>
      <h1 class="h1" data-i18n="discord_h1">Community, not noise.</h1>
      <p class="lead" data-i18n="discord_lead">Briefings, frameworks, Q&A, and a culture of clean execution.</p>
    </div>
    <div class="pagehero__panel" aria-hidden="true">
      <div class="glasscard">
        <div class="glasscard__header">
          <div class="chip" data-i18n="discord_chip_discord_first">Discord-first</div>
          <div class="chip chip--muted" data-i18n="discord_chip_structured">Structured</div>
        </div>
        <div class="glasscard__body">
          <div class="mono" data-i18n="discord_card_line">Weekly overviews · Live Q&A · Reviews</div>
          <div class="divider"></div>
          <div class="mono subtle" data-i18n="discord_card_note">Replace invite URL in `scripts/site.js`</div>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="split">
      <div class="split__left">
        <div class="panel">
          <div class="panel__title" data-i18n="discord_panel_title">What you’ll find</div>
          <ul class="list">
            <li data-i18n="discord_li1">Weekly overviews and watchlists</li>
            <li data-i18n="discord_li2">Live Q&A sessions</li>
            <li data-i18n="discord_li3">Trade review structure</li>
            <li data-i18n="discord_li4">Resources + templates</li>
          </ul>
          <div class="panel__actions">
            <a class="button" href="#" data-discord-link data-i18n="discord_open_invite">Open Discord invite</a>
            <a class="button button--ghost" href="<?php echo esc_url(home_url('/contact/')); ?>" data-i18n="discord_ask_question">Ask a question</a>
          </div>
          <div class="fineprint" data-i18n="discord_fineprint">Default button uses the link set in `scripts/site.js`.</div>
        </div>
      </div>
      <div class="split__right">
        <div class="quote">
          <div class="quote__mark" aria-hidden="true">“</div>
          <p class="quote__text" data-i18n="discord_quote">A systems room: rules, reviews, and calm progress.</p>
          <div class="quote__byline" data-i18n="discord_byline">— Community ethos</div>
        </div>
        <div class="mini">
          <div class="mini__k" data-i18n="discord_mini_k1">Signal-to-noise</div>
          <div class="mini__v" data-i18n="discord_mini_v1">High</div>
          <div class="mini__k" data-i18n="discord_mini_k2">Cadence</div>
          <div class="mini__v" data-i18n="discord_mini_v2">Weekly</div>
          <div class="mini__k" data-i18n="discord_mini_k3">Support</div>
          <div class="mini__v" data-i18n="discord_mini_v3">Ongoing</div>
        </div>
      </div>
    </div>
  </div>
</section>

<?php get_footer(); ?>
