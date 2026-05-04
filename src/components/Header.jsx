/*
// src/components/Header.jsx
import React from 'react';
import './Header.css'; // стили для шапки

import emblem1 from '../rus.png'
import emblem2 from '../minselhoz-logo.svg'




function Header() {
    return (
        <header className="header">
            <div className={"container header-container"}>
                <nav className="nav">
                    <div className="logo-with-emblems">
                        <img src={emblem1} alt="Герб учреждения 1" className="emblem"/>
                        <img src={emblem2} alt="Герб учреждения 2" className="emblem"/>
                        <div className="logo">AFACI</div>
                    </div>

                    <ul className="nav-links">
                        <li><a href="/">Главная</a></li>
                        <li><a href="/products">Продукты по регионам</a></li>
                        <li><a href="/national">Национальные блюда</a></li>
                        <li><a href="#about">О нас</a></li>
                        {/!*<li><a href="/productDetail">Product Detail Test</a></li>*!/}
                    </ul>
                    <div className="auth">
                        <a href="/auth" className="login">Войти</a>
                    </div>
                </nav>
            </div>
        </header>
    );
}
export default Header;*/
// src/components/Header.jsx
import React from 'react';
import './Header.css';
import emblem1 from '../kg.png';
import emblem2 from '../minselhoz-logo.svg';
import { useTranslation } from 'react-i18next';

function Header() {
    const { t, i18n } = useTranslation();
    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);

    };
    return (
        <header className="header">
            <div className="header-container">
                {/* ЛЕВО — логотипы */}
                <div className="header-left">
                    <img src={emblem1} alt="Герб 1" className="emblem" />
                    <img src={emblem2} alt="Герб 2" className="emblem" />
                    <div className="logo">AFACI</div>
                </div>

                {/* ЦЕНТР — навигация */}
                <ul className="nav-links">
                    <li><a href="/">{t('header.nav1')}</a></li>
                    <li><a href="/products">{t('header.nav2')}</a></li>
                    <li><a href="/national">{t('header.nav3')}</a></li>
                    <li><a href="/about">{t('header.nav4')}</a></li>
                </ul>

                {/* ПРАВО — переключатель языков и кнопка Войти */}
                <div className="header-right">
                    <div className="lang-switcher">
                        <button className="lang-toggle">🌐</button>
                        <div className="lang-dropdown">
                            <button onClick={() => changeLanguage('ru')}>🇷🇺 Русский</button>
                            <button onClick={() => changeLanguage('en')}>🇬🇧 English</button>
                        </div>
                    </div>
                    <a href="/auth" className="login">{t('auth.nav1')}</a>
                </div>
            </div>
        </header>

    );
}
export default Header;
