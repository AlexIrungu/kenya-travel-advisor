document.addEventListener('DOMContentLoaded', function() {
    // Initialize GSAP
    gsap.registerPlugin(ScrollTrigger);
    
    // Hero Slider Functionality
    const heroSlides = document.querySelectorAll('.hero-slide');
    const sliderDotsContainer = document.querySelector('.slider-dots');
    let currentSlide = 0;
    const slideInterval = 5000; // 5 seconds per slide
    let slideTimer;
    
    // Create slider dots
    heroSlides.forEach((_, index) => {
      const dot = document.createElement('div');
      dot.classList.add('slider-dot');
      if (index === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goToSlide(index));
      sliderDotsContainer.appendChild(dot);
    });
    
    const sliderDots = document.querySelectorAll('.slider-dot');
    
    // Next slide function
    function nextSlide() {
      goToSlide((currentSlide + 1) % heroSlides.length);
    }
    
    // Previous slide function
    function prevSlide() {
      goToSlide((currentSlide - 1 + heroSlides.length) % heroSlides.length);
    }
    
    // Go to specific slide
    function goToSlide(slideIndex) {
      heroSlides[currentSlide].classList.remove('active');
      sliderDots[currentSlide].classList.remove('active');
      
      currentSlide = slideIndex;
      
      heroSlides[currentSlide].classList.add('active');
      sliderDots[currentSlide].classList.add('active');
      
      // Reset the auto-slide timer
      clearTimeout(slideTimer);
      slideTimer = setTimeout(nextSlide, slideInterval);
    }
    
    // Start the auto-slider
    slideTimer = setTimeout(nextSlide, slideInterval);
    
    // Event listeners for slider navigation
    document.querySelector('.slider-next').addEventListener('click', () => {
      nextSlide();
    });
    
    document.querySelector('.slider-prev').addEventListener('click', () => {
      prevSlide();
    });
  
    // Testimonial slider functionality
    const testimonials = document.querySelectorAll('.testimonial-card');
    let currentTestimonial = 0;
    
    // Hide all testimonials except the first one
    for (let i = 1; i < testimonials.length; i++) {
      testimonials[i].style.display = 'none';
    }
    
    // Next button functionality
    document.querySelector('.testimonial-next').addEventListener('click', function() {
      gsap.to(testimonials[currentTestimonial], {
        opacity: 0,
        y: -20,
        duration: 0.3,
        onComplete: function() {
          testimonials[currentTestimonial].style.display = 'none';
          currentTestimonial = (currentTestimonial + 1) % testimonials.length;
          testimonials[currentTestimonial].style.display = 'block';
          gsap.fromTo(testimonials[currentTestimonial], 
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.5 }
          );
        }
      });
    });
    
    // Previous button functionality
    document.querySelector('.testimonial-prev').addEventListener('click', function() {
      gsap.to(testimonials[currentTestimonial], {
        opacity: 0,
        y: 20,
        duration: 0.3,
        onComplete: function() {
          testimonials[currentTestimonial].style.display = 'none';
          currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
          testimonials[currentTestimonial].style.display = 'block';
          gsap.fromTo(testimonials[currentTestimonial], 
            { opacity: 0, y: -20 },
            { opacity: 1, y: 0, duration: 0.5 }
          );
        }
      });
    });
    
    // Form submission functionality
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you for your inquiry! We will contact you shortly.');
        contactForm.reset();
      });
    }
    
    // Newsletter form functionality
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
      newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you for subscribing to our newsletter!');
        newsletterForm.reset();
      });
    }
    
    // Header scroll effect
    window.addEventListener('scroll', function() {
      const header = document.querySelector('header');
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
    
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('nav');
    
    hamburger.addEventListener('click', function() {
      this.classList.toggle('active');
      nav.classList.toggle('active');
    });
    
    // Video modal functionality
    const videoItems = document.querySelectorAll('.gallery-item[data-type="video"]');
    const videoModal = document.querySelector('.video-modal');
    const modalVideo = videoModal.querySelector('video');
    const closeModal = document.querySelector('.close-modal');
    
    videoItems.forEach(item => {
      const playBtn = item.querySelector('.play-btn');
      playBtn.addEventListener('click', function(e) {
        e.preventDefault();
        const videoSrc = item.querySelector('img').getAttribute('src');
        modalVideo.setAttribute('src', videoSrc);
        videoModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        gsap.fromTo(modalVideo, 
          { scale: 0.8, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" }
        );
      });
    });
    
    closeModal.addEventListener('click', function() {
      gsap.to(modalVideo, {
        scale: 0.8,
        opacity: 0,
        duration: 0.3,
        onComplete: function() {
          videoModal.style.display = 'none';
          modalVideo.pause();
          document.body.style.overflow = 'auto';
        }
      });
    });
    
    // Close modal when clicking outside content
    videoModal.addEventListener('click', function(e) {
      if (e.target === videoModal) {
        gsap.to(modalVideo, {
          scale: 0.8,
          opacity: 0,
          duration: 0.3,
          onComplete: function() {
            videoModal.style.display = 'none';
            modalVideo.pause();
            document.body.style.overflow = 'auto';
          }
        });
      }
    });
    
    // GSAP Animations
    // Services Animation
    gsap.from('.service-card', {
      scrollTrigger: {
        trigger: '.services',
        start: 'top 70%'
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2
    });
    
    // Gallery Animation
    gsap.from('.gallery-item', {
      scrollTrigger: {
        trigger: '.destinations',
        start: 'top 70%'
      },
      scale: 0.9,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15
    });
    
    // About Section Animation
    gsap.from('.about-text', {
      scrollTrigger: {
        trigger: '.about',
        start: 'top 70%'
      },
      x: -50,
      opacity: 0,
      duration: 0.8
    });
    
    gsap.from('.about-image', {
      scrollTrigger: {
        trigger: '.about',
        start: 'top 70%'
      },
      x: 50,
      opacity: 0,
      duration: 0.8
    });
    
    // Testimonial Animation
    gsap.from('.testimonial-card', {
      scrollTrigger: {
        trigger: '.testimonials',
        start: 'top 70%'
      },
      y: 30,
      opacity: 0,
      duration: 0.8
    });
    
    // Contact Animation
    gsap.from('.contact-info', {
      scrollTrigger: {
        trigger: '.contact',
        start: 'top 70%'
      },
      x: -50,
      opacity: 0,
      duration: 0.8
    });
    
    gsap.from('.contact-form', {
      scrollTrigger: {
        trigger: '.contact',
        start: 'top 70%'
      },
      x: 50,
      opacity: 0,
      duration: 0.8
    });
    
    // Fix for video slide images
    const videoGalleryItems = document.querySelectorAll('.gallery-item[data-type="video"]');
    videoGalleryItems.forEach(item => {
      const imgSrc = item.querySelector('img').getAttribute('src');
      if (imgSrc.endsWith('.mp4')) {
        // Create thumbnail from the first frame of the video
        const videoEl = document.createElement('video');
        videoEl.src = imgSrc;
        videoEl.setAttribute('preload', 'metadata');
        
        videoEl.onloadeddata = function() {
          const canvas = document.createElement('canvas');
          canvas.width = videoEl.videoWidth;
          canvas.height = videoEl.videoHeight;
          
          const ctx = canvas.getContext('2d');
          ctx.drawImage(videoEl, 0, 0, canvas.width, canvas.height);
          
          const thumbnail = canvas.toDataURL();
          const img = item.querySelector('img');
          img.src = thumbnail;
        };
      }
    });
  });