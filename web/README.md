# Magnexis LLC — Official website

A responsive, multi-page, static corporate website for Magnexis LLC.

## Pages

- `/` Home
- `/capabilities/` Software, AI, security & systems engineering
- `/work/` Selected portfolio with filters
- `/research/` Research practice
- `/docs/` Documentation and searchable guides
- `/docs/getting-started/`, `/docs/open-source/`, `/docs/security/`, `/docs/collaboration/`
- `/company/` About
- `/contact/` Contact form (Netlify Forms)
- `/thanks/` Confirmation
- `404.html` Error page

## Local development

```bash
cd web
python3 -m http.server 8080
```

Open `http://localhost:8080` in a browser. For URLs with no trailing slash, follow the browser redirect to the index page.

## Deploy to Netlify

The repository root includes `netlify.toml` with `[build] base = "web"` and `publish = "."`. In Netlify, select **Add new project → Import an existing project → GitHub**, choose this repository, and publish. The Netlify Git integration will deploy changes from `main` automatically after initial authorization.

This website uses **Netlify Forms** for the contact form. Confirm the form is detected under Forms after the initial deploy and test submission. No API keys are committed. Contact email is deliberately a known founder email rather than an unverified corporate mailbox.

## Editorial constraints

- Portfolio labels describe project stages and do not imply commercial release or customer endorsement.
- Contact form must be verified in Netlify before claiming it processes inquiries.
- No fabricated customer logos, awards, results, warranties, or partnerships.
- Update legal/footer and domain metadata after official review.

## Stack

Framework-free HTML/CSS/JS. No build dependencies. Accessibility-aware navigation, reduced-motion handling, live docs search, site-wide command search, project filters, responsive layouts, and theme persistence.
