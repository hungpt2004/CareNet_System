const { cloudinary } = require("../services/uploadCloundinary");
const Organization = require("../models/organization.model");
const Event = require("../models/event.model");

// Upload ảnh sự kiện
exports.uploadEventImages = async (req, res) => {

  const { eventId } = req.body;

  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        status: "error",
        message: "Vui lòng chọn ít nhất một ảnh",
      });
    }

    // Lấy danh sách URL của các ảnh đã upload
    const images = req.files.map((file) => ({
      url: file.path,
      public_id: file.filename,
      originalname: file.originalname,
    }));

    const documents = req.files.map((file) => ({
      url: file.path,
      public_id: file.filename,
      originalname: file.originalname,
      type: file.mimetype,
    }));

    const eventUrls = documents.map((doc) => doc.url);

    const updatedEvent = await Event.findByIdAndUpdate(eventId, {
      $set: { images: eventUrls},
    }, { new: true });

    console.log('Updated event:', updatedEvent);

    return res.status(200).json({
      status: "success",
      message: "Tải lên ảnh sự kiện thành công",
      images,
      updatedEvent,
    });

  } catch (error) {
    console.error("Error in uploadEventImages:", error);
    return res.status(500).json({
      status: "error",
      message: "Lỗi server khi tải lên ảnh sự kiện",
      error: error.message,
    });
  }
};

// Upload giấy tờ tổ chức
exports.uploadOrganizationDocuments = async (req, res) => {
  const currentUser = req.user.user;
  const { organizationId } = req.body;
  console.log("Debug - Starting uploadOrganizationDocuments controller");
  console.log("Debug - Current user:", currentUser);
  console.log("Debug - Request files:", req.files);

  try {
    // Lấy organizationId từ currentUser
    // const organizationId = currentUser.organizationId;
    console.log("Debug - Organization ID:", organizationId);

    if (!organizationId) {
      console.log("Debug - No organization ID found for user");
      return res.status(400).json({
        status: "error",
        message:
          "Không tìm thấy thông tin tổ chức. Vui lòng đăng ký tổ chức trước.",
      });
    }

    if (!req.files || req.files.length === 0) {
      console.log("Debug - No files found in request");
      return res.status(400).json({
        status: "error",
        message: "Vui lòng chọn ít nhất một giấy tờ",
      });
    }

    // Lấy danh sách URL của các giấy tờ đã upload
    const documents = req.files.map((file) => ({
      url: file.path,
      public_id: file.filename,
      originalname: file.originalname,
      type: file.mimetype,
    }));

    // Cập nhật licenseDocuments trong Organization
    const documentUrls = documents.map((doc) => doc.url);
    const updatedOrganization = await Organization.findOneAndUpdate(
      { _id: organizationId },
      { $set: { licenseDocuments: documentUrls } },
      { new: true }
    );

    if (!updatedOrganization) {
      console.log("Debug - Organization not found:", organizationId);
      return res.status(404).json({
        status: "error",
        message: "Không tìm thấy thông tin tổ chức",
      });
    }

    console.log("Debug - Updated organization:", updatedOrganization);

    return res.status(200).json({
      status: "success",
      message: "Tải lên giấy tờ thành công",
      documents,
    });
  } catch (error) {
    console.error("Error in uploadOrganizationDocuments:", error);
    return res.status(500).json({
      status: "error",
      message: "Lỗi server khi tải lên giấy tờ",
      error: error.message,
    });
  }
};

// Xóa ảnh từ Cloudinary
exports.deleteImage = async (req, res) => {
  try {
    const { public_id } = req.params;

    if (!public_id) {
      return res.status(400).json({
        status: "error",
        message: "Thiếu public_id của ảnh",
      });
    }

    const result = await cloudinary.uploader.destroy(public_id);

    if (result.result === "ok") {
      return res.status(200).json({
        status: "success",
        message: "Xóa ảnh thành công",
      });
    } else {
      return res.status(400).json({
        status: "error",
        message: "Không thể xóa ảnh",
      });
    }
  } catch (error) {
    console.error("Error in deleteImage:", error);
    return res.status(500).json({
      status: "error",
      message: "Lỗi server khi xóa ảnh",
      error: error.message,
    });
  }
};
