import KeywordTracking from "../models/keywordTracking.js";
import { keywordTracking } from "../services/keywordTrackingService.js";

/**
 * ADD KEYWORD
 */
export const addKeyword = async (req, res) => {
  try {
    const { keyword, url } = req.body;

    if (!keyword || !url) {
      return res.status(400).json({
        success: false,
        message: "Keyword and URL are required",
      });
    }

    // normalize URL
    let domain;
    let fullUrl;

    try {
      fullUrl = url.startsWith("http") ? url : `https://${url}`;
      const urlObj = new URL(fullUrl);
      domain = urlObj.hostname.replace("www.", "").toLowerCase();
    } catch {
      return res.status(400).json({
        success: false,
        message: "Invalid URL format",
      });
    }

    const cleanKeyword = keyword.toLowerCase().trim();

    // prevent duplicate tracking
    const existing = await KeywordTracking.findOne({
      userId: req.userId,
      keyword: cleanKeyword,
      domain,
    });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Already tracking this keyword for this domain",
      });
    }

    const tracking = await KeywordTracking.create({
      userId: req.userId,
      keyword: cleanKeyword,
      url: fullUrl,
      domain,
      status: "checking",
      currentPosition: null,
      currentPage: null,
      bestPosition: null,
      positionChange: 0,
      competitors: [],
      rankHistory: [],
      active: true,
    });

    res.status(201).json({
      success: true,
      message: "Keyword tracking started",
      tracking,
    });

    // async processing
    keywordTracking(tracking);
  } catch (error) {
    console.error("add keyword error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

/**
 * GET ALL KEYWORDS
 */
export const getKeywords = async (req, res) => {
  try {
    const keywords = await KeywordTracking.find({
      userId: req.userId,
    })
      .sort({ createdAt: -1 })
      .select("-rankHistory");

    return res.json({
      success: true,
      keywords,
    });
  } catch (error) {
    console.error("get keywords error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

/**
 * GET SINGLE KEYWORD
 */
export const getKeyword = async (req, res) => {
  try {
    const tracking = await KeywordTracking.findOne({
      _id: req.params.id,
      userId: req.userId,
    });

    if (!tracking) {
      return res.status(404).json({
        success: false,
        message: "Tracking not found",
      });
    }

    return res.json({
      success: true,
      tracking,
    });
  } catch (error) {
    console.error("get keyword error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

/**
 * REFRESH KEYWORD RANK
 */
export const refreshKeyword = async (req, res) => {
  try {
    const tracking = await KeywordTracking.findOne({
      _id: req.params.id,
      userId: req.userId,
    });

    if (!tracking) {
      return res.status(404).json({
        success: false,
        message: "Tracking not found",
      });
    }

    tracking.status = "checking";
    await tracking.save();

    res.json({
      success: true,
      message: "Rank check started",
    });

    keywordTracking(tracking);
  } catch (error) {
    console.error("refresh keyword error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

/**
 * DELETE KEYWORD
 */
export const deleteKeyword = async (req, res) => {
  try {
    const tracking = await KeywordTracking.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId,
    });

    if (!tracking) {
      return res.status(404).json({
        success: false,
        message: "Tracking not found",
      });
    }

    return res.json({
      success: true,
      message: "Keyword tracking deleted",
    });
  } catch (error) {
    console.error("delete keyword error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

/**
 * TOGGLE ACTIVE
 */
export const toggleTracking = async (req, res) => {
  try {
    const tracking = await KeywordTracking.findOne({
      _id: req.params.id,
      userId: req.userId,
    });

    if (!tracking) {
      return res.status(404).json({
        success: false,
        message: "Tracking not found",
      });
    }

    tracking.active = !tracking.active;
    await tracking.save();

    return res.json({
      success: true,
      tracking,
    });
  } catch (error) {
    console.error("toggle tracking error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
