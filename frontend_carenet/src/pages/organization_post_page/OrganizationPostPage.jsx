import React, { useState, useRef } from 'react';
import { Container, Row, Col, Form, Button, Card, ProgressBar } from 'react-bootstrap';
import { 
  Info, MapPin, Upload, Users, Target, 
  ArrowRight, ArrowLeft, Check 
} from 'lucide-react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import axiosInstance from '../../utils/AxiosInstance';
import { CustomFailedToast, CustomSuccessToast, CustomToast } from '../../components/toast/CustomToast';
import { IoMdPerson } from 'react-icons/io';
import { PlusOutlined } from '@ant-design/icons';
import useAuthStore from "../../hooks/authStore";
import styles from '../../css/OrganizationPostPage.module.css';
import Title from 'antd/es/skeleton/Title';

// Hoặc nếu trên Vite, bạn có thể dùng:
let DefaultIcon = L.icon({
    iconUrl: '/node_modules/leaflet/dist/images/marker-icon.png',
    shadowUrl: '/node_modules/leaflet/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;
const OrganizationPostPage = () => {
  const [step, setStep] = useState(1);
  const [eventData, setEventData] = useState({
    basicInfo: {
      title: '',
      description: '',
      category: ''
    },
    location: {
      latitude: 10.7756, // Tọa độ mặc định Việt Nam
      longitude: 106.7137,
      address: ''
    },
    images: [],
    participation: {
      volunteerTarget: 0,
      donationTarget: 0
    },
    requiredItems: [],
    contact: {
      name: '',
      phone: '',
      email: ''
    }
  });

  const LocationSelector = () => {
    useMapEvents({
      click: (e) => {
        const { lat, lng } = e.latlng;
        setEventData(prev => ({
          ...prev,
          location: {
            ...prev.location,
            latitude: lat,
            longitude: lng
          }
        }));
      }
    });

    return eventData.location.latitude ? (
      <Marker 
        position={[
          eventData.location.latitude, 
          eventData.location.longitude
        ]} 
      />
    ) : null;
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = files.map(file => URL.createObjectURL(file));
    setEventData(prev => ({
      ...prev,
      images: [...prev.images, ...imageUrls]
    }));
  };

  const handleAddRequiredItem = () => {
    setEventData(prev => ({
      ...prev,
      requiredItems: [...prev.requiredItems, '']
    }));
  };

  const steps = [
    {
      title: 'Thông tin cơ bản',
      icon: <Info size={20} />,
      content: (
        <div className={styles.formSection}>
          <div className={styles.sectionTitle}>
            <div className={styles.sectionIcon}>
              <Info size={16} />
            </div>
            Thông tin cơ bản về sự kiện
          </div>
          
          <Form.Item
            name="title"
            label={<div className={styles.formLabel}>Tên sự kiện</div>}
            rules={[{ required: true, message: 'Vui lòng nhập tên sự kiện!' }]}
            className={styles.formItem}
          >
            <Input 
              placeholder="Nhập tên sự kiện" 
              className={styles.formInput}
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="description"
            label={<div className={styles.formLabel}>Mô tả</div>}
            rules={[{ required: true, message: 'Vui lòng nhập mô tả!' }]}
            className={styles.formItem}
          >
            <TextArea 
              rows={4} 
              placeholder="Mô tả chi tiết về sự kiện" 
              className={styles.formTextarea}
            />
          </Form.Item>

          <Form.Item
            name="category"
            label={<div className={styles.formLabel}>Danh mục</div>}
            rules={[{ required: true, message: 'Vui lòng chọn hoặc tạo danh mục!' }]}
            className={styles.formItem}
          >
            <Select
              placeholder="Chọn hoặc tạo danh mục mới"
              className={styles.formSelect}
              size="large"
              options={[
                { value: 'Giáo dục', label: 'Giáo dục' },
                { value: 'Y tế', label: 'Y tế' },
                { value: 'Môi trường', label: 'Môi trường' },
                { value: 'Cộng đồng', label: 'Cộng đồng' },
                { value: 'Trẻ em', label: 'Trẻ em' },
                ...customCategories.map(cat => ({ value: cat, label: cat, key: cat }))
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
            label={<div className={styles.formLabel}>Kỹ năng yêu cầu</div>}
            rules={[{ required: true, message: 'Vui lòng chọn hoặc tạo kỹ năng!' }]}
            className={styles.formItem}
          >
            <Select
              mode="tags"
              placeholder="Nhập kỹ năng cần thiết"
              className={styles.formSelect}
              size="large"
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
            label={<div className={styles.formLabel}>Nhân viên phụ trách</div>}
            rules={[{ required: true, message: 'Vui lòng chọn nhân viên phụ trách!' }]}
            className={styles.formItem}
          >
            <Select
              placeholder="Chọn nhân viên phụ trách"
              className={styles.formSelect}
              size="large"
              onChange={handleStaffChange}
            >
              {staffList.map(staff => (
                <Select.Option key={staff._id} value={staff._id}>
                  {staff.fullname} - {staff.email}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </div>
      )
    },
    {
      title: 'Thời gian & Địa điểm',
      icon: <Calendar size={20} />,
      content: (
        <div className={styles.formSection}>
          <div className={styles.sectionTitle}>
            <div className={styles.sectionIcon}>
              <Calendar size={16} />
            </div>
            Thời gian và địa điểm tổ chức
          </div>

          <Form.Item
            name="timeRange"
            label={<div className={styles.formLabel}>Thời gian diễn ra</div>}
            rules={[{ required: true, message: 'Vui lòng chọn thời gian!' }]}
            className={styles.formItem}
          >
            <RangePicker 
              showTime 
              format="YYYY-MM-DD HH:mm"
              size="large"
              style={{ width: '100%' }}
            />
          </Form.Item>

          <Form.Item label={<div className={styles.formLabel}>Địa điểm</div>}>
            <div className={styles.mapContainer}>
              <MapContainer 
                center={[location.latitude, location.longitude]} 
                zoom={13} 
                className={styles.mapWrapper}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <LocationSelector onLocationChange={handleLocationChange} />
                {location.latitude && location.longitude && (
                  <Marker position={[location.latitude, location.longitude]} />
                )}
              </MapContainer>
            </div>

            <div className={styles.locationInputs}>
              <Form.Item
                name={['location', 'street']}
                rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}
              >
                <Input 
                  placeholder="Số nhà, tên đường" 
                  className={styles.locationInput}
                  size="large"
                />
              </Form.Item>

              <Form.Item
                name={['location', 'ward']}
                rules={[{ required: true, message: 'Vui lòng nhập phường/xã!' }]}
              >
                <Input 
                  placeholder="Phường/Xã" 
                  className={styles.locationInput}
                  size="large"
                />
              </Form.Item>

              <Form.Item
                name={['location', 'district']}
                rules={[{ required: true, message: 'Vui lòng nhập quận/huyện!' }]}
              >
                <Input 
                  placeholder="Quận/Huyện" 
                  className={styles.locationInput}
                  size="large"
                />
              </Form.Item>

              <Form.Item
                name={['location', 'province']}
                rules={[{ required: true, message: 'Vui lòng nhập tỉnh/thành phố!' }]}
              >
                <Input 
                  placeholder="Tỉnh/Thành phố" 
                  className={styles.locationInput}
                  size="large"
                />
              </Form.Item>
            </div>
          </Form.Item>
        </div>
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
              // { pattern: /^[0-9]{10}$/, message: 'Số điện thoại không hợp lệ!' }
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
        <div className={styles.formSection}>
          <div className={styles.sectionTitle}>
            <div className={styles.sectionIcon}>
              <HelpCircle size={16} />
            </div>
            Tạo form đăng ký cho tình nguyện viên
          </div>

          <div className={styles.questionBuilder}>
            <div className={styles.addQuestionSection}>
              <Select
                style={{ width: 200 }}
                placeholder="Chọn loại câu hỏi"
                size="large"
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
                <Button 
                  className={styles.addQuestionButton}
                  icon={<PlusOutlined />}
                  size="large"
                >
                  Thêm câu hỏi
                </Button>
              </Tooltip>
            </div>

            <List
              dataSource={questions}
              renderItem={(question, index) => (
                <div className={styles.questionItem}>
                  <div className={styles.questionHeader}>
                    <Form.Item
                      label="Câu hỏi"
                      required
                      style={{ marginBottom: 8, flex: 1 }}
                    >
                      <Input
                        value={question.question}
                        onChange={(e) => {
                          const newQuestions = [...questions];
                          newQuestions[index].question = e.target.value;
                          setQuestions(newQuestions);
                        }}
                        placeholder="Nhập câu hỏi"
                        className={styles.formInput}
                        size="large"
                      />
                    </Form.Item>
                    <Button 
                      className={styles.deleteButton}
                      icon={<Trash2 size={16} />}
                      onClick={() => {
                        const newQuestions = [...questions];
                        newQuestions.splice(index, 1);
                        setQuestions(newQuestions);
                      }}
                    >
                      Xóa
                    </Button>
                  </div>

                  {question.type !== 'text' && (
                    <Form.Item label="Các lựa chọn" required>
                      <div className={styles.optionsList}>
                        {question.options.map((option, optionIndex) => (
                          <div key={optionIndex} className={styles.optionItem}>
                            <Input
                              value={option}
                              onChange={(e) => {
                                const newQuestions = [...questions];
                                newQuestions[index].options[optionIndex] = e.target.value;
                                setQuestions(newQuestions);
                              }}
                              placeholder="Nhập lựa chọn"
                              suffix={
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
                              }
                            />
                          </div>
                        ))}
                      </div>
                      <Button
                        className={styles.addOptionButton}
                        onClick={() => {
                          const newQuestions = [...questions];
                          newQuestions[index].options.push('');
                          setQuestions(newQuestions);
                        }}
                        icon={<PlusOutlined />}
                        block
                      >
                        Thêm lựa chọn
                      </Button>
                    </Form.Item>
                  )}
                </div>
              )}
            />
          </div>
        </div>
      )
    },
    {
      title: 'Hình ảnh & Tài nguyên',
      icon: <Upload size={20} />,
      content: (
        <div className={styles.formSection}>
          <div className={styles.sectionTitle}>
            <div className={styles.sectionIcon}>
              <Upload size={16} />
            </div>
            Hình ảnh và tài nguyên sự kiện
          </div>

          <div className={styles.uploadSection}>
            <div className={styles.uploadTitle}>Hình ảnh sự kiện</div>
            <div className={styles.uploadArea}>
              <AntUpload
                listType="picture-card"
                multiple
                fileList={eventImageFileList}
                beforeUpload={() => false}
                onChange={({ fileList }) => setEventImageFileList(fileList)}
              >
                {eventImageFileList.length >= 10 ? null : (
                  <div>
                    <Upload size={20} />
                    <div style={{ marginTop: 8 }}>Tải lên</div>
                  </div>
                )}
              </AntUpload>
            </div>
            <Button 
              className={styles.uploadButton}
              onClick={handleEventImageSubmit}
              loading={eventImageLoading}
              disabled={!eventId}
              icon={eventImageLoading ? <div className={styles.loadingSpinner}>⟳</div> : <Upload size={16} />}
            >
              {eventImageLoading ? 'Đang tải lên...' : 'Tải lên ảnh sự kiện'}
            </Button>
          </div>

          {eventImages.length > 0 && (
            <div className={styles.uploadedFiles}>
              <div className={styles.uploadedFilesTitle}>
                Hình ảnh đã tải lên
              </div>
              <List
                dataSource={eventImages}
                renderItem={(url) => (
                  <div className={styles.fileItem}>
                    <FileText size={16} className={styles.fileIcon} />
                    <a 
                      href={url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={styles.fileLink}
                    >
                      {url.split('/').pop()}
                    </a>
                  </div>
                )}
              />
            </div>
          )}
        </div>
      )
    }
  ];

  const handleNext = () => {
    if (step < steps.length) {
      setStep(step + 1);
    }
  };

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = () => {
    console.log('Toàn bộ dữ liệu sự kiện:', eventData);
    // Xử lý submit form
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Đăng Ký Sự Kiện Tình Nguyện</h1>
        <p className={styles.pageSubtitle}>
          Tạo sự kiện tình nguyện ý nghĩa và kết nối với cộng đồng
        </p>
      </div>

      <CustomToast />
      
      <Card className={styles.mainCard}>
        <div className={styles.stepsContainer}>
          <Steps
            current={currentStep}
            items={steps.map(item => ({
              title: item.title,
              icon: item.icon
            }))}
          />
        </div>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          onValuesChange={handleFormValuesChange}
          initialValues={formValues}
        >
          <div className={styles.formContent}>
            <div className={styles.stepContent}>
              {steps[currentStep].content}
            </div>
          </div>

          <div className={styles.navigationButtons}>
            {currentStep > 0 && (
              <Button 
                onClick={handlePrev}
                className={styles.prevButton}
                icon={<ArrowLeft size={16} />}
                size="large"
              >
                Quay lại
              </Button>
            )}
            {currentStep < steps.length - 1 && (
              <Button 
                type="primary" 
                onClick={handleNext} 
                className={styles.nextButton}
                loading={currentStep === steps.length - 2 && loading}
                icon={currentStep !== steps.length - 2 ? <ArrowRight size={16} /> : <Check size={16} />}
                size="large"
              >
                {currentStep === steps.length - 2 ? 'Hoàn tất' : 'Tiếp theo'}
              </Button>
            )}
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default OrganizationPostPage;