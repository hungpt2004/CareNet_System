const express = require('express');
const OrganizationController = require('../controllers/organization.controller');
const OrganizationRouter = express.Router();
const { authenticateToken } = require('../middleware/isAuthenticate');

OrganizationRouter.get('/get-filtered-request/:id', OrganizationController.filterRequestsBySkills);
OrganizationRouter.get('/get-request-event/:id', OrganizationController.getRequestEventById);
OrganizationRouter.get('/get-owned-event', authenticateToken, OrganizationController.getOwnEvent);
OrganizationRouter.get('/get-owned-staff', authenticateToken, OrganizationController.getOwnStaff);
OrganizationRouter.post('/approve-request/:id', OrganizationController.approveRequest);
OrganizationRouter.post('/reject-request/:id', OrganizationController.rejectRequest);


module.exports = OrganizationRouter;
