import { rankTracker } from "./rankTrackerServices.js";

export async function keywordTracking(tracking) {
  try {
    let result;

    const cleanTarget = tracking.domain
      .replace(/^https?:\/\//, "")
      .replace(/^www\./, "")
      .split("/")[0]
      .toLowerCase();

    for (let attempt = 1; attempt <= 2; attempt++) {
      result = await rankTracker(tracking.keyword, tracking.domain);

      if (result.success && result.data?.totalResultsScanned > 0) break;

      await new Promise((r) => setTimeout(r, 3000));
    }

    if (!result?.success) {
      tracking.status = "failed";
      await tracking.save();
      return result;
    }

    const prev = tracking.currentPosition;

    tracking.currentPosition = result.data.position || null;
    tracking.currentPage = result.data.page || null;
    tracking.competitors = result.data.competitors || [];
    tracking.lastChecked = new Date();
    tracking.status = "completed";

    tracking.positionChange =
      prev && result.data.position ? prev - result.data.position : 0;

    if (
      !tracking.bestPosition ||
      (result.data.position && result.data.position < tracking.bestPosition)
    ) {
      tracking.bestPosition = result.data.position;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const historyEntry = {
      date: today,
      position: result.data.position,
      page: result.data.page,
      title: result.data.title,
      snippet: result.data.snippet,
    };

    const idx = tracking.rankHistory.findIndex(
      (h) => h.date.toDateString() === today.toDateString(),
    );

    if (idx >= 0) tracking.rankHistory[idx] = historyEntry;
    else tracking.rankHistory.push(historyEntry);

    await tracking.save();

    return result;
  } catch (err) {
    console.error(err);
    tracking.status = "failed";
    await tracking.save().catch(() => {});
    return { success: false };
  }
}
