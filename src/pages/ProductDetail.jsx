import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ProductDetail.css';
import { useTranslation } from 'react-i18next';

// --- СЛОВАРИ ПЕРЕВОДОВ ---

const categoryTranslations = {
    "Готовые продукты": { en: "Ready-made products", ru: "Готовые продукты" },
    "Готовый продукт": { en: "Ready product", ru: "Готовый продукт" },
    "Грибы": { en: "Mushrooms", ru: "Грибы" },
    "Зерновые": { en: "Cereals", ru: "Зерновые" },
    "Крахмалосодержащие": { en: "Starchy foods", ru: "Крахмалосодержащие" },
    "Масло": { en: "Oil", ru: "Масло" },
    "Мед": { en: "Honey", ru: "Мед" },
    "Молочный": { en: "Dairy", ru: "Молочный" },
    "Мука": { en: "Flour", ru: "Мука" },
    "Мясной": { en: "Meat", ru: "Мясной" },
    "Напитки": { en: "Drinks", ru: "Напитки" },
    "Напиток": { en: "Drink", ru: "Напиток" },
    "Овощи": { en: "Vegetables", ru: "Овощи" },
    "фрукты": { en: "fruits", ru: "фрукты" },
    "ягоды и продукты их переработки (кроме соков)": { en: "berries and their processed products (except juices)", ru: "ягоды и продукты их переработки (кроме соков)" },
    "Овощи, фрукты, ягоды и продукты их переработки (кроме соков)": { en: "Vegetables, fruits, berries and their processed products (except juices)", ru: "Овощи, фрукты, ягоды и продукты их переработки (кроме соков)" },
    "Орехи": { en: "Nuts", ru: "Орехи" },
    "Рыба": { en: "Fish", ru: "Рыба" },
    "Сахаросодержащий": { en: "Sugar-containing", ru: "Сахаросодержащий" },
    "Сыпучий пищевой продукт": { en: "Bulk food product", ru: "Сыпучий пищевой продукт" },
    "Фасоль": { en: "Beans", ru: "Фасоль" },
    "Фрукты": { en: "Fruits", ru: "Фрукты" },
    "Яйца": { en: "Eggs", ru: "Яйца" }
};

const regionTranslations = {
    "Джалал-Абадская область": { en: "Jalal-Abad Region", ru: "Джалал-Абадская область" },
    "Иссык-Кульская область": { en: "Issyk-Kul Region", ru: "Иссык-Кульская область" },
    "Кыргызстан": { en: "Kyrgyzstan", ru: "Кыргызстан" },
    "Нарынская область": { en: "Naryn Region", ru: "Нарынская область" },
    "Ошская область": { en: "Osh Region", ru: "Ошская область" },
    "Таласская область": { en: "Talas Region", ru: "Таласская область" },
    "Чуйская область": { en: "Chuy Region", ru: "Чуйская область" },
    "Баткенская область": { en: "Batken Region", ru: "Баткенская область"}
};

const nutrientTranslations = {
    "Энерг. ценность": { en: "Energy Value", ru: "Энерг. ценность" },
    "Влажность": { en: "Moisture", ru: "Влажность" },
    "Белок": { en: "Protein", ru: "Белок" },
    "Жир": { en: "Fat", ru: "Жир" },
    "Зольность": { en: "Ash Content", ru: "Зольность" },
    "Углеводы": { en: "Carbohydrates", ru: "Углеводы" }
};

const mineralTranslations = {
    "Натрий": { en: "Sodium", ru: "Натрий" },
    "Калий": { en: "Potassium", ru: "Калий" },
    "Фосфор": { en: "Phosphorus", ru: "Фосфор" },
    "Железо": { en: "Iron", ru: "Железо" },
    "Кальций": { en: "Calcium", ru: "Кальций" },
    "Магний": { en: "Magnesium", ru: "Магний" }
};

const vitaminTranslations = {
    "Витамин А": { en: "Vitamin A", ru: "Витамин А" },
    "Витамин В1": { en: "Vitamin B1", ru: "Витамин В1" },
    "Витамин В2": { en: "Vitamin B2", ru: "Витамин В2" },
    "Витамин С": { en: "Vitamin C", ru: "Витамин С" }
};

const fattyAcidTranslations = {
    "Насыщенные ЖК": { en: "Saturated Fatty Acids", ru: "Насыщенные ЖК" },
    "Мононенасыщенные ЖК": { en: "Monounsaturated Fatty Acids", ru: "Мононенасыщенные ЖК" },
    "Полиненасыщенные ЖК": { en: "Polyunsaturated Fatty Acids", ru: "Полиненасыщенные ЖК" },
    "Капроновая": { en: "Caproic", ru: "Капроновая" },
    "Лауриновая": { en: "Lauric", ru: "Лауриновая" },
    "Миристиновая": { en: "Myristic", ru: "Миристиновая" },
    "Пальмитиновая": { en: "Palmitic", ru: "Пальмитиновая" },
    "Стеариновая": { en: "Stearic", ru: "Стеариновая" },
    "Олеиновая": { en: "Oleic", ru: "Олеиновая" },
    "Линолевая": { en: "Linoleic", ru: "Линолевая" },
    "Линоленовая": { en: "Linolenic", ru: "Линоленовая" }
};

// --- ОСНОВНОЙ КОМПОНЕНТ ---

export default function ProductDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const API = process.env.REACT_APP_API_URL;

    const { t, i18n } = useTranslation();
    const lang = i18n.language || 'ru';

    useEffect(() => {
        const currentLang = i18n.language || 'ru';
        const fetchDetail = fetch(`${API}/product/details/${id}?lng=${currentLang}`).then(res => res.json());
        const fetchRecipe = fetch(`${API}/recipe/${id}`).then(res => res.json());

        Promise.all([fetchDetail, fetchRecipe])
            .then(([detailData, recipeData]) => {

                console.log('Данные из API получены:');
                console.log('Детали продукта (detailData):', detailData);

                setData({ detail: detailData, recipe: recipeData });
            })
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    }, [id, i18n.language, API]);

    if (loading) return <p className="pd-loading">{t('loading')}</p>;
    if (error) return <p className="pd-error">{t('error_message', { error })}</p>;

    const { detail, recipe } = data;

    return (
        <div className="product-detail">
            <button className="back-btn" onClick={() => navigate(-1)}>
                ← {t('back')}
            </button>

            <div className="title-container">
                <h1 className="title">{detail.name}</h1>
                {recipe.ingredients && recipe.ingredients.length > 0 && (
                    <button className="recipe-btn" onClick={() => navigate(`/recipe/${id}`)}>
                        {t('Посмотреть рецептуру')}
                    </button>
                )}
            </div>

            <p className="subtitle">
                {regionTranslations[detail.regionName]?.[lang] || detail.regionName} · {categoryTranslations[detail.categoryName]?.[lang] || detail.categoryName}
            </p>

            {detail.chemicalComposition?.length > 0 && (
                <section>
                    <h2 className="section-title">{t('chemical_composition')}</h2>
                    <table className="comp-table">
                        <thead>
                        <tr>
                            <th>{t('substance')}</th>
                            <th>{t('quantity')}</th>
                            <th>{t('per_100g')}</th>
                        </tr>
                        </thead>
                        <tbody>
                        {detail.chemicalComposition.map(c => (
                            <tr key={c.id}>
                                <td>{nutrientTranslations[c.compoundName]?.[lang] || c.compoundName}</td>
                                <td>{c.error !== 0 && c.error != null? `${c.quantity} ± ${c.error}` : c.quantity}</td>
                                <td>{c.unit}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </section>
            )}

            {/* МИНЕРАЛЬНЫЙ СОСТАВ */}
            {detail.mineralComposition?.length > 0 && (
                <section>
                    <h2 className="section-title">{t('mineral_composition')}</h2>
                    <table className="comp-table">
                        <thead>
                        <tr>
                            <th>{t('mineral')}</th>
                            <th>{t('quantity')}</th>
                            <th>{t('per_100g')}</th>
                        </tr>
                        </thead>
                        <tbody>
                        {detail.mineralComposition.map(m => (
                            <tr key={m.id}>
                                <td>{mineralTranslations[m.mineral]?.[lang] || m.mineral}</td>
                                <td>{m.error !== 0 && m.error != null? `${m.quantity} ± ${m.error}` : m.quantity}</td>
                                <td>{m.unit}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </section>
            )}

            {/* ВИТАМИНЫ (НОВЫЙ БЛОК) */}
            {detail.vitaminComposition?.length > 0 && (
                <section>
                    <h2 className="section-title">{t('vitamin_composition')}</h2>
                    <table className="comp-table">
                        <thead>
                        <tr>
                            <th>{t('vitamin')}</th>
                            <th>{t('quantity')}</th>
                            <th>{t('per_100g')}</th>
                        </tr>
                        </thead>
                        <tbody>
                        {detail.vitaminComposition.map(v => (
                            <tr key={v.id}>
                                <td>{vitaminTranslations[v.vitaminName]?.[lang] || v.vitaminName}</td>
                                <td>{v.error !== 0 && v.error != null? `${v.quantity} ± ${v.error}` : v.quantity}</td>
                                <td>{v.unit || 'мг'}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </section>
            )}

            {/* АМИНОКИСЛОТЫ (НОВЫЙ БЛОК) */}
            {detail.aminoAcidComposition?.length > 0 && (
                <section>
                    <h2 className="section-title">{t('amino_acid_composition')}</h2>
                    <table className="comp-table">
                        <thead>
                        <tr>
                            <th>{t('amino_acid')}</th>
                            <th>{t('quantity')}</th>
                            <th>{t('per_100g')}</th>
                        </tr>
                        </thead>
                        <tbody>
                        {detail.aminoAcidComposition.map(a => (
                            <tr key={a.id}>
                                <td>{a.aminoAcidName}</td>
                                <td>{a.error !== 0 && a.error != null? `${a.quantity} ± ${a.error}` : a.quantity}</td>
                                <td>{a.unit}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </section>
            )}

            {/* ЖИРНЫЕ КИСЛОТЫ (НОВЫЙ БЛОК) */}
            {detail.fattyAcidComposition?.length > 0 && (
                <section>
                    <h2 className="section-title">{t('fatty_acid_composition')}</h2>
                    <table className="comp-table">
                        <thead>
                        <tr>
                            <th>{t('fatty_acid')}</th>
                            <th>{t('type')}</th>
                            <th>{t('quantity')}</th>
                        </tr>
                        </thead>
                        <tbody>
                        {detail.fattyAcidComposition.map(f => (
                            <tr key={f.id}>
                                <td>{fattyAcidTranslations[f.fattyAcidName]?.[lang] || f.fattyAcidName}</td>
                                <td>{fattyAcidTranslations[f.typeOfFattyAcid]?.[lang] || f.typeOfFattyAcid}</td>
                                <td>{f.quantity} %</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </section>
            )}

            {detail.fattyAcidMethylEsterRatios?.length > 0 && (
                <section>
                    <h2 className="section-title">{t('fattyAcidMethylEsterRatios')}</h2>
                    <table className="comp-table">
                        <thead>
                        <tr>
                            <th>{t('ratio')}</th>
                            <th>{t('quantity')}</th>
                            <th>{t('per_100g')}</th>
                        </tr>
                        </thead>
                        <tbody>
                        {detail.fattyAcidMethylEsterRatios.map(far => (
                            <tr key={far.id}>
                                <td>{far.ratioName}</td>
                                <td>{far.quantity}</td>
                                <td>{far.unit}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </section>
            )}
        </div>
    );
}