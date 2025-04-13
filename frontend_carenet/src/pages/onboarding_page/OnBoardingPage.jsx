"use client"

import { useState, useEffect } from "react"
import { Container, Row, Col, Card } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import {
   BookOpen,
   Heart,
   Leaf,
   Users,
   Music,
   Coffee,
   Globe,
   Camera,
   Award,
   Briefcase,
   MessageCircle,
   Truck,
   ChevronLeft,
   ChevronRight,
   Check,
   Flag,
} from "lucide-react"
import styles from "../../css/OnBoarding.module.css"
import { CustomFailedToast, CustomSuccessToast, CustomToast } from "../../components/toast/CustomToast"
import axiosInstance from "../../utils/AxiosInstance"

const OnBoardingPage = () => {
   const navigate = useNavigate()
   const [currentStep, setCurrentStep] = useState(1)
   const [direction, setDirection] = useState("next") // "next" or "prev" for animation direction
   const totalSteps = 3

   // State for user preferences
   const [selectedCategories, setSelectedCategories] = useState([])
   const [selectedAgeGroups, setSelectedAgeGroups] = useState([])
   const [selectedPositions, setSelectedPositions] = useState([])

   // Event categories with icons
   const eventCategories = [
      { id: 1, name: "Giáo dục", icon: BookOpen, description: "Dạy học, hướng dẫn, chia sẻ kiến thức" },
      { id: 2, name: "Y tế & Sức khỏe", icon: Heart, description: "Chăm sóc sức khỏe, hiến máu, hỗ trợ y tế" },
      { id: 3, name: "Môi trường", icon: Leaf, description: "Trồng cây, dọn rác, bảo vệ động vật" },
      { id: 4, name: "Cộng đồng", icon: Users, description: "Hỗ trợ người già, trẻ em, người khuyết tật" },
      { id: 5, name: "Văn hóa & Nghệ thuật", icon: Music, description: "Âm nhạc, hội họa, biểu diễn" },
      { id: 6, name: "Thể thao & Giải trí", icon: Coffee, description: "Tổ chức sự kiện thể thao, giải trí" },
      { id: 7, name: "Quốc tế", icon: Globe, description: "Hoạt động tình nguyện quốc tế, giao lưu văn hóa" },
      { id: 8, name: "Truyền thông", icon: Camera, description: "Chụp ảnh, quay phim, viết bài" },
   ]

   // Age groups
   const ageGroups = [
      { id: 1, range: "Mọi độ tuổi", description: "Không có giới hạn độ tuổi" },
      { id: 2, range: "Trẻ em (5-12)", description: "Hoạt động dành cho trẻ em" },
      { id: 3, range: "Thanh thiếu niên (13-17)", description: "Hoạt động dành cho thanh thiếu niên" },
      { id: 4, range: "Thanh niên (18-25)", description: "Hoạt động dành cho thanh niên" },
      { id: 5, range: "Người trưởng thành (26-40)", description: "Hoạt động dành cho người trưởng thành" },
      { id: 6, range: "Trung niên (41-60)", description: "Hoạt động dành cho người trung niên" },
      { id: 7, range: "Người cao tuổi (60+)", description: "Hoạt động dành cho người cao tuổi" },
   ]

   // Positions/roles in activities
   const positions = [
      { id: 1, name: "Người tổ chức", icon: Award, description: "Lập kế hoạch và điều phối sự kiện" },
      { id: 2, name: "Người hướng dẫn", icon: Briefcase, description: "Hướng dẫn và đào tạo tình nguyện viên khác" },
      { id: 3, name: "Người hỗ trợ", icon: MessageCircle, description: "Hỗ trợ các hoạt động chung" },
      { id: 4, name: "Người vận chuyển", icon: Truck, description: "Vận chuyển người và vật tư" },
      { id: 5, name: "Người truyền thông", icon: Camera, description: "Chụp ảnh, quay phim, viết bài" },
      { id: 6, name: "Người điều phối", icon: Users, description: "Điều phối nhóm tình nguyện viên" },
      { id: 7, name: "Người dẫn chương trình", icon: Music, description: "Dẫn dắt các hoạt động, sự kiện" },
      { id: 8, name: "Người đại diện", icon: Flag, description: "Đại diện cho tổ chức trong các sự kiện" },
   ]

   // Gộp dữ liệu onboarding
   const categoriesNames = selectedCategories.map((id) => {
      const category = eventCategories.find((cat) => cat.id === id);
      return category?.name;
   });

   const ageGroupRanges = selectedAgeGroups.map((id) => {
      const ageGroup = ageGroups.find((group) => group.id === id);
      return ageGroup?.range;
   });

   const positionsNames = selectedPositions.map((id) => {
      const position = positions.find((pos) => pos.id === id);
      return position?.name;
   });

   const formData = [
      ...categoriesNames,
      ...ageGroupRanges,
      ...positionsNames,
    ].filter(Boolean); // lọc bỏ phần tử null hoặc undefined nếu có    

   // Xử lý thêm vào hobbies
   const handleSubmitHobbies = async () => {
      // Kiểm tra formData và đảm bảo dữ liệu hợp lệ
      const formDataToSend = { formData: formData };
    
      try {
        const response = await axiosInstance.post(`/volunteer/hobby`,formDataToSend);
        // Xử lý phản hồi từ server
        if (response.data && response.data.message && response.data.userHobbies) {
          CustomSuccessToast(response.data.message);
          setTimeout(() => {
            navigate("/")
         }, 1000)
        }
      } catch (error) {
        // Xử lý lỗi nếu có
        if (error.response.data && error.response.data.message) {
          CustomFailedToast(error.response.data.message);
        }
      }
    };
    

   console.log(formData)

   // Reset animation key when step changes
   const [animationKey, setAnimationKey] = useState(0)

   useEffect(() => {
      // Reset animation key when step changes to trigger animation
      setAnimationKey((prev) => prev + 1)
   }, [currentStep])

   // Handle category selection
   const handleCategorySelect = (categoryId) => {
      if (selectedCategories.includes(categoryId)) {
         setSelectedCategories(selectedCategories.filter((id) => id !== categoryId))
      } else {
         if (selectedCategories.length < 5) {
            setSelectedCategories([...selectedCategories, categoryId])
         }
      }
   }

   // Handle age group selection
   const handleAgeGroupSelect = (ageGroupId) => {
      if (selectedAgeGroups.includes(ageGroupId)) {
         setSelectedAgeGroups(selectedAgeGroups.filter((id) => id !== ageGroupId))
      } else {
         if (selectedAgeGroups.length < 3) {
            setSelectedAgeGroups([...selectedAgeGroups, ageGroupId])
         }
      }
   }

   // Handle position selection
   const handlePositionSelect = (positionId) => {
      if (selectedPositions.includes(positionId)) {
         setSelectedPositions(selectedPositions.filter((id) => id !== positionId))
      } else {
         if (selectedPositions.length < 3) {
            setSelectedPositions([...selectedPositions, positionId])
         }
      }
   }

   // Handle next step
   const handleNextStep = () => {
      if (currentStep < totalSteps) {
         setDirection("next")
         setCurrentStep(currentStep + 1)
      } else {
         handleSubmit()
      }
   }

   // Handle previous step
   const handlePrevStep = () => {
      if (currentStep > 1) {
         setDirection("prev")
         setCurrentStep(currentStep - 1)
      }
   }

   // Handle form submission
   const handleSubmit = async () => {
      // Here you would typically send the data to your backend
      console.log("User preferences:", {
         categories: selectedCategories.map((id) => eventCategories.find((cat) => cat.id === id)),
         ageGroups: selectedAgeGroups.map((id) => ageGroups.find((age) => age.id === id)),
         positions: selectedPositions.map((id) => positions.find((pos) => pos.id === id)),
      })

      // Show success message and redirect
      await handleSubmitHobbies()
   }

   // Check if current step is complete
   const isStepComplete = () => {
      switch (currentStep) {
         case 1:
            return selectedCategories.length > 0
         case 2:
            return selectedAgeGroups.length > 0
         case 3:
            return selectedPositions.length > 0
         default:
            return false
      }
   }

   // Render step content
   const renderStepContent = () => {
      // Choose animation class based on direction
      const animationClass = direction === "next" ? styles.fadeInRight : styles.fadeInLeft

      switch (currentStep) {
         case 1:
            return (
               <div key={`step-1-${animationKey}`} className={`${styles.stepContent} ${animationClass}`}>
                  <h4 className={styles.stepTitle}>Bạn quan tâm đến những loại sự kiện nào?</h4>
                  <p className={styles.stepDescription}>Chọn tối đa 5 loại sự kiện mà bạn quan tâm nhất</p>

                  <div className={styles.optionsGrid}>
                     {eventCategories.map((category) => {
                        const isSelected = selectedCategories.includes(category.id)
                        const CategoryIcon = category.icon

                        return (
                           <div
                              key={category.id}
                              className={`${styles.optionCard} ${isSelected ? styles.optionCardSelected : ""}`}
                              onClick={() => handleCategorySelect(category.id)}
                           >
                              <div className={`${styles.iconContainer} ${isSelected ? styles.iconContainerSelected : ""}`}>
                                 <CategoryIcon size={30} />
                              </div>
                              <div className={styles.cardContent}>
                                 <h5 className={styles.cardTitle}>{category.name}</h5>
                                 <p className={styles.cardDescription}>{category.description}</p>
                              </div>
                              {isSelected && (
                                 <div className={styles.checkIcon}>
                                    <Check size={24} />
                                 </div>
                              )}
                           </div>
                        )
                     })}
                  </div>

                  {selectedCategories.length === 5 && <p className={styles.warningText}>Bạn đã chọn tối đa 5 loại sự kiện</p>}
               </div>
            )

         case 2:
            return (
               <div key={`step-2-${animationKey}`} className={`${styles.stepContent} ${animationClass}`}>
                  <h4 className={styles.stepTitle}>Bạn muốn tham gia cùng những nhóm tuổi nào?</h4>
                  <p className={styles.stepDescription}>Chọn tối đa 3 nhóm tuổi mà bạn muốn tham gia cùng</p>

                  <div className={styles.optionsGrid}>
                     {ageGroups.map((ageGroup) => {
                        const isSelected = selectedAgeGroups.includes(ageGroup.id)

                        return (
                           <div
                              key={ageGroup.id}
                              className={`${styles.optionCard} ${isSelected ? styles.optionCardSelected : ""}`}
                              onClick={() => handleAgeGroupSelect(ageGroup.id)}
                           >
                              <div className={styles.cardContent}>
                                 <h5 className={styles.cardTitle}>{ageGroup.range}</h5>
                                 <p className={styles.cardDescription}>{ageGroup.description}</p>
                              </div>
                              {isSelected && (
                                 <div className={styles.checkIcon}>
                                    <Check size={24} />
                                 </div>
                              )}
                           </div>
                        )
                     })}
                  </div>

                  {selectedAgeGroups.length === 3 && <p className={styles.warningText}>Bạn đã chọn tối đa 3 nhóm tuổi</p>}
               </div>
            )

         case 3:
            return (
               <div key={`step-3-${animationKey}`} className={`${styles.stepContent} ${animationClass}`}>
                  <h4 className={styles.stepTitle}>Bạn muốn đảm nhận vị trí nào trong các hoạt động?</h4>
                  <p className={styles.stepDescription}>Chọn tối đa 3 vị trí mà bạn muốn đảm nhận</p>

                  <div className={styles.optionsGrid}>
                     {positions.map((position) => {
                        const isSelected = selectedPositions.includes(position.id)
                        const PositionIcon = position.icon

                        return (
                           <div
                              key={position.id}
                              className={`${styles.optionCard} ${isSelected ? styles.optionCardSelected : ""}`}
                              onClick={() => handlePositionSelect(position.id)}
                           >
                              <div className={`${styles.iconContainer} ${isSelected ? styles.iconContainerSelected : ""}`}>
                                 <PositionIcon size={30} />
                              </div>
                              <div className={styles.cardContent}>
                                 <h5 className={styles.cardTitle}>{position.name}</h5>
                                 <p className={styles.cardDescription}>{position.description}</p>
                              </div>
                              {isSelected && (
                                 <div className={styles.checkIcon}>
                                    <Check size={24} />
                                 </div>
                              )}
                           </div>
                        )
                     })}
                  </div>

                  {selectedPositions.length === 3 && <p className={styles.warningText}>Bạn đã chọn tối đa 3 vị trí</p>}
               </div>
            )

         default:
            return null
      }
   }

   return (
      <>
         <CustomToast/>
         <div className={styles.pageContainer}>
         <Container>
            <Row className="justify-content-center">
               <Col xs={12} lg={10} xl={9}>
                  <Card className={styles.mainCard}>
                     <div className={styles.cardHeader}>
                        <div className="d-flex justify-content-between align-items-center mb-3">
                           <h3 className={styles.pageTitle}>Thiết lập sở thích của bạn</h3>
                           <div className={styles.stepBadge}>
                              Bước {currentStep}/{totalSteps}
                           </div>
                        </div>
                        <div className={styles.progressBar}>
                           <div
                              className={styles.progressBarFill}
                              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                           ></div>
                        </div>
                     </div>

                     <div className={styles.cardBody}>{renderStepContent()}</div>

                     <div className={styles.cardFooter}>
                        <button className={styles.buttonSecondary} onClick={handlePrevStep} disabled={currentStep === 1}>
                           <ChevronLeft size={20} className="me-2" />
                           Quay lại
                        </button>

                        <button className={styles.buttonPrimary} onClick={handleNextStep} disabled={!isStepComplete()}>
                           {currentStep === totalSteps ? (
                              <>
                                 Hoàn thành
                                 <Check size={20} className="ms-2" />
                              </>
                           ) : (
                              <>
                                 Tiếp theo
                                 <ChevronRight size={20} className="ms-2" />
                              </>
                           )}
                        </button>
                     </div>
                  </Card>

                  <div className="text-center">
                     <button className={styles.skipButton} onClick={() => navigate("/")}>
                        Bỏ qua và thiết lập sau
                     </button>
                  </div>
               </Col>
            </Row>
         </Container>
      </div>
      </>
   )
}

export default OnBoardingPage
