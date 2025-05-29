"use client"

import { useEffect, useState } from "react"
import { MapPin, Calendar, Users, Clock, ArrowRight } from "lucide-react"
import styles from "../../../css/EventCard.module.css"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import convertRatingToStars from "../../../utils/FormatRatingStar"

export default function EventCard({ event, currentUser, customStyles, formatDateVN }) {
  const [isHovered, setIsHovered] = useState(false)
  const [listCategory, setListCategory] = useState([]);
  const [location, setLocation] = useState([]); //để convert thành full address
  const navigate = useNavigate();

  const handleGoToDetail = () => {
    console.log("Navigate to event details:", event.id)
    navigate(`/event-detail/${event._id}`);
    // Implement your navigation logic here
  }

  // Get category
  const getAllCategory = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/search/all-category`);
      if (response.data && response.data.mapCategory) {
        setListCategory(response.data.mapCategory);
      }
    } catch (error) {
      console.log(error.response?.data?.message);
    } 
  }

  useEffect(() => {
    getAllCategory();
  }, [])

  // Generate a gradient based on the category
  const getCategoryColor = (category) => {
    return (
      listCategory[category] ||
      `linear-gradient(135deg, ${customStyles.primaryColor}, ${adjustColor(customStyles.primaryColor, -20)})`
    )
  }

  // Helper function to darken/lighten a hex color
  function adjustColor(color, amount) {
    return color
  }

  return (
    <div className={styles.card} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <div className={styles.cardHeader} style={{ background: getCategoryColor(event.category) }}>
        <span className={styles.categoryBadge} style={{ color: customStyles.primaryColor }}>
          {event.category}
        </span>
      </div>


      <div className={styles.cardBody} style={{ backgroundColor: customStyles.secondaryColor }}>
        <div className={styles.mainContent}>

          <h3 className={styles.eventTitle}>{event.title}</h3>

          <div className={styles.locationWrapper}>
            <MapPin size={16} className={styles.icon} style={{ color: customStyles.primaryColor }} />
            <span className={styles.location}>{event.location.street}, {event.location.ward}, {event.location.district}, {event.location.province}</span>
          </div>

          <p className={styles.description}>{event.description}</p>

          <div className={styles.organizer}>
            <div
              className={styles.organizerAvatar}
              style={{
                background: `linear-gradient(135deg, ${customStyles.primaryColor}, ${adjustColor(customStyles.primaryColor, -20)})`,
              }}
            >
              {event.organizationId.name.charAt(0).toUpperCase()}
            </div>
            <span>
              Được tổ chức bởi <strong>{event.organizationId.name} {convertRatingToStars(event.organizationId.rating)}</strong>
            </span>
          </div>
        </div>


        <div className={styles.sideContent}>
          <div className={styles.infoSection}>
            <div className={styles.dateInfo}>
              <div className={styles.iconWrapper} style={{ backgroundColor: `${customStyles.primaryColor}20` }}>
                <Calendar size={18} className={styles.calendarIcon} style={{ color: customStyles.primaryColor }} />
              </div>
              <div>
                <div className={styles.dateRow}>
                  <Clock size={14} className={styles.smallIcon} style={{ color: customStyles.primaryColor }} />
                  <span>
                    Bắt đầu: <strong>{formatDateVN(event.startAt)}</strong>
                  </span>
                </div>
                <div className={styles.dateRow}>
                  <Clock size={14} className={styles.smallIcon} style={{ color: customStyles.primaryColor }} />
                  <span>
                    Kết thúc: <strong>{formatDateVN(event.endAt)}</strong>
                  </span>
                </div>
              </div>
            </div>

            <div className={styles.participantsInfo}>
              <div className={styles.iconWrapper} style={{ backgroundColor: `${customStyles.primaryColor}20` }}>
                <Users size={18} className={styles.usersIcon} style={{ color: customStyles.primaryColor }} />
              </div>
              <div className={styles.participants}>
                <span>{event.currentParticipants} thành viên tham gia</span>
                <div className={styles.avatarGroup}>
                  {[...Array(Math.min(3, event.currentParticipants))].map((_, i) => (
                    <div
                      key={i}
                      className={styles.participantAvatar}
                      style={{
                        background: `linear-gradient(135deg, ${customStyles.primaryColor}, ${adjustColor(customStyles.primaryColor, -20)})`,
                        zIndex: 3 - i,
                      }}
                    >
                      {String.fromCharCode(65 + i)}
                    </div>
                  ))}
                  + {event.currentParticipants > 3 && <div className={styles.moreParticipants}>+{event.currentParticipants - 3}</div>}
                </div>
              </div>
            </div>
          </div>

          <div className={styles.actionSection}>
            {currentUser ? (
              <button
                className={`${styles.viewButton} ${isHovered ? styles.viewButtonHovered : ""}`}
                onClick={handleGoToDetail}
                style={{
                  color: isHovered ? "white" : customStyles.primaryColor,
                  borderColor: customStyles.primaryColor,
                  backgroundColor: isHovered ? customStyles.primaryColor : "white",
                }}
              >
                Xem thông tin
                <ArrowRight size={16} className={`${styles.arrowIcon} ${isHovered ? styles.arrowIconAnimated : ""}`} />
              </button>
            ) : (
              <div className={styles.loginAlert}>
                <span>Vui lòng đăng nhập để xem chi tiết</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
