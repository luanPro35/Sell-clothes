document.addEventListener('DOMContentLoaded', function() {
  let slideIndex = 0;
  const slides = document.getElementsByClassName("slideshow-slide");
  
  // Hiển thị slide đầu tiên ngay khi trang tải xong
  if (slides.length > 0) {
    slides[0].style.display = "block";
  }
  
  function showSlides() {
    // Ẩn tất cả các slides
    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    
    // Tăng chỉ số slide
    slideIndex++;
    
    // Quay lại slide đầu tiên nếu đã đến slide cuối cùng
    if (slideIndex > slides.length) {
      slideIndex = 1;
    }
    
    // Hiển thị slide hiện tại với hiệu ứng fade
    slides[slideIndex - 1].style.display = "block";
    slides[slideIndex - 1].classList.add('active');
    
    // Đặt thời gian chuyển slide (5 giây)
    setTimeout(showSlides, 5000);
  }
  
  // Bắt đầu slideshow sau 2 giây để tránh nhấp nháy khi trang vừa tải
  setTimeout(showSlides, 2000);
  
  // Xử lý hiệu ứng navbar khi cuộn
  window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
  
  // Xử lý hiệu ứng scroll animation với Intersection Observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      // Nếu phần tử đang được nhìn thấy
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      } else {
        // Nếu muốn hiệu ứng lặp lại khi cuộn lên, bỏ comment dòng dưới
        // entry.target.classList.remove('show');
      }
    });
  }, {
    threshold: 0.1, // Hiển thị khi phần tử hiển thị 10%
    rootMargin: "0px 0px -50px 0px" // Điều chỉnh khi hiệu ứng kích hoạt
  });
  
  // Lấy tất cả các phần tử có class 'hidden'
  const hiddenElements = document.querySelectorAll('.hidden');
  
  // Áp dụng observer cho mỗi phần tử
  hiddenElements.forEach((el) => observer.observe(el));
});