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
  
  // Chỉ bắt đầu slideshow nếu có slide
  if (slides.length > 0) {
    // Bắt đầu slideshow sau 2 giây để tránh nhấp nháy khi trang vừa tải
    setTimeout(showSlides, 2000);
  }
  
  // Xử lý hiệu ứng navbar khi cuộn
  window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
  
  // Xử lý hiệu ứng scroll animation với Intersection Observer cho các phần tử thông thường
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
  
  // Xử lý hiệu ứng scroll animation cho các sản phẩm với hiệu ứng tuần tự
  const productObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Lấy tất cả các cột sản phẩm trong container
        const productColumns = entry.target.querySelectorAll('.product-column');
        
        // Thêm class show với độ trễ tăng dần
        productColumns.forEach((column, index) => {
          setTimeout(() => {
            column.classList.add('show');
          }, 150 * index); // Mỗi sản phẩm hiện sau 150ms
        });
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px"
  });
  
  // Lấy tất cả các phần tử có class 'hidden' (trừ product-showcase)
  const hiddenElements = document.querySelectorAll('.hidden:not(.product-showcase)');
  
  // Lấy các phần tử product-showcase
  const productShowcases = document.querySelectorAll('.product-showcase');
  
  // Áp dụng observer cho các phần tử thông thường
  hiddenElements.forEach((el) => observer.observe(el));
  
  // Áp dụng productObserver cho các phần tử product-showcase
  productShowcases.forEach((el) => productObserver.observe(el));

  const cartIcon = document.querySelector('.fa-bag-shopping');
  const cartSidebar = document.querySelector('.cart-sidebar');
  const closeCartBtn = document.querySelector('.close-cart-btn');

  if (cartIcon && cartSidebar && closeCartBtn) {
    cartIcon.addEventListener('click', (e) => {
      e.preventDefault();
      console.log("Cart icon clicked!");
      cartSidebar.classList.toggle('open');
      // Re-render the cart every time it's opened
      if (typeof renderCart === 'function') {
        renderCart();
      }
    });

    closeCartBtn.addEventListener('click', () => {
      cartSidebar.classList.remove('open');
    });
  }
});
