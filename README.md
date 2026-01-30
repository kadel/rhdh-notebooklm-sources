# rhdh-notebooklm-sources

A Node.js script that extracts Red Hat Developer Hub (RHDH) documentation URLs using Playwright.

## Purpose

Generates a list of RHDH documentation URLs in single-page HTML format (`html-single`) that can be directly added as sources in [NotebookLM](https://notebooklm.google.com/) to create an AI-powered knowledge base of Red Hat Developer Hub documentation.

## Installation

```bash
# Install dependencies
npm install

# Install Playwright browser (first time only)
npx playwright install chromium
```

## Usage

```bash
# Basic usage (version is required)
npm start -- <version>

# Examples
npm start -- 1.8                  # Get all docs for version 1.8
npm start -- 1.7 --categories     # Get docs for version 1.7 with category headers

# Save output to file
npm start -- 1.8 > docs-urls.txt
```

## Options

| Argument | Required | Description |
|----------|----------|-------------|
| `<version>` | Yes | RHDH version number (e.g., `1.8`, `1.7`) |
| `--categories` | No | Group URLs under category headers |

## Output

The script outputs documentation URLs to stdout, one per line:

```
https://docs.redhat.com/en/documentation/red_hat_developer_hub/1.8/html-single/getting_started_guide/...
https://docs.redhat.com/en/documentation/red_hat_developer_hub/1.8/html-single/administration_guide/...
```

With `--categories`:

```
Getting started
https://docs.redhat.com/en/documentation/red_hat_developer_hub/1.8/html-single/getting_started_guide/...

Administration
https://docs.redhat.com/en/documentation/red_hat_developer_hub/1.8/html-single/administration_guide/...
```

## License

ISC
