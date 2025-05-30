// AIPromptModal.jsx
import React, { useState } from 'react';
import { Button, Modal, Input, Typography, message, Spin, Space } from 'antd';
import { RobotOutlined, SendOutlined, CopyOutlined, CloseOutlined } from '@ant-design/icons';
import styles from '../../css/PromptModal.module.css';
import PromptService from '../../services/prompt-service/prompt.service';
import { CustomFailedToast, CustomSuccessToast, CustomToast } from '../toast/CustomToast';

const { TextArea } = Input;
const { Title, Text } = Typography;

const AIPromptModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  // ✅ Khởi tạo service instance
  const promptService = new PromptService();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setPrompt('');
    setResponse('');
  };

  const handleSubmit = async () => {
    if (!prompt.trim()) {
      message.warning('Vui lòng nhập prompt!');
      return;
    }

    setLoading(true);
    
    try {
      // ✅ Sử dụng PromptService thay vì fetch
      const {status, message, content} = await promptService.generatePrompt(prompt.trim());

      if (status === 'success') {
        // ✅ Lấy content từ response
        setResponse(content);
        CustomSuccessToast('Nội dung đã được tạo thành công!');
      } else {
         CustomFailedToast(message || 'Không thể tạo nội dung!');
        setResponse('');
      }
    } catch (error) {
      console.error('Error:', error);
      
      // ✅ Xử lý các loại lỗi khác nhau
      if (error.response) {
        // Lỗi từ server
        message.error(error.response.data?.message || 'Server error!');
      } else if (error.request) {
        // Lỗi network
        message.error('Không thể kết nối đến server!');
      } else {
        // Lỗi khác
        message.error('Có lỗi không xác định xảy ra!');
      }
      
      setResponse('');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(response);
      message.success('Đã copy vào clipboard!');
    } catch (error) {
      message.error('Không thể copy!');
    }
  };

  return (
    <div className={styles.container}>
      <Button
        type="primary"
        icon={<RobotOutlined />}
        size="large"
        className={styles.triggerButton}
        onClick={showModal}
      >
        Tạo nội dung với AI
      </Button>
      <CustomToast/>
      <Modal
        title={
          <div className={styles.modalHeader}>
            <RobotOutlined className={styles.headerIcon} />
            <Title level={4} className={styles.headerTitle}>
              Tạo nội dung với Gemini AI
            </Title>
          </div>
        }
        open={isModalOpen}
        onCancel={handleCancel}
        width={700}
        className={styles.modal}
        footer={[
          <Button key="cancel" onClick={handleCancel} disabled={loading}>
            Hủy
          </Button>,
          <Button
            key="submit"
            type="primary"
            icon={<SendOutlined />}
            loading={loading}
            onClick={handleSubmit}
            disabled={!prompt.trim()}
          >
            {loading ? 'Đang tạo...' : 'Gửi'}
          </Button>,
        ]}
      >
        <div className={styles.modalContent}>
          {/* Input Section */}
          <div className={styles.inputSection}>
            <Text strong className={styles.label}>
              Nhập prompt của bạn:
            </Text>
            <TextArea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Ví dụ: Viết một bài thơ về tình nguyện, hoặc tạo nội dung mô tả cho sự kiện thiện nguyện..."
              rows={4}
              disabled={loading}
              className={styles.textArea}
              showCount
              maxLength={1000}
            />
          </div>

          {/* Response Section */}
          {response && (
            <div className={styles.responseSection}>
              <div className={styles.responseHeader}>
                <Text strong className={styles.responseLabel}>
                  📝 Kết quả:
                </Text>
                <Button
                  type="text"
                  icon={<CopyOutlined />}
                  onClick={copyToClipboard}
                  className={styles.copyButton}
                >
                  Copy
                </Button>
              </div>
              
              <div className={styles.responseContent}>
                {response}
              </div>
            </div>
          )}

          {/* Loading Section */}
          {loading && (
            <div className={styles.loadingSection}>
              <Spin size="large" />
              <Text className={styles.loadingText}>
                AI đang tạo nội dung cho bạn...
              </Text>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default AIPromptModal;