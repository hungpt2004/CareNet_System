const express = require("express");
const LevelRouter = express.Router();
const LevelController = require("../controllers/level.controller");

LevelRouter.get("/:organizationId", LevelController.getOrganizationLevelById);

module.exports = LevelRouter;
