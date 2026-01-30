const { chromium } = require("playwright");

const args = process.argv.slice(2);
const showCategories = args.includes("--categories");
const version = args.find(arg => !arg.startsWith("--"));

if (!version) {
  console.error("Usage: node get-rhdh-docs.js <version> [--categories]");
  console.error("Example: node get-rhdh-docs.js 1.8");
  process.exit(1);
}

async function getRHDHDocLinks(version) {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto(
    `https://docs.redhat.com/en/documentation/red_hat_developer_hub/${version}/`
  );

  await page.waitForSelector("h2");

  const categories = await page.evaluate(() => {
    const results = [];
    const categoryHeaders = document.querySelectorAll("main h2");

    categoryHeaders.forEach((header) => {
      const categoryName = header.textContent.trim();

      if (
        !categoryName ||
        categoryName === "Left Navigation" ||
        categoryName === "Red Hat footer"
      ) {
        return;
      }

      const categoryContainer = header.closest("[class]")?.parentElement;
      if (!categoryContainer) return;

      const links = [];
      const docLinks = categoryContainer.querySelectorAll("h3 a");

      docLinks.forEach((link) => {
        const url = link.href.replace("/html/", "/html-single/");
        if (url.includes("/html-single/")) {
          links.push(url);
        }
      });

      if (links.length > 0) {
        results.push({
          category: categoryName,
          links,
        });
      }
    });

    return results;
  });

  await browser.close();
  return categories;
}

async function main() {
  try {
    const categories = await getRHDHDocLinks(version);

    if (showCategories) {
      categories.forEach((cat) => {
        console.log(`\n${cat.category}`);
        cat.links.forEach((link) => console.log(link));
      });
    } else {
      categories.forEach((cat) => {
        cat.links.forEach((link) => console.log(link));
      });
    }
  } catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }
}

main();
