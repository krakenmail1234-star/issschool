# Form backend — Google Apps Script (sends email to info@intelektaskola.lv)

This makes the website's **contact form** and **free-guide popup** send real emails
(your static site can't send email by itself). It also auto-replies "thank you" to
people who request the AI Guide.

## Deploy (one time, ~2 minutes)

1. Sign in to Google as **info@intelektaskola.lv** (so emails are sent from that address).
2. Go to **https://script.google.com** → **New project**.
3. Delete the sample code, then paste the entire contents of [`Code.gs`](./Code.gs).
4. Click **Deploy → New deployment**.
5. Type = **Web app**. Set:
   - **Execute as:** Me (info@intelektaskola.lv)
   - **Who has access:** **Anyone**
6. Click **Deploy**, approve the permissions prompt (it needs permission to send email).
7. Copy the **Web app URL** — it looks like
   `https://script.google.com/macros/s/AKfyc…/exec`.

## Connect it to the site

Open [`../scripts/config.js`](../scripts/config.js) and paste the URL:

```js
window.IS_CONFIG = {
  formEndpoint: 'https://script.google.com/macros/s/AKfyc…/exec',
};
```

Commit + push. Done — submissions now email **info@intelektaskola.lv**, and guide
signups get an automatic thank-you reply.

## Notes

- Until `formEndpoint` is set, forms fall back to opening the visitor's email client
  (mailto:), so nothing breaks in the meantime.
- To test: open the web-app URL in a browser — it should say
  "Intelekta Skola form endpoint is running."
- Free tier is generous (~100 emails/day) — plenty for a lead form.
- Edit the email wording (subjects/body) directly in `Code.gs`, then redeploy
  (**Deploy → Manage deployments → Edit → New version**).
