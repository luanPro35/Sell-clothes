---

# Website Bán Quần Áo

Đây là dự án xây dựng website bán quần áo với giao diện hiện đại, thân thiện người dùng, sử dụng HTML/CSS/JavaScript cho phần Frontend và Spring Boot cho phần Backend.

## Mục lục

- [Giới thiệu](#giới-thiệu)
- [Tính năng](#tính-năng)
- [Cấu trúc dự án](#cấu-trúc-dự-án)
- [Hướng dẫn cài đặt & chạy dự án](#hướng-dẫn-cài-đặt--chạy-dự-án)
- [Công nghệ sử dụng](#công-nghệ-sử-dụng)
- [Đóng góp](#đóng-góp)
- [Liên hệ](#liên-hệ)

---

## Giới thiệu

Website Bán Quần Áo là nền tảng thương mại điện tử hiện đại, được xây dựng nhằm đáp ứng nhu cầu mua sắm thời trang ngày càng tăng của người tiêu dùng Việt Nam. Dự án hướng tới việc mang lại trải nghiệm mua sắm trực tuyến tiện lợi, nhanh chóng và an toàn cho khách hàng ở mọi lứa tuổi.

Với kho sản phẩm đa dạng, cập nhật xu hướng thời trang mới nhất, website giúp người dùng dễ dàng tìm kiếm, so sánh và lựa chọn các mẫu quần áo phù hợp với phong cách cá nhân. Ngoài ra, hệ thống còn hỗ trợ các tính năng quản lý đơn hàng, giỏ hàng thông minh, thanh toán linh hoạt và bảo mật thông tin khách hàng.

Đối với nhà quản trị, website cung cấp công cụ quản lý sản phẩm, đơn hàng và khách hàng hiệu quả, giúp tối ưu hóa hoạt động kinh doanh và nâng cao chất lượng dịch vụ. Dự án không chỉ góp phần thúc đẩy chuyển đổi số trong lĩnh vực bán lẻ thời trang mà còn tạo điều kiện để các shop, doanh nghiệp tiếp cận khách hàng tiềm năng trên nền tảng số.

## Tính năng

- Xem danh sách sản phẩm, chi tiết sản phẩm
- Tìm kiếm, lọc sản phẩm theo danh mục, giá, tên
- Thêm sản phẩm vào giỏ hàng, cập nhật số lượng, xóa khỏi giỏ
- Đặt hàng, theo dõi trạng thái đơn hàng
- Đăng ký, đăng nhập, đăng xuất
- Quản trị sản phẩm, đơn hàng, người dùng (dành cho admin)
- Bảo mật với Spring Security
- Responsive, hiển thị tốt trên mọi thiết bị

## Cấu trúc dự án

```
.
├── frontend/           # Mã nguồn giao diện người dùng
│   ├── assets/         # Tài nguyên tĩnh (hình ảnh, fonts, ...)
│   ├── css/            # Các file CSS
│   ├── js/             # Các file JavaScript
│   └── pages/          # Các trang HTML
│
└── backend/            # Mã nguồn Spring Boot
    ├── src/            # Mã nguồn Java
    └── pom.xml         # File cấu hình Maven
```

## Hướng dẫn cài đặt & chạy dự án

### Yêu cầu

- JDK 11 trở lên
- Maven 3.6+
- MySQL hoặc PostgreSQL
- Trình duyệt web hiện đại (Chrome, Firefox, Edge...)

### Cài đặt Backend

1. Cài đặt JDK và Maven nếu chưa có.
2. Tạo database mới (ví dụ: `clothes_store`) trong MySQL hoặc PostgreSQL.
3. Cấu hình thông tin kết nối database trong file `src/main/resources/application.properties`:
   ```
   spring.datasource.url=jdbc:mysql://localhost:3306/clothes_store
   spring.datasource.username=root
   spring.datasource.password=yourpassword
   ```
4. Mở terminal, di chuyển vào thư mục `backend` và chạy:
   ```
   mvn spring-boot:run
   ```
5. Backend sẽ chạy tại `http://localhost:8080`.

### Cài đặt Frontend

1. Mở thư mục `frontend`.
2. Có thể mở trực tiếp file HTML (ví dụ: `index.html`) hoặc sử dụng extension Live Server (VSCode) để chạy local server.
3. Nếu dùng Live Server, truy cập giao diện tại `http://localhost:5500`.

## Công nghệ sử dụng

- **Frontend:** HTML5, CSS3, JavaScript, Bootstrap 5
- **Backend:** Spring Boot, Spring Data JPA, Spring Security, RESTful API
- **Cơ sở dữ liệu:** MySQL hoặc PostgreSQL

## Đóng góp

Chào mừng mọi đóng góp cho dự án!  
Vui lòng fork repository, tạo branch mới và gửi pull request.  
Khi gửi pull request, hãy mô tả rõ ràng các thay đổi và lý do.

## Liên hệ

- **Email:** quangluan03052000@gmail.com
- **Facebook:** https://www.facebook.com/luan.le.355745
- **Zalo:** 0905622341

---
link code BE: https://chatgpt.com/c/68751ad4-3240-800d-b196-ad3a5c46912a