/**
 * Hướng dẫn viết JavaScript cho carousel
 * 
 * Dưới đây là mẫu code JavaScript bạn có thể sử dụng để làm carousel hoạt động:
 */

document.addEventListener('DOMContentLoaded', function() {
  // Lấy tất cả các carousel trên trang
  const carousels = document.querySelectorAll('.product-carousel');
  
  // Xử lý từng carousel
  carousels.forEach(carousel => {
    const track = carousel.querySelector('.carousel-track');
    const items = carousel.querySelectorAll('.carousel-item');
    const prevButton = carousel.querySelector('.carousel-prev');
    const nextButton = carousel.querySelector('.carousel-next');
    
    // Số lượng sản phẩm hiển thị cùng lúc (3 trên desktop, 2 trên tablet, 1 trên mobile)
    let itemsToShow = window.innerWidth > 992 ? 3 : window.innerWidth > 576 ? 2 : 1;
    
    // Vị trí hiện tại của carousel (bắt đầu từ 0)
    let currentPosition = 0;
    
    // Tổng số sản phẩm
    const totalItems = items.length;
    
    // Cập nhật vị trí của carousel
    function updateCarouselPosition() {
      // Tính toán vị trí mới của track
      const itemWidth = items[0].offsetWidth;
      const newPosition = -currentPosition * itemWidth;
      
      // Áp dụng transform để di chuyển track
      track.style.transform = `translateX(${newPosition}px)`;
      
      // Kiểm tra và cập nhật trạng thái của các nút
      prevButton.disabled = currentPosition === 0;
      nextButton.disabled = currentPosition >= totalItems - itemsToShow;
    }
    
    // Xử lý sự kiện khi nhấn nút Previous
    prevButton.addEventListener('click', () => {
      if (currentPosition > 0) {
        currentPosition--;
        updateCarouselPosition();
      }
    });
    
    // Xử lý sự kiện khi nhấn nút Next
    nextButton.addEventListener('click', () => {
      if (currentPosition < totalItems - itemsToShow) {
        currentPosition++;
        updateCarouselPosition();
      }
    });
    
    // Xử lý sự kiện khi thay đổi kích thước màn hình
    window.addEventListener('resize', () => {
      // Cập nhật số lượng sản phẩm hiển thị dựa trên kích thước màn hình mới
      itemsToShow = window.innerWidth > 992 ? 3 : window.innerWidth > 576 ? 2 : 1;
      
      // Đảm bảo vị trí hiện tại vẫn hợp lệ
      if (currentPosition > totalItems - itemsToShow) {
        currentPosition = Math.max(0, totalItems - itemsToShow);
      }
      
      // Cập nhật vị trí carousel
      updateCarouselPosition();
    });
    
    // Khởi tạo carousel
    updateCarouselPosition();
  });
});