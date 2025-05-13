import React, { useState } from 'react';
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
import { CustomToast } from '../../components/toast/CustomToast';
import { IoMdPerson } from 'react-icons/io';

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
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [location, setLocation] = useState({
    latitude: 10.7756,
    longitude: 106.7137,
    street: '',
    ward: '',
    district: '',
    province: ''
  });

  const handleLocationChange = (lat, lng) => {
    setLocation(prev => ({
      ...prev,
      latitude: lat,
      longitude: lng
    }));
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
            rules={[{ required: true, message: 'Vui lòng chọn danh mục!' }]}
          >
            <Select placeholder="Chọn danh mục">
              <Select.Option value="education">Giáo dục</Select.Option>
              <Select.Option value="health">Y tế</Select.Option>
              <Select.Option value="environment">Môi trường</Select.Option>
              <Select.Option value="community">Cộng đồng</Select.Option>
              <Select.Option value="children">Trẻ em</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="skills"
            label="Kỹ năng yêu cầu"
            rules={[{ required: true, message: 'Vui lòng chọn kỹ năng!' }]}
          >
            <Select mode="tags" placeholder="Nhập kỹ năng cần thiết">
              <Select.Option value="communication">Giao tiếp</Select.Option>
              <Select.Option value="leadership">Lãnh đạo</Select.Option>
              <Select.Option value="teamwork">Làm việc nhóm</Select.Option>
              <Select.Option value="teaching">Giảng dạy</Select.Option>
              <Select.Option value="medical">Y tế</Select.Option>
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
            rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}
          >
            <Input prefix={<Info size={16} />} />
          </Form.Item>

          <Form.Item
            name={['contact', 'phone']}
            label="Số điện thoại"
            rules={[
              { required: true, message: 'Vui lòng nhập số điện thoại!' },
              { pattern: /^[0-9]{10}$/, message: 'Số điện thoại không hợp lệ!' }
            ]}
          >
            <Input prefix={<Phone size={16} />} />
          </Form.Item>

          <Form.Item
            name={['contact', 'email']}
            label="Email"
            rules={[
              { required: true, message: 'Vui lòng nhập email!' },
              { type: 'email', message: 'Email không hợp lệ!' }
            ]}
          >
            <Input prefix={<Mail size={16} />} />
          </Form.Item>

          <Form.Item
            name={['contact', 'checker']}
            label="Người phụ trách"
            rules={[
              { required: true, message: 'Vui lòng nhập email!' },
              { type: 'email', message: 'Email không hợp lệ!' }
            ]}
          >
            <Input prefix={<IoMdPerson size={16} />} />
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
                <Button type="primary" icon={<Plus size={16} />}>
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
                        icon={<Plus size={16} />}
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

  const handleNext = () => {
    form.validateFields().then(() => {
      setCurrentStep(currentStep + 1);
    });
  };

  const handlePrev = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const formData = {
        ...values,
        startAt: values.timeRange[0].toISOString(),
        endAt: values.timeRange[1].toISOString(),
        location: {
          ...values.location,
          latitude: location.latitude,
          longitude: location.longitude
        },
        formData: {
          questions: questions
        },
        status: 'hiring'
      };

      const response = await axiosInstance.post('/event/create', formData);
      if (response.data.status === 'success') {
        message.success('Tạo sự kiện thành công!');
        form.resetFields();
        setQuestions([]);
        setCurrentStep(0);
      }
    } catch (error) {
      console.error('Error creating event:', error);
      message.error('Có lỗi xảy ra khi tạo sự kiện!');
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