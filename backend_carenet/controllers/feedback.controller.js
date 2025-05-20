const Feedback = require("../models/feedback.model");
const asyncHandler = require("../middleware/asyncHandler");
const { checkContent } = require("../services/chatgptCheckInstance");
const HistoryEvent = require("../models/historyEvent.model");

// Define the async function
exports.createFeedback = asyncHandler(async (req, res) => {
  const { rating, content } = req.body;
  const { id } = req.params; // id = eventId
  const currentUser = req.user.user;

  try {
    // 1. Check user's event status in HistoryEvent
    const historyEvent = await HistoryEvent.findOne({ event: id, user: currentUser._id });
    if (!historyEvent) {
      return res.status(400).json({
        status: "fail",
        message: "Bạn chưa tham gia sự kiện này",
      });
    }

    // 2. Only allow feedback if status is "completed" or "finished"
    if (historyEvent.status !== "completed" && historyEvent.status !== "finished") {
      return res.status(400).json({
        status: "fail",
        message: "Trạng thái của bạn không được chấp thuận để đánh giá sự kiện này",
      });
    }

    // 3. Check content with OpenAI before creating feedback
    const contentCheck = await checkContent(content);
    if (!contentCheck.isAppropriate) {
      return res.status(400).json({
        status: "fail",
        message: "Nội dung không phù hợp",
        reason: contentCheck.reason,
      });
    }

    // 4. Create feedback if content is appropriate
    const feedback = await Feedback.create({
      eventId: id,
      userId: currentUser._id,
      rating,
      content,
    });

    // 5. If status is "finished", update to "completed" after feedback
    if (historyEvent.status === "finished") {
      await HistoryEvent.findByIdAndUpdate(historyEvent._id, { status: "completed" });
    }

    return res.status(201).json({
      status: "success",
      message: "Tạo đánh giá thành công",
      feedback: feedback,
    });
  } catch (error) {
    console.error("Error creating feedback:", error);
    return res.status(500).json({
      status: "fail",
      message: "Lỗi khi tạo đánh giá",
    });
  }
});

exports.getAllFeedback = asyncHandler(async (req, res) => {
  const user = req.user.user;
  try {
    // Get all feedbacks for the current user, populate eventId to get event title
    const feedbacks = await Feedback.find({ userId: user._id })
      .populate({
        path: "eventId",
        select: "title"
      });

    // Map to desired output: event title, content, rating, createdAt, _id
    const feedbackList = feedbacks.map(fb => ({
      _id: fb._id,
      eventTitle: fb.eventId?.title || null,
      content: fb.content,
      rating: fb.rating,
      createdAt: fb.createdAt
    }));

    return res.status(200).json({
      status: "success",
      message: "Lấy danh sách đánh giá thành công",
      feedbacks: feedbackList
    });
  } catch (error) {
    console.error("Error getting all feedback:", error);
    return res.status(500).json({
      status: "fail",
      message: "Lỗi khi lấy danh sách đánh giá",
    });
  }
});

exports.editFeedback = asyncHandler(async (req, res) => {
  const user = req.user.user;
  const { id } = req.params; // feedbackId
  const { content, rating } = req.body;

  try {
    // Find feedback by id and userId
    const feedback = await Feedback.findOne({ _id: id, userId: user._id });
    if (!feedback) {
      return res.status(404).json({
        status: "fail",
        message: "Feedback không tồn tại hoặc bạn không có quyền chỉnh sửa."
      });
    }

    // Optionally check content with OpenAI again (if you want to revalidate)
    if (content) {
      const contentCheck = await checkContent(content);
      if (!contentCheck.isAppropriate) {
        return res.status(400).json({
          status: "fail",
          message: "Nội dung không phù hợp",
          reason: contentCheck.reason,
        });
      }
      feedback.content = content;
    }
    if (rating !== undefined) {
      feedback.rating = rating;
    }

    await feedback.save();

    return res.status(200).json({
      status: "success",
      message: "Chỉnh sửa đánh giá thành công",
      feedback: feedback
    });
  } catch (error) {
    console.error("Error editing feedback:", error);
    return res.status(500).json({
      status: "fail",
      message: "Lỗi khi chỉnh sửa đánh giá",
    });
  }
});

exports.deleteFeedback = asyncHandler(async (req, res) => {
  const user = req.user.user;
  const { id } = req.params; // feedbackId

  try {
    // Find feedback by id and userId
    const feedback = await Feedback.findOne({ _id: id, userId: user._id });
    if (!feedback) {
      return res.status(404).json({
        status: "fail",
        message: "Feedback không tồn tại hoặc bạn không có quyền xóa."
      });
    }

    await Feedback.deleteOne({ _id: id, userId: user._id });

    return res.status(200).json({
      status: "success",
      message: "Xóa đánh giá thành công"
    });
  } catch (error) {
    console.error("Error deleting feedback:", error);
    return res.status(500).json({
      status: "fail",
      message: "Lỗi khi xóa đánh giá",
    });
  }
});