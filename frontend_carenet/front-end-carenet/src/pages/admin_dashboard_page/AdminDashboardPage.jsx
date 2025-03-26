import { Row, Col, Card, Button, Table, ProgressBar, Badge } from "react-bootstrap"
import {
   Users,
   BookOpen,
   Award,
   Calendar,
   TrendingUp,
   ArrowUpRight,
   ArrowDownRight,
   Clock,
   CheckCircle,
   AlertCircle,
   BarChart2,
   MapPin,
} from "lucide-react"

// Custom CSS variables for the color scheme
const customStyles = {
   primaryColor: "#5DB996",
   secondaryColor: "#FBF6E9",
}

const AdminDashboard = () => {
   // Sample data for dashboard
   const stats = [
      { title: "Total Students", value: "2,845", icon: <Users size={24} />, change: "+12%", up: true },
      { title: "Active Courses", value: "186", icon: <BookOpen size={24} />, change: "+5%", up: true },
      { title: "Faculty Members", value: "143", icon: <Award size={24} />, change: "-2%", up: false },
      { title: "Upcoming Events", value: "28", icon: <Calendar size={24} />, change: "+18%", up: true },
   ]

   // Sample data for recent students
   const recentStudents = [
      { id: "STD-1001", name: "Emma Johnson", course: "Computer Science", date: "2023-08-15", status: "Active" },
      { id: "STD-1002", name: "James Wilson", course: "Business Administration", date: "2023-08-14", status: "Active" },
      { id: "STD-1003", name: "Sophia Martinez", course: "Graphic Design", date: "2023-08-12", status: "Pending" },
      { id: "STD-1004", name: "Liam Anderson", course: "Mechanical Engineering", date: "2023-08-10", status: "Active" },
      { id: "STD-1005", name: "Olivia Taylor", course: "Psychology", date: "2023-08-08", status: "Inactive" },
   ]

   // Sample data for upcoming events
   const upcomingEvents = [
      { title: "New Student Orientation", date: "Aug 25, 2023", time: "9:00 AM - 12:00 PM", location: "Main Auditorium" },
      { title: "Faculty Meeting", date: "Aug 28, 2023", time: "2:00 PM - 4:00 PM", location: "Conference Room A" },
      { title: "Science Fair", date: "Sep 05, 2023", time: "10:00 AM - 3:00 PM", location: "Science Building" },
      {
         title: "Parent-Teacher Conference",
         date: "Sep 10, 2023",
         time: "4:00 PM - 7:00 PM",
         location: "Multiple Classrooms",
      },
   ]

   // Sample data for course completion
   const courseCompletion = [
      { course: "Computer Science", completion: 78 },
      { course: "Business Administration", completion: 65 },
      { course: "Graphic Design", completion: 92 },
      { course: "Mechanical Engineering", completion: 45 },
      { course: "Psychology", completion: 83 },
   ]

   return (
      <>
         <div className="dashboard-header mb-4">
            <h1 className="mb-1">Dashboard</h1>
            <p className="text-muted">
               Welcome back, John! Here's what's happening with your educational organization today.
            </p>
         </div>

         {/* Stats Cards */}
         <Row className="mb-4">
            {stats.map((stat, index) => (
               <Col key={index} md={6} lg={3} className="mb-3">
                  <Card className="h-100 border-0 shadow-sm">
                     <Card.Body className="d-flex align-items-center">
                        <div
                           className="icon-container rounded-circle me-3 d-flex align-items-center justify-content-center"
                           style={{
                              backgroundColor: `${customStyles.secondaryColor}`,
                              color: `${customStyles.primaryColor}`,
                              width: "50px",
                              height: "50px",
                           }}
                        >
                           {stat.icon}
                        </div>
                        <div>
                           <h3 className="mb-0 fw-bold">{stat.value}</h3>
                           <p className="text-muted mb-0">{stat.title}</p>
                           <small className={stat.up ? "text-success" : "text-danger"}>
                              {stat.up ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />} {stat.change} from last month
                           </small>
                        </div>
                     </Card.Body>
                  </Card>
               </Col>
            ))}
         </Row>

         <Row className="mb-4">
            {/* Recent Students */}
            <Col lg={8} className="mb-4 mb-lg-0">
               <Card className="border-0 shadow-sm h-100">
                  <Card.Header className="bg-white border-bottom-0 d-flex justify-content-between align-items-center">
                     <h5 className="mb-0">Recent Students</h5>
                     <Button variant="outline-primary" size="sm">
                        View All
                     </Button>
                  </Card.Header>
                  <Card.Body className="p-0">
                     <div className="table-responsive">
                        <Table hover className="mb-0">
                           <thead className="table-light">
                              <tr>
                                 <th>ID</th>
                                 <th>Name</th>
                                 <th>Course</th>
                                 <th>Date</th>
                                 <th>Status</th>
                              </tr>
                           </thead>
                           <tbody>
                              {recentStudents.map((student, index) => (
                                 <tr key={index}>
                                    <td>{student.id}</td>
                                    <td>{student.name}</td>
                                    <td>{student.course}</td>
                                    <td>{new Date(student.date).toLocaleDateString()}</td>
                                    <td>
                                       <Badge
                                          bg={
                                             student.status === "Active"
                                                ? "success"
                                                : student.status === "Pending"
                                                   ? "warning"
                                                   : "secondary"
                                          }
                                          className="rounded-pill"
                                       >
                                          {student.status}
                                       </Badge>
                                    </td>
                                 </tr>
                              ))}
                           </tbody>
                        </Table>
                     </div>
                  </Card.Body>
               </Card>
            </Col>

            {/* Upcoming Events */}
            <Col lg={4}>
               <Card className="border-0 shadow-sm h-100">
                  <Card.Header className="bg-white border-bottom-0 d-flex justify-content-between align-items-center">
                     <h5 className="mb-0">Upcoming Events</h5>
                     <Button variant="outline-primary" size="sm">
                        View Calendar
                     </Button>
                  </Card.Header>
                  <Card.Body className="p-0">
                     <div className="events-list p-3">
                        {upcomingEvents.map((event, index) => (
                           <div
                              key={index}
                              className={`event-item p-3 ${index !== upcomingEvents.length - 1 ? "border-bottom" : ""}`}
                           >
                              <div className="d-flex">
                                 <div
                                    className="event-date-badge me-3 rounded text-center"
                                    style={{
                                       backgroundColor: customStyles.secondaryColor,
                                       color: customStyles.primaryColor,
                                       width: "50px",
                                       padding: "8px 0",
                                    }}
                                 >
                                    <div className="fw-bold">{event.date.split(",")[0].split(" ")[1]}</div>
                                    <small>{event.date.split(",")[0].split(" ")[0]}</small>
                                 </div>
                                 <div>
                                    <h6 className="mb-1">{event.title}</h6>
                                    <div className="d-flex align-items-center text-muted small mb-1">
                                       <Clock size={14} className="me-1" />
                                       {event.time}
                                    </div>
                                    <div className="d-flex align-items-center text-muted small">
                                       <MapPin size={14} className="me-1" />
                                       {event.location}
                                    </div>
                                 </div>
                              </div>
                           </div>
                        ))}
                     </div>
                  </Card.Body>
               </Card>
            </Col>
         </Row>

         <Row>
            {/* Course Completion */}
            <Col lg={6} className="mb-4">
               <Card className="border-0 shadow-sm h-100">
                  <Card.Header className="bg-white border-bottom-0">
                     <h5 className="mb-0">Course Completion Rates</h5>
                  </Card.Header>
                  <Card.Body>
                     {courseCompletion.map((course, index) => (
                        <div key={index} className="mb-3">
                           <div className="d-flex justify-content-between mb-1">
                              <span>{course.course}</span>
                              <span>{course.completion}%</span>
                           </div>
                           <ProgressBar
                              now={course.completion}
                              variant={
                                 course.completion >= 80
                                    ? "success"
                                    : course.completion >= 60
                                       ? "info"
                                       : course.completion >= 40
                                          ? "warning"
                                          : "danger"
                              }
                              style={{ height: "8px" }}
                           />
                        </div>
                     ))}
                  </Card.Body>
               </Card>
            </Col>

            {/* Quick Stats */}
            <Col lg={6} className="mb-4">
               <Card className="border-0 shadow-sm h-100">
                  <Card.Header className="bg-white border-bottom-0">
                     <h5 className="mb-0">Performance Overview</h5>
                  </Card.Header>
                  <Card.Body>
                     <Row>
                        <Col sm={6} className="mb-4">
                           <div className="d-flex align-items-center">
                              <div
                                 className="rounded-circle me-3 d-flex align-items-center justify-content-center"
                                 style={{
                                    backgroundColor: "#e8f5e9",
                                    color: "#4caf50",
                                    width: "45px",
                                    height: "45px",
                                 }}
                              >
                                 <CheckCircle size={22} />
                              </div>
                              <div>
                                 <h6 className="mb-0">95%</h6>
                                 <p className="text-muted mb-0 small">Attendance Rate</p>
                              </div>
                           </div>
                        </Col>
                        <Col sm={6} className="mb-4">
                           <div className="d-flex align-items-center">
                              <div
                                 className="rounded-circle me-3 d-flex align-items-center justify-content-center"
                                 style={{
                                    backgroundColor: "#fff8e1",
                                    color: "#ffc107",
                                    width: "45px",
                                    height: "45px",
                                 }}
                              >
                                 <AlertCircle size={22} />
                              </div>
                              <div>
                                 <h6 className="mb-0">12%</h6>
                                 <p className="text-muted mb-0 small">Dropout Rate</p>
                              </div>
                           </div>
                        </Col>
                        <Col sm={6} className="mb-4">
                           <div className="d-flex align-items-center">
                              <div
                                 className="rounded-circle me-3 d-flex align-items-center justify-content-center"
                                 style={{
                                    backgroundColor: "#e3f2fd",
                                    color: "#2196f3",
                                    width: "45px",
                                    height: "45px",
                                 }}
                              >
                                 <TrendingUp size={22} />
                              </div>
                              <div>
                                 <h6 className="mb-0">87%</h6>
                                 <p className="text-muted mb-0 small">Graduation Rate</p>
                              </div>
                           </div>
                        </Col>
                        <Col sm={6} className="mb-4">
                           <div className="d-flex align-items-center">
                              <div
                                 className="rounded-circle me-3 d-flex align-items-center justify-content-center"
                                 style={{
                                    backgroundColor: "#f3e5f5",
                                    color: "#9c27b0",
                                    width: "45px",
                                    height: "45px",
                                 }}
                              >
                                 <BarChart2 size={22} />
                              </div>
                              <div>
                                 <h6 className="mb-0">3.8/4.0</h6>
                                 <p className="text-muted mb-0 small">Average GPA</p>
                              </div>
                           </div>
                        </Col>
                     </Row>

                     <div className="text-center mt-2">
                        <Button variant="outline-primary">View Detailed Reports</Button>
                     </div>
                  </Card.Body>
               </Card>
            </Col>
         </Row>
      </>
   )
}

export default AdminDashboard

