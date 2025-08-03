// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Banner Slider Functionality
document.addEventListener('DOMContentLoaded', function() {
    const slidesContainer = document.querySelector('.slides-container');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const pauseBtn = document.getElementById('pauseBtn');
    let currentSlide = 0;
    let slideInterval;
    let isPaused = false;
    
    // Total number of actual slides (excluding duplicate)
    const totalSlides = slides.length - 1; // 6 original slides

    // Function to show a specific slide
    function showSlide(index, immediate = false) {
        if (immediate) {
            slidesContainer.style.transition = 'none';
        } else {
            slidesContainer.style.transition = 'transform 1.2s ease-in-out';
        }
        
        // Calculate transform value
        const translateX = -index * (100 / slides.length);
        slidesContainer.style.transform = `translateX(${translateX}%)`;
        
        // Reset transition after immediate change
        if (immediate) {
            setTimeout(() => {
                slidesContainer.style.transition = 'transform 1.2s ease-in-out';
            }, 50);
        }
    }

    // Function to go to next slide (right only)
    function nextSlide() {
        currentSlide++;
        
        // If we reach the duplicate slide (last position)
        if (currentSlide >= slides.length) {
            // Show the duplicate slide first
            showSlide(currentSlide - 1);
            
            // After animation completes, jump to real first slide instantly
            setTimeout(() => {
                currentSlide = 0;
                showSlide(0, true); // Immediate transition
            }, 1200); // Match the CSS transition duration
        } else {
            showSlide(currentSlide);
        }
    }

    // Function to go to previous slide
    function prevSlide() {
        if (currentSlide === 0) {
            // Jump to the duplicate slide instantly, then slide to last real slide
            currentSlide = slides.length - 1;
            showSlide(currentSlide, true);
            
            setTimeout(() => {
                currentSlide = totalSlides - 1;
                showSlide(currentSlide);
            }, 50);
        } else {
            currentSlide--;
            showSlide(currentSlide);
        }
    }

    // Function to start auto-slide
    function startAutoSlide() {
        if (!isPaused) {
            slideInterval = setInterval(nextSlide, 5000); // 5 seconds
        }
    }

    // Function to stop auto-slide
    function stopAutoSlide() {
        if (slideInterval) {
            clearInterval(slideInterval);
        }
    }

    // Function to toggle pause/play
    function togglePause() {
        isPaused = !isPaused;
        if (isPaused) {
            stopAutoSlide();
            pauseBtn.classList.add('paused');
            pauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        } else {
            startAutoSlide();
            pauseBtn.classList.remove('paused');
            pauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
        }
    }

    // Add click event listeners to navigation buttons
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            nextSlide();
            if (!isPaused) {
                stopAutoSlide();
                startAutoSlide(); // Restart auto-slide
            }
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            prevSlide();
            if (!isPaused) {
                stopAutoSlide();
                startAutoSlide(); // Restart auto-slide
            }
        });
    }

    if (pauseBtn) {
        pauseBtn.addEventListener('click', togglePause);
    }

    // Pause auto-slide on hover, resume on mouse leave (only if not manually paused)
    const bannerSlider = document.querySelector('.banner-slider');
    if (bannerSlider) {
        bannerSlider.addEventListener('mouseenter', function() {
            if (!isPaused) stopAutoSlide();
        });
        bannerSlider.addEventListener('mouseleave', function() {
            if (!isPaused) startAutoSlide();
        });
    }

    // Start the auto-slide when page loads
    if (slides.length > 0) {
        showSlide(0); // Show first slide
        startAutoSlide(); // Start auto-sliding
    }

    // Keyboard navigation (optional)
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            prevSlide();
            if (!isPaused) {
                stopAutoSlide();
                startAutoSlide();
            }
        } else if (e.key === 'ArrowRight') {
            nextSlide();
            if (!isPaused) {
                stopAutoSlide();
                startAutoSlide();
            }
        } else if (e.key === ' ') { // Spacebar to pause/play
            e.preventDefault();
            togglePause();
        }
    });
});
