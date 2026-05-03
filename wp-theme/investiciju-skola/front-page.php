<?php
if (!defined('ABSPATH')) {
    exit;
}
get_header();
?>

<section class="hero">
  <div class="container hero__inner">
    <div class="hero__copy">
      <div class="badge">
        <span class="badge__dot" aria-hidden="true"></span>
        <span data-i18n="home_badge">Markets education, engineered for clarity</span>
      </div>
      <h1 class="h1">
        <span data-i18n="home_h1a">Learn financial markets with a</span>
        <span class="text-gradient" data-i18n="home_h1b">futuristic</span>
        <span data-i18n="home_h1c">edge.</span>
      </h1>
      <p class="lead" data-i18n="home_lead">
        Structured learning for trading fundamentals and market mechanics, weekly market briefings, and focused
        mentorship.
      </p>
      <div class="hero__cta">
        <a class="button" href="<?php echo esc_url(home_url('/program/')); ?>" data-i18n="hero_cta_primary">Explore the program</a>
        <a class="button button--ghost" href="<?php echo esc_url(home_url('/services/')); ?>" data-i18n="hero_cta_secondary">See services</a>
      </div>
      <div class="hero__meta">
        <div class="stat">
          <div class="stat__label" data-i18n="home_stat1_k">Focus</div>
          <div class="stat__value" data-i18n="home_stat1_v">FX · Indices · Crypto</div>
        </div>
        <div class="stat">
          <div class="stat__label" data-i18n="home_stat2_k">Format</div>
          <div class="stat__value" data-i18n="home_stat2_v">Lessons · Briefings · Mentorship</div>
        </div>
        <div class="stat">
          <div class="stat__label" data-i18n="home_stat3_k">Cadence</div>
          <div class="stat__value" data-i18n="home_stat3_v">Weekly reviews</div>
        </div>
      </div>
    </div>

    <div class="hero__panel" aria-hidden="true">
      <div class="glasscard glasscard--tall">
        <div class="glasscard__header">
          <div class="chip" data-i18n="home_pulse_title">Market Pulse</div>
          <div class="chip chip--muted" data-i18n="home_pulse_tag">Live framework</div>
        </div>
        <div class="glasscard__body">
          <div class="spark">
            <div class="spark__line"></div>
          </div>
          <div class="gridmini">
            <div class="gridmini__row">
              <span class="mono">EURUSD</span><span class="tag tag--up" data-i18n="home_tag_trend">trend</span><span class="mono" data-i18n="home_tag_structure">structure</span>
            </div>
            <div class="gridmini__row">
              <span class="mono">NAS100</span><span class="tag tag--flat" data-i18n="home_tag_range">range</span><span class="mono" data-i18n="home_tag_volatility">volatility</span>
            </div>
            <div class="gridmini__row">
              <span class="mono">BTC</span><span class="tag tag--down" data-i18n="home_tag_risk">risk</span><span class="mono" data-i18n="home_tag_liquidity">liquidity</span>
            </div>
          </div>
        </div>
        <div class="glasscard__footer">
          <div class="mono subtle" data-i18n="home_disclaimer">Not financial advice · Education only</div>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section__head">
      <h2 class="h2" data-i18n="home_program_h2">A program built like a system</h2>
      <p class="sublead" data-i18n="home_program_sublead">Progressive modules, practical frameworks, and clean mental models.</p>
    </div>
    <div class="cards">
      <article class="card">
        <div class="card__top">
          <div class="icon icon--grid" aria-hidden="true"></div>
          <h3 class="h3" data-i18n="home_prog_card1_title">Market mechanics</h3>
        </div>
        <p data-i18n="home_prog_card1_text">
          Order flow concepts, liquidity, sessions, volatility, and why price moves — explained clearly with examples.
        </p>
        <ul class="list">
          <li data-i18n="home_prog_card1_li1">Structure, regimes, and narrative</li>
          <li data-i18n="home_prog_card1_li2">Risk thinking and execution hygiene</li>
          <li data-i18n="home_prog_card1_li3">Review loops and journaling</li>
        </ul>
      </article>
      <article class="card">
        <div class="card__top">
          <div class="icon icon--spark" aria-hidden="true"></div>
          <h3 class="h3" data-i18n="home_prog_card2_title">Playbooks</h3>
        </div>
        <p data-i18n="home_prog_card2_text">Repeatable setups and decision trees — so you know what to do, and when not to.</p>
        <ul class="list">
          <li data-i18n="home_prog_card2_li1">Entry/exit protocols</li>
          <li data-i18n="home_prog_card2_li2">Conditions checklist</li>
          <li data-i18n="home_prog_card2_li3">Post-trade debrief</li>
        </ul>
      </article>
      <article class="card">
        <div class="card__top">
          <div class="icon icon--shield" aria-hidden="true"></div>
          <h3 class="h3" data-i18n="home_prog_card3_title">Mentorship layer</h3>
        </div>
        <p data-i18n="home_prog_card3_text">Feedback, review, and guidance tailored to your stage — from foundations to refinement.</p>
        <ul class="list">
          <li data-i18n="home_prog_card3_li1">1:1 reviews (optional)</li>
          <li data-i18n="home_prog_card3_li2">Actionable improvements</li>
          <li data-i18n="home_prog_card3_li3">Accountability cadence</li>
        </ul>
      </article>
    </div>
  </div>
</section>

<section id="reviews" class="section section--alt" aria-labelledby="reviews-title">
  <div class="container">
    <div class="section__head">
      <h2 class="h2" id="reviews-title" data-i18n="reviews_h2">What people say</h2>
      <p class="sublead" data-i18n="reviews_sub">
        Representative feedback — replace with verified testimonials when you publish real reviews.
      </p>
    </div>
    <div class="reviews">
      <figure class="review">
        <blockquote class="review__quote" data-i18n="review_1_quote">
          The clearest market education I’ve taken. The frameworks finally made risk and execution feel actionable.
        </blockquote>
        <figcaption class="review__footer">
          <div class="review__name" data-i18n="review_1_name">A.K.</div>
          <div class="review__role" data-i18n="review_1_role">Independent trader</div>
        </figcaption>
      </figure>
      <figure class="review">
        <blockquote class="review__quote" data-i18n="review_2_quote">
          Structured, calm, no hype. The review loops changed how I journal and how I size positions.
        </blockquote>
        <figcaption class="review__footer">
          <div class="review__name" data-i18n="review_2_name">M.R.</div>
          <div class="review__role" data-i18n="review_2_role">Part-time swing trader</div>
        </figcaption>
      </figure>
      <figure class="review">
        <blockquote class="review__quote" data-i18n="review_3_quote">
          Mentorship gave me a weekly rhythm I could sustain. I treat learning like engineering now — not gambling.
        </blockquote>
        <figcaption class="review__footer">
          <div class="review__name" data-i18n="review_3_name">L.S.</div>
          <div class="review__role" data-i18n="review_3_role">Career switcher</div>
        </figcaption>
      </figure>
    </div>
  </div>
</section>

<?php get_footer(); ?>

