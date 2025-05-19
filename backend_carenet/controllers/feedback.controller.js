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



