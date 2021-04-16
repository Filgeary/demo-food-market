function slider() {
    // slider #1
    // =========================================================

    // const slider = document.querySelector('.offer__slider');

    // const slides = slider.querySelectorAll('.offer__slide');
    // const currentSlide = slider.querySelector('#current');
    // const totalSlides = slider.querySelector('#total');
    // const sliderPrev = slider.querySelector('.offer__slider-prev');
    // const sliderNext = slider.querySelector('.offer__slider-next');

    // let sliderIndex = 1;

    // showSlides(sliderIndex);
    // totalSlides.textContent = getZero(slides.length);

    // function showSlides(n) {
    //     if (n > slides.length) {
    //         sliderIndex = 1;
    //     }

    //     if (n < 1) {
    //         sliderIndex = slides.length;
    //     }

    //     slides.forEach((item) => item.classList.add('hide'));
    //     slides[sliderIndex - 1].classList.replace('hide', 'show');
    //     currentSlide.textContent = getZero(sliderIndex);
    // }

    // function calculateSlide(n) {
    //     showSlides((sliderIndex += n));
    // }

    // sliderPrev.addEventListener('click', () => calculateSlide(-1));
    // sliderNext.addEventListener('click', () => calculateSlide(+1));

    // slider #2
    // =========================================================

    // utils
    function getZero(number) {
        if (number >= 0 && number < 10) {
            return '0' + number;
        }
        return number;
    }

    const slider = document.querySelector('.offer__slider');

    const slides = slider.querySelectorAll('.offer__slide');
    const sliderWrapper = slider.querySelector('.offer__slider-wrapper');
    const widthSliderWrapper = window.getComputedStyle(sliderWrapper).width;
    const sliderInner = slider.querySelector('.offer__slider-inner');

    const currentSlide = slider.querySelector('#current');
    const totalSlides = slider.querySelector('#total');
    const sliderPrev = slider.querySelector('.offer__slider-prev');
    const sliderNext = slider.querySelector('.offer__slider-next');

    let slideIndex = 1;
    let offset = 0;

    currentSlide.textContent = getZero(slideIndex);
    totalSlides.textContent = getZero(slides.length);

    sliderInner.style.width = 100 * slides.length + '%';
    sliderInner.style.display = 'flex';
    sliderInner.style.transition = '0.5s all';
    sliderWrapper.style.overflow = 'hidden';

    slides.forEach((slide) => (slide.style.width = widthSliderWrapper));

    sliderNext.addEventListener('click', () => {
        if (offset == parseFloat(widthSliderWrapper) * (slides.length - 1)) {
            offset = 0;
            sliderInner.style.transition = '0.1s all';
        } else {
            offset += parseFloat(widthSliderWrapper);
            sliderInner.style.transition = '0.5s all';
        }

        sliderInner.style.transform = `translateX(-${offset}px)`;
        slideIndex = slideIndex == slides.length ? 1 : ++slideIndex;
        currentSlide.textContent = getZero(slideIndex);
        setActiveDot();
    });

    sliderPrev.addEventListener('click', () => {
        if (offset == 0) {
            offset = parseFloat(widthSliderWrapper) * (slides.length - 1);
            sliderInner.style.transition = '0.1s all';
        } else {
            offset -= parseFloat(widthSliderWrapper);
            sliderInner.style.transition = '0.5s all';
        }

        sliderInner.style.transform = `translateX(-${offset}px)`;
        slideIndex = slideIndex == 1 ? slides.length : --slideIndex;
        currentSlide.textContent = getZero(slideIndex);
        setActiveDot();
    });

    // carousel-dots
    // =========================================================

    const carouselDotsWrapper = document.createElement('ol');
    const carouselDots = [];
    carouselDotsWrapper.classList.add('carousel-indicators');

    slider.style.position = 'relative';
    slider.append(carouselDotsWrapper);

    for (let i = 0; i < slides.length; i++) {
        const dotCarousel = document.createElement('li');
        dotCarousel.setAttribute('data-slide-to', i + 1);
        dotCarousel.classList.add('dot');
        dotCarousel.style.opacity = i == 0 ? 1 : 0.5;

        carouselDotsWrapper.append(dotCarousel);
        carouselDots.push(dotCarousel);
    }

    function setActiveDot() {
        carouselDots.forEach((item) => (item.style.opacity = '0.5'));
        carouselDots[slideIndex - 1].style.opacity = '1';
    }

    carouselDotsWrapper.addEventListener('click', (evt) => {
        const target = evt.target;

        if (target && target.matches('[data-slide-to]')) {
            slideIndex = target.getAttribute('data-slide-to');
            offset = parseFloat(widthSliderWrapper) * (slideIndex - 1);

            sliderInner.style.transform = `translateX(-${offset}px)`;
            currentSlide.textContent = getZero(slideIndex);
            setActiveDot();
        }
    });
}

module.exports = slider;
