"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import styles from "../../../css/EventCardSlide.module.css"
import EnhancedEventCard from "./AdvancedEventCard"

export default function EventCardSlider({
  events,
  title = "Sự kiện được gợi ý bởi AI CareNet",
  subtitle = "Khám phá các sự kiện phù hợp với thông tin của bạn",
  customStyles = {
    primaryColor: "#5DB996",
    secondaryColor: "#FBF6E9",
  },
  currentUser,
  onNavigate,
}) {
  const sliderRef = useRef(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [slidesToShow, setSlidesToShow] = useState(3)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)

  // Format date function
  const formatDateVN = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" })
  }

  // Update slidesToShow when window resizes
  useEffect(() => {
    const updateSlidesToShow = () => {
      if (window.innerWidth >= 1200) {
        setSlidesToShow(3)
      } else if (window.innerWidth >= 768) {
        setSlidesToShow(2)
      } else {
        setSlidesToShow(1)
      }
    }

    updateSlidesToShow()
    window.addEventListener("resize", updateSlidesToShow)
    return () => window.removeEventListener("resize", updateSlidesToShow)
  }, [])

  // Handle next slide
  const nextSlide = () => {
    if (currentIndex < events.length - slidesToShow) {
      setCurrentIndex(currentIndex + 1)
    } else {
      // Loop back to the beginning
      setCurrentIndex(0)
    }
  }

  // Handle previous slide
  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    } else {
      // Loop to the end
      setCurrentIndex(events.length - slidesToShow)
    }
  }

  // Go to specific slide
  const goToSlide = (index) => {
    setCurrentIndex(index)
  }

  // Handle touch events for mobile swiping
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 100) {
      // Swipe left
      nextSlide()
    }

    if (touchStart - touchEnd < -100) {
      // Swipe right
      prevSlide()
    }
  }

  // Handle mouse drag events
  const handleMouseDown = (e) => {
    setIsDragging(true)
    setStartX(e.pageX - (sliderRef.current?.offsetLeft || 0))
    setScrollLeft(sliderRef.current?.scrollLeft || 0)
  }

  const handleMouseMove = (e) => {
    if (!isDragging) return
    e.preventDefault()

    const x = e.pageX - (sliderRef.current?.offsetLeft || 0)
    const walk = (x - startX) * 2 // Scroll speed multiplier

    if (sliderRef.current) {
      sliderRef.current.scrollLeft = scrollLeft - walk
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)

    if (sliderRef.current) {
      // Calculate which slide we're closest to after dragging
      const slideWidth = sliderRef.current.clientWidth / slidesToShow
      const newIndex = Math.round(sliderRef.current.scrollLeft / slideWidth)
      setCurrentIndex(Math.max(0, Math.min(newIndex, events.length - slidesToShow)))

      // Snap to the closest slide
      sliderRef.current.scrollTo({
        left: newIndex * slideWidth,
        behavior: "smooth",
      })
    }
  }

  // Calculate the transform value for the slider
  const getTransformValue = () => {
    if (!sliderRef.current) return "translateX(0)"

    const slideWidth = 100 / slidesToShow
    return `translateX(-${currentIndex * slideWidth}%)`
  }

  return (
    <div className={styles.sliderContainer}>
      <div className={styles.sliderHeader}>
        <div className={styles.titleContainer}>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.subtitle}>{subtitle}</p>
        </div>
        <div className={styles.controls}>
          <button
            className={styles.navButton}
            onClick={prevSlide}
            aria-label="Previous slide"
            style={{
              borderColor: customStyles.primaryColor,
              color: customStyles.primaryColor,
            }}
          >
            <ChevronLeft size={20} />
          </button>
          <button
            className={styles.navButton}
            onClick={nextSlide}
            aria-label="Next slide"
            style={{
              borderColor: customStyles.primaryColor,
              color: customStyles.primaryColor,
            }}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div
        className={styles.sliderOuterWrapper}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        ref={sliderRef}
      >
        <div
          className={styles.sliderTrack}
          style={{
            transform: getTransformValue(),
            width: `${(events.length * 100) / slidesToShow}%`,
          }}
        >
          {events.map((event) => (
            <div key={event.id} className={styles.slide} style={{ width: `${100 / events.length}%` }}>
              <div className={styles.slideInner}>
                <EnhancedEventCard
                  event={event}
                  currentUser={currentUser}
                  customStyles={customStyles}
                  formatDateVN={formatDateVN}
                  onNavigate={onNavigate}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.indicators}>
        {Array.from({ length: Math.max(1, events.length - slidesToShow + 1) }).map((_, index) => (
          <button
            key={index}
            className={`${styles.indicator} ${currentIndex === index ? styles.activeIndicator : ""}`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            style={{
              backgroundColor: currentIndex === index ? customStyles.primaryColor : "#D1D5DB",
            }}
          />
        ))}
      </div>
    </div>
  )
}
