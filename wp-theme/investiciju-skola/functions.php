<?php
/**
 * Investiciju Skola theme functions.
 */

if (!defined('ABSPATH')) {
    exit;
}

function investiciju_skola_enqueue_assets(): void
{
    $ver = wp_get_theme()->get('Version');

    // Fonts
    wp_enqueue_style(
        'investiciju-skola-fonts',
        'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap',
        [],
        null
    );

    // CSS
    wp_enqueue_style(
        'investiciju-skola-base',
        get_stylesheet_directory_uri() . '/styles/base.css',
        [],
        $ver
    );
    wp_enqueue_style(
        'investiciju-skola-theme',
        get_stylesheet_directory_uri() . '/styles/theme.css',
        ['investiciju-skola-base'],
        $ver
    );

    // JS
    wp_enqueue_script(
        'investiciju-skola-site',
        get_stylesheet_directory_uri() . '/scripts/site.js',
        [],
        $ver,
        true
    );
}
add_action('wp_enqueue_scripts', 'investiciju_skola_enqueue_assets');

function investiciju_skola_theme_support(): void
{
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
}
add_action('after_setup_theme', 'investiciju_skola_theme_support');

