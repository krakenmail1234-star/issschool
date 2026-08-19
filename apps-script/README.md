# Form backend — Google Apps Script (sends email to info@intelektaskola.lv)

This makes all website forms send through the **info@intelektaskola.lv Gmail
account**:

- course applications notify `info@intelektaskola.lv` and confirm receipt to the applicant;
- contact messages notify `info@intelektaskola.lv` and confirm receipt to the visitor;
- popup signups notify `info@intelektaskola.lv` and automatically email the presentation.

## Popup presentation

The PDF is attached from the public website URL configured near the top of
`Code.gs`:

```js
var PRESENTATION_URL = 'https://www.intelektaskola.lv/assets/your-presentation.pdf';
```

After saving the script, select and run `authorizePresentationDelivery` once.
Approve the external-request permission and confirm the execution log reports
the PDF filename and byte count. Without this authorization, Apps Script accepts
the form request but cannot fetch or attach the PDF.

## Deploy (one time, ~2 minutes)

1. Sign in to Google as **info@intelektaskola.lv** (so emails are sent from that address).
2. Go to **https://script.google.com** → **New project**.
3. Delete the sample code, then paste the entire contents of [`Code.gs`](./Code.gs).
4. Click **Deploy → New deployment**.
5. Type = **Web app**. Set:
   - **Execute as:** Me (info@intelektaskola.lv)
   - **Who has access:** **Anyone**
6. Run `authorizePresentationDelivery` and approve Gmail/external-request access.
7. Click **Deploy** and approve any remaining requested permission.
8. Copy the **Web app URL** — it looks like
   `https://script.google.com/macros/s/AKfyc…/exec`.

## Connect it to the site

Open [`../scripts/config.js`](../scripts/config.js) and paste the URL:

```js
window.IS_CONFIG = {
  apiEndpoint: '',
  formEndpoint: 'https://script.google.com/macros/s/AKfyc…/exec',
};
```

`apiEndpoint` must be blank to select the Gmail/Apps Script route. Commit and
push after adding the real `/exec` URL.

## Invoice requests

Fixed-price products offer both Stripe card payment and **Saņemt rēķinu**.
Invoice requests are handled by `Code.gs`; the browser never assigns an invoice
number or controls the price. Apps Script validates the product against its
server-side `PRODUCTS` list and generates references in this format:

```text
INV_ONLINE#<monthly sequence>/<month>/<year>
```

The sequence is protected with `LockService` and stored in Script Properties,
so simultaneous requests cannot receive the same number. To view the total,
last reference, and monthly counts, select and run `getInvoiceStats` in the
Apps Script editor. The counts are deliberately not exposed by the public web
endpoint.

After updating `Code.gs`, create a new web-app version for the existing
deployment. Invoice emails require the deployment to execute as the owner.

## Notes

- A real `formEndpoint` cannot be invented or copied from another project. Google
  creates it only after the script is deployed from the Gmail account.
- Until `formEndpoint` is set, keep the current Vercel `apiEndpoint` active; do
  not publish both endpoint fields as blank.
- To test: open the web-app URL in a browser — it should say
  JSON containing `"ok":true` and `"presentationConfigured":true`.
- Free tier is generous (~100 emails/day) — plenty for a lead form.
- Edit the email wording (subjects/body) directly in `Code.gs`, then redeploy
  (**Deploy → Manage deployments → Edit → New version**).
