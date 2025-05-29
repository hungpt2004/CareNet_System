// controllers/certificateHistoryController.js
const Certificate = require('../models/certificate.model');
const asyncHandler = require('../middleware/asyncHandler');

/**
 * @desc Get certificate history for a specific user
 * @route GET /api/certificates/history/:userId
 * @access Private
 */
exports.getCertificateHistory = asyncHandler(async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ message: 'User ID is required.' });
    }

    const certificates = await Certificate.find({ userId })
      .sort({ completionDate: -1 });

    return res.status(200).json(certificates);
  } catch (error) {
    console.error('Error fetching certificate history:', error);
    return res.status(500).json({ message: 'Server error' });
  }
});

