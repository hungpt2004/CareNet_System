import { Breadcrumb } from "antd";
import { Link, useLocation } from "react-router-dom";

const routeNames = {
   'home': { name: 'Trang chủ' },
   'search': { name: 'Tìm kiếm' },
   'profile': { name: 'Cá nhân' },
   'my-events': { name: 'Quản lý ghi danh' },
   'profile-information': { name: 'Thông tin cá nhân' },
   'profile-avatar': { name: 'Ảnh đại diện' },
   'profile-history': { name: 'Lịch sử' },
   'profile-favourite': { name: 'Yêu thích' },
   'profile-score': { name: 'Điểm số' },
   'profile-certificate': { name: 'Chứng chỉ' },
   'event-detail': { name: 'Chi tiết sự kiện' },
   'form-register': { name: 'Đăng ký tham gia' },
   'feedback': { name: 'Phản hồi' },
   'support': { name: 'Hỗ trợ' },
   'organization-register': { name: 'Đăng ký tổ chức' },
   'login': { name: 'Đăng nhập' },
   'forgot-password': { name: 'Quên mật khẩu' },
   'onboarding': { name: 'Giới thiệu' },
   'chat': { name: 'Tin nhắn' },
   'failed-register': { name: 'Đăng ký thất bại' },
   'success-register': { name: 'Đăng ký thành công' },
   'feedback-page': { name: 'Trang phản hồi' },
   'payment-success': { name: 'Thanh toán thành công' },
   'payment-cancel': { name: 'Hủy thanh toán' }
};

const Breadcrumbs = () => {
   const location = useLocation();
   const pathnames = location.pathname.split("/").filter(x => x);

   // Nếu là trang chủ, không hiển thị breadcrumb
   if (pathnames.length === 0) return null;

   return (
      <Breadcrumb style={{ marginBottom: "16px", marginTop: '20px'}}>
         <Breadcrumb.Item>
            <Link to="/">{routeNames['home'].name}</Link>
         </Breadcrumb.Item>
         {pathnames.map((name, index) => {
            const routeTo = "/" + pathnames.slice(0, index + 1).join("/");
            const isLast = index === pathnames.length - 1;
            const routeInfo = routeNames[name] || { name: decodeURIComponent(name) };

            return (
               <Breadcrumb.Item key={routeTo}>
                  {isLast ? (
                     routeInfo.name
                  ) : (
                     <Link to={routeTo}>{routeInfo.name}</Link>
                  )}
               </Breadcrumb.Item>
            );
         })}
      </Breadcrumb>
   );
};

export default Breadcrumbs;
