const express = require('express');
const OrganizationController = require('../controllers/organization.controller');
const OrganizationRouter = express.Router();
const { authenticateToken } = require('../middleware/isAuthenticate');

OrganizationRouter.get('/get-filtered-request/:id', OrganizationController.filterRequestsBySkills);
OrganizationRouter.get('/get-request-event/:id', OrganizationController.getRequestEventById);
OrganizationRouter.get('/get-owned-event', authenticateToken, OrganizationController.getOwnEvent);
OrganizationRouter.post('/approve-request/:id', OrganizationController.approveRequest);
OrganizationRouter.post('/reject-request/:id', OrganizationController.rejectRequest);

OrganizationRouter.get("/get-all-organizations", authenticateToken, OrganizationController.getAllOrganizations);
OrganizationRouter.put("/update-status", authenticateToken, OrganizationController.updateOrganizationStatus); 
OrganizationRouter.put("/update-level", authenticateToken, OrganizationController.updateOrganizationLevel);
OrganizationRouter.get("/get-all-levels", authenticateToken, OrganizationController.getAllOrganizationLevels);
OrganizationRouter.get("/get-members", authenticateToken, OrganizationController.getOrganizationMembers);
OrganizationRouter.get('/get-organization-info', authenticateToken, OrganizationController.getOrganizationById);
OrganizationRouter.post('/create-events', authenticateToken, OrganizationController.createEvent);
OrganizationRouter.post('/events/:eventId/certificates/:userId', authenticateToken, OrganizationController.generateEventCertificate);
OrganizationRouter.post('/register-organization', authenticateToken, OrganizationController.registerOrganization);

module.exports = OrganizationRouter;
