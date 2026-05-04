/*
// src/pages/AuthPage.jsx
import React, { useState } from 'react';
import './AuthPage.css';

function AuthPage() {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <div className="auth-page">
            <div className="auth-container">
                <div className="auth-tabs">
                    <button
                        className={`auth-tab ${isLogin ? 'active' : ''}`}
                        onClick={() => setIsLogin(true)}
                    >
                        Войти
                    </button>
                    <button
                        className={`auth-tab ${!isLogin ? 'active' : ''}`}
                        onClick={() => setIsLogin(false)}
                    >
                        Регистрация
                    </button>
                </div>

                {isLogin ? (
                    <form className="auth-form login-form">
                        <h2>Войти</h2>
                        <input type="email" placeholder="Email" required />
                        <input type="password" placeholder="Пароль" required />
                        <button type="submit">Войти</button>
                    </form>
                ) : (
                    <form className="auth-form register-form">
                        <h2>Регистрация</h2>
                        <input type="text" placeholder="Имя" required />
                        <input type="email" placeholder="Email" required />
                        <input type="password" placeholder="Пароль" required />
                        <input type="password" placeholder="Повторите пароль" required />
                        <button type="submit">Зарегистрироваться</button>
                    </form>
                )}
            </div>
        </div>
    );
}

export default AuthPage;
*/


// src/pages/AuthPage.jsx
import React, { useState } from 'react';
import './AuthPage.css';
// Предположим, что фото авокадо лежит в папке src/assets или public/images
// Если лежит в public/images/avokado.png, можно обращаться к /images/avokado.png
// Или импортировать из src/assets:
import AvocadoImage from '../pages/Avokado.png';

function AuthPage() {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <div className="auth-page">
            {/* Левая колонка с авокадо */}
            <div className="auth-left">
                {/* Вариант 1: просто фон
            <div className="avocado-bg"></div>
        */}

                {/* Вариант 2: обычный <img> */}
                <img src={AvocadoImage} alt="Avocado" />
            </div>

            {/* Правая колонка с формой */}
            <div className="auth-right">
                <div className="auth-container">
                    <div className="auth-tabs">
                        <button
                            className={`auth-tab ${isLogin ? 'active' : ''}`}
                            onClick={() => setIsLogin(true)}
                        >
                            Войти
                        </button>
                        <button
                            className={`auth-tab ${!isLogin ? 'active' : ''}`}
                            onClick={() => setIsLogin(false)}
                        >
                            Регистрация
                        </button>
                    </div>

                    {isLogin ? (
                        <form className="auth-form login-form">
                            <h2>Войти</h2>
                            <input type="email" placeholder="Email" required />
                            <input type="password" placeholder="Пароль" required />
                            <button type="submit">Войти</button>
                        </form>
                    ) : (
                        <form className="auth-form register-form">
                            <h2>Регистрация</h2>
                            <input type="text" placeholder="Имя" required />
                            <input type="email" placeholder="Email" required />
                            <input type="password" placeholder="Пароль" required />
                            <input type="password" placeholder="Повторите пароль" required />
                            <button type="submit">Зарегистрироваться</button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}

export default AuthPage;

