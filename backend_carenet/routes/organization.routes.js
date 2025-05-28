const express = require('express');
const OrganizationController = require('../controllers/organization.controller');
const { authenticateToken } = require('../middleware/isAuthenticate');
const { getAllOrganizations, updateOrganizationStatus, updateOrganizationLevel, getAllOrganizationLevels} = require("../controllers/organization.controller");
const { getOrganizationMembers } = require("../controllers/organization.controller");
const OrganizationRouter = express.Router();
const { authenticateToken } = require('../middleware/isAuthenticate');

OrganizationRouter.get('/get-all-owned-event', authenticateToken, OrganizationController.getAllOwnerEvent)
OrganizationRouter.get('/get-filtered-request/:id', OrganizationController.filterRequestsBySkills);
OrganizationRouter.get('/get-request-event/:id', OrganizationController.getRequestEventById);
OrganizationRouter.get('/get-request-pending/:id', OrganizationController.getRequestPendingById)
OrganizationRouter.get('/get-owned-event', authenticateToken, OrganizationController.getOwnEvent);
OrganizationRouter.get('/get-owned-staff', authenticateToken, OrganizationController.getOwnStaff);
OrganizationRouter.post('/approve-request/:id', OrganizationController.approveRequest);
OrganizationRouter.post('/reject-request/:id', OrganizationController.rejectRequest);
OrganizationRouter.get("/get-all-organizations", authenticateToken, getAllOrganizations);
OrganizationRouter.put("/update-status", authenticateToken, updateOrganizationStatus); 
OrganizationRouter.put("/update-level", authenticateToken, updateOrganizationLevel);
OrganizationRouter.get("/get-all-levels", authenticateToken, getAllOrganizationLevels);
OrganizationRouter.get("/get-members", authenticateToken, getOrganizationMembers);
OrganizationRouter.post('/create-events', authenticateToken, OrganizationController.createEvent);
OrganizationRouter.post('/events/:eventId/certificates/:userId', authenticateToken, OrganizationController.generateEventCertificate);
OrganizationRouter.post('/register-organization', authenticateToken, OrganizationController.registerOrganization);

module.exports = OrganizationRouter;
