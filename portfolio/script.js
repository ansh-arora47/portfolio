// Initialize Locomotive Scroll
const scroller = new LocomotiveScroll({
    el: document.querySelector('[data-scroll-container]'),
    smooth: true
});

// Make scroller globally accessible
window.scroller = scroller;

// Sync ScrollTrigger with Locomotive Scroll
scroller.on("scroll", ScrollTrigger.update);

ScrollTrigger.scrollerProxy("[data-scroll-container]", {
    scrollTop(value) {
        return arguments.length ? scroller.scrollTo(value, 0, 0) : scroller.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
        return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
    },
    pinType: document.querySelector("[data-scroll-container]").style.transform ? "transform" : "fixed"
});

// Refresh ScrollTrigger after Locomotive Scroll updates
ScrollTrigger.addEventListener("refresh", () => scroller.update());
ScrollTrigger.refresh();
