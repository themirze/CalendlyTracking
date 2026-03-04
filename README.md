# Calendly Tracking (GTM Listener)

This repository contains a small **Custom HTML** script for **Google Tag Manager (GTM)** that listens for Calendly booking events and pushes a Data Layer event you can use as a trigger in GTM.

- **Script file:** `calendlylistener.js`
- **Data Layer event name:** `calendly_booked`

> Note: Calendly is a third‑party product. This project is not an official Calendly repository.

---

## What it does

1. Listens for the Calendly `message` event `calendly.event_scheduled`.
2. Uses your **Calendly Personal Access Token** to call the Calendly API (GET on the invitee URI).
3. Pushes a `calendly_booked` event to `window.dataLayer` with booking details.

### Data Layer payload

When a booking is created, the script pushes something like:

```js
window.dataLayer.push({
  event: "calendly_booked",
  email: "...
  first_name: "...",
  last_name: "...",
  fullname: "...",
  question: [...],
  phone_number: "...",
  timezone: "...",
  utm_source: "...",
  utm_medium: "...",
  utm_campaign: "..."
});
```

---

## Setup (step-by-step)

### 1) Get your Calendly Personal Access Token

In Calendly:

1. Go to **Integrations & apps**
2. Open **API and webhooks**
3. Choose **Personal access tokens**
4. Click **Get a token now**

(See `calendly2.png` for the UI flow.)

### 2) Grant access / copy the token

Follow the Calendly screens to create the token and copy it.

(See `getToken.png`.)

### 3) Add the token to Google Tag Manager (Constant Variable)

In **Google Tag Manager**:

1. Go to **Variables** → **New**
2. Choose **Constant**
3. Name it exactly: **`Calendly_Token`**
4. Paste your token as the value

(See `setTokenOnGtm.png`.)

### 4) Add the listener script as a Custom HTML tag

1. In GTM go to **Tags** → **New**
2. Choose **Custom HTML**
3. Paste the contents of `calendlylistener.js`
4. Set a trigger (commonly **All Pages**)
5. Save

> Important: the script expects the token variable to be available as `{{Calendly_Token}}`.

---

## Test

1. Open **Preview** in GTM (Tag Assistant).
2. Complete a test booking in Calendly.
3. In Tag Assistant / Data Layer you should see an event named **`calendly_booked`**.

(See `result.png`.)

---

## Notes / Troubleshooting

- Make sure the listener tag fires on pages where your Calendly embed is loaded.
- If you get authorization errors, re-check the token value and that the variable name is **exactly** `Calendly_Token`.
- If you want a different event name, change the value of `event` in the `dataLayer.push`.

---

## Assets

This repo README references these images (add them to the repo if you want them displayed on GitHub):

- `calendly2.png`
- `getToken.png`
- `setTokenOnGtm.png`
- `result.png`

Calendly logo (external):
- https://www.stickpng.com/img/icons-logos-emojis/tech-companies/calendly-logo