# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A Node.js script that scrapes Red Hat Developer Hub (RHDH) documentation links using Playwright. It extracts all document URLs from the documentation landing page for a specified version, outputting them in single-page HTML format (`html-single`).

The primary use case is generating documentation URLs that can be directly added as sources in NotebookLM to create an AI-powered knowledge base of RHDH documentation.

## Dependencies

- Node.js
- Playwright (`playwright` npm package)

## Commands

```bash
# Install dependencies
npm install

# Install Playwright browsers (required on first run)
npx playwright install chromium

# Run the script (version required)
npm start -- 1.8

# Run with category headers
npm start -- 1.8 --categories
```

## Architecture

Single-file script (`get-rhdh-docs.js`) that:
1. Launches headless Chromium via Playwright
2. Navigates to RHDH docs page for the specified version and extracts category sections from `<main>` element
3. Parses document links from `<h3>` elements within each category
4. Filters out non-documentation headers (e.g., "Left Navigation", "Red Hat footer")
5. Outputs URLs to stdout (converts `/html/` paths to `/html-single/`)

## Output

The script outputs documentation URLs, one per line:

```
https://docs.redhat.com/en/documentation/red_hat_developer_hub/<version>/html-single/getting_started_guide/...
https://docs.redhat.com/en/documentation/red_hat_developer_hub/<version>/html-single/administration_guide/...
```

With `--categories`, URLs are grouped under category headers.
