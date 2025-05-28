import React from "react"
import {
   Row,
   Col,
   Card,
   Statistic,
   Table,
   Badge,
   Progress,
   Button,
   List,
   Typography,
   Space,
} from "antd"
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

const { Title, Text } = Typography

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

   // Table columns for recent students
   const studentColumns = [
      { title: "ID", dataIndex: "id", key: "id" },
      { title: "Name", dataIndex: "name", key: "name" },
      { title: "Course", dataIndex: "course", key: "course" },
      {
         title: "Date",
         dataIndex: "date",
         key: "date",
         render: (date) => new Date(date).toLocaleDateString(),
      },
      {
         title: "Status",
         dataIndex: "status",
         key: "status",
         render: (status) => (
            <Badge
               color={
                  status === "Active"
                     ? "green"
                     : status === "Pending"
                     ? "gold"
                     : "gray"
               }
               text={status}
               style={{ borderRadius: 12 }}
            />
         ),
      },
   ]

   return (
      <div style={{ padding: 24 }}>
         <div className="dashboard-header" style={{ marginBottom: 24 }}>
            <Title level={2} style={{ marginBottom: 0 }}>
               Dashboard
            </Title>
            <Text type="secondary">
               Welcome back, John! Here's what's happening with your educational organization today.
            </Text>
         </div>

         {/* Stats Cards */}
         <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
            {stats.map((stat, idx) => (
               <Col xs={24} sm={12} md={6} key={idx}>
                  <Card bordered={false} style={{ boxShadow: "0 2px 8px #f0f1f2" }}>
                     <Space align="center">
                        <div
                           style={{
                              background: customStyles.secondaryColor,
                              color: customStyles.primaryColor,
                              borderRadius: "50%",
                              width: 48,
                              height: 48,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: 24,
                           }}
                        >
                           {stat.icon}
                        </div>
                        <div>
                           <Statistic
                              title={stat.title}
                              value={stat.value}
                              valueStyle={{ fontWeight: 700, fontSize: 22 }}
                           />
                           <Text type={stat.up ? "success" : "danger"} style={{ fontSize: 12 }}>
                              {stat.up ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />} {stat.change} from last month
                           </Text>
                        </div>
                     </Space>
                  </Card>
               </Col>
            ))}
         </Row>

         <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
            {/* Recent Students */}
            <Col xs={24} lg={16}>
               <Card
                  title="Recent Students"
                  bordered={false}
                  extra={
                     <Button type="primary" ghost size="small">
                        View All
                     </Button>
                  }
                  style={{ height: "100%" }}
               >
                  <Table
                     columns={studentColumns}
                     dataSource={recentStudents}
                     rowKey="id"
                     pagination={false}
                     size="middle"
                  />
               </Card>
            </Col>

            {/* Upcoming Events */}
            <Col xs={24} lg={8}>
               <Card
                  title="Upcoming Events"
                  bordered={false}
                  extra={
                     <Button type="primary" ghost size="small">
                        View Calendar
                     </Button>
                  }
                  style={{ height: "100%" }}
               >
                  <List
                     itemLayout="horizontal"
                     dataSource={upcomingEvents}
                     renderItem={(event) => (
                        <List.Item style={{ paddingLeft: 0, paddingRight: 0 }}>
                           <List.Item.Meta
                              avatar={
                                 <div
                                    style={{
                                       background: customStyles.secondaryColor,
                                       color: customStyles.primaryColor,
                                       borderRadius: 8,
                                       width: 48,
                                       height: 48,
                                       display: "flex",
                                       flexDirection: "column",
                                       alignItems: "center",
                                       justifyContent: "center",
                                       fontWeight: 700,
                                    }}
                                 >
                                    <div style={{ fontSize: 18 }}>
                                       {event.date.split(",")[0].split(" ")[1]}
                                    </div>
                                    <div style={{ fontSize: 12 }}>
                                       {event.date.split(",")[0].split(" ")[0]}
                                    </div>
                                 </div>
                              }
                              title={<Text strong>{event.title}</Text>}
                              description={
                                 <div>
                                    <Space size="small">
                                       <Clock size={14} />
                                       <Text type="secondary" style={{ fontSize: 13 }}>
                                          {event.time}
                                       </Text>
                                    </Space>
                                    <br />
                                    <Space size="small">
                                       <MapPin size={14} />
                                       <Text type="secondary" style={{ fontSize: 13 }}>
                                          {event.location}
                                       </Text>
                                    </Space>
                                 </div>
                              }
                           />
                        </List.Item>
                     )}
                  />
               </Card>
            </Col>
         </Row>

         <Row gutter={[16, 16]}>
            {/* Course Completion */}
            <Col xs={24} lg={12}>
               <Card title="Course Completion Rates" bordered={false}>
                  <List
                     dataSource={courseCompletion}
                     renderItem={(item) => (
                        <List.Item>
                           <div style={{ width: "100%" }}>
                              <div style={{ display: "flex", justifyContent: "space-between" }}>
                                 <Text>{item.course}</Text>
                                 <Text strong>{item.completion}%</Text>
                              </div>
                              <Progress
                                 percent={item.completion}
                                 showInfo={false}
                                 strokeColor={
                                    item.completion >= 80
                                       ? "#52c41a"
                                       : item.completion >= 60
                                       ? "#1890ff"
                                       : item.completion >= 40
                                       ? "#faad14"
                                       : "#f5222d"
                                 }
                                 style={{ marginTop: 4 }}
                              />
                           </div>
                        </List.Item>
                     )}
                  />
               </Card>
            </Col>

            {/* Performance Overview */}
            <Col xs={24} lg={12}>
               <Card title="Performance Overview" bordered={false}>
                  <Row gutter={[16, 16]}>
                     <Col xs={12}>
                        <Space align="center">
                           <div
                              style={{
                                 background: "#e8f5e9",
                                 color: "#4caf50",
                                 borderRadius: "50%",
                                 width: 40,
                                 height: 40,
                                 display: "flex",
                                 alignItems: "center",
                                 justifyContent: "center",
                              }}
                           >
                              <CheckCircle size={20} />
                           </div>
                           <div>
                              <Text strong>95%</Text>
                              <br />
                              <Text type="secondary" style={{ fontSize: 13 }}>
                                 Attendance Rate
                              </Text>
                           </div>
                        </Space>
                     </Col>
                     <Col xs={12}>
                        <Space align="center">
                           <div
                              style={{
                                 background: "#fff8e1",
                                 color: "#ffc107",
                                 borderRadius: "50%",
                                 width: 40,
                                 height: 40,
                                 display: "flex",
                                 alignItems: "center",
                                 justifyContent: "center",
                              }}
                           >
                              <AlertCircle size={20} />
                           </div>
                           <div>
                              <Text strong>12%</Text>
                              <br />
                              <Text type="secondary" style={{ fontSize: 13 }}>
                                 Dropout Rate
                              </Text>
                           </div>
                        </Space>
                     </Col>
                     <Col xs={12}>
                        <Space align="center">
                           <div
                              style={{
                                 background: "#e3f2fd",
                                 color: "#2196f3",
                                 borderRadius: "50%",
                                 width: 40,
                                 height: 40,
                                 display: "flex",
                                 alignItems: "center",
                                 justifyContent: "center",
                              }}
                           >
                              <TrendingUp size={20} />
                           </div>
                           <div>
                              <Text strong>87%</Text>
                              <br />
                              <Text type="secondary" style={{ fontSize: 13 }}>
                                 Graduation Rate
                              </Text>
                           </div>
                        </Space>
                     </Col>
                     <Col xs={12}>
                        <Space align="center">
                           <div
                              style={{
                                 background: "#f3e5f5",
                                 color: "#9c27b0",
                                 borderRadius: "50%",
                                 width: 40,
                                 height: 40,
                                 display: "flex",
                                 alignItems: "center",
                                 justifyContent: "center",
                              }}
                           >
                              <BarChart2 size={20} />
                           </div>
                           <div>
                              <Text strong>3.8/4.0</Text>
                              <br />
                              <Text type="secondary" style={{ fontSize: 13 }}>
                                 Average GPA
                              </Text>
                           </div>
                        </Space>
                     </Col>
                  </Row>
                  <div style={{ textAlign: "center", marginTop: 16 }}>
                     <Button type="primary" ghost>
                        View Detailed Reports
                     </Button>
                  </div>
               </Card>
            </Col>
         </Row>
      </div>
   )
}

export default AdminDashboard

