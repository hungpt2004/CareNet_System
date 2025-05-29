import React from 'react';
import { Card, Row, Col, Statistic, Typography } from 'antd';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const { Title } = Typography;

// Placeholder data - replace with actual data fetching
const mockData = {
  totalExpense: 1500000000,
  totalIncome: 2000000000,
  monthlyData: [
    { month: 'Jan', income: 400000000, expense: 300000000 },
    { month: 'Feb', income: 300000000, expense: 250000000 },
    { month: 'Mar', income: 200000000, expense: 180000000 },
    { month: 'Apr', income: 278000000, expense: 220000000 },
    { month: 'May', income: 189000000, expense: 150000000 },
    { month: 'Jun', income: 239000000, expense: 200000000 },
  ],
};

const OrganizationDashboardPage = () => {
  return (
    <div style={{ padding: '24px' }}>
      <Title level={2}>Tổng quan tổ chức</Title>
      
      {/* Summary Cards */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Tổng chi tiêu"
              value={mockData.totalExpense}
              precision={0}
              valueStyle={{ color: '#cf1322' }}
              prefix={<TrendingDown size={16} />}
              suffix="đ"
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Tổng thu nhập"
              value={mockData.totalIncome}
              precision={0}
              valueStyle={{ color: '#3f8600' }}
              prefix={<TrendingUp size={16} />}
              suffix="đ"
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Lợi nhuận"
              value={mockData.totalIncome - mockData.totalExpense}
              precision={0}
              valueStyle={{ color: '#3f8600' }}
              prefix={<TrendingUp size={16} />}
              suffix="đ"
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Tỷ lệ chi tiêu/thu nhập"
              value={(mockData.totalExpense / mockData.totalIncome) * 100}
              precision={2}
              suffix="%"
            />
          </Card>
        </Col>
      </Row>

      {/* Charts */}
      <Row gutter={[16, 16]} style={{ marginTop: '24px' }}>
        <Col xs={24} lg={12}>
          <Card title="Biểu đồ thu chi theo tháng">
            <div style={{ width: '100%', height: 300 }}>
              <ResponsiveContainer>
                <AreaChart
                  data={mockData.monthlyData}
                  margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="income"
                    stackId="1"
                    stroke="#3f8600"
                    fill="#3f8600"
                    name="Thu nhập"
                  />
                  <Area
                    type="monotone"
                    dataKey="expense"
                    stackId="1"
                    stroke="#cf1322"
                    fill="#cf1322"
                    name="Chi tiêu"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="Thống kê chi tiết">
            {/* Add more detailed statistics or charts here */}
            <div style={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Typography.Text type="secondary">
                Thêm biểu đồ hoặc thống kê chi tiết ở đây
              </Typography.Text>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Additional Information */}
      <Row gutter={[16, 16]} style={{ marginTop: '24px' }}>
        <Col xs={24} lg={12}>
          <Card title="Hoạt động gần đây">
            {/* Add recent activities list here */}
            <div style={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Typography.Text type="secondary">
                Danh sách hoạt động gần đây
              </Typography.Text>
            </div>
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="Thông báo">
            {/* Add notifications here */}
            <div style={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Typography.Text type="secondary">
                Danh sách thông báo
              </Typography.Text>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default OrganizationDashboardPage;