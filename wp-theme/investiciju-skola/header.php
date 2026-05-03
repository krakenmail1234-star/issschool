<?php
if (!defined('ABSPATH')) {
    exit;
}
?><!doctype html>
<html <?php language_attributes(); ?>>
  <head>
    <meta charset="<?php bloginfo('charset'); ?>" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="color-scheme" content="light" />
    <meta name="supported-color-schemes" content="light" />
    <meta name="theme-color" content="#f6f7fb" />
    <link rel="icon" href="<?php echo esc_url(get_stylesheet_directory_uri() . '/assets/logo-is.svg'); ?>" type="image/svg+xml" />
    <?php wp_head(); ?>
  </head>
  <?php
  $i18n_doc_title = 'meta_title_home';
  $i18n_doc_desc = 'meta_desc_home';
  if (!is_front_page() && is_singular('page')) {
      $slug = get_post_field('post_name', get_queried_object_id());
      $i18n_page_map = array(
          'program' => array('meta_title_program', 'meta_desc_program'),
          'about' => array('meta_title_about', 'meta_desc_about'),
          'services' => array('meta_title_services', 'meta_desc_services'),
          'privacy' => array('meta_title_privacy', 'meta_desc_privacy'),
          'discord' => array('meta_title_discord', 'meta_desc_discord'),
          'mentorship' => array('meta_title_mentorship', 'meta_desc_mentorship'),
          'faq' => array('meta_title_faq', 'meta_desc_faq'),
          'contact' => array('meta_title_contact', 'meta_desc_contact'),
      );
      if (isset($i18n_page_map[$slug])) {
          $i18n_doc_title = $i18n_page_map[$slug][0];
          $i18n_doc_desc = $i18n_page_map[$slug][1];
      }
  }
  ?>
  <body <?php body_class(); ?> data-privacy-href="<?php echo esc_url(home_url('/privacy/')); ?>"
    data-doc-title="<?php echo esc_attr($i18n_doc_title); ?>"
    data-doc-desc="<?php echo esc_attr($i18n_doc_desc); ?>">
    <?php wp_body_open(); ?>
    <a class="skip-link" href="#main" data-i18n="skip_to_content">Skip to content</a>

    <header class="topbar" data-elevates>
      <div class="container topbar__inner">
        <a class="brand" href="<?php echo esc_url(home_url('/')); ?>" data-i18n-aria="aria_brand_home">
          <img class="brand__logo" src="<?php echo esc_url(get_stylesheet_directory_uri() . '/assets/logo-is.svg'); ?>" alt="" aria-hidden="true" />
          <span class="brand__text">Investiciju Skola</span>
        </a>

        <nav class="nav" data-i18n-aria="aria_nav_primary">
          <a class="nav__link" href="<?php echo esc_url(home_url('/program/')); ?>" data-i18n="nav_program">Program</a>
          <a class="nav__link" href="<?php echo esc_url(home_url('/mentorship/')); ?>" data-i18n="nav_mentorship">Mentorship</a>
          <a class="nav__link" href="<?php echo esc_url(home_url('/faq/')); ?>" data-i18n="nav_faq">FAQ</a>
          <span class="nav__divider" aria-hidden="true"></span>
          <a class="nav__link" href="<?php echo esc_url(home_url('/about/')); ?>" data-i18n="nav_about">About</a>
          <a class="nav__link" href="<?php echo esc_url(home_url('/services/')); ?>" data-i18n="nav_services">Services</a>
          <a class="nav__link" href="<?php echo esc_url(home_url('/contact/')); ?>" data-i18n="nav_contact">Contact</a>
        </nav>

        <div class="topbar__actions">
          <select class="langselect" data-lang-select data-i18n-aria="aria_label_language">
            <option value="en">ENG</option>
            <option value="lv">LV</option>
            <option value="ru">RU</option>
          </select>
          <a class="button button--ghost" href="<?php echo esc_url(home_url('/program/')); ?>" data-i18n="cta_program">Program</a>
          <a class="button" href="<?php echo esc_url(home_url('/contact/')); ?>" data-i18n="cta_contact">Contact</a>

          <button class="iconbtn" type="button" data-menu-button data-i18n-aria="aria_open_menu" aria-expanded="false">
            <span class="iconbtn__bars" aria-hidden="true"></span>
          </button>
        </div>
      </div>

      <div class="mobilemenu" data-mobile-menu hidden>
        <div class="container mobilemenu__inner">
          <a class="mobilemenu__link" href="<?php echo esc_url(home_url('/program/')); ?>" data-i18n="nav_program">Program</a>
          <a class="mobilemenu__link" href="<?php echo esc_url(home_url('/mentorship/')); ?>" data-i18n="nav_mentorship">Mentorship</a>
          <a class="mobilemenu__link" href="<?php echo esc_url(home_url('/faq/')); ?>" data-i18n="nav_faq">FAQ</a>
          <div class="mobilemenu__divider"></div>
          <a class="mobilemenu__link" href="<?php echo esc_url(home_url('/about/')); ?>" data-i18n="nav_about">About</a>
          <a class="mobilemenu__link" href="<?php echo esc_url(home_url('/services/')); ?>" data-i18n="nav_services">Services</a>
          <a class="mobilemenu__link" href="<?php echo esc_url(home_url('/contact/')); ?>" data-i18n="nav_contact">Contact</a>
          <div class="mobilemenu__cta">
            <a class="button button--ghost" href="<?php echo esc_url(home_url('/program/')); ?>" data-i18n="hero_cta_primary">Explore the program</a>
            <a class="button" href="<?php echo esc_url(home_url('/contact/')); ?>" data-i18n="cta_contact">Contact</a>
          </div>
        </div>
      </div>
    </header>

    <main id="main">

