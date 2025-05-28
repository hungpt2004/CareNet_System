import React, { useState } from 'react';
import { Card, Avatar, Button, Input, Space, Typography, message, Badge, Upload, Dropdown, Menu } from 'antd';
import {
  LikeOutlined,
  LikeFilled,
  CommentOutlined,
  ShareAltOutlined,
  PictureOutlined,
  SmileOutlined,
  SendOutlined,
  MoreOutlined,
  GlobalOutlined,
  LockOutlined
} from '@ant-design/icons';
import { motion } from 'framer-motion';
import styles from '../../css/ForumChatPage.module.css';

const { TextArea } = Input;
const { Text } = Typography;

const privacyOptions = [
  { key: 'public', label: 'Công khai', icon: <GlobalOutlined /> },
  { key: 'private', label: 'Chỉ mình tôi', icon: <LockOutlined /> }
];

const initialPosts = [
  {
    id: 1,
    author: {
      name: 'Nguyễn Văn An',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      verified: true
    },
    content: 'Hôm nay thời tiết thật đẹp! Ai cũng ra ngoài tận hưởng không khí trong lành nhé 🌞',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
    timestamp: '2 giờ trước',
    likes: 24,
    comments: 5,
    shares: 2,
    liked: false,
    privacy: 'public'
  },
  {
    id: 2,
    author: {
      name: 'Trần Thị Bình',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      verified: false
    },
    content: 'Vừa hoàn thành dự án mới! Cảm ơn team đã hỗ trợ nhiệt tình 💪 #teamwork #success',
    timestamp: '4 giờ trước',
    likes: 12,
    comments: 8,
    shares: 1,
    liked: true,
    privacy: 'private'
  }
];

const ForumChatPage = () => {
  const [posts, setPosts] = useState(initialPosts);
  const [newPost, setNewPost] = useState('');
  const [newImage, setNewImage] = useState(null);
  const [privacy, setPrivacy] = useState('public');
  const [commentInputs, setCommentInputs] = useState({});
  const [showComments, setShowComments] = useState({});

  const handlePost = () => {
    if (newPost.trim()) {
      const post = {
        id: posts.length + 1,
        author: {
          name: 'Bạn',
          avatar: 'https://randomuser.me/api/portraits/men/99.jpg',
          verified: false
        },
        content: newPost,
        image: newImage,
        timestamp: 'Vừa xong',
        likes: 0,
        comments: 0,
        shares: 0,
        liked: false,
        privacy
      };
      setPosts([post, ...posts]);
      setNewPost('');
      setNewImage(null);
      setPrivacy('public');
      message.success('Đăng bài thành công!');
    }
  };

  const handleLike = (postId) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          liked: !post.liked,
          likes: post.liked ? post.likes - 1 : post.likes + 1
        };
      }
      return post;
    }));
  };

  const handleShare = (postId) => {
    message.info('Bạn đã chia sẻ bài viết!');
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          shares: post.shares + 1
        };
      }
      return post;
    }));
  };

  const handleComment = (postId) => {
    if (commentInputs[postId]?.trim()) {
      message.success('Bình luận thành công!');
      setPosts(posts.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            comments: post.comments + 1
          };
        }
        return post;
      }));
      setCommentInputs({ ...commentInputs, [postId]: '' });
    }
  };

  const handleImageChange = (info) => {
    if (info.file.status === 'done' || info.file.status === 'uploading') {
      // Hiển thị ảnh preview
      const reader = new FileReader();
      reader.onload = e => setNewImage(e.target.result);
      reader.readAsDataURL(info.file.originFileObj);
    }
  };

  const handlePrivacyChange = ({ key }) => setPrivacy(key);

  const privacyMenu = (
    <Menu onClick={handlePrivacyChange}>
      {privacyOptions.map(opt => (
        <Menu.Item key={opt.key} icon={opt.icon}>
          {opt.label}
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <div className={styles.container}>
      {/* Post Creator */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className={styles.postCreator}>
          <div className={styles.creatorHeader}>
            <Avatar size={44} src="https://randomuser.me/api/portraits/men/99.jpg" />
            <Dropdown overlay={privacyMenu} trigger={['click']}>
              <Button className={styles.privacyBtn} icon={privacy === 'public' ? <GlobalOutlined /> : <LockOutlined />}>
                {privacy === 'public' ? 'Công khai' : 'Chỉ mình tôi'}
              </Button>
            </Dropdown>
          </div>
          <TextArea
            className={styles.postInput}
            placeholder="Bạn đang nghĩ gì?"
            value={newPost}
            onChange={e => setNewPost(e.target.value)}
            rows={3}
            maxLength={500}
          />
          {newImage && (
            <div className={styles.previewImage}>
              <img src={newImage} alt="preview" />
              <Button size="small" onClick={() => setNewImage(null)} style={{ marginLeft: 8 }}>Xóa</Button>
            </div>
          )}
          <div className={styles.actionIcons}>
            <Upload
              showUploadList={false}
              beforeUpload={() => false}
              onChange={handleImageChange}
              accept="image/*"
            >
              <Button icon={<PictureOutlined />} className={styles.iconButton}>Ảnh/Video</Button>
            </Upload>
            <Button icon={<SmileOutlined />} className={styles.iconButton}>Cảm xúc</Button>
            <Button
              type="primary"
              className={styles.postButton}
              onClick={handlePost}
              disabled={!newPost.trim() && !newImage}
              icon={<SendOutlined />}
            >
              Đăng
            </Button>
          </div>
        </Card>
      </motion.div>

      {/* Posts Feed */}
      <div className={styles.feed}>
        {posts.map((post) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: post.id * 0.05 }}
          >
            <Card className={styles.postCard}>
              {/* Author Info */}
              <div className={styles.authorInfo}>
                <Avatar size={40} src={post.author.avatar} />
                <div className={styles.authorDetails}>
                  <div className={styles.authorName}>
                    {post.author.name}
                    {post.author.verified && (
                      <Badge count="✓" style={{ backgroundColor: '#1877f2', marginLeft: 4, fontSize: 10 }} />
                    )}
                  </div>
                  <div className={styles.timestamp}>
                    {post.timestamp}
                    {post.privacy === 'public' ? (
                      <GlobalOutlined style={{ fontSize: 12, marginLeft: 6 }} />
                    ) : (
                      <LockOutlined style={{ fontSize: 12, marginLeft: 6 }} />
                    )}
                  </div>
                </div>
                <Button type="text" icon={<MoreOutlined />} />
              </div>

              {/* Post Content */}
              <div className={styles.postContent}>{post.content}</div>

              {/* Post Image */}
              {post.image && (
                <img src={post.image} alt="Post" className={styles.postImage} />
              )}

              {/* Stats */}
              <div className={styles.statsBar}>
                <span>
                  <LikeFilled style={{ color: '#1877f2', marginRight: 4 }} />
                  {post.likes}
                </span>
                <Space>
                  <span>{post.comments} bình luận</span>
                  <span>{post.shares} chia sẻ</span>
                </Space>
              </div>

              {/* Action Buttons */}
              <div className={styles.actionBar}>
                <button
                  className={`${styles.actionButton} ${post.liked ? styles.liked : ''}`}
                  onClick={() => handleLike(post.id)}
                >
                  {post.liked ? <LikeFilled /> : <LikeOutlined />}
                  Thích
                </button>
                <button
                  className={styles.actionButton}
                  onClick={() => setShowComments({ ...showComments, [post.id]: !showComments[post.id] })}
                >
                  <CommentOutlined />
                  Bình luận
                </button>
                <button
                  className={styles.actionButton}
                  onClick={() => handleShare(post.id)}
                >
                  <ShareAltOutlined />
                  Chia sẻ
                </button>
              </div>

              {/* Comment Box */}
              {showComments[post.id] && (
                <div className={styles.commentBox}>
                  <Input
                    placeholder="Viết bình luận..."
                    value={commentInputs[post.id] || ''}
                    onChange={e => setCommentInputs({ ...commentInputs, [post.id]: e.target.value })}
                    onPressEnter={() => handleComment(post.id)}
                  />
                  <Button
                    type="primary"
                    size="small"
                    style={{ marginLeft: 8, marginTop: 8 }}
                    onClick={() => handleComment(post.id)}
                    disabled={!commentInputs[post.id]?.trim()}
                  >
                    Gửi
                  </Button>
                </div>
              )}
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ForumChatPage;