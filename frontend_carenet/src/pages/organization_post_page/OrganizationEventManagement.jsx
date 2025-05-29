import React, { useState, useEffect } from "react";
import {
  Table,
  Tag,
  Space,
  Button,
  Card,
  Typography,
  message,
  Spin,
  Modal,
  Descriptions,
  Form,
  Input,
  Select,
  DatePicker,
  List,
} from "antd";
import {
  Calendar,
  MapPin,
  Users,
  Clock,
  Eye,
  Info,
  DollarSign,
  FileText,
  Edit2,
} from "lucide-react";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import axiosInstance from "../../utils/AxiosInstance";
import styles from "../../css/AppColors.module.css";
import { formatDateVN } from "../../utils/FormatDateVN";

const { TextArea } = Input;
const { RangePicker } = DatePicker;

const OrganizationEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [isFormEditModalVisible, setIsFormEditModalVisible] = useState(false);
  const [updateForm] = Form.useForm();
  const [formEditForm] = Form.useForm();
  const navigate = useNavigate();

  const fetchEvents = async () => {
    try {
      setLoading(true);
      console.log("Fetching events..."); // Debug log
      const response = await axiosInstance.get("/event/get-finished-events");
      console.log("API Response:", response.data); // Debug log

      if (response.data.status === "success" && response.data.events) {
        setEvents(response.data.events);
      } else {
        message.error("Không thể lấy dữ liệu sự kiện");
      }
    } catch (error) {
      console.error("Error fetching events:", error);
      message.error("Có lỗi xảy ra khi tải dữ liệu");
    } finally {
      setLoading(false);
    }
  };

  console.log(JSON.stringify(events));

  useEffect(() => {
    console.log("Component mounted"); // Debug log
    fetchEvents();
  }, []);

  const showEventDetail = (event) => {
    setSelectedEvent(event);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedEvent(null);
  };

  const showUpdateModal = (event) => {
    setSelectedEvent(event);
    updateForm.setFieldsValue({
      title: event.title,
      description: event.description,
      status: event.status,
      location: {
        street: event.location.street,
        ward: event.location.ward,
        district: event.location.district,
        province: event.location.province,
      },
      timeRange: [dayjs(event.startAt), dayjs(event.endAt)],
      maxParticipants: event.maxParticipants,
    });
    setIsUpdateModalVisible(true);
  };

  const handleUpdateEvent = async (values) => {
    try {
      setLoading(true);
      const [startAt, endAt] = values.timeRange;

      const updateData = {
        ...values,
        startAt: startAt.toISOString(),
        endAt: endAt.toISOString(),
        eventId: selectedEvent._id,
      };

      const response = await axiosInstance.put(
        "/organization/update-event",
        updateData
      );

      if (response.data.status === "success") {
        message.success("Cập nhật sự kiện thành công!");
        setIsUpdateModalVisible(false);
        fetchEvents(); // Refresh danh sách
      }
    } catch (error) {
      console.error("Error updating event:", error);
      message.error("Có lỗi xảy ra khi cập nhật sự kiện");
    } finally {
      setLoading(false);
    }
  };

  const showFormEditModal = (event) => {
    setSelectedEvent(event);
    formEditForm.setFieldsValue({
      questions: event.formData?.questions || [],
    });
    setIsFormEditModalVisible(true);
  };

  const handleFormEdit = async (values) => {
    try {
      setLoading(true);
      const response = await axiosInstance.put(
        "/organization/update-event-form",
        {
          eventId: selectedEvent._id,
          formData: {
            questions: values.questions,
          },
        }
      );

      if (response.data.status === "success") {
        message.success("Cập nhật form đăng ký thành công!");
        setIsFormEditModalVisible(false);
        fetchEvents(); // Refresh danh sách
      }
    } catch (error) {
      console.error("Error updating form:", error);
      message.error("Có lỗi xảy ra khi cập nhật form đăng ký");
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: "Tên sự kiện",
      dataIndex: "title",
      key: "title",
      render: (text) => (
        <Space>
          <Calendar size={16} />
          <span>{text}</span>
        </Space>
      ),
    },
    {
      title: "Địa điểm",
      dataIndex: "location",
      key: "location",
      render: (location) => (
        <Space>
          <MapPin size={16} />
          <span>{`${location.street}, ${location.ward}, ${location.district}, ${location.province}`}</span>
        </Space>
      ),
    },
    {
      title: "Thời gian",
      dataIndex: "startAt",
      key: "time",
      render: (_, record) => (
        <Space>
          <Clock size={16} />
          <span>
            {dayjs(record.startAt).format("DD/MM/YYYY HH:mm")} -{" "}
            {dayjs(record.endAt).format("DD/MM/YYYY HH:mm")}
          </span>
        </Space>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color = "blue";
        let text = "Đang tuyển";

        switch (status) {
          case "hiring":
            color = "blue";
            text = "Đang tuyển";
            break;
          case "processing":
            color = "green";
            text = "Đang diễn ra";
            break;
          case "completed":
            color = "gray";
            text = "Đã hoàn thành";
            break;
          case "cancelled":
            color = "red";
            text = "Đã hủy";
            break;
          default:
            color = "blue";
            text = "Đang tuyển";
        }

        return <Tag color={color}>{text}</Tag>;
      },
    },
    {
      title: "Trạng thái duyệt",
      dataIndex: "adminStatus",
      key: "adminStatus",
      render: (adminStatus) => {
        let color = "gray";
        let text = "Chưa xác định";

        switch (adminStatus) {
          case "pending":
            color = "blue";
            text = "Đang đợi duyệt";
            break;
          case "approved":
            color = "green";
            text = "Đã được duyệt";
            break;
          case "rejected":
            color = "red";
            text = "Đã bị từ chối";
            break;
          default:
            color = "grey";
            text = "Không xác định";
        }

        return <Tag color={color}>{text}</Tag>;
      },
    },
    {
      title: "Thao tác",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="default"
            style={{
              backgroundColor: styles.primaryColor,
              borderColor: styles.primaryColor,
            }}
            onClick={() => showEventDetail(record)}
          >
            Xem chi tiết
          </Button>
          <Button
            type="primary"
            icon={<Edit2 size={16} />}
            onClick={() => showUpdateModal(record)}
          >
            Cập nhật
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-6">
      {/* Table danh sách sự kiện */}
      <Card>
        <div className="mb-4">
          <h2>Danh sách sự kiện của tổ chức</h2>
        </div>
        <Spin spinning={loading}>
          <Table
            columns={columns}
            dataSource={events}
            rowKey="_id"
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showTotal: (total) => `Tổng số ${total} sự kiện`,
            }}
          />
        </Spin>
      </Card>

      {/* Modal hiện thông tin chi tiết sự kiện */}
      <Modal
        title={
          <div className="d-flex align-items-center">
            <Info size={20} className="me-2" />
            <span>Chi tiết sự kiện</span>
          </div>
        }
        open={isModalVisible}
        onCancel={handleCloseModal}
        footer={[
          <Button key="close" onClick={handleCloseModal}>
            Đóng
          </Button>,
          <Button
            key="editForm"
            type="default"
            onClick={() => {
              handleCloseModal();
              showFormEditModal(selectedEvent);
            }}
          >
            Chỉnh sửa form
          </Button>,
          <Button
            loading={loading}
            key="view"
            type="default"
            style={{
              backgroundColor: styles.primaryColor,
              borderColor: styles.primaryColor,
            }}
            onClick={() => {
              handleCloseModal();
              navigate(`/event-detail/${selectedEvent?._id}`);
            }}
          >
            Xem trang chi tiết
          </Button>,
        ]}
        width={800}
      >
        {selectedEvent && (
          <Descriptions bordered column={2}>
            <Descriptions.Item label="Tên sự kiện" span={2}>
              {selectedEvent.title}
            </Descriptions.Item>
            <Descriptions.Item label="Mô tả" span={2}>
              {selectedEvent.description}
            </Descriptions.Item>
            <Descriptions.Item label="Địa điểm">
              <Space>
                <MapPin size={16} />
                <span>
                  {`${selectedEvent.location.street}, ${selectedEvent.location.ward}, ${selectedEvent.location.district}, ${selectedEvent.location.province}`}
                </span>
              </Space>
            </Descriptions.Item>
            <Descriptions.Item label="Thời gian">
              <Space>
                <Clock size={16} />
                <span>
                  {formatDateVN(selectedEvent.startAt)} -{" "}
                  {formatDateVN(selectedEvent.endAt)}
                </span>
              </Space>
            </Descriptions.Item>
            <Descriptions.Item label="Số người tham gia">
              <Space>
                <Users size={16} />
                <span>
                  {selectedEvent.currentParticipants}/
                  {selectedEvent.maxParticipants}
                </span>
              </Space>
            </Descriptions.Item>
            <Descriptions.Item label="Trạng thái">
              {(() => {
                let color = "blue";
                let text = "Đang tuyển";

                switch (selectedEvent.status) {
                  case "hiring":
                    color = "blue";
                    text = "Đang tuyển";
                    break;
                  case "processing":
                    color = "green";
                    text = "Đang diễn ra";
                    break;
                  case "completed":
                    color = "gray";
                    text = "Đã hoàn thành";
                    break;
                  case "cancelled":
                    color = "red";
                    text = "Đã hủy";
                    break;
                  default:
                    color = "blue";
                    text = "Đang tuyển";
                }

                return <Tag color={color}>{text}</Tag>;
              })()}
            </Descriptions.Item>
            {selectedEvent.requirements && (
              <Descriptions.Item label="Yêu cầu" span={2}>
                <Space>
                  <FileText size={16} />
                  <span>{selectedEvent.requirements}</span>
                </Space>
              </Descriptions.Item>
            )}
            {selectedEvent.budget && (
              <Descriptions.Item label="Ngân sách" span={2}>
                <Space>
                  <DollarSign size={16} />
                  <span>{selectedEvent.budget}</span>
                </Space>
              </Descriptions.Item>
            )}
            {selectedEvent.formData?.questions &&
              selectedEvent.formData.questions.length > 0 && (
                <Descriptions.Item label="Form đăng ký" span={2}>
                  <List
                    dataSource={selectedEvent.formData.questions}
                    renderItem={(q, index) => (
                      <List.Item>
                        <div>
                          <div>
                            <strong>Câu hỏi {index + 1}:</strong> {q.question}
                          </div>
                          <div>
                            <strong>Loại câu hỏi:</strong>{" "}
                            {q.type === "text"
                              ? "Câu hỏi text"
                              : q.type === "checkbox"
                              ? "Câu hỏi checkbox"
                              : q.type === "radio"
                              ? "Câu hỏi radio"
                              : "Câu hỏi dropdown"}
                          </div>
                          {q.options && q.options.length > 0 && (
                            <div>
                              <strong>Các lựa chọn:</strong>
                              <ul>
                                {q.options.map((option, i) => (
                                  <li key={i}>{option}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </List.Item>
                    )}
                  />
                </Descriptions.Item>
              )}
          </Descriptions>
        )}
      </Modal>

      {/* Update Event Modal */}
      <Modal
        title={
          <div className="d-flex align-items-center">
            <Edit2 size={20} className="me-2" />
            <span>Cập nhật sự kiện</span>
          </div>
        }
        open={isUpdateModalVisible}
        onCancel={() => setIsUpdateModalVisible(false)}
        footer={null}
        width={800}
      >
        <Form
          form={updateForm}
          layout="vertical"
          onFinish={handleUpdateEvent}
          initialValues={selectedEvent}
        >
          <Form.Item
            name="title"
            label="Tên sự kiện"
            rules={[{ required: true, message: "Vui lòng nhập tên sự kiện!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="description"
            label="Mô tả"
            rules={[{ required: true, message: "Vui lòng nhập mô tả!" }]}
          >
            <TextArea rows={4} />
          </Form.Item>

          <Form.Item
            name="status"
            label="Trạng thái"
            rules={[{ required: true, message: "Vui lòng chọn trạng thái!" }]}
          >
            <Select>
              <Select.Option value="hiring">Đang tuyển</Select.Option>
              <Select.Option value="processing">Đang diễn ra</Select.Option>
              <Select.Option value="completed">Đã hoàn thành</Select.Option>
              <Select.Option value="cancelled">Đã hủy</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="timeRange"
            label="Thời gian diễn ra"
            rules={[{ required: true, message: "Vui lòng chọn thời gian!" }]}
          >
            <RangePicker
              showTime
              format="YYYY-MM-DD HH:mm"
              style={{ width: "100%" }}
            />
          </Form.Item>

          <Form.Item
            name={["location", "street"]}
            label="Địa chỉ"
            rules={[{ required: true, message: "Vui lòng nhập địa chỉ!" }]}
          >
            <Input placeholder="Số nhà, tên đường" />
          </Form.Item>

          <Form.Item
            name={["location", "ward"]}
            label="Phường/Xã"
            rules={[{ required: true, message: "Vui lòng nhập phường/xã!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name={["location", "district"]}
            label="Quận/Huyện"
            rules={[{ required: true, message: "Vui lòng nhập quận/huyện!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name={["location", "province"]}
            label="Tỉnh/Thành phố"
            rules={[
              { required: true, message: "Vui lòng nhập tỉnh/thành phố!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="maxParticipants"
            label="Số lượng tình nguyện viên tối đa"
            rules={[{ required: true, message: "Vui lòng nhập số lượng!" }]}
          >
            <Input type="number" min={1} />
          </Form.Item>

          {selectedEvent?.formData?.questions &&
            selectedEvent.formData.questions.length > 0 && (
              <Form.Item label="Form đăng ký">
                <List
                  dataSource={selectedEvent.formData.questions}
                  renderItem={(q, index) => (
                    <List.Item>
                      <div style={{ width: "100%" }}>
                        <div>
                          <strong>Câu hỏi {index + 1}:</strong> {q.question}
                        </div>
                        <div>
                          <strong>Loại câu hỏi:</strong>{" "}
                          {q.type === "text"
                            ? "Câu hỏi text"
                            : q.type === "checkbox"
                            ? "Câu hỏi checkbox"
                            : q.type === "radio"
                            ? "Câu hỏi radio"
                            : "Câu hỏi dropdown"}
                        </div>
                        {q.options && q.options.length > 0 && (
                          <div>
                            <strong>Các lựa chọn:</strong>
                            <ul>
                              {q.options.map((option, i) => (
                                <li key={i}>{option}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </List.Item>
                  )}
                />
              </Form.Item>
            )}

          <Form.Item>
            <Space>
              <Button onClick={() => setIsUpdateModalVisible(false)}>
                Hủy
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                style={{
                  backgroundColor: styles.primaryColor,
                  borderColor: styles.primaryColor,
                }}
              >
                Cập nhật
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      {/* Form Edit Modal */}
      <Modal
        title={
          <div className="d-flex align-items-center">
            <Edit2 size={20} className="me-2" />
            <span>Chỉnh sửa form đăng ký</span>
          </div>
        }
        open={isFormEditModalVisible}
        onCancel={() => setIsFormEditModalVisible(false)}
        footer={null}
        width={800}
      >
        <Form form={formEditForm} layout="vertical" onFinish={handleFormEdit}>
          <Form.List name="questions">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <div
                    key={key}
                    style={{
                      marginBottom: 16,
                      padding: 16,
                      border: "1px solid #d9d9d9",
                      borderRadius: 4,
                    }}
                  >
                    <Space direction="vertical" style={{ width: "100%" }}>
                      <Form.Item
                        {...restField}
                        name={[name, "question"]}
                        label="Câu hỏi"
                        rules={[
                          { required: true, message: "Vui lòng nhập câu hỏi!" },
                        ]}
                      >
                        <Input placeholder="Nhập câu hỏi" />
                      </Form.Item>

                      <Form.Item
                        {...restField}
                        name={[name, "type"]}
                        label="Loại câu hỏi"
                        rules={[
                          {
                            required: true,
                            message: "Vui lòng chọn loại câu hỏi!",
                          },
                        ]}
                      >
                        <Select>
                          <Select.Option value="text">
                            Câu hỏi text
                          </Select.Option>
                          <Select.Option value="checkbox">
                            Câu hỏi checkbox
                          </Select.Option>
                          <Select.Option value="radio">
                            Câu hỏi radio
                          </Select.Option>
                          <Select.Option value="dropdown">
                            Câu hỏi dropdown
                          </Select.Option>
                        </Select>
                      </Form.Item>

                      <Form.List name={[name, "options"]}>
                        {(
                          optionFields,
                          { add: addOption, remove: removeOption }
                        ) => (
                          <>
                            {optionFields.map((optionField) => (
                              <Form.Item
                                {...optionField}
                                key={optionField.key}
                                label={
                                  optionField.name === 0 ? "Các lựa chọn" : ""
                                }
                              >
                                <Space>
                                  <Form.Item
                                    {...optionField}
                                    name={[optionField.name]}
                                    noStyle
                                    rules={[
                                      {
                                        required: true,
                                        message: "Vui lòng nhập lựa chọn!",
                                      },
                                    ]}
                                  >
                                    <Input
                                      placeholder="Nhập lựa chọn"
                                      style={{ width: "300px" }}
                                    />
                                  </Form.Item>
                                  <MinusCircleOutlined
                                    onClick={() =>
                                      removeOption(optionField.name)
                                    }
                                  />
                                </Space>
                              </Form.Item>
                            ))}
                            <Form.Item>
                              <Button
                                type="dashed"
                                onClick={() => addOption()}
                                block
                                icon={<PlusOutlined />}
                              >
                                Thêm lựa chọn
                              </Button>
                            </Form.Item>
                          </>
                        )}
                      </Form.List>

                      <Button type="link" danger onClick={() => remove(name)}>
                        Xóa câu hỏi
                      </Button>
                    </Space>
                  </div>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    Thêm câu hỏi
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>

          <Form.Item>
            <Space>
              <Button onClick={() => setIsFormEditModalVisible(false)}>
                Hủy
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                style={{
                  backgroundColor: styles.primaryColor,
                  borderColor: styles.primaryColor,
                }}
              >
                Lưu thay đổi
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default OrganizationEvents;
