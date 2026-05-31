import Analysis from "../models/Analysis.js";
import { scrapeUrl } from "../services/scraperService.js";
import { analyzeSeoData } from "../services/geminiService.js";
// analyse url
export const analyzeUrl = async (req, res) => {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({
        success: false,
        message: "URL is required",
      });
    }

    // validate url format
    let validUrl;

    try {
      validUrl = new URL(url.startsWith("http") ? url : `https://${url}`);
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: "Invalid URL format",
      });
    }

    // create analysis record with pending status
    const analysis = await Analysis.create({
      userId: req.userId,
      url: validUrl.href,
      status: "pending",
    });

    // send immediate response
    res.json({
      success: true,
      message: "Analysis started",
      analysisId: analysis._id,
    });

    // run scraping and analysis in background
    try {
      // step 1 : scrape the url with BrowserBase
      const scrapeResult = await scrapeUrl(validUrl.href);

      if (!scrapeResult.success) {
        analysis.status = "failed";
        await analysis.save();
        return;
      }

      // step 2: analyze with gemini ai
      const aiResult = await analyzeSeoData(scrapeResult.data);
      if (!aiResult.success) {
        analysis.status = "failed";
        await analysis.save();
        return;
      }
      //save result
      analysis.overallScore = aiResult.data.overallScore || 0;
      analysis.categories = aiResult.data.categories || {};
      analysis.metaData = scrapeResult.data.metaData || {};
      analysis.headings = scrapeResult.data.headings || {};
      analysis.links = scrapeResult.data.links || {};
      analysis.images = scrapeResult.data.images || {};
      analysis.keywords = aiResult.data.keywords || [];
      analysis.issues = aiResult.data.issues || [];
      analysis.loadTime = scrapeResult.data.loadTime || 0;
      analysis.pageSize = scrapeResult.data.pageSize || 0;
      analysis.wordCount = scrapeResult.data.wordCount || 0;
      analysis.status = "completed";
      await analysis.save();
    } catch (bgError) {
      console.error("Background analysis error:", bgError.message);

      try {
        analysis.status = "failed";
        await analysis.save();
      } catch (saveError) {
        console.error("Failed to save failed analysis:", saveError.message);
      }
    }
  } catch (error) {
    console.error("Analysis error", error.message);

    if (!res.headersSent) {
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }
};

// get analysis by id
export const getAnalysis = async (req, res) => {
  try {
    const analysis = await Analysis.findOne({
      _id: req.params.id,
      userId: req.userId,
    });
    if (!analysis)
      return res
        .status(404)
        .json({ success: false, message: "Analysis not found" });
    res.json({ success: true, analysis });
  } catch (error) {
    console.error("Error fetching analysis:", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// get all analyses for user
export const getAnalyses = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const analyses = await Analysis.find({ userId: req.userId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .select("-issues -keywords");
    const total = await Analysis.countDocuments({ userId: req.userId });
    res.json({
      success: true,
      data: analyses,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    });
  } catch (error) {
    console.error("get analyses error:", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// delete analysis
export const deleteAnalysis = async (req, res) => {
  try {
    await Analysis.findOneAndDelete({ _id: req.params.id, userId: req.userId });

    res.json({ success: true, message: "Analysis deleted successfully" });
  } catch (error) {
    console.error("Error deleting analysis:", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
