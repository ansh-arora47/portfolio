function card() {
    // Hero Entrance Animations
    const tl = gsap.timeline();

    tl.from("nav", {
        y: -50,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    })
    .from(".logo", {
        x: -20,
        opacity: 0,
        duration: 0.8
    }, "-=0.5")
    .from(".hero-label", {
        y: 20,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    })
    .from(".hero-title", {
        y: 100,
        opacity: 0,
        duration: 1.5,
        ease: "power4.out"
    }, "-=0.8")
    .from(".hero-subtitle", {
        y: 20,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    }, "-=1")
    .from(".box, .box1, .box2", {
        scaleX: 0,
        opacity: 0,
        duration: 2,
        stagger: 0.2,
        ease: "power2.inOut"
    }, "-=1.5");

    // Nav Animation
    const navRight = document.querySelector(".right");
    const navLinks = document.querySelectorAll(".pages ul li");
    
    navRight.addEventListener("mouseenter", () => {
        gsap.fromTo(navLinks, 
            { y: 10, opacity: 0 },
            { y: 0, opacity: 1, stagger: 0.1, duration: 0.4, ease: "power2.out" }
        );
    });

    // Animation for box 1
    gsap.to(".secondSection-box1", {
        x: 650,
        duration: 2,
        delay: 0.5,
        scrollTrigger: {
            trigger: ".secondSection-box1",
            scroller: "[data-scroll-container]", // Crucial for Locomotive Scroll
            start: "top 80%",
            end: "top 20%",
            scrub: true,
            // markers: true // Uncomment to debug
        }
    });
    

    // Animation for box 2
    gsap.to(".secondSection-box2", {
        x: -650,
        duration: 2,
        delay: 0.5,
        scrollTrigger: {
            trigger: ".secondSection-box2",
            scroller: "[data-scroll-container]",
            start: "top 80%",
            end: "top 20%",
            scrub: true
        }
    });

    // Animation for box 3
    gsap.to(".secondSection-box3", {
        x: 325,
        duration: 2,
        delay: 0.5,
        scrollTrigger: {
            trigger: ".secondSection-box3",
            scroller: "[data-scroll-container]",
            start: "top 80%",
            end: "top 20%",
            scrub: true
        }
    });

    // Animation for box 4
    gsap.to(".secondSection-box4", {
        x: -325,
        duration: 2,
        delay: 0.5,
        scrollTrigger: {
            trigger: ".secondSection-box4",
            scroller: "[data-scroll-container]",
            start: "top 80%",
            end: "top 20%",
            scrub: true
        }
    });

    // New Section Animations
    gsap.utils.toArray(".section-title").forEach(title => {
        gsap.from(title, {
            y: 50,
            opacity: 0,
            duration: 1,
            scrollTrigger: {
                trigger: title,
                scroller: "[data-scroll-container]",
                start: "top 90%"
            }
        });
    });

    gsap.utils.toArray(".project-item").forEach(item => {
        gsap.from(item, {
            y: 100,
            opacity: 0,
            duration: 1.2,
            scrollTrigger: {
                trigger: item,
                scroller: "[data-scroll-container]",
                start: "top 85%"
            }
        });
    });

    // About Image Slider - Vertical Scroll Logic
    const sliderContainer = document.querySelector(".about-image-slider-container");
    const slider = document.querySelector(".about-image-slider");
    const sliderImages = document.querySelectorAll(".about-image-slider img");
    let currentSliderIndex = 0;
    let isSliderHovering = false;
    let lastSliderScrollTime = 0;
    const sliderScrollDelay = 400; // Delay between image changes

    if (sliderContainer) {
        sliderContainer.addEventListener("mouseenter", () => {
            isSliderHovering = true;
            gsap.to(".slider-hint", { opacity: 1, y: -5, duration: 0.3 });
            // Stop Locomotive Scroll
            if (window.scroller) window.scroller.stop();
        });

        sliderContainer.addEventListener("mouseleave", () => {
            isSliderHovering = false;
            gsap.to(".slider-hint", { opacity: 0.7, y: 0, duration: 0.3 });
            // Start Locomotive Scroll
            if (window.scroller) window.scroller.start();
        });

        window.addEventListener("wheel", (e) => {
            if (!isSliderHovering) return;

            // Prevent page scroll when hovering over the slider
            e.preventDefault();

            const now = Date.now();
            if (now - lastSliderScrollTime < sliderScrollDelay) return;

            if (Math.abs(e.deltaY) > 20) {
                if (e.deltaY > 0) {
                    // Scroll Down -> Next Image
                    if (currentSliderIndex < sliderImages.length - 1) {
                        currentSliderIndex++;
                    } else {
                        currentSliderIndex = 0; // Loop back to start
                    }
                } else {
                    // Scroll Up -> Previous Image
                    if (currentSliderIndex > 0) {
                        currentSliderIndex--;
                    } else {
                        currentSliderIndex = sliderImages.length - 1; // Loop to end
                    }
                }

                // Animate the slider vertically
                gsap.to(slider, {
                    y: -currentSliderIndex * 600, // 600 is the height of the container
                    duration: 0.8,
                    ease: "power3.inOut"
                });

                lastSliderScrollTime = now;
            }
        }, { passive: false });
    }
}

// Modal Toggle Function
function toggleCaseStudy(id) {
    const modal = document.getElementById(id);
    if (modal.style.display === "block") {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
    } else {
        modal.style.display = "block";
        document.body.style.overflow = "hidden";
    }
}

// Wait for ScrollTrigger to be ready
window.addEventListener("load", () => {
    card();
    ScrollTrigger.refresh();
});
