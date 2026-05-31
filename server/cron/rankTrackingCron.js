import cron from "node-cron";
import KeywordTracking from "../models/keywordTracking.js";
import { keywordTracking } from "../services/keywordTrackingService.js";

export function startRankTrackingCron() {
  cron.schedule("0 6 * * *", async () => {
    console.log("Running rank tracking...");

    try {
      const activeTrackings = await KeywordTracking.find({
        active: true,
      });

      for (const tracking of activeTrackings) {
        tracking.status = "checking";
        await tracking.save();

        await keywordTracking(tracking);

        // Delay between checks
        await new Promise((resolve) =>
          setTimeout(resolve, 1000 + Math.random() * 5000),
        );
      }
    } catch (error) {
      console.error(
        "[CRON] Error occurred while tracking ranks:",
        error.message,
      );
    }
  });

  console.log("Rank tracking cron started, will run every 24 hours at 6:00 AM");
}
