# Investiciju Skola — WordPress Theme

This folder contains a WordPress theme built **from your current front-end**.
It is added **without changing** your existing static site files.

## Install

1. Copy the folder `wp-theme/investiciju-skola` into:
   - `wp-content/themes/investiciju-skola`
2. In WordPress Admin → Appearance → Themes, activate **Investiciju Skola**.

## Create pages (to match the header links)

Create these WordPress pages with these slugs:

- `/program/`
- `/discord/`
- `/mentorship/`
- `/faq/`
- `/about/`
- `/services/`
- `/contact/`
- `/privacy/` (Privacy & cookies; link appears in the footer and cookie banner)

Set **Settings → Reading**:
- Homepage displays: **A static page**
- Homepage: choose your Home page

`front-page.php` will render the homepage layout.

## Assets

These files are included in the theme directory (copied from the static site root):

- `assets/logo-is.svg`
- `styles/base.css` (+ optional alternates under `styles/themes/`)
- `styles/theme.css`
- `scripts/site.js`

If you change the static site’s `assets/`, `styles/`, or `scripts/`, copy the updated files into the theme folder before deploying WordPress.

## Next steps (recommended)

- Convert each page (`/about/`, `/services/`, etc.) from generic `page.php` content to custom templates that match your existing layouts.
- Replace “mailto” with a real form handler plugin (e.g. Contact Form 7 / Fluent Forms) or a custom endpoint.

