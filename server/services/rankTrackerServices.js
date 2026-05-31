import { chromium } from "playwright-core";
import Browserbase from "@browserbasehq/sdk";

const bb = new Browserbase({
  apiKey: process.env.BROWSERBASE_API_KEY,
});

export async function rankTracker(keyword, targetDomain) {
  let browser;

  try {
    const session = await bb.sessions.create({
      browserSettings: { blockAds: true },
    });

    browser = await chromium.connectOverCDP(session.connectUrl);

    const context = browser.contexts()[0];
    const page = await context.newPage();

    page.setDefaultNavigationTimeout(45000);

    await page.goto("https://www.google.com");

    const cleanTarget = targetDomain
      .replace(/^https?:\/\//, "")
      .replace(/^www\./, "")
      .split("/")[0]
      .toLowerCase();

    let allResults = [];
    let found = null;

    for (let gPage = 0; gPage < 5; gPage++) {
      await page.goto(
        `https://www.google.com/search?q=${encodeURIComponent(keyword)}&start=${gPage * 10}`,
      );

      await page.waitForSelector("div.tF2Cxc");

      const pageResults = await page.evaluate(() => {
        return Array.from(document.querySelectorAll("div.tF2Cxc"))
          .map((el) => {
            const a = el.querySelector("a");
            const h3 = el.querySelector("h3");
            const snippet = el.querySelector(".VwiC3b");

            if (!a || !h3) return null;

            return {
              url: a.href,
              domain: new URL(a.href).hostname
                .replace("www.", "")
                .toLowerCase(),
              title: h3.innerText,
              snippet: snippet?.innerText || "",
            };
          })
          .filter(Boolean);
      });

      for (const r of pageResults) {
        r.position = allResults.length + 1;
        allResults.push(r);

        // 🔥 FIXED: strict match
        if (!found && r.domain === cleanTarget) {
          found = { ...r, page: gPage + 1 };
        }
      }

      if (found) break;
    }

    await browser.close();

    const competitors = allResults
      .filter((r) => r.domain !== cleanTarget)
      .slice(0, 10);

    return {
      success: true,
      data: {
        keyword,
        targetDomain,
        position: found?.position || null,
        page: found?.page || null,
        title: found?.title || "",
        snippet: found?.snippet || "",
        competitors,
        totalResultsScanned: allResults.length,
      },
    };
  } catch (err) {
    console.error(err);
    if (browser) await browser.close().catch(() => {});
    return { success: false };
  }
}
