import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './RecipePage.css';

export default function RecipePage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { t } = useTranslation();

    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const API = process.env.REACT_APP_API_URL;

    useEffect(() => {
        setLoading(true);
        setError(null);

        fetch(`${API}/recipe/${id}`, { mode: 'cors' })
            .then(res => {
                if (!res.ok) throw new Error(`${t('error')} ${res.status}`);
                return res.json();
            })
            .then(json => {
                // ИСПРАВЛЕНИЕ: Если API возвращает массив [ {...} ], берем первый элемент
                // Если API сразу возвращает объект, берем его как есть
                const recipeObject = Array.isArray(json) ? json[0] : json;

                console.log('Обработанные данные рецепта:', recipeObject);
                setData(recipeObject);
            })
            .catch(err => {
                console.error('Ошибка при загрузке:', err);
                setError(err.message);
            })
            .finally(() => setLoading(false));
    }, [id, API, t]);

    // 1. Состояние загрузки
    if (loading) {
        return (
            <div className="recipe-page">
                <p className="loading-message">{t('loading')}...</p>
            </div>
        );
    }

    // 2. Состояние ошибки
    if (error) {
        return (
            <div className="recipe-page">
                <button className="back-btn" onClick={() => navigate(-1)}>← {t('back')}</button>
                <p className="error-message">{t('error_message', { error })}</p>
            </div>
        );
    }

    // 3. Если данных нет (рецепт не найден)
    if (!data) {
        return (
            <div className="recipe-page">
                <button className="back-btn" onClick={() => navigate(-1)}>← {t('back')}</button>
                <p className="error-message">{t('recipe_not_found')}</p>
            </div>
        );
    }

    return (
        <div className="recipe-page">
            <button className="back-btn" onClick={() => navigate(-1)}>
                ← {t('back')}
            </button>

            <h1 className="recipe-top-label" style={{ textAlign: 'center' }}>
                {t('Рецептура')}
            </h1>

            <h2 className="recipe-title">{data.dishName || t('no_name')}</h2>

            <section className="recipe-section">
                <table className="recipe-table">
                    <thead>
                    <tr>
                        <th>{t('Ингредиенты')}</th>
                        <th>{t('quantity')}</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.ingredients?.length > 0 ? (
                        data.ingredients.map((ing, index) => (
                            <tr key={index}>
                                <td>{ing.item || ing.ingredientName}</td>
                                <td>
                                    {Number(ing.quantity) === 0
                                        ? t('по вкусу')
                                        : `${ing.quantity} ${ing.unit || ''}`
                                    }
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="2" style={{ textAlign: 'center' }}>
                                {t('no_ingredients_found')}
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </section>
        </div>
    );
}