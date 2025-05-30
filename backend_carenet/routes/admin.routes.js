const express = require('express');
const AdminRouter = express.Router();
const { authenticateToken } = require('../middleware/isAuthenticate');
const AdminController = require('../controllers/admin.controller');

AdminRouter.get('/get-pending-organization', authenticateToken, AdminController.getPendingOrganization);
AdminRouter.get('/get-pending-event', authenticateToken, AdminController.getPendingEvent);
AdminRouter.put('/approve-organization-register', authenticateToken, AdminController.approveOrganizationRegister);
AdminRouter.put('/reject-organization-register', authenticateToken, AdminController.rejectOrganizationRegister);
AdminRouter.put('/approve-event-register', authenticateToken, AdminController.approveEventRegister);
AdminRouter.put('/reject-event-register', authenticateToken, AdminController.rejectEventRegister);
AdminRouter.get('/accounts', AdminController.getAllAccounts);

module.exports = AdminRouter;
