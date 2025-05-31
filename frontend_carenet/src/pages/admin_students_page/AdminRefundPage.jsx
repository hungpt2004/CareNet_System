import { useState, useEffect, useCallback } from "react"
import { Table, Button, Modal, Descriptions, Pagination, Typography, Tag, Card, Select, Input, Form, Row, Col, message } from "antd"
import { DollarCircleOutlined, SearchOutlined } from "@ant-design/icons"
import OrganizationService from "../../services/organization-service/organization.service"
import AdminService from "../../services/admin-service/admin.service"
import { CustomFailedToast, CustomSuccessToast, CustomToast } from "../../components/toast/CustomToast"

const { Title } = Typography
const PAGE_SIZE = 5

const AdminRefundPage = () => {
  const [organizations, setOrganizations] = useState([])
  const [selectedOrgId, setSelectedOrgId] = useState(null)
  const [month, setMonth] = useState()
  const [year, setYear] = useState()
  const [searching, setSearching] = useState(false)
  const [refundData, setRefundData] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [modalVisible, setModalVisible] = useState(false)
  const [selectedPayment, setSelectedPayment] = useState(null)
  const [loading, setLoading] = useState(false)

  const orgService = new OrganizationService()
  const adminService = new AdminService()

  // Fetch organizations
  const fetchOrganizations = useCallback(async () => {
    setLoading(true)
    try {
      const { data } = await orgService.fetchAllOrganizations()
      setOrganizations(data || [])
    } catch {
      setOrganizations([])
    }
    setLoading(false)
  }, [orgService])

  // Fetch refund data
  const fetchRefundData = useCallback(async (orgId, month, year) => {
    setSearching(true)
    setRefundData([])
    try {
      const res = await adminService.fetchRefundData(orgId, month, year)
      if (res && res.data) {
        setRefundData(res.data)
        CustomSuccessToast("Lấy dữ liệu hoàn trả thành công!")
      } else {
        setRefundData([])
        CustomFailedToast("Không có dữ liệu phù hợp.")
      }
    } catch {
      setRefundData([])
      CustomFailedToast("Không thể lấy dữ liệu hoàn trả.")
    }
    setSearching(false)
    setCurrentPage(1)
  }, [adminService])

  // Handle search button
  const handleSearch = () => {
    if (!selectedOrgId) {
      CustomFailedToast("Vui lòng chọn tổ chức!")
      return
    }
    fetchRefundData(selectedOrgId, month, year)
  }

  // Handle refund payment
  const handleRefund = async () => {
    if (!selectedPayment) return
    try {
      const res = await adminService.payRefund(
        selectedPayment.organization._id,
        selectedPayment.month,
        selectedPayment.year
      )
      if (res && res.status === "success") {
        CustomSuccessToast("Hoàn trả thành công!")
        setModalVisible(false)
        handleSearch()
      } else {
        CustomFailedToast("Hoàn trả thất bại!")
      }
    } catch {
      CustomFailedToast("Hoàn trả thất bại!")
    }
  }

  // Table columns
  const columns = [
    {
      title: "Mã thanh toán",
      dataIndex: "_id",
      key: "_id",
      render: id => <Tag color="blue">{id}</Tag>
    },
    {
      title: "Tên tổ chức",
      dataIndex: ["organization", "name"],
      key: "organizationName",
      render: (text, record) => record.organization?.name || "--"
    },
    {
      title: "Tháng",
      dataIndex: "month",
      key: "month",
      render: v => v || "--"
    },
    {
      title: "Năm",
      dataIndex: "year",
      key: "year"
    },
    {
      title: "Số tiền",
      dataIndex: "amount",
      key: "amount",
      render: v => <b style={{ color: "#cf1322" }}>{(v-(v * 0.1)).toLocaleString("vi-VN")} VNĐ</b>
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: status =>
        status === "NOT PAID" ? (
          <Tag color="orange">Chưa hoàn trả</Tag>
        ) : status === "PAID" ? (
          <Tag color="green">Đã hoàn trả</Tag>
        ) : (
          <Tag color="default">{status}</Tag>
        )
    },
    {
      title: "Thao tác",
      key: "action",
      align: "center",
      render: (_, record) => (
        <Button
          type="primary"
          icon={<DollarCircleOutlined />}
          style={{
            background: "var(--color-primary)",
            borderColor: "var(--color-primary)"
          }}
          disabled={record.status !== "NOT PAID"}
          onClick={() => {
            setSelectedPayment(record)
            setModalVisible(true)
          }}
        >
          Trả tiền
        </Button>
      )
    }
  ]

  // Pagination
  const pagedData = refundData.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)

  useEffect(() => {
    fetchOrganizations()
  }, [])

  return (
    <div style={{ padding: 32, minHeight: "100vh" }}>
      <CustomToast/>
      <Card
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          borderRadius: 16,
          boxShadow: "0 4px 24px #00000010",
          background: "#fff"
        }}
        styles={{
          body: { padding: 32 }
        }}
      >
        <Title
          level={3}
          style={{
            color: "var(--color-primary)",
            marginBottom: 24,
            textAlign: "center",
            fontWeight: 700,
            letterSpacing: 2
          }}
        >
          Tra cứu & hoàn trả cho tổ chức
        </Title>
        <Form layout="vertical" style={{ marginBottom: 24 }}>
          <Row gutter={16}>
            <Col xs={24} md={8}>
              <Form.Item label="Tổ chức">
                <Select
                  showSearch
                  placeholder="Chọn tổ chức"
                  optionFilterProp="children"
                  value={selectedOrgId}
                  onChange={setSelectedOrgId}
                  filterOption={(input, option) =>
                    (option?.children ?? "").toLowerCase().includes(input.toLowerCase())
                  }
                  allowClear
                >
                  {organizations.map(org => (
                    <Select.Option key={org._id} value={org._id}>
                      {org.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col xs={12} md={4}>
              <Form.Item label="Tháng">
                <Input
                  type="number"
                  min={1}
                  max={12}
                  placeholder="VD: 5"
                  value={month}
                  onChange={e => setMonth(e.target.value ? Number(e.target.value) : undefined)}
                  allowClear
                />
              </Form.Item>
            </Col>
            <Col xs={12} md={4}>
              <Form.Item label="Năm">
                <Input
                  type="number"
                  min={2020}
                  max={2100}
                  placeholder="VD: 2025"
                  value={year}
                  onChange={e => setYear(e.target.value ? Number(e.target.value) : undefined)}
                  allowClear
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={4} style={{ display: "flex", alignItems: "end" }}>
              <Button
                type="primary"
                icon={<SearchOutlined />}
                style={{
                  background: "var(--color-primary)",
                  borderColor: "var(--color-primary)",
                  width: "100%"
                }}
                loading={searching}
                onClick={handleSearch}
              >
                Tra cứu
              </Button>
            </Col>
          </Row>
        </Form>

        <Table
          columns={columns}
          dataSource={pagedData}
          rowKey="_id"
          pagination={false}
          loading={loading || searching}
          bordered
          style={{ borderRadius: 12, overflow: "hidden" }}
          locale={{ emptyText: "Không có dữ liệu" }}
        />
        <div style={{ marginTop: 24, textAlign: "right" }}>
          <Pagination
            current={currentPage}
            pageSize={PAGE_SIZE}
            total={refundData.length}
            onChange={setCurrentPage}
            showSizeChanger={false}
            style={{ display: "inline-block" }}
          />
        </div>
      </Card>

      {/* Modal hóa đơn hoàn trả */}
      <Modal
        open={modalVisible}
        title={
          <span style={{
            color: "var(--color-primary)",
            fontWeight: 600,
            fontSize: 20
          }}>
            Hóa đơn hoàn trả
          </span>
        }
        onCancel={() => setModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setModalVisible(false)}>
            Đóng
          </Button>,
          <Button
            key="pay"
            type="primary"
            style={{
              background: "var(--color-primary)",
              borderColor: "var(--color-primary)"
            }}
            disabled={!selectedPayment || selectedPayment.status !== "NOT PAID"}
            onClick={handleRefund}
          >
            Xác nhận hoàn trả
          </Button>,
        ]}
        styles={{
          body: { background: "#f6ffed", borderRadius: 12 }
        }}
      >
        {selectedPayment && (
          <Descriptions
            column={1}
            bordered
            size="middle"
            labelStyle={{
              fontWeight: 600,
              width: 180,
              background: "#e6fffb",
              color: "var(--color-primary)"
            }}
            contentStyle={{ background: "#fff" }}
          >
            <Descriptions.Item label="Tên tổ chức">{selectedPayment.organization?.name}</Descriptions.Item>
            <Descriptions.Item label="Tháng">{selectedPayment.month || "--"}</Descriptions.Item>
            <Descriptions.Item label="Năm">{selectedPayment.year || "--"}</Descriptions.Item>
            <Descriptions.Item label="Số tiền phải hoàn trả">
              <span style={{ color: "#cf1322", fontWeight: 700, fontSize: 18 }}>
                {selectedPayment.amount
                  ? selectedPayment.amount.toLocaleString("vi-VN") + " VNĐ"
                  : "--"}
              </span>
            </Descriptions.Item>
            <Descriptions.Item label="Trạng thái">
              {selectedPayment.status === "NOT PAID" ? (
                <Tag color="orange">Chưa hoàn trả</Tag>
              ) : selectedPayment.status === "PAID" ? (
                <Tag color="green">Đã hoàn trả</Tag>
              ) : (
                <Tag color="default">{selectedPayment.status}</Tag>
              )}
            </Descriptions.Item>
          </Descriptions>
        )}
      </Modal>
    </div>
  )
}

export default AdminRefundPage

