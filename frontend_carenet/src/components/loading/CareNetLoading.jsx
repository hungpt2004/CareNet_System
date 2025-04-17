"use client"

import { useState, useEffect } from "react"
import { Sparkles } from 'lucide-react'
import styles from "../../css/CareNetLoading.module.css"

export default function CareNetLoading({ 
  message = "Vui lòng đợi xử lý", 
  customStyles = {
    primaryColor: "#5DB996",
    secondaryColor: "#FBF6E9",
  }
}) {
  const [dots, setDots] = useState("")
  const [currentMessage, setCurrentMessage] = useState(0)
  
  const friendlyMessages = [
    "CareNet AI đang tìm kiếm thông tin tốt nhất",
    "Đang phân tích dữ liệu của bạn",
    "Sắp hoàn thành rồi",
    "Cảm ơn bạn đã kiên nhẫn chờ đợi",
    "Đang tạo kết quả phù hợp nhất"
  ]

  // Animate the dots
  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => {
        if (prev.length >= 3) return ""
        return prev + "."
      })
    }, 500)
    
    return () => clearInterval(interval)
  }, [])
  
  // Rotate through friendly messages
  useEffect(() => {
    const messageInterval = setInterval(() => {
      setCurrentMessage(prev => (prev + 1) % friendlyMessages.length)
    }, 3000)
    
    return () => clearInterval(messageInterval)
  }, [])

  return (
    <div className={styles.loadingContainer}>
      <div className={styles.loadingContent}>
        <div className={styles.logoContainer}>
          <div className={styles.logoCircle} style={{ backgroundColor: customStyles.primaryColor }}>
            <Sparkles className={styles.sparklesIcon} size={32} color="white" />
          </div>
          <div className={styles.pulseCircle} style={{ borderColor: customStyles.primaryColor }}></div>
        </div>
        
        <h2 className={styles.loadingTitle}>{message}<span className={styles.dots}>{dots}</span></h2>
        
        <p className={styles.friendlyMessage} style={{ color: customStyles.primaryColor }}>
          {friendlyMessages[currentMessage]}
        </p>
        
        <div className={styles.progressBar}>
          <div 
            className={styles.progressBarInner} 
            style={{ backgroundColor: customStyles.primaryColor }}
          ></div>
        </div>
        
        {/* <div className={styles.wavesContainer}>
          {[...Array(3)].map((_, i) => (
            <div 
              key={i} 
              className={styles.wave} 
              style={{ 
                animationDelay: `${i * 0.2}s`,
                backgroundColor: `${customStyles.primaryColor}${i === 0 ? '40' : i === 1 ? '30' : '20'}`
              }}
            ></div>
          ))}
        </div> */}
        
      </div>
    </div>
  )
}
