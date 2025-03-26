import React, { useState, useRef } from 'react';
import { Container, Row, Col, Form, Button, Card, ProgressBar } from 'react-bootstrap';
import { 
  Info, MapPin, Upload, Users, Target, 
  ArrowRight, ArrowLeft, Check 
} from 'lucide-react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import iconUrl from '/node_modules/leaflet/dist/images/marker-icon.png';
import iconShadowUrl from '/node_modules/leaflet/dist/images/marker-shadow.png';
import CustomProgressBar from '../../components/progressbar/CustomProgressBar';

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
      title: 'Thông Tin Cơ Bản',
      icon: <Info />,
      render: () => (
        <Card>
          <Card.Header>
            <Info className="me-2" /> Thông Tin Cơ Bản
          </Card.Header>
          <Card.Body>
            <Form.Group className="mb-3">
              <Form.Label>Tiêu Đề Hoạt Động</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Nhập tiêu đề hoạt động"
                value={eventData.basicInfo.title}
                onChange={(e) => setEventData(prev => ({
                  ...prev, 
                  basicInfo: {
                    ...prev.basicInfo,
                    title: e.target.value
                  }
                }))}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Mô Tả Chi Tiết</Form.Label>
              <Form.Control 
                as="textarea" 
                rows={4} 
                placeholder="Mô tả mục tiêu và ý nghĩa của hoạt động"
                value={eventData.basicInfo.description}
                onChange={(e) => setEventData(prev => ({
                  ...prev, 
                  basicInfo: {
                    ...prev.basicInfo,
                    description: e.target.value
                  }
                }))}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Danh Mục Hoạt Động</Form.Label>
              <Form.Select
                value={eventData.basicInfo.category}
                onChange={(e) => setEventData(prev => ({
                  ...prev, 
                  basicInfo: {
                    ...prev.basicInfo,
                    category: e.target.value
                  }
                }))}
              >
                <option value="">Chọn danh mục</option>
                <option value="education">Giáo Dục</option>
                <option value="health">Y Tế</option>
                <option value="environment">Môi Trường</option>
                <option value="community">Cộng Đồng</option>
                <option value="children">Trẻ Em</option>
              </Form.Select>
            </Form.Group>
          </Card.Body>
        </Card>
      )
    },
    {
      title: 'Chọn Địa Điểm',
      icon: <MapPin />,
      render: () => (
        <Card>
          <Card.Header>
            <MapPin className="me-2" /> Chọn Địa Điểm
          </Card.Header>
          <Card.Body>
            <MapContainer 
              center={[10.7756, 106.7137]} 
              zoom={13} 
              style={{ height: "400px", width: "100%" }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <LocationSelector />
            </MapContainer>
            <Form.Group className="mt-3">
              <Form.Label>Địa Chỉ Chi Tiết</Form.Label>
              <Form.Control 
                type="text"
                placeholder="Nhập địa chỉ cụ thể"
                value={eventData.location.address}
                onChange={(e) => setEventData(prev => ({
                  ...prev,
                  location: {
                    ...prev.location,
                    address: e.target.value
                  }
                }))}
              />
            </Form.Group>
            <div className="mt-2">
              <strong>Tọa Độ Đã Chọn:</strong>
              <p>
                Vĩ độ: {eventData.location.latitude.toFixed(4)}, 
                Kinh độ: {eventData.location.longitude.toFixed(4)}
              </p>
            </div>
          </Card.Body>
        </Card>
      )
    },
    {
      title: 'Hình Ảnh & Tài Nguyên',
      icon: <Upload />,
      render: () => (
        <Card>
          <Card.Header>
            <Upload className="me-2" /> Hình Ảnh & Tài Nguyên
          </Card.Header>
          <Card.Body>
            <Form.Group>
              <Form.Label>Tải Lên Hình Ảnh</Form.Label>
              <Form.Control 
                type="file" 
                multiple 
                accept="image/*"
                onChange={handleImageUpload}
              />
            </Form.Group>
            {eventData.images.length > 0 && (
              <div className="image-preview mt-3">
                <h6>Hình Ảnh Đã Chọn</h6>
                <div className="d-flex flex-wrap">
                  {eventData.images.map((imageUrl, index) => (
                    <img 
                      key={index}
                      src={imageUrl} 
                      alt={`Hình ${index + 1}`} 
                      className="img-thumbnail me-2 mb-2"
                      style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                    />
                  ))}
                </div>
              </div>
            )}
            <Form.Group className="mt-3">
              <Form.Label>Vật Phẩm Cần Thiết</Form.Label>
              {eventData.requiredItems.map((item, index) => (
                <Form.Control 
                  key={index}
                  type="text"
                  className="mb-2"
                  placeholder="Nhập vật phẩm cần thiết"
                  value={item}
                  onChange={(e) => {
                    const newItems = [...eventData.requiredItems];
                    newItems[index] = e.target.value;
                    setEventData(prev => ({
                      ...prev,
                      requiredItems: newItems
                    }));
                  }}
                />
              ))}
              <Button 
                variant="outline-primary" 
                onClick={handleAddRequiredItem}
                className="mt-2"
              >
                + Thêm Vật Phẩm
              </Button>
            </Form.Group>
          </Card.Body>
        </Card>
      )
    },
    {
      title: 'Người Tham Gia',
      icon: <Users />,
      render: () => (
        <Card>
          <Card.Header>
            <Users className="me-2" /> Người Tham Gia
          </Card.Header>
          <Card.Body>
            <Form.Group className="mb-3">
              <Form.Label>Số Lượng Tình Nguyện Viên Mục Tiêu</Form.Label>
              <Form.Control 
                type="number"
                value={eventData.participation.volunteerTarget}
                onChange={(e) => setEventData(prev => ({
                  ...prev,
                  participation: {
                    ...prev.participation,
                    volunteerTarget: parseInt(e.target.value)
                  }
                }))}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Mục Tiêu Quyên Góp (VNĐ)</Form.Label>
              <Form.Control 
                type="number"
                value={eventData.participation.donationTarget}
                onChange={(e) => setEventData(prev => ({
                  ...prev,
                  participation: {
                    ...prev.participation,
                    donationTarget: parseInt(e.target.value)
                  }
                }))}
              />
            </Form.Group>
          </Card.Body>
        </Card>
      )
    },
    {
      title: 'Liên Hệ',
      icon: <Target />,
      render: () => (
        <Card>
          <Card.Header>
            <Target className="me-2" /> Thông Tin Liên Hệ
          </Card.Header>
          <Card.Body>
            <Form.Group className="mb-3">
              <Form.Label>Tên Người Liên Hệ</Form.Label>
              <Form.Control 
                type="text"
                value={eventData.contact.name}
                onChange={(e) => setEventData(prev => ({
                  ...prev,
                  contact: {
                    ...prev.contact,
                    name: e.target.value
                  }
                }))}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Số Điện Thoại</Form.Label>
              <Form.Control 
                type="tel"
                value={eventData.contact.phone}
                onChange={(e) => setEventData(prev => ({
                  ...prev,
                  contact: {
                    ...prev.contact,
                    phone: e.target.value
                  }
                }))}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control 
                type="email"
                value={eventData.contact.email}
                onChange={(e) => setEventData(prev => ({
                  ...prev,
                  contact: {
                    ...prev.contact,
                    email: e.target.value
                  }
                }))}
              />
            </Form.Group>
          </Card.Body>
        </Card>
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
    <Container className="py-4">
      <Row>
        <Col md={10} className="mx-auto">
          <Card>
            <Card.Header>
              <h3>Tạo Hoạt Động Thiện Nguyện</h3>
              {/* <ProgressBar 
                now={(step / steps.length) * 100} 
                label={`${step}/${steps.length}`} 
              /> */}
              <CustomProgressBar progress={(step / steps.length) * 100}/>
            </Card.Header>
            <Card.Body>
              {steps[step - 1].render()}
              
              <div className="d-flex justify-content-between mt-4">
                {step > 1 && (
                  <Button 
                    variant="secondary" 
                    onClick={handlePrevious}
                  >
                    <ArrowLeft className="me-2" /> Quay Lại
                  </Button>
                )}
                
                {step < steps.length ? (
                  <Button 
                    variant="primary" 
                    onClick={handleNext}
                    className="ms-auto"
                  >
                    Tiếp Theo <ArrowRight className="ms-2" />
                  </Button>
                ) : (
                  <Button 
                    variant="success" 
                    onClick={handleSubmit}
                    className="ms-auto"
                  >
                    <Check className="me-2" /> Hoàn Tất
                  </Button>
                )}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default OrganizationPostPage;