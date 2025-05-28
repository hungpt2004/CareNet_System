const OrganizationLevel = require("../models/organizationLevel.model");
const asyncHandler = require('../middleware/asyncHandler')
const Organization = require("../models/organization.model");

exports.getOrganizationLevelById = asyncHandler(async (req, res) => {

   const {organizationId} = req.params;

   const currentOrganization = await Organization.findOne({_id: organizationId}).populate("levelId");

   if (!currentOrganization) {
    return res.status(404).json({
      status: "fail",
      message: "Tổ chức không tồn tại",
    });
   }

   return res.status(200).json({
    status: "success",
    organization: currentOrganization,
    packageName: currentOrganization.levelId.name,
    maxPost: currentOrganization.levelId.maxPost,
   });
   

})

