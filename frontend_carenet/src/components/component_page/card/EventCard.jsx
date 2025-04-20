"use client"

import { useState } from "react"
import { MapPin, Calendar, Users, Clock, ArrowRight } from "lucide-react"
import styles from "../../../css/EventCard.module.css"
import { useNavigate } from "react-router-dom"

export default function EventCard({ event, currentUser, customStyles, formatDateVN }) {
  const [isHovered, setIsHovered] = useState(false)
  const [location, setLocation] = useState([]); //để convert thành full address
  const navigate = useNavigate();

  const handleGoToDetail = () => {
    console.log("Navigate to event details:", event.id)
    navigate('/event-detail')
    // Implement your navigation logic here
  }

  // Generate a gradient based on the category
  const getCategoryColor = (category) => {
    const categories = {
      "Âm nhạc": `linear-gradient(135deg, ${customStyles.primaryColor}, ${adjustColor(customStyles.primaryColor, -20)})`,
      "Nghệ thuật": `linear-gradient(135deg, ${customStyles.primaryColor}, ${adjustColor(customStyles.primaryColor, -30)})`,
      "Thể thao": `linear-gradient(135deg, ${customStyles.primaryColor}, ${adjustColor(customStyles.primaryColor, -10)})`,
      "Giáo dục": `linear-gradient(135deg, ${customStyles.primaryColor}, ${adjustColor(customStyles.primaryColor, -40)})`,
      "Công nghệ": `linear-gradient(135deg, ${customStyles.primaryColor}, ${adjustColor(customStyles.primaryColor, -25)})`,
      "Kinh doanh": `linear-gradient(135deg, ${customStyles.primaryColor}, ${adjustColor(customStyles.primaryColor, -15)})`,
    }

    return (
      categories[category] ||
      `linear-gradient(135deg, ${customStyles.primaryColor}, ${adjustColor(customStyles.primaryColor, -20)})`
    )
  }

  // Helper function to darken/lighten a hex color
  function adjustColor(color, amount) {
    return color
    // This is a simplified version - in a real app you'd implement proper color adjustment
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
          <h3 className={styles.eventTitle}>{event.name}</h3>

          <div className={styles.locationWrapper}>
            <MapPin size={16} className={styles.icon} style={{ color: customStyles.primaryColor }} />
            <span className={styles.location}>{event.location}</span>
          </div>

          <p className={styles.description}>{event.description}</p>

          <div className={styles.organizer}>
            <div
              className={styles.organizerAvatar}
              style={{
                background: `linear-gradient(135deg, ${customStyles.primaryColor}, ${adjustColor(customStyles.primaryColor, -20)})`,
              }}
            >
              {event.organizer.charAt(0).toUpperCase()}
            </div>
            {/* <span>
              Được tổ chức bởi <strong>{event.organizer}</strong>
            </span> */}
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
                    Bắt đầu: <strong>{formatDateVN(event.startDate)}</strong>
                  </span>
                </div>
                <div className={styles.dateRow}>
                  <Clock size={14} className={styles.smallIcon} style={{ color: customStyles.primaryColor }} />
                  <span>
                    Kết thúc: <strong>{formatDateVN(event.endDate)}</strong>
                  </span>
                </div>
              </div>
            </div>

            <div className={styles.participantsInfo}>
              <div className={styles.iconWrapper} style={{ backgroundColor: `${customStyles.primaryColor}20` }}>
                <Users size={18} className={styles.usersIcon} style={{ color: customStyles.primaryColor }} />
              </div>
              <div className={styles.participants}>
                <span>{event.participants} thành viên tham gia</span>
                <div className={styles.avatarGroup}>
                  {[...Array(Math.min(3, event.participants))].map((_, i) => (
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
                  {event.participants > 3 && <div className={styles.moreParticipants}>+{event.participants - 3}</div>}
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
