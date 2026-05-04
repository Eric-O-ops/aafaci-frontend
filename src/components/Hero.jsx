import React, { useEffect, useRef, useState } from 'react';
import './Hero.css';
import { useTranslation } from 'react-i18next';
function Hero() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isSwiping, setIsSwiping]     = useState(false);
    const [startX, setStartX]           = useState(0);
    const timerRef                      = useRef(null);
    const { t, i18n } = useTranslation();

    // const slides = [
    //     {
    //         smallText: "База данных",
    //         bigText1: "Продуктов питания",
    //         bigText2: "Кыргызской Республики"
    //     },
    //     {
    //         smallText: "Министерство",
    //         bigText1: "Водных ресурсов, сельского хозяйства " +
    //             "и перерабатывающей промышленности",
    //         bigText2: "Кыргызской Республики"
    //     },
    // ];
    const slides = [
        {
            smallTextKey: "slides.slide1.smallText",
            bigText1Key: "slides.slide1.bigText1",
            bigText2Key: "slides.slide1.bigText2"
        },
        {
            smallTextKey: "slides.slide2.smallText",
            bigText1Key: "slides.slide2.bigText1",
            bigText2Key: "slides.slide2.bigText2"
        }
    ];

    // Автопрокрутка
    const startTimer = () => {
        timerRef.current = setInterval(() => goToNext(), 5000);
    };
    const resetTimer = () => {
        clearInterval(timerRef.current);
        startTimer();
    };

    const goToPrev = () => {
        setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length);
        resetTimer();
    };
    const goToNext = () => {
        setCurrentSlide(prev => (prev + 1) % slides.length);
        resetTimer();
    };

    // Свайпы
    const handleTouchStart = (e) => {
        setIsSwiping(true);
        setStartX(e.touches[0].clientX);
    };
    const handleTouchMove = (e) => {
        if (!isSwiping) return;
        const diff = startX - e.touches[0].clientX;
        if (Math.abs(diff) > 50) {
            diff > 0 ? goToNext() : goToPrev();
            setIsSwiping(false);
        }
    };
    const handleTouchEnd = () => setIsSwiping(false);

    // По клику на зоны
    const handleClick = (e) => {
        const x = e.nativeEvent.offsetX;
        if (x < e.currentTarget.clientWidth / 2) goToPrev();
        else goToNext();
    };

    useEffect(() => {
        startTimer();
        return () => clearInterval(timerRef.current);
    }, []);

    return (
        <section
            className="hero"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            {/* Кликабельный overlay */}
            <div className="nav-overlay nav-overlay--left" onClick={goToPrev} />
            <div className="nav-overlay nav-overlay--right" onClick={goToNext} />

            <div className="carousel" onClick={handleClick}>
                <div
                    className="slides-container"
                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                    {slides.map((slide, idx) => (
                        <div
                            key={idx}
                            className={`slide ${idx === currentSlide ? 'active' : ''}`}
                        >
                            <h1>
                                <span className="small-text">{t(slide.smallTextKey)}</span><br />
                                <span className="big-text">{t(slide.bigText1Key)}</span><br />
                                <span className="big-text">{t(slide.bigText2Key)}</span>
                            </h1>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Hero;