const express = require('express');
const ImageRouter = express.Router();
const ImageController = require('../controllers/image.controller');
const { authenticateToken } = require('../middleware/isAuthenticate');
const { eventImageUpload, organizationDocumentUpload } = require('../middleware/uploadMiddleware');

ImageRouter.post('/upload-event-images', authenticateToken, eventImageUpload, ImageController.uploadEventImages);
ImageRouter.post('/upload-organization-documents', authenticateToken, organizationDocumentUpload, ImageController.uploadOrganizationDocuments);
ImageRouter.delete('/delete-image/:public_id', authenticateToken, ImageController.deleteImage);

module.exports = ImageRouter;
