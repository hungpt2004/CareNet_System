const { cloudinary } = require("../services/uploadCloundinary");
const {
  eventImageUpload,
  organizationDocumentUpload,
} = require("../middleware/uploadMiddleware");
const Organization = require("../models/organization.model");

// Upload ảnh sự kiện
exports.uploadEventImages = async (req, res) => {
  try {
    // Sử dụng middleware eventImageUpload
    eventImageUpload(req, res, async (err) => {
      if (err) {
        return res.status(400).json({
          status: "error",
          message: "Lỗi khi tải lên ảnh sự kiện",
          error: err.message,
        });
      }

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

      return res.status(200).json({
        status: "success",
        message: "Tải lên ảnh sự kiện thành công",
        images,
      });
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

  try {
    // Lấy organizationId từ currentUser
    const organizationId = currentUser.organizationId;

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        status: "error",
        message: "Vui lòng chọn ít nhất một giấy tờ",
      });
    }

    console.log(req.files);

    // Lấy danh sách URL của các giấy tờ đã upload
    const documents = req.files.map((file) => ({
      url: file.path,
      public_id: file.filename,
      originalname: file.originalname,
      type: file.mimetype,
    }));

    // Cập nhật licenseDocuments trong Organization
    const documentUrls = documents.map(doc => doc.url);
    await Organization.findByIdAndUpdate(
      organizationId,
      { $set: { licenseDocuments: documentUrls } },
      { new: true }
    );

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
