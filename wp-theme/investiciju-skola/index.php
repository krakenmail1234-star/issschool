<?php
/**
 * Main template fallback (blog index, archives, search).
 */

if (!defined('ABSPATH')) {
    exit;
}

get_header();
?>

<section class="section">
  <div class="container">
    <div class="section__head">
      <h1 class="h2"><?php esc_html_e('Updates', 'investiciju-skola'); ?></h1>
    </div>

    <?php if (have_posts()) { ?>
      <div class="cards">
        <?php
        while (have_posts()) {
            the_post();
            ?>
            <article <?php post_class('card'); ?>>
              <div class="card__top">
                <h2 class="h3"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
              </div>
              <div class="subtle"><?php echo esc_html(get_the_date()); ?></div>
              <div class="panel" style="margin-top: 12px;">
                <?php the_excerpt(); ?>
              </div>
            </article>
            <?php
        }
        ?>
      </div>

      <div class="section__head" style="margin-top: 18px;">
        <?php the_posts_pagination(); ?>
      </div>
    <?php } else { ?>
      <article class="panel">
        <p><?php esc_html_e('No posts found.', 'investiciju-skola'); ?></p>
      </article>
    <?php } ?>
  </div>
</section>

<?php
get_footer();
