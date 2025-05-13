const User = require("../models/user.model");
const Event = require("../models/event.model");
const EventRegistration = require("../models/eventRegistration.model");
const asyncHandler = require("../middleware/asyncHandler");

exports.eventRegistration = asyncHandler(async (req, res) => {
  const { eventId } = req.body;
  const user = req.user.user;
  const userId = user._id;
  const event = await Event.findById(eventId);
  const eventRegistration = await EventRegistration.create({
    event: event._id,
    user: userId,
  });
  return res.status(200).json({
    status: "success",
    message: "Event registration successfully",
    eventRegistration: eventRegistration,
  });
});

exports.getCurrentUserForEventRegistration = asyncHandler(async (req, res) => {
  const user = req.user.user;
  console.log("Hit route");
  return res.status(200).json({
    status: "success",
    message: "Get current user successfully",
    user: user,
  });
});

exports.getEventRegistration = asyncHandler(async (req, res) => {
  const user = req.user.user;
  const eventRegistrations = await EventRegistration.find({ user: user._id })
    .populate("event")
    .populate("user");
  return res.status(200).json({
    status: "success",
    message: "Get event registration successfully",
    eventRegistrations: eventRegistrations,
  });
});
