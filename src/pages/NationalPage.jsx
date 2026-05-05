// src/pages/NationalPage.jsx
import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import './NationalPage.css';
import ImageSlider from '../components/ImageSlider';

import defaultImg from './OIP.jpeg';
import {useTranslation} from 'react-i18next';

export default function NationalPage() {
    const navigate = useNavigate();
    const [dishes, setDishes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const API = process.env.REACT_APP_API_URL;

    //Перевод
    const {t, i18n} = useTranslation();

    //Загрузка при старте
    useEffect(() => {
        const lang = i18n.language || 'ru';
        fetch(`${API}/product/national?lng=${lang}`, {mode: 'cors'})
            .then(res => {
                if (!res.ok) throw new Error(`Ошибка: ${res.status}`);
                return res.json();
            })
            .then(data => setDishes(data))
            .catch(err => setError(err))
            .finally(() => setLoading(false));
    }, [i18n.language]);

    if (loading) return <div className="np-loading">Загрузка...</div>;
    if (error) return <div className="np-error">Возникла непредвиденная ошибка</div>;

    return (
        <div className="national-page">
            <h1 className="page-title">{t('NatioanalBitText')}</h1>
            <div className="dishes-grid">
                {dishes.map(item => (
                    <div
                        key={item.id}
                        className="dish-card"
                        onClick={() => navigate(`/products/${item.id}`)}
                    >
                        <div className="card-image">
                            {item.photoUrls && item.photoUrls.length > 0
                                ? <ImageSlider urls={item.photoUrls} height={200}/>
                                : <img src={defaultImg} alt={item.name} className="dish-photo"/>
                            }
                        </div>
                        <div className="card-content">
                            <h2 className="dish-name">{item.name}</h2>
                            <p className="dish-info">
                                {t('Сategory')}: {t(`categories.${item.categories}`)}
                            </p>
                            <p className="dish-info">
                                {t('Region')}: {t(`regions.${item.region}`)}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
