<?php
if (!defined('ABSPATH')) {
    exit;
}
get_header();

// For now, render the WordPress page content in the site shell.
// You can later replace this with custom blocks/ACF fields matching the static layout sections.
?>

<section class="section">
  <div class="container">
    <div class="section__head">
      <h1 class="h2"><?php the_title(); ?></h1>
    </div>
    <article class="panel">
      <?php
      while (have_posts()) {
          the_post();
          the_content();
      }
      ?>
    </article>
  </div>
</section>

<?php get_footer(); ?>

