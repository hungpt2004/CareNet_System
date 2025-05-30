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
import { motion, AnimatePresence } from 'framer-motion';
import axiosInstance from '../../utils/AxiosInstance';
import { CustomFailedToast, CustomSuccessToast, CustomToast } from '../../components/toast/CustomToast';
import styles from '../../css/AppColors.module.css';
import AIPromptModal from '../../components/ai_modal_prompt/AIPromptModal';

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
   const [fileList, setFileList] = useState([]);

   // Animation variants for the container
   const containerVariants = {
      hidden: { opacity: 0, y: 50 },
      visible: {
         opacity: 1,
         y: 0,
         transition: {
            duration: 0.5,
            ease: 'easeOut',
            when: 'beforeChildren',
            staggerChildren: 0.1
         }
      }
   };

   // Animation variants for cards
   const cardVariants = {
      hidden: { opacity: 0, x: -50 },
      visible: {
         opacity: 1,
         x: 0,
         transition: { duration: 0.5, ease: 'easeOut' }
      }
   };

   // Enhanced button variants with blur effect
   const buttonVariants = {
      initial: {
         scale: 1,
         filter: 'blur(0px)',
         boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)'
      },
      hover: {
         scale: 1,
         filter: 'blur(0.5px)', // Subtle blur on hover
         boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)',
         transition: {
            duration: 0.3,
            ease: 'easeOut'
         }
      },
      tap: {
         scale: 0.95,
         filter: 'blur(0px)',
         transition: { duration: 0.2 }
      },
      loading: {
         scale: 1,
         filter: 'blur(1px)', // Stronger blur during loading
         transition: { duration: 0.4 }
      }
   };

   // Animation variants for form items
   const formItemVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: {
         opacity: 1,
         y: 0,
         transition: { duration: 0.4, ease: 'easeOut' }
      }
   };

   // Animation variants for list items
   const listItemVariants = {
      hidden: { opacity: 0, y: 10 },
      visible: {
         opacity: 1,
         y: 0,
         transition: { duration: 0.3, ease: 'easeOut' }
      }
   };

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
            setCurrentStep(1);
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

         if (fileList && fileList.length > 0) {
            fileList.forEach((file, index) => {
               if (file.originFileObj) {
                  formData.append('documents', file.originFileObj);
               }
            });
         } else {
            CustomFailedToast("Vui lòng chọn ít nhất một giấy tờ!");
            setLicenseLoading(false);
            return;
         }

         formData.append('organizationId', organizationId);

         const response = await axiosInstance.post('/images/upload-organization-documents', formData, {
            headers: {
               'Content-Type': 'multipart/form-data'
            }
         });

         if (response.data.status === 'success' && response.data.documents) {
            CustomSuccessToast("Tải lên giấy phép thành công!");
            setLicenseDocuments(response.data.documents.map(doc => doc.url));
            setFileList([]);
            licenseForm.resetFields();
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

   // Loading spinner component for buttons
   const LoadingSpinner = () => (
      <motion.div
         animate={{ rotate: 360 }}
         transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
         style={{ display: 'inline-block', marginRight: 8 }}
      >
         <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" opacity="0.3" />
            <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="4" />
         </svg>
      </motion.div>
   );

   const steps = [
      {
         title: 'Thông tin',
         icon: <Building2 size={20} />,
         content: (
            <motion.div variants={cardVariants} initial="hidden" animate="visible">
               <Card className={styles.containerSecondary}>
                  <motion.div className="mb-6" variants={formItemVariants}>
                     <Title level={4} className={styles.textPrimary}>
                        <Building2 className="mr-2" size={24} />
                        Thông tin tổ chức
                     </Title>
                     <Text type="secondary">
                        Điền đầy đủ thông tin về tổ chức của bạn
                     </Text>
                  </motion.div>
                  <Form
                     form={form}
                     layout="vertical"
                     onFinish={handleSubmit}
                  >
                     <motion.div variants={formItemVariants}>
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
                     </motion.div>

                     <motion.div variants={formItemVariants}>
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
                     </motion.div>

                     <motion.div variants={formItemVariants}>
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
                     </motion.div>
                     <div className='mb-3 d-flex justify-center align-items-center'>
                        <AIPromptModal />
                     </div>
                     <motion.div variants={formItemVariants}>
                        <Form.Item>
                           <motion.div
                              variants={buttonVariants}
                              initial="initial"
                              whileHover="hover"
                              whileTap="tap"
                              animate={loading ? 'loading' : 'initial'}
                           >
                              <Button
                                 htmlType="submit"
                                 disabled={loading}
                                 icon={loading ? <LoadingSpinner /> : <Check size={16} />}
                                 size="large"
                                 block
                              >
                                 {loading ? 'Đang xử lý...' : 'Tiếp tục'}
                              </Button>
                           </motion.div>
                        </Form.Item>
                     </motion.div>
                  </Form>
               </Card>
            </motion.div>
         )
      },
      {
         title: 'Giấy phép',
         icon: <FileText size={20} />,
         content: (
            <motion.div variants={cardVariants} initial="hidden" animate="visible">
               <Card className={`mb-6 ${styles.containerSecondary}`}>
                  <motion.div className="mb-6" variants={formItemVariants}>
                     <Title level={4} className={styles.textPrimary}>
                        <Shield className="mr-2" size={24} />
                        Thông tin giấy phép
                     </Title>
                     <Text type="secondary">
                        Vui lòng tải lên các giấy phép hoạt động của tổ chức để được xác minh
                     </Text>
                  </motion.div>
                  <Form
                     form={licenseForm}
                     onFinish={handleLicenseSubmit}
                     layout="vertical"
                  >
                     <motion.div variants={formItemVariants}>
                        <Form.Item
                           name="documents"
                           label={<Text strong>Giấy phép hoạt động</Text>}
                           rules={[
                              { required: true, message: 'Vui lòng tải lên ít nhất 1 giấy tờ!' },
                              {
                                 validator: (_, value) => {
                                    if (fileList && fileList.length > 0) {
                                       const isLt5M = fileList.every(file => file.size / 1024 / 1024 < 5);
                                       if (!isLt5M) {
                                          return Promise.reject('Kích thước file không được vượt quá 5MB!');
                                       }
                                       const isValidType = fileList.every(file =>
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
                              fileList={fileList}
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
                              onChange={({ fileList: newFileList }) => {
                                 setFileList(newFileList);
                                 licenseForm.setFieldsValue({ documents: newFileList });
                              }}
                              className="custom-upload"
                              accept=".pdf,.jpg,.jpeg,.png"
                           >
                              <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.2 }}>
                                 <PlusOutlined />
                                 <div style={{ marginTop: 8 }}>Tải lên</div>
                              </motion.div>
                           </AntUpload>
                        </Form.Item>
                     </motion.div>

                     <motion.div variants={formItemVariants}>
                        <Form.Item>
                           <Space size="large" style={{ width: '100%', justifyContent: 'space-between' }}>
                              <motion.div
                                 variants={buttonVariants}
                                 initial="initial"
                                 whileHover="hover"
                                 whileTap="tap"
                                 animate={licenseLoading ? 'loading' : 'initial'}
                              >
                                 <Button
                                    className={styles.buttonOutline}
                                    onClick={() => setCurrentStep(0)}
                                    disabled={licenseLoading}
                                    icon={licenseLoading ? <LoadingSpinner /> : <AlertCircle size={16} />}
                                    size="large"
                                 >
                                    {licenseLoading ? 'Đang xử lý...' : 'Quay lại'}
                                 </Button>
                              </motion.div>
                              <motion.div
                                 variants={buttonVariants}
                                 initial="initial"
                                 whileHover="hover"
                                 whileTap="tap"
                                 animate={licenseLoading ? 'loading' : 'initial'}
                              >
                                 <Button
                                    className={styles.button}
                                    htmlType="submit"
                                    disabled={licenseLoading}
                                    icon={licenseLoading ? <LoadingSpinner /> : <Upload size={16} />}
                                    size="large"
                                 >
                                    {licenseLoading ? 'Đang xử lý...' : 'Hoàn tất đăng ký'}
                                 </Button>
                              </motion.div>
                           </Space>
                        </Form.Item>
                     </motion.div>
                  </Form>

                  <AnimatePresence>
                     {licenseDocuments.length > 0 && (
                        <motion.div
                           initial={{ opacity: 0, height: 0 }}
                           animate={{ opacity: 1, height: 'auto' }}
                           exit={{ opacity: 0, height: 0 }}
                           transition={{ duration: 0.4 }}
                        >
                           <Card className={`mt-4 ${styles.containerSecondary}`}>
                              <Title level={5} className={styles.textPrimary}>
                                 Giấy tờ đã tải lên
                              </Title>
                              <List
                                 dataSource={licenseDocuments}
                                 renderItem={(url, index) => (
                                    <motion.div
                                       key={url}
                                       variants={listItemVariants}
                                       initial="hidden"
                                       animate="visible"
                                       custom={index}
                                       transition={{ delay: index * 0.1 }}
                                    >
                                       <List.Item>
                                          <Space>
                                             <FileText size={16} className={styles.textPrimary} />
                                             <a href={url} target="_blank" rel="noopener noreferrer">
                                                {url.split('/').pop()}
                                             </a>
                                          </Space>
                                       </List.Item>
                                    </motion.div>
                                 )}
                              />
                           </Card>
                        </motion.div>
                     )}
                  </AnimatePresence>
               </Card>
            </motion.div>
         )
      }
   ];

   return (
      <motion.div
         className={`mt-5 p-8 max-w-4xl mx-auto ${styles.body}`}
         variants={containerVariants}
         initial="hidden"
         animate="visible"
      >
         <motion.div className="text-center mb-2" variants={formItemVariants}>
            <Title level={2} color={`${styles.textPrimary}`} className={`${styles.textPrimary}`}>
               Đăng Ký Tổ Chức
            </Title>
            <Text type="secondary" className="text-lg">
               Tham gia cùng CareNet để tạo nên những hoạt động ý nghĩa
            </Text>
         </motion.div>

         <CustomToast />

         <motion.div variants={formItemVariants}>
            <Steps
               current={currentStep}
               items={steps.map(item => ({
                  title: item.title,
                  icon: item.icon
               }))}
               className="mb-8 p-5"
            />
         </motion.div>

         <AnimatePresence mode="wait">
            <motion.div
               key={currentStep}
               initial={{ opacity: 0, x: 100 }}
               animate={{ opacity: 1, x: 0 }}
               exit={{ opacity: 0, x: -100 }}
               transition={{ duration: 0.5, ease: 'easeInOut' }}
            >
               {steps[currentStep].content}
            </motion.div>
         </AnimatePresence>

         <motion.div className="mt-6 text-center mb-5" variants={formItemVariants}>
            <Text type="secondary">
               Bằng việc đăng ký, bạn đồng ý với các điều khoản và điều kiện của CareNet
            </Text>
         </motion.div>
      </motion.div>
   );
};

export default OrganizationRegisterPage;