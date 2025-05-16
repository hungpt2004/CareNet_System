import React, { useState } from 'react';
import {
   Building2, FileText, Upload, Phone, Mail,
   MapPin, Info, Check, AlertCircle, Shield
} from 'lucide-react';
import {
   Form, Input, Button, Card, Upload as AntUpload,
   Space, Divider, Select, InputNumber, Steps, Typography, List
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import axiosInstance from '../../utils/AxiosInstance';
import { CustomFailedToast, CustomSuccessToast, CustomToast } from '../../components/toast/CustomToast';
import { useNavigate } from 'react-router-dom';
import styles from '../../css/AppColors.module.css';

const { TextArea } = Input;
const { Title, Text } = Typography;

const OrganizationRegisterPage = () => {
   const [form] = Form.useForm();
   const [licenseForm] = Form.useForm();
   const [loading, setLoading] = useState(false);
   const [licenseLoading, setLicenseLoading] = useState(false);
   const [licenseDocuments, setLicenseDocuments] = useState([]);
   const [currentStep, setCurrentStep] = useState(0);
   const [organizationId, setOrganizationId] = useState(null);
   const navigate = useNavigate();

   const handleSubmit = async (values) => {
      try {
         setLoading(true);
         
         const formData = {
            name: values.name,
            description: values.description,
            phone: values.phone,
         };

         const response = await axiosInstance.post('/organization/register-organization', formData);

         if (response.data.status === 'success' && response.data.organization) {
            CustomSuccessToast("Đăng ký tổ chức thành công!");
            setOrganizationId(response.data.organization._id);
            setCurrentStep(1); // Chuyển sang bước upload giấy tờ
         } else {
            throw new Error('Register failed');
         }
      } catch (error) {
         console.error('Error registering organization:', error);
         CustomFailedToast(error.response?.data?.message || "Đăng ký tổ chức thất bại!");
      } finally {
         setLoading(false);
      }
   };

   const handleLicenseSubmit = async (values) => {
      if (!organizationId) {
         CustomFailedToast("Vui lòng đăng ký thông tin tổ chức trước!");
         return;
      }

      try {
         setLicenseLoading(true);
         const formData = new FormData();
         
         if (values.documents && values.documents.length > 0) {
            values.documents.forEach((doc) => {
               if (doc.originFileObj) {
                  formData.append('documents', doc.originFileObj);
               }
            });
         } else {
            CustomFailedToast("Vui lòng chọn ít nhất một giấy tờ!");
            setLicenseLoading(false);
            return;
         }

         formData.append('organizationId', organizationId);

         const response = await axiosInstance.post('/api/images/upload-organization-documents', formData, {
            headers: {
               'Content-Type': 'multipart/form-data'
            }
         });

         if (response.data.status === 'success' && response.data.documents) {
            CustomSuccessToast("Tải lên giấy phép thành công!");
            setLicenseDocuments(response.data.documents.map(doc => doc.url));
            licenseForm.resetFields();
            navigate('/organization/login');
         } else {
            throw new Error('Upload failed');
         }
      } catch (error) {
         console.error('Error uploading license documents:', error);
         CustomFailedToast(error.response?.data?.message || "Tải lên giấy phép thất bại!");
      } finally {
         setLicenseLoading(false);
      }
   };

   const steps = [
      {
         title: 'Thông tin',
         icon: <Building2 size={20} />,
         content: (
            <Card className={styles.containerSecondary}>
               <div className="mb-6">
                  <Title level={4} className={styles.textPrimary}>
                     <Building2 className="mr-2" size={24} />
                     Thông tin tổ chức
                  </Title>
                  <Text type="secondary">
                     Điền đầy đủ thông tin về tổ chức của bạn
                  </Text>
               </div>
               <Form
                  form={form}
                  layout="vertical"
                  onFinish={handleSubmit}
               >
                  <Form.Item
                     name="name"
                     label={<Text strong>Tên tổ chức</Text>}
                     rules={[{ required: true, message: 'Vui lòng nhập tên tổ chức!' }]}
                  >
                     <Input
                        prefix={<Building2 size={16} className={styles.textPrimary} />}
                        placeholder="Nhập tên tổ chức"
                        size="large"
                     />
                  </Form.Item>

                  <Form.Item
                     name="description"
                     label={<Text strong>Mô tả</Text>}
                     rules={[{ required: true, message: 'Vui lòng nhập mô tả!' }]}
                  >
                     <TextArea
                        rows={4}
                        placeholder="Mô tả chi tiết về tổ chức"
                        size="large"
                     />
                  </Form.Item>

                  <Form.Item
                     name="phone"
                     label={<Text strong>Số điện thoại</Text>}
                     rules={[
                        { required: true, message: 'Vui lòng nhập số điện thoại!' },
                        { pattern: /^[0-9]{10}$/, message: 'Số điện thoại không hợp lệ!' }
                     ]}
                  >
                     <Input
                        prefix={<Phone size={16} className={styles.textPrimary} />}
                        placeholder="Nhập số điện thoại"
                        size="large"
                     />
                  </Form.Item>

                  <Form.Item>
                     <Button
                        className={styles.button}
                        htmlType="submit"
                        loading={loading}
                        icon={<Check size={16} />}
                        size="large"
                        block
                     >
                        Tiếp tục
                     </Button>
                  </Form.Item>
               </Form>
            </Card>
         )
      },
      {
         title: 'Giấy phép',
         icon: <FileText size={20} />,
         content: (
            <Card className={`mb-6 ${styles.containerSecondary}`}>
               <div className="mb-6">
                  <Title level={4} className={styles.textPrimary}>
                     <Shield className="mr-2" size={24} />
                     Thông tin giấy phép
                  </Title>
                  <Text type="secondary">
                     Vui lòng tải lên các giấy phép hoạt động của tổ chức để được xác minh
                  </Text>
               </div>
               <Form
                  form={licenseForm}
                  onFinish={handleLicenseSubmit}
                  layout="vertical"
               >
                  <Form.Item
                     name="documents"
                     label={<Text strong>Giấy phép hoạt động</Text>}
                     rules={[
                        { required: true, message: 'Vui lòng tải lên ít nhất 1 giấy phép!' },
                        {
                           validator: (_, value) => {
                              if (value && value.length > 0) {
                                 const isLt5M = value.every(file => file.size / 1024 / 1024 < 5);
                                 if (!isLt5M) {
                                    return Promise.reject('Kích thước file không được vượt quá 5MB!');
                                 }
                                 const isValidType = value.every(file =>
                                    ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'].includes(file.type)
                                 );
                                 if (!isValidType) {
                                    return Promise.reject('Chỉ chấp nhận file PDF, JPEG hoặc PNG!');
                                 }
                              }
                              return Promise.resolve();
                           }
                        }
                     ]}
                  >
                     <AntUpload
                        listType="picture-card"
                        multiple
                        beforeUpload={(file) => {
                           const isLt5M = file.size / 1024 / 1024 < 5;
                           if (!isLt5M) {
                              CustomFailedToast('Kích thước file không được vượt quá 5MB!');
                              return false;
                           }
                           const isValidType = ['application/pdf', 'image/jpeg', 'image/png'].includes(file.type);
                           if (!isValidType) {
                              CustomFailedToast('Chỉ chấp nhận file PDF, JPEG hoặc PNG!');
                              return false;
                           }
                           return false;
                        }}
                        onChange={({ fileList }) => {
                           licenseForm.setFieldsValue({ documents: fileList });
                        }}
                        className="custom-upload"
                        accept=".pdf,.jpg,.jpeg,.png"
                     >
                        <div>
                           <PlusOutlined />
                           <div style={{ marginTop: 8 }}>Tải lên</div>
                        </div>
                     </AntUpload>
                  </Form.Item>

                  <Form.Item>
                     <Space size="large" style={{ width: '100%', justifyContent: 'space-between' }}>
                        <Button
                           className={styles.buttonOutline}
                           onClick={() => setCurrentStep(0)}
                           icon={<AlertCircle size={16} />}
                           size="large"
                        >
                           Quay lại
                        </Button>
                        <Button
                           className={styles.button}
                           htmlType="submit"
                           loading={licenseLoading}
                           icon={<Upload size={16} />}
                           size="large"
                        >
                           Hoàn tất đăng ký
                        </Button>
                     </Space>
                  </Form.Item>
               </Form>

               {licenseDocuments.length > 0 && (
                  <Card className={`mt-4 ${styles.containerSecondary}`}>
                     <Title level={5} className={styles.textPrimary}>
                        Giấy tờ đã tải lên
                     </Title>
                     <List
                        dataSource={licenseDocuments}
                        renderItem={(url) => (
                           <List.Item>
                              <Space>
                                 <FileText size={16} className={styles.textPrimary} />
                                 <a href={url} target="_blank" rel="noopener noreferrer">
                                    {url.split('/').pop()}
                                 </a>
                              </Space>
                           </List.Item>
                        )}
                     />
                  </Card>
               )}
            </Card>
         )
      }
   ];

   return (
      <div className={`p-8 max-w-4xl mx-auto ${styles.body}`}>
         <div className="text-center mb-8">
            <Title level={2} className={`${styles.textPrimary} p-5`}>
               Đăng Ký Tổ Chức
            </Title>
            <Text type="secondary" className="text-lg">
               Tham gia cùng CareNet để tạo nên những hoạt động ý nghĩa
            </Text>
         </div>

         <CustomToast />

         <Steps
            current={currentStep}
            items={steps.map(item => ({
               title: item.title,
               icon: item.icon
            }))}
            className="mb-8 p-5"
         />

         {steps[currentStep].content}

         <div className="mt-6 text-center">
            <Text type="secondary">
               Bằng việc đăng ký, bạn đồng ý với các điều khoản và điều kiện của CareNet
            </Text>
         </div>
      </div>
   );
};

export default OrganizationRegisterPage; 