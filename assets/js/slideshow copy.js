const slideshow = document.querySelector('.slideshow');
const slides = document.querySelectorAll('.slide');

function initializeSlideShow() {
    if (slideshow && slides) {
        let j = 0
        for (let i = slides.length-1; i>=0; i--) {
            slides[i].addEventListener('transitionend', reflow);
            slides[i].style.transform = `translateX(${j*100}%)`;
            slides[i].dataset['position'] = j * 100;
            j++;
        }
    }
}

function advanceSlide() {
    if (slides && slides) {
        for (let i=0; i<slides.length; i++) {
            const currentPosition = parseInt(slides[i].dataset['position'])
            const newPosition = currentPosition - 100
            slides[i].style.zIndex = i + 2;
            slides[i].style.transform = `translateX(${newPosition}%)`;
            slides[i].dataset['position'] = newPosition;
        }
    }
}

function reflow(e) {
    if (slides && slides) {
        if (e.propertyName == "transform") {
            for (let i = 0; i<slides.length; i++) {
                if (parseInt(slides[i].dataset.position) < 0 ) {
                    const newPosition = 100 * (slides.length-1);
                    slides[i].style.zIndex = 1;
                    slides[i].style.transform = `translateX(${newPosition}%)`;
                    slides[i].dataset['position'] = newPosition;
                }
            }
        }
    }
}

window.addEventListener('load', () => {
    if (slides && slides) {
        initializeSlideShow();
        setInterval(advanceSlide, 5000)
    }
});