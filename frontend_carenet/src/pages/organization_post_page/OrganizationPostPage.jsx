import React, { useState, useEffect } from 'react';
import { 
  Info, MapPin, Upload, Users, Target, 
  ArrowRight, ArrowLeft, Check, Calendar,
  Clock, DollarSign, Gift, Phone, Mail,
  Plus, Trash2, HelpCircle
} from 'lucide-react';
import { 
  Form, Input, Button, Card, Steps, Select, 
  DatePicker, InputNumber, Upload as AntUpload, 
  message, Space, Divider, List, Tooltip 
} from 'antd';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import CustomProgressBar from '../../components/progressbar/CustomProgressBar';
import axiosInstance from '../../utils/AxiosInstance';
import { CustomFailedToast, CustomSuccessToast, CustomToast } from '../../components/toast/CustomToast';
import { IoMdPerson } from 'react-icons/io';
import { PlusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import useAuthStore from "../../hooks/authStore";

const { TextArea } = Input;
const { RangePicker } = DatePicker;

// Leaflet icon setup
let DefaultIcon = L.icon({
  iconUrl: '/node_modules/leaflet/dist/images/marker-icon.png',
  shadowUrl: '/node_modules/leaflet/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

// LocationSelector component
const LocationSelector = ({ onLocationChange }) => {
  useMapEvents({
    click: (e) => {
      const { lat, lng } = e.latlng;
      onLocationChange(lat, lng);
    }
  });

  return null;
};

const OrganizationPostPage = () => {
  const [form] = Form.useForm();
  const [eventImageForm] = Form.useForm();
  const [certificateImageForm] = Form.useForm();
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [eventImageLoading, setEventImageLoading] = useState(false);
  const [certificateImageLoading, setCertificateImageLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [staffList, setStaffList] = useState([]);
  const [customCategories, setCustomCategories] = useState([]);
  const [customSkills, setCustomSkills] = useState([]);
  const [location, setLocation] = useState({
    latitude: 10.7756,
    longitude: 106.7137,
    street: '',
    ward: '',
    district: '',
    province: ''
  });
  const navigate = useNavigate();
  const currentUser = useAuthStore((state) => state.currentUser);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [eventImages, setEventImages] = useState([]);
  const [certificateImage, setCertificateImage] = useState(null);

  // Fetch staff list when component mounts
  useEffect(() => {
    fetchStaffList();
  }, []);

  const fetchStaffList = async () => {
    try {
      const response = await axiosInstance.get('/organization/get-owned-staff');
      if (response.data.status === 'success') {
        setStaffList(response.data.staff);
      }
    } catch (error) {
      console.error('Error fetching staff:', error);
      message.error('Không thể tải danh sách nhân viên');
    }
  };

  const handleLocationChange = (lat, lng) => {
    setLocation(prev => ({
      ...prev,
      latitude: lat,
      longitude: lng
    }));
  };

  // Handle staff selection change
  const handleStaffChange = (staffId) => {
    const staff = staffList.find(s => s._id === staffId);
    setSelectedStaff(staff);
  };

  const steps = [
    {
      title: 'Thông tin cơ bản',
      icon: <Info size={20} />,
      content: (
        <>
          <Form.Item
            name="title"
            label="Tên sự kiện"
            rules={[{ required: true, message: 'Vui lòng nhập tên sự kiện!' }]}
          >
            <Input placeholder="Nhập tên sự kiện" />
          </Form.Item>

          <Form.Item
            name="description"
            label="Mô tả"
            rules={[{ required: true, message: 'Vui lòng nhập mô tả!' }]}
          >
            <TextArea rows={4} placeholder="Mô tả chi tiết về sự kiện" />
          </Form.Item>

          <Form.Item
            name="category"
            label="Danh mục"
            rules={[{ required: true, message: 'Vui lòng chọn hoặc tạo danh mục!' }]}
          >
            <Select
              placeholder="Chọn hoặc tạo danh mục mới"
              mode="tags"
              style={{ width: '100%' }}
              tokenSeparators={[',']}
              options={[
                { value: 'Giáo dục', label: 'Giáo dục' },
                { value: 'Y tế', label: 'Y tế' },
                { value: 'Môi trường', label: 'Môi trường' },
                { value: 'Cộng đồng', label: 'Cộng đồng' },
                { value: 'Trẻ em', label: 'Trẻ em' },
                ...customCategories.map(cat => ({ value: cat, label: cat }))
              ]}
              onSelect={(value) => {
                if (!customCategories.includes(value)) {
                  setCustomCategories([...customCategories, value]);
                }
              }}
            />
          </Form.Item>

          <Form.Item
            name="skills"
            label="Kỹ năng yêu cầu"
            rules={[{ required: true, message: 'Vui lòng chọn hoặc tạo kỹ năng!' }]}
          >
            <Select
              mode="tags"
              placeholder="Nhập kỹ năng cần thiết"
              style={{ width: '100%' }}
              tokenSeparators={[',']}
              options={[
                { value: 'Giao tiếp', label: 'Giao tiếp' },
                { value: 'Lãnh đạo', label: 'Lãnh đạo' },
                { value: 'Làm việc nhóm', label: 'Làm việc nhóm' },
                { value: 'Giảng dạy', label: 'Giảng dạy' },
                { value: 'Y tế', label: 'Y tế' },
                ...customSkills.map(skill => ({ value: skill, label: skill }))
              ]}
              onSelect={(value) => {
                if (!customSkills.includes(value)) {
                  setCustomSkills([...customSkills, value]);
                }
              }}
            />
          </Form.Item>

          <Form.Item
            name="staffId"
            label="Nhân viên phụ trách"
            rules={[{ required: true, message: 'Vui lòng chọn nhân viên phụ trách!' }]}
          >
            <Select
              placeholder="Chọn nhân viên phụ trách"
              style={{ width: '100%' }}
              onChange={handleStaffChange}
            >
              {staffList.map(staff => (
                <Select.Option key={staff._id} value={staff._id}>
                  {staff.fullname} - {staff.email}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </>
      )
    },
    {
      title: 'Thời gian & Địa điểm',
      icon: <Calendar size={20} />,
      content: (
        <>
          <Form.Item
            name="timeRange"
            label="Thời gian diễn ra"
            rules={[{ required: true, message: 'Vui lòng chọn thời gian!' }]}
          >
            <RangePicker 
              showTime 
              format="YYYY-MM-DD HH:mm"
              style={{ width: '100%' }}
            />
          </Form.Item>

          <Form.Item label="Địa điểm">
            <MapContainer 
              center={[location.latitude, location.longitude]} 
              zoom={13} 
              style={{ height: "300px", width: "100%", marginBottom: "16px" }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <LocationSelector onLocationChange={handleLocationChange} />
              {location.latitude && (
                <Marker position={[location.latitude, location.longitude]} />
              )}
            </MapContainer>

            <Space direction="vertical" style={{ width: '100%' }}>
              <Form.Item
                name={['location', 'street']}
                rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}
              >
                <Input placeholder="Số nhà, tên đường" />
              </Form.Item>

              <Form.Item
                name={['location', 'ward']}
                rules={[{ required: true, message: 'Vui lòng nhập phường/xã!' }]}
              >
                <Input placeholder="Phường/Xã" />
              </Form.Item>

              <Form.Item
                name={['location', 'district']}
                rules={[{ required: true, message: 'Vui lòng nhập quận/huyện!' }]}
              >
                <Input placeholder="Quận/Huyện" />
              </Form.Item>

              <Form.Item
                name={['location', 'province']}
                rules={[{ required: true, message: 'Vui lòng nhập tỉnh/thành phố!' }]}
              >
                <Input placeholder="Tỉnh/Thành phố" />
              </Form.Item>
            </Space>
          </Form.Item>
        </>
      )
    },
    {
      title: 'Hình ảnh & Tài nguyên',
      icon: <Upload size={20} />,
      content: (
        <>
          <Form
            form={eventImageForm}
            onFinish={handleEventImageSubmit}
            layout="vertical"
          >
            <Form.Item
              name="images"
              label="Hình ảnh sự kiện"
              rules={[{ required: true, message: 'Vui lòng tải lên ít nhất 1 hình ảnh!' }]}
            >
              <AntUpload
                listType="picture-card"
                multiple
                beforeUpload={() => false}
              >
                <div>
                  <Upload size={20} />
                  <div style={{ marginTop: 8 }}>Tải lên</div>
                </div>
              </AntUpload>
            </Form.Item>

            <Form.Item>
              <Button 
                type="primary" 
                htmlType="submit" 
                loading={eventImageLoading}
                style={{ marginBottom: 24 }}
              >
                Tải lên ảnh sự kiện
              </Button>
            </Form.Item>
          </Form>

          <Form.Item
            name="requiredItems"
            label="Vật phẩm cần thiết"
          >
            <Select mode="tags" placeholder="Nhập vật phẩm cần thiết" />
          </Form.Item>
        </>
      )
    },
    {
      title: 'Thông tin tham gia',
      icon: <Users size={20} />,
      content: (
        <>
          <Form.Item
            name="maxParticipants"
            label="Số lượng tình nguyện viên tối đa"
            rules={[{ required: true, message: 'Vui lòng nhập số lượng!' }]}
          >
            <InputNumber min={1} style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            name="donationTarget"
            label="Mục tiêu quyên góp (VNĐ)"
          >
            <InputNumber 
              min={0} 
              formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={value => value.replace(/\$\s?|(,*)/g, '')}
              style={{ width: '100%' }}
            />
          </Form.Item>

          <Divider>Thông tin chứng chỉ</Divider>

          <Form.Item
            name="certificateTitle"
            label="Tiêu đề chứng chỉ"
            rules={[{ required: true, message: 'Vui lòng nhập tiêu đề chứng chỉ!' }]}
          >
            <Input placeholder="Ví dụ: Chứng nhận tham gia tình nguyện" />
          </Form.Item>

          <Form.Item
            name="certificateDescription"
            label="Nội dung chứng chỉ"
            rules={[{ required: true, message: 'Vui lòng nhập nội dung chứng chỉ!' }]}
          >
            <TextArea 
              rows={4} 
              placeholder="Ví dụ: Chứng nhận [Tên tình nguyện viên] đã tham gia và hoàn thành xuất sắc sự kiện [Tên sự kiện]..."
            />
          </Form.Item>

          <Form.Item
            name="certificateTemplate"
            label="Mẫu chứng chỉ"
          >
            <Select
              placeholder="Chọn mẫu chứng chỉ"
              style={{ width: '100%' }}
            >
              <Select.Option value="classic">Mẫu cổ điển</Select.Option>
              <Select.Option value="modern">Mẫu hiện đại</Select.Option>
              <Select.Option value="minimal">Mẫu tối giản</Select.Option>
            </Select>
          </Form.Item>

          <Form
            form={certificateImageForm}
            onFinish={handleCertificateImageSubmit}
            layout="vertical"
          >
            <Form.Item
              name="certificateLogo"
              label="Logo chứng chỉ"
            >
              <AntUpload
                listType="picture-card"
                maxCount={1}
                beforeUpload={() => false}
              >
                <div>
                  <Upload size={20} />
                  <div style={{ marginTop: 8 }}>Tải lên logo</div>
                </div>
              </AntUpload>
            </Form.Item>

            <Form.Item>
              <Button 
                type="primary" 
                htmlType="submit" 
                loading={certificateImageLoading}
              >
                Tải lên logo chứng chỉ
              </Button>
            </Form.Item>
          </Form>
        </>
      )
    },
    {
      title: 'Thông tin liên hệ',
      icon: <Phone size={20} />,
      content: (
        <>
          <Form.Item
            name={['contact', 'name']}
            label="Tên người liên hệ"
            initialValue={currentUser?.fullname}
            rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}
          >
            <Input prefix={<Info size={16} />} disabled />
          </Form.Item>

          <Form.Item
            name={['contact', 'phone']}
            label="Số điện thoại"
            initialValue={currentUser?.phone}
            rules={[
              { required: true, message: 'Vui lòng nhập số điện thoại!' },
              { pattern: /^[0-9]{10}$/, message: 'Số điện thoại không hợp lệ!' }
            ]}
          >
            <Input prefix={<Phone size={16} />} disabled />
          </Form.Item>

          <Form.Item
            name={['contact', 'email']}
            label="Email"
            initialValue={currentUser?.email}
            rules={[
              { required: true, message: 'Vui lòng nhập email!' },
              { type: 'email', message: 'Email không hợp lệ!' }
            ]}
          >
            <Input prefix={<Mail size={16} />} disabled />
          </Form.Item>

          <Form.Item
            name={['contact', 'checker']}
            label="Người phụ trách"
            initialValue={selectedStaff?.email}
            rules={[
              { required: true, message: 'Vui lòng chọn người phụ trách!' }
            ]}
          >
            <Input prefix={<IoMdPerson size={16} />} disabled />
          </Form.Item>
        </>
      )
    },
    {
      title: 'Form đăng ký',
      icon: <HelpCircle size={20} />,
      content: (
        <>
          <div className="mb-4">
            <Space>
              <Select
                style={{ width: 200 }}
                placeholder="Chọn loại câu hỏi"
                onChange={(type) => {
                  const newQuestion = {
                    question: '',
                    type,
                    options: type !== 'text' ? [''] : []
                  };
                  setQuestions([...questions, newQuestion]);
                }}
              >
                <Select.Option value="text">Câu hỏi text</Select.Option>
                <Select.Option value="checkbox">Câu hỏi checkbox</Select.Option>
                <Select.Option value="radio">Câu hỏi radio</Select.Option>
                <Select.Option value="dropdown">Câu hỏi dropdown</Select.Option>
              </Select>
              <Tooltip title="Thêm câu hỏi mới">
                <Button type="primary" icon={<PlusOutlined />}>
                  Thêm câu hỏi
                </Button>
              </Tooltip>
            </Space>
          </div>

          <List
            dataSource={questions}
            renderItem={(question, index) => (
              <List.Item
                actions={[
                  <Button 
                    type="text" 
                    danger 
                    icon={<Trash2 size={16} />}
                    onClick={() => {
                      const newQuestions = [...questions];
                      newQuestions.splice(index, 1);
                      setQuestions(newQuestions);
                    }}
                  />
                ]}
              >
                <div style={{ width: '100%' }}>
                  <Form.Item
                    label="Câu hỏi"
                    required
                    style={{ marginBottom: 8 }}
                  >
                    <Input
                      value={question.question}
                      onChange={(e) => {
                        const newQuestions = [...questions];
                        newQuestions[index].question = e.target.value;
                        setQuestions(newQuestions);
                      }}
                      placeholder="Nhập câu hỏi"
                    />
                  </Form.Item>

                  {question.type !== 'text' && (
                    <Form.Item label="Các lựa chọn" required>
                      <List
                        dataSource={question.options}
                        renderItem={(option, optionIndex) => (
                          <List.Item
                            actions={[
                              <Button
                                type="text"
                                danger
                                icon={<Trash2 size={16} />}
                                onClick={() => {
                                  const newQuestions = [...questions];
                                  newQuestions[index].options.splice(optionIndex, 1);
                                  setQuestions(newQuestions);
                                }}
                              />
                            ]}
                          >
                            <Input
                              value={option}
                              onChange={(e) => {
                                const newQuestions = [...questions];
                                newQuestions[index].options[optionIndex] = e.target.value;
                                setQuestions(newQuestions);
                              }}
                              placeholder="Nhập lựa chọn"
                            />
                          </List.Item>
                        )}
                      />
                      <Button
                        type="dashed"
                        onClick={() => {
                          const newQuestions = [...questions];
                          newQuestions[index].options.push('');
                          setQuestions(newQuestions);
                        }}
                        icon={<PlusOutlined />}
                        style={{ marginTop: 8 }}
                      >
                        Thêm lựa chọn
                      </Button>
                    </Form.Item>
                  )}
                </div>
              </List.Item>
            )}
          />
        </>
      )
    }
  ];

  // Update contact info when staff is selected
  useEffect(() => {
    if (selectedStaff) {
      form.setFieldsValue({
        contact: {
          checker: selectedStaff.email
        }
      });
    }
  }, [selectedStaff, form]);

  const handleNext = () => {
    form.validateFields().then(() => {
      setCurrentStep(currentStep + 1);
    });
  };

  const handlePrev = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleEventImageSubmit = async (values) => {
    try {
      setEventImageLoading(true);
      const formData = new FormData();
      
      if (values.images && values.images.length > 0) {
        values.images.forEach((image) => {
          if (image.originFileObj) {
            formData.append('images', image.originFileObj);
          }
        });
      }

      const response = await axiosInstance.post('/organization/upload-event-images', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.status === 'success') {
        CustomSuccessToast("Tải lên ảnh sự kiện thành công!");
        setEventImages(response.data.images);
        eventImageForm.resetFields();
      }
    } catch (error) {
      console.error('Error uploading event images:', error);
      CustomFailedToast("Tải lên ảnh sự kiện thất bại!");
    } finally {
      setEventImageLoading(false);
    }
  };

  const handleCertificateImageSubmit = async (values) => {
    try {
      setCertificateImageLoading(true);
      const formData = new FormData();
      
      if (values.certificateLogo && values.certificateLogo.length > 0) {
        formData.append('certificateLogo', values.certificateLogo[0].originFileObj);
      }

      const response = await axiosInstance.post('/organization/upload-certificate-logo', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.status === 'success') {
        CustomSuccessToast("Tải lên logo chứng chỉ thành công!");
        setCertificateImage(response.data.imageUrl);
        certificateImageForm.resetFields();
      }
    } catch (error) {
      console.error('Error uploading certificate logo:', error);
      CustomFailedToast("Tải lên logo chứng chỉ thất bại!");
    } finally {
      setCertificateImageLoading(false);
    }
  };

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      
      const formData = new FormData();
      
      // Thêm các trường cơ bản
      formData.append('title', values.title);
      formData.append('description', values.description);
      formData.append('category', JSON.stringify(values.category));
      formData.append('skills', JSON.stringify(values.skills));
      formData.append('staffId', values.staffId);
      formData.append('timeRange', JSON.stringify(values.timeRange));
      formData.append('location', JSON.stringify({
        ...values.location,
        latitude: location.latitude,
        longitude: location.longitude
      }));
      formData.append('maxParticipants', values.maxParticipants);
      formData.append('donationTarget', values.donationTarget);
      formData.append('contact', JSON.stringify(values.contact));
      formData.append('formData', JSON.stringify({ questions }));
      
      // Thêm thông tin chứng chỉ
      formData.append('certificateTitle', values.certificateTitle);
      formData.append('certificateDescription', values.certificateDescription);
      formData.append('certificateTemplate', values.certificateTemplate);
      formData.append('eventImages', JSON.stringify(eventImages));
      formData.append('certificateImage', certificateImage);

      const response = await axiosInstance.post('/organization/events', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.status === 'success' && response.data.event) {
        CustomSuccessToast("Tạo sự kiện thành công!")
        form.resetFields();
        eventImageForm.resetFields();
        certificateImageForm.resetFields();
        setQuestions([]);
        setEventImages([]);
        setCertificateImage(null);
        setCurrentStep(0);
        navigate('/owner-finished-events');
      }
    } catch (error) {
      console.error('Error creating event:', error);
      CustomFailedToast("Tạo sự kiện thất bại!")
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h2>Đăng Ký Sự Kiện Tình Nguyện</h2>
      <CustomToast />
      <Card>
        <Steps
          current={currentStep}
          items={steps.map(item => ({
            title: item.title,
            icon: item.icon
          }))}
          style={{ marginBottom: 24 }}
        />

        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{
            maxParticipants: 1,
            donationTarget: 0
          }}
        >
          <div style={{ marginBottom: 24 }}>
            {steps[currentStep].content}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            {currentStep > 0 && (
              <Button onClick={handlePrev}>
                <ArrowLeft size={16} className="me-2" />
                Quay lại
              </Button>
            )}
            {currentStep < steps.length - 1 && (
              <Button type="primary" onClick={handleNext}>
                Tiếp theo
                <ArrowRight size={16} className="ms-2" />
              </Button>
            )}
            {currentStep === steps.length - 1 && (
              <Button type="primary" htmlType="submit" loading={loading}>
                <Check size={16} className="me-2" />
                Hoàn tất
              </Button>
            )}
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default OrganizationPostPage;