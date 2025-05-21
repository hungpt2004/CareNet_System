"use client";

import React, { useState, useEffect } from "react";
import {
  Table,
  Form,
  Row,
  Col,
  Card,
  Button,
  Pagination,
  Dropdown,
} from "react-bootstrap";
import {
  FaStar,
  FaStarHalf,
  FaSearch,
  FaSort,
  FaFilter,
  FaEye,
  FaTimes,
  FaCalendarAlt,
  FaUser,
  FaRegFlag,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import axiosInstance from "../../utils/AxiosInstance";
import {
  CustomFailedToast,
  CustomSuccessToast,
  CustomToast,
} from "../../components/toast/CustomToast";
const AdminFeedbackPage = () => {
  // Ref for focusing To date input after From date is picked
  const toDateInputRef = React.useRef(null);
  const [showDateDropdown, setShowDateDropdown] = useState(false);
  // Feedbacks state (fetched from API)
  const [feedbacks, setFeedbacks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch feedbacks for current organization (admin)
  useEffect(() => {
    const fetchFeedbacks = async () => {
      setIsLoading(true);
      try {
        const res = await axiosInstance.get("/feedback/get-all-feedback-for-current-organization");
        if (res.data && res.data.status === "success" && Array.isArray(res.data.feedbacks)) {
          // Map API data to expected format
          const mapped = res.data.feedbacks.map((fb) => ({
            id: fb._id,
            eventName: fb.eventTitle || "",
            attendanceName: fb.fullname || "",
            content: fb.content,
            feedbackDate: fb.createdAt,
            rating: fb.rating,
          }));
          setFeedbacks(mapped);
        } else {
          setFeedbacks([]);
        }
      } catch (err) {
        setFeedbacks([]);
        CustomFailedToast("Không thể tải danh sách feedback của tổ chức.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchFeedbacks();
  }, []);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [selectedRow, setSelectedRow] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  // Filter states
  const [eventFilter, setEventFilter] = useState("");
  const [ratingFilter, setRatingFilter] = useState("");
  const [dateRangeFilter, setDateRangeFilter] = useState("");
  const [dateFromFilter, setDateFromFilter] = useState("");
  const [dateToFilter, setDateToFilter] = useState("");
  const [activeFilters, setActiveFilters] = useState(0);

  // Predefined date ranges (Vietnamese)
  const dateRanges = [
    { label: "Tất cả thời gian", value: "all", from: "", to: "" },
    {
      label: "Hôm nay",
      value: "today",
      from: getDateString(0),
      to: getDateString(0),
    },
    {
      label: "Hôm qua",
      value: "yesterday",
      from: getDateString(-1),
      to: getDateString(-1),
    },
    {
      label: "7 ngày qua",
      value: "last7days",
      from: getDateString(-7),
      to: getDateString(0),
    },
    {
      label: "30 ngày qua",
      value: "last30days",
      from: getDateString(-30),
      to: getDateString(0),
    },
    {
      label: "Tháng này",
      value: "thisMonth",
      from: getFirstDayOfMonth(),
      to: getDateString(0),
    },
    {
      label: "Tháng trước",
      value: "lastMonth",
      from: getFirstDayOfLastMonth(),
      to: getLastDayOfLastMonth(),
    },
    { label: "Tùy chọn", value: "custom", from: "", to: "" },
  ];

  // Helper function to get date string for X days from today
  function getDateString(daysOffset) {
    const date = new Date();
    date.setDate(date.getDate() + daysOffset);
    return date.toISOString().split("T")[0];
  }

  // Helper function to get first day of current month
  function getFirstDayOfMonth() {
    const date = new Date();
    date.setDate(1);
    return date.toISOString().split("T")[0];
  }

  // Helper function to get first day of last month
  function getFirstDayOfLastMonth() {
    const date = new Date();
    date.setMonth(date.getMonth() - 1);
    date.setDate(1);
    return date.toISOString().split("T")[0];
  }

  // Helper function to get last day of last month
  function getLastDayOfLastMonth() {
    const date = new Date();
    date.setDate(0);
    return date.toISOString().split("T")[0];
  }

  // Format date for display
  function formatDateForDisplay(dateString) {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  // Get unique event names for the filter dropdown (from API data)
  const uniqueEvents = React.useMemo(() => {
    const events = [...new Set(feedbacks.map((feedback) => feedback.eventName))];
    return events.sort();
  }, [feedbacks]);

  // (Removed simulated data loading)

  // Update active filters count
  useEffect(() => {
    let count = 0;
    if (eventFilter) count++;
    if (ratingFilter) count++;
    if (dateRangeFilter && dateRangeFilter !== "all") count++;
    setActiveFilters(count);
  }, [eventFilter, ratingFilter, dateRangeFilter]);

  // Auto-apply custom date range when dates change
  useEffect(() => {
    if (dateFromFilter || dateToFilter) {
      setDateRangeFilter("custom");
      setCurrentPage(1);
    }
  }, [dateFromFilter, dateToFilter]);

  // Handle sorting
  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  // Get sort icon based on current sort state
  const getSortIcon = (columnName) => {
    if (sortConfig.key !== columnName) {
      return <FaSort className="sort-icon" />;
    }
    return sortConfig.direction === "ascending" ? (
      <FaSort className="sort-icon active" />
    ) : (
      <FaSort className="sort-icon active" />
    );
  };

  // Check if a date is within the filter range
  const isDateInRange = (dateString) => {
    if (!dateFromFilter && !dateToFilter) return true;

    const date = new Date(dateString);
    const fromDate = dateFromFilter ? new Date(dateFromFilter) : null;
    const toDate = dateToFilter ? new Date(dateToFilter) : null;

    // Set time to midnight for accurate date comparison
    if (date) date.setHours(0, 0, 0, 0);
    if (fromDate) fromDate.setHours(0, 0, 0, 0);
    if (toDate) toDate.setHours(0, 0, 0, 0);

    if (fromDate && toDate) {
      return date >= fromDate && date <= toDate;
    } else if (fromDate) {
      return date >= fromDate;
    } else if (toDate) {
      return date <= toDate;
    }

    return true;
  };

  // Handle date range selection
  const handleDateRangeChange = (rangeValue) => {
    setDateRangeFilter(rangeValue);
    setCurrentPage(1);

    const selectedRange = dateRanges.find(
      (range) => range.value === rangeValue
    );
    if (selectedRange) {
      setDateFromFilter(selectedRange.from);
      setDateToFilter(selectedRange.to);
    }
  };

  // Handle custom date input change
  const handleDateInputChange = (type, value) => {
    if (type === "from") {
      setDateFromFilter(value);
    } else {
      setDateToFilter(value);
    }
    // Date range filter will be set to "custom" via the useEffect
  };

  // Sort and filter data (works with API data)
  const filteredFeedbacks = React.useMemo(() => {
    let filteredData = [...feedbacks];

    // Apply search filter
    if (searchTerm) {
      filteredData = filteredData.filter(
        (feedback) =>
          (feedback.eventName || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
          (feedback.attendanceName || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
          (feedback.content || "").toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply event filter
    if (eventFilter) {
      filteredData = filteredData.filter((feedback) => feedback.eventName === eventFilter);
    }

    // Apply rating filter
    if (ratingFilter) {
      filteredData = filteredData.filter((feedback) => feedback.rating === Number.parseFloat(ratingFilter));
    }

    // Apply date range filter
    if (dateFromFilter || dateToFilter) {
      filteredData = filteredData.filter((feedback) => isDateInRange(feedback.feedbackDate));
    }

    return filteredData;
  }, [
    feedbacks,
    searchTerm,
    eventFilter,
    ratingFilter,
    dateFromFilter,
    dateToFilter,
  ]);

  // Sort filtered data
  const sortedFeedbacks = React.useMemo(() => {
    const sortableData = [...filteredFeedbacks];

    if (sortConfig.key) {
      sortableData.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableData;
  }, [filteredFeedbacks, sortConfig]);

  // Reset all filters
  const resetFilters = () => {
    setEventFilter("");
    setRatingFilter("");
    setDateRangeFilter("all");
    setDateFromFilter("");
    setDateToFilter("");
    setCurrentPage(1);
  };

  // Handle filter changes
  const handleFilterChange = (filterType, value) => {
    // Reset to first page when filters change
    setCurrentPage(1);

    switch (filterType) {
      case "event":
        setEventFilter(value);
        break;
      case "rating":
        setRatingFilter(value);
        break;
      default:
        break;
    }
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedFeedbacks.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedFeedbacks.length / itemsPerPage);

  // Change page
  const paginate = (pageNumber) => {
    setSelectedRow(null); // Close any expanded rows when changing pages
    setCurrentPage(pageNumber);
  };

  // Render star ratings
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`full-${i}`} className="star filled" />);
    }

    // Add half star if needed
    if (hasHalfStar) {
      stars.push(<FaStarHalf key="half" className="star filled" />);
    }

    // Add empty stars
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaStar key={`empty-${i}`} className="star empty" />);
    }

    return stars;
  };

  // Handle row click
  const handleRowClick = (feedback) => {
    setSelectedRow(
      selectedRow && selectedRow.id === feedback.id ? null : feedback
    );
  };

  // Render pagination items
  const renderPaginationItems = () => {
    const items = [];

    // Previous button
    items.push(
      <Pagination.Prev
        key="prev"
        onClick={() => currentPage > 1 && paginate(currentPage - 1)}
        disabled={currentPage === 1}
        className="pagination-nav-item"
      />
    );

    // First page
    if (currentPage > 2) {
      items.push(
        <Pagination.Item
          key={1}
          onClick={() => paginate(1)}
          className="pagination-item"
        >
          1
        </Pagination.Item>
      );

      if (currentPage > 3) {
        items.push(
          <Pagination.Ellipsis
            key="ellipsis1"
            className="pagination-ellipsis"
          />
        );
      }
    }

    // Pages around current page
    for (
      let number = Math.max(1, currentPage - 1);
      number <= Math.min(totalPages, currentPage + 1);
      number++
    ) {
      items.push(
        <Pagination.Item
          key={number}
          active={number === currentPage}
          onClick={() => paginate(number)}
          className={`pagination-item ${
            number === currentPage ? "active" : ""
          }`}
        >
          {number}
        </Pagination.Item>
      );
    }

    // Last page
    if (currentPage < totalPages - 1) {
      if (currentPage < totalPages - 2) {
        items.push(
          <Pagination.Ellipsis
            key="ellipsis2"
            className="pagination-ellipsis"
          />
        );
      }

      items.push(
        <Pagination.Item
          key={totalPages}
          onClick={() => paginate(totalPages)}
          className="pagination-item"
        >
          {totalPages}
        </Pagination.Item>
      );
    }

    // Next button
    items.push(
      <Pagination.Next
        key="next"
        onClick={() => currentPage < totalPages && paginate(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="pagination-nav-item"
      />
    );

    return items;
  };

  // Get current date range display text
  const getDateRangeDisplayText = () => {
    if (!dateRangeFilter || dateRangeFilter === "all") {
      return "Tất cả thời gian";
    }
    if (dateRangeFilter === "custom") {
      if (dateFromFilter && dateToFilter) {
        return `${formatDateForDisplay(dateFromFilter)} - ${formatDateForDisplay(dateToFilter)}`;
      } else if (dateFromFilter) {
        return `Từ ${formatDateForDisplay(dateFromFilter)}`;
      } else if (dateToFilter) {
        return `Đến ${formatDateForDisplay(dateToFilter)}`;
      }
      return "Tùy chọn";
    }
    const selectedRange = dateRanges.find((range) => range.value === dateRangeFilter);
    return selectedRange ? selectedRange.label : "Tất cả thời gian";
  };

  return (
    <>
      <style>{`
        /* Modern styling with green theme */
        :root {
          --primary-color: #10b981;
          --primary-light: #34d399;
          --primary-dark: #059669;
          --success-color: #10b981;
          --warning-color: #f59e0b;
          --danger-color: #ef4444;
          --background-color: #f9fafb;
          --card-bg: #ffffff;
          --text-primary: #111827;
          --text-secondary: #4b5563;
          --border-color: #e5e7eb;
        }

        .admin-dashboard {
          background-color: var(--background-color);
          min-height: 100vh;
          padding: 2rem 1rem;
          font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI",
            Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
            sans-serif;
        }

        .dashboard-card {
          border-radius: 1rem;
          border: none;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05),
            0 8px 10px -6px rgba(0, 0, 0, 0.01);
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .dashboard-card:hover {
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
            0 10px 10px -5px rgba(0, 0, 0, 0.04);
          transform: translateY(-2px);
        }

        .card-header-gradient {
          background: linear-gradient(
            135deg,
            var(--primary-color),
            var(--primary-dark)
          );
          color: white;
          border-bottom: none;
          padding: 1.5rem;
        }

        .page-title {
          font-weight: 700;
          font-size: 1.75rem;
          margin-bottom: 1.5rem;
          margin-top: 0.5rem;
          background: linear-gradient(90deg, #ffffff, #d1fae5);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          text-align: center;
        }

        .search-container {
          position: relative;
          margin-bottom: 1rem;
        }

        .search-input {
          border-radius: 9999px;
          padding-left: 3rem;
          background-color: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: white;
          transition: all 0.3s ease;
        }

        .search-input:focus {
          background-color: rgba(255, 255, 255, 0.2);
          border-color: rgba(255, 255, 255, 0.3);
          box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.1);
        }

        .search-input::placeholder {
          color: rgba(255, 255, 255, 0.7);
        }

        .search-icon {
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          color: rgba(255, 255, 255, 0.7);
          z-index: 10;
        }

        .action-buttons {
          display: flex;
          gap: 0.5rem;
        }

        .action-button {
          border-radius: 9999px;
          padding: 0.5rem 1rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 500;
          transition: all 0.2s ease;
          border: none;
        }

        .action-button.primary {
          background-color: var(--primary-color);
          color: white;
        }

        .action-button.primary:hover {
          background-color: var(--primary-dark);
        }

        .action-button.secondary {
          background-color: rgba(255, 255, 255, 0.1);
          color: white;
        }

        .action-button.secondary:hover {
          background-color: rgba(255, 255, 255, 0.2);
        }

        .filter-badge {
          position: absolute;
          top: -5px;
          right: -5px;
          background-color: #f59e0b;
          color: white;
          border-radius: 50%;
          width: 20px;
          height: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.75rem;
          font-weight: bold;
        }

        .modern-table {
          border-collapse: separate;
          border-spacing: 0;
        }

        .modern-table thead th {
          background-color: #f3f4f6;
          color: var(--text-secondary);
          font-weight: 600;
          text-transform: uppercase;
          font-size: 0.75rem;
          letter-spacing: 0.05em;
          padding: 1rem;
          border-bottom: 1px solid var(--border-color);
          position: relative;
        }

        .modern-table tbody tr {
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .modern-table tbody tr:hover {
          background-color: #f9fafb;
        }

        .modern-table tbody tr.selected {
          background-color: rgba(16, 185, 129, 0.05);
          border-left: 3px solid var(--primary-color);
        }

        .modern-table td {
          padding: 1rem;
          border-bottom: 1px solid var(--border-color);
          color: var(--text-primary);
          vertical-align: middle;
        }

        .sort-icon {
          margin-left: 0.5rem;
          opacity: 0.5;
          transition: all 0.2s;
        }

        .sort-icon.active {
          opacity: 1;
          color: var(--primary-color);
        }

        .star {
          color: #e5e7eb;
          margin-right: 0.25rem;
          transition: all 0.3s ease;
        }

        .star.filled {
          color: #f59e0b;
        }

        .star.filled:nth-child(1) {
          animation: pulse 1s ease-in-out;
        }

        .star.filled:nth-child(2) {
          animation: pulse 1s ease-in-out 0.1s;
        }

        .star.filled:nth-child(3) {
          animation: pulse 1s ease-in-out 0.2s;
        }

        .star.filled:nth-child(4) {
          animation: pulse 1s ease-in-out 0.3s;
        }

        .star.filled:nth-child(5) {
          animation: pulse 1s ease-in-out 0.4s;
        }

        @keyframes pulse {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.2);
          }
          100% {
            transform: scale(1);
          }
        }

        .detail-row {
          background-color: #f9fafb;
          border-radius: 0.5rem;
          margin: 0.5rem 2rem;
          padding: 1rem;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
            0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }

        .filters-container {
          background-color: #f3f4f6;
          border-radius: 0.5rem;
          padding: 1rem;
          margin-bottom: 1rem;
        }

        .filter-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .filter-title {
          font-weight: 600;
          color: var(--text-primary);
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .reset-filters {
          color: var(--primary-color);
          background: none;
          border: none;
          font-size: 0.875rem;
          display: flex;
          align-items: center;
          gap: 0.25rem;
          cursor: pointer;
          padding: 0.25rem 0.5rem;
          border-radius: 0.25rem;
          transition: all 0.2s ease;
        }

        .reset-filters:hover {
          background-color: rgba(16, 185, 129, 0.1);
        }

        .loading-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 200px;
        }

        .spinner {
          width: 40px;
          height: 40px;
          border: 4px solid rgba(16, 185, 129, 0.1);
          border-radius: 50%;
          border-top-color: var(--primary-color);
          animation: spin 1s ease-in-out infinite;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        .empty-state {
          text-align: center;
          padding: 3rem;
          color: var(--text-secondary);
        }

        /* Date range picker styling */
        .date-range-picker {
          position: relative;
        }

        .date-range-button {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background-color: white;
          border: 1px solid var(--border-color);
          border-radius: 0.5rem;
          padding: 0.5rem 1rem;
          font-size: 0.875rem;
          color: var(--text-primary);
          cursor: pointer;
          transition: all 0.2s ease;
          width: 100%;
          text-align: left;
        }

        .date-range-button:hover {
          border-color: var(--primary-color);
        }

        .date-range-button .calendar-icon {
          color: var(--primary-color);
        }

        .date-range-dropdown {
          width: 100%;
        }

        .date-range-dropdown .dropdown-menu {
          width: 100%;
          padding: 0.5rem;
        }

        .date-range-dropdown .dropdown-item {
          padding: 0.5rem 1rem;
          border-radius: 0.25rem;
          transition: all 0.2s ease;
        }

        .date-range-dropdown .dropdown-item:hover {
          background-color: rgba(16, 185, 129, 0.1);
          color: var(--primary-color);
        }

        .date-range-dropdown .dropdown-item.active {
          background-color: var(--primary-color);
          color: white;
        }

        .custom-date-range {
          padding: 0.5rem;
          border-top: 1px solid var(--border-color);
          margin-top: 0.5rem;
        }

        .custom-date-inputs {
          display: flex;
          gap: 0.5rem;
          margin-top: 0.5rem;
        }

        .custom-date-inputs .form-control {
          font-size: 0.875rem;
        }

        /* Pagination styling */
        .pagination-container {
          display: flex;
          justify-content: center;
          margin-top: 2rem;
        }

        .pagination {
          --bs-pagination-active-bg: var(--primary-color);
          --bs-pagination-active-border-color: var(--primary-color);
        }

        .pagination-item {
          margin: 0 0.25rem;
          border-radius: 0.5rem;
          transition: all 0.2s ease;
        }

        .pagination-item.active {
          background-color: var(--primary-color) !important;
          border-color: var(--primary-color) !important;
          color: white;
          box-shadow: 0 4px 6px -1px rgba(16, 185, 129, 0.2);
        }

        .pagination-item:hover:not(.active) {
          background-color: #f3f4f6;
          border-color: #e5e7eb;
          color: var(--primary-color);
        }

        .pagination-nav-item {
          margin: 0 0.25rem;
          border-radius: 0.5rem;
        }

        .pagination-ellipsis {
          margin: 0 0.25rem;
        }

        .pagination-info {
          text-align: center;
          margin-top: 1rem;
          color: var(--text-secondary);
          font-size: 0.875rem;
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .admin-dashboard {
            padding: 1rem 0.5rem;
          }

          .page-title {
            font-size: 1.5rem;
          }

          .modern-table {
            font-size: 0.875rem;
          }

          .modern-table th,
          .modern-table td {
            padding: 0.75rem 0.5rem;
          }

          .action-buttons {
            flex-wrap: wrap;
          }
        }
      `}</style>

      <div className="admin-dashboard">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="dashboard-card">
            <Card.Header className="card-header-gradient">
              <h1 className="page-title">QUẢN LÍ ĐÁNH GIÁ</h1>
              <Row className="align-items-center">
                <Col lg={6} className="mb-3 mb-lg-0">
                  <div className="search-container">
                    <FaSearch className="search-icon" />
                    <Form.Control
                      className="search-input"
                      placeholder="Tìm kiếm theo tên sự kiện, người tham gia hoặc nội dung..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </Col>
                <Col lg={6}>
                  <div className="action-buttons justify-content-lg-end">
                    <div style={{ position: "relative" }}>
                      <Button
                        className="action-button secondary"
                        onClick={() => setShowFilters(!showFilters)}
                      >
                        <FaFilter /> Bộ lọc
                      </Button>
                      {activeFilters > 0 && (
                        <span className="filter-badge">{activeFilters}</span>
                      )}
                    </div>
                  </div>
                </Col>
              </Row>
            </Card.Header>

            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="filters-container m-3">
                    <div className="filter-header">
                      <div className="filter-title">
                        <FaFilter /> Bộ lọc đang dùng: {activeFilters}
                      </div>
                      {activeFilters > 0 && (
                        <button
                          className="reset-filters"
                          onClick={resetFilters}
                        >
                          <FaTimes /> Reset Filters
                        </button>
                      )}
                    </div>
                    <Row>
                      <Col md={4} className="mb-3">
                        <Form.Group>
                          <Form.Label>
                            <FaRegFlag
                              className="me-2"
                              style={{ color: "#10b981" }}
                            />
                            Sự kiện
                          </Form.Label>
                          <Form.Select
                            value={eventFilter}
                            onChange={(e) =>
                              handleFilterChange("event", e.target.value)
                            }
                          >
                            <option value="">Tất cả sự kiện</option>
                            {uniqueEvents.map((event, index) => (
                              <option key={index} value={event}>
                                {event}
                              </option>
                            ))}
                          </Form.Select>
                        </Form.Group>
                      </Col>
                      <Col md={4} className="mb-3">
                        <Form.Group>
                          <Form.Label>
                            <FaStar
                              className="me-2"
                              style={{ color: "#f59e0b" }}
                            />
                            Đánh giá
                          </Form.Label>
                          <Form.Select
                            value={ratingFilter}
                            onChange={(e) =>
                              handleFilterChange("rating", e.target.value)
                            }
                          >
                            <option value="">Tất cả đánh giá</option>
                            <option value="5">5 sao</option>
                            <option value="4.5">4.5 sao</option>
                            <option value="4">4 sao</option>
                            <option value="3.5">3.5 sao</option>
                            <option value="3">3 sao</option>
                            <option value="2.5">2.5 sao</option>
                            <option value="2">2 sao</option>
                            <option value="1.5">1.5 sao</option>
                            <option value="1">1 sao</option>
                          </Form.Select>
                        </Form.Group>
                      </Col>
                      <Col md={4} className="mb-3">
                        <Form.Group>
                          <Form.Label>
                            <FaCalendarAlt
                              className="me-2"
                              style={{ color: "#f59e0b" }}
                            />
                            Khoảng ngày
                          </Form.Label>
                          <Dropdown
                            className="date-range-dropdown"
                            show={showDateDropdown}
                            onToggle={setShowDateDropdown}
                          >
                            <Dropdown.Toggle
                              className="date-range-button"
                              variant="light"
                              onClick={() =>
                                setShowDateDropdown((prev) => !prev)
                              }
                            >
                              <FaCalendarAlt className="calendar-icon" />{" "}
                              {getDateRangeDisplayText()}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                              {dateRanges.slice(0, -1).map((range) => (
                                <Dropdown.Item
                                  key={range.value}
                                  active={dateRangeFilter === range.value}
                                  onClick={() => {
                                    handleDateRangeChange(range.value);
                                    setShowDateDropdown(false);
                                  }}
                                >
                                  {range.label}
                                </Dropdown.Item>
                              ))}
                              <div
                                className="custom-date-range"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <div className="fw-bold mb-2">Tùy chọn</div>
                                <div className="custom-date-inputs">
                                  <Form.Control
                                    type="date"
                                    placeholder="Từ ngày"
                                    value={dateFromFilter}
                                    onChange={(e) => {
                                      handleDateInputChange(
                                        "from",
                                        e.target.value
                                      );
                                      setTimeout(() => {
                                        if (toDateInputRef.current)
                                          toDateInputRef.current.focus();
                                      }, 0);
                                    }}
                                    max={dateToFilter || undefined}
                                  />
                                  <Form.Control
                                    type="date"
                                    placeholder="Đến ngày"
                                    value={dateToFilter}
                                    onChange={(e) => {
                                      handleDateInputChange(
                                        "to",
                                        e.target.value
                                      );
                                      // Auto-close dropdown if both dates are selected
                                      if (dateFromFilter && e.target.value) {
                                        setTimeout(
                                          () => setShowDateDropdown(false),
                                          150
                                        );
                                      }
                                    }}
                                    min={dateFromFilter || undefined}
                                    ref={toDateInputRef}
                                  />
                                </div>
                              </div>
                            </Dropdown.Menu>
                          </Dropdown>
                        </Form.Group>
                      </Col>
                    </Row>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <Card.Body>
              {isLoading ? (
                <div className="loading-container">
                  <div className="spinner"></div>
                </div>
              ) : (
                <div className="table-responsive">
                  <Table className="modern-table">
                    <thead>
                      <tr>
                        <th
                          onClick={() => requestSort("eventName")}
                          style={{ cursor: "pointer" }}
                        >
                          Tên sự kiện {getSortIcon("eventName")}
                        </th>
                        <th
                          onClick={() => requestSort("attendanceName")}
                          style={{ cursor: "pointer" }}
                        >
                          Người tham gia {getSortIcon("attendanceName")}
                        </th>
                        <th>Nội dung đánh giá</th>
                        <th
                          onClick={() => requestSort("feedbackDate")}
                          style={{ cursor: "pointer" }}
                        >
                          Ngày đánh giá {getSortIcon("feedbackDate")}
                        </th>
                        <th
                          onClick={() => requestSort("rating")}
                          style={{ cursor: "pointer" }}
                        >
                          Đánh giá {getSortIcon("rating")}
                        </th>
                        <th>Hành động</th>
                      </tr>
                    </thead>
                    <tbody>
                      <AnimatePresence mode="wait">
                        {currentItems.map((feedback) => (
                          <React.Fragment key={feedback.id}>
                            <motion.tr
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className={
                                selectedRow && selectedRow.id === feedback.id
                                  ? "selected"
                                  : ""
                              }
                              onClick={() => handleRowClick(feedback)}
                            >
                              <td>{feedback.eventName}</td>
                              <td>{feedback.attendanceName}</td>
                              <td>
                                {feedback.content.length > 30
                                  ? `${feedback.content.substring(0, 30)}...`
                                  : feedback.content}
                              </td>
                              <td>{formatDateForDisplay(feedback.feedbackDate)}</td>
                              <td>{renderStars(feedback.rating)}</td>
                              <td>
                                <Button
                                  size="sm"
                                  variant="outline-success"
                                  className="action-icon-btn me-2"
                                  title="View Details"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleRowClick(feedback);
                                  }}
                                >
                                  <FaEye style={{ verticalAlign: "middle" }} />
                                </Button>
                              </td>
                            </motion.tr>
                            {selectedRow && selectedRow.id === feedback.id && (
                              <motion.tr
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                              >
                                <td colSpan={6} className="p-0">
                                  <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: 0.1 }}
                                    className="detail-row modern-detail-row"
                                  >
                                    <Row>
                                      <Col
                                        md={6}
                                        className="d-flex flex-column align-items-start justify-content-center mb-3 mb-md-0"
                                      >
                                        <div className="detail-header mb-2">
                                          <FaEye className="me-2 text-success" />
                                          <span className="fw-bold text-success">
                                            Chi tiết đánh giá
                                          </span>
                                        </div>
                                        <div className="detail-info mb-2 d-flex align-items-center">
                                          <FaRegFlag
                                            className="me-2"
                                            style={{ color: "#10b981" }}
                                          />
                                          <strong className="me-1">
                                            Sự kiện:
                                          </strong>{" "}
                                          {selectedRow.eventName}
                                        </div>
                                        <div className="detail-info mb-2 d-flex align-items-center">
                                          <FaUser
                                            className="me-2"
                                            style={{ color: "#0d6efd" }}
                                          />
                                          <strong className="me-1">
                                            Người tham gia:
                                          </strong>{" "}
                                          {selectedRow.attendanceName}
                                        </div>
                                        <div className="detail-info mb-2 d-flex align-items-center">
                                          <FaCalendarAlt
                                            className="me-2"
                                            style={{ color: "#f59e0b" }}
                                          />
                                          <strong className="me-1">
                                            Ngày đánh giá:
                                          </strong>{" "}
                                          {formatDateForDisplay(selectedRow.feedbackDate)}
                                        </div>
                                      </Col>
                                      <Col
                                        md={6}
                                        className="d-flex flex-column align-items-start justify-content-center"
                                      >
                                        <div className="detail-header mb-2">
                                          <FaFilter className="me-2 text-primary" />
                                          <span className="fw-bold text-primary">
                                            Nội dung đánh giá:
                                          </span>
                                        </div>
                                        <div className="detail-content-box p-3 rounded bg-light border w-100 mb-2">
                                          {selectedRow.content}
                                        </div>
                                        <div className="detail-info mb-2 d-flex align-items-center">
                                          <FaStar
                                            className="me-2"
                                            style={{
                                              color: "#f59e0b",
                                              fontSize: "1.2rem",
                                            }}
                                          />
                                          <strong
                                            style={{
                                              color: "#f59e0b",
                                              marginRight: "0.5rem",
                                            }}
                                          >
                                            Đánh giá:
                                          </strong>
                                          <span style={{ color: "#f59e0b" }}>
                                            {renderStars(selectedRow.rating)}
                                          </span>
                                        </div>
                                      </Col>
                                    </Row>
                                  </motion.div>
                                </td>
                              </motion.tr>
                            )}
                          </React.Fragment>
                        ))}
                      </AnimatePresence>
                    </tbody>
                  </Table>

                  {sortedFeedbacks.length === 0 && (
                    <div className="empty-state">
                      <FaSearch size={40} className="mb-3 text-muted" />
                      <h5>Không tìm thấy đánh giá nào</h5>
                      <p>Vui lòng thay đổi tiêu chí tìm kiếm hoặc bộ lọc</p>
                    </div>
                  )}

                  {sortedFeedbacks.length > 0 && (
                    <motion.div
                      className="pagination-container"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      <Pagination>{renderPaginationItems()}</Pagination>
                    </motion.div>
                  )}

                  {sortedFeedbacks.length > 0 && (
                    <>
                      <div style={{ minHeight: "40px" }}></div>
                      <div style={{ minHeight: "40px" }}></div>
                      <div className="pagination-info">
                        Hiển thị {indexOfFirstItem + 1} đến {Math.min(indexOfLastItem, sortedFeedbacks.length)} trong tổng số {sortedFeedbacks.length} đánh giá
                      </div>
                    </>
                  )}
                </div>
              )}
            </Card.Body>
          </Card>
        </motion.div>
      </div>
    </>
  );
};

export default AdminFeedbackPage;
