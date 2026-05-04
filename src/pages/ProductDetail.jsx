// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import './ProductDetail.css';
// import { useTranslation } from 'react-i18next';
//
// export default function ProductDetail() {
//     const { id } = useParams();
//     const navigate = useNavigate();
//     const [data, setData] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const API = process.env.REACT_APP_API_URL
//
//     const { t, i18n } = useTranslation();
//
//
//
//
//     useEffect(() => {
//         const lang = i18n.language || 'ru';
//         fetch(`${API}/product/details/${id}?lng=${lang}`, { mode: 'cors' })
//             .then(res => {
//                 if (!res.ok) throw new Error(`Ошибка ${res.status}`);
//                 return res.json();
//             })
//             .then(json => setData(json))
//             .catch(err => setError(err.message))
//             .finally(() => setLoading(false));
//     }, [id]);
//
//     if (loading) return <p className="pd-loading">Загрузка...</p>;
//     if (error) return <p className="pd-error">Ошибка: {error}</p>;
//
//     return (
//         <div className="product-detail">
//             <button className="back-btn" onClick={() => navigate(-1)}>← Назад</button>
//             <h1 className="title">{data.name}</h1>
//             <p className="subtitle">{data.regionName} · {data.categoryName}</p>
//
//             <section>
//                 <h2 className="section-title">Химический состав</h2>
//                 <table className="comp-table">
//                     <thead>
//                     <tr>
//                         <th>Вещество</th>
//                         {/*<th>Категория</th>*/}
//                         <th>Количество</th>
//                         <th>На 100грамм съедобной части</th>
//                     </tr>
//                     </thead>
//                     <tbody>
//                     {data.chemicalComposition.map(c => (
//                         <tr key={c.id}>
//                             <td>{c.compoundName}</td>
//                             {/*<td>{c.compoundCategory || '–'}</td> */}
//                             <td>{c.quantity}</td>
//                             <td>{c.unit}</td>
//                         </tr>
//                     ))}
//                     </tbody>
//                 </table>
//             </section>
//
//             <section>
//                 <h2 className="section-title">Минеральный состав</h2>
//                 <table className="comp-table">
//                     <thead>
//                     <tr>
//                         <th>Минерал</th>
//                         <th>Количество</th>
//                         <th>На 100грамм съедобной части</th>
//                     </tr>
//                     </thead>
//                     <tbody>
//                     {data.mineralComposition.map(m => (
//                         <tr key={m.id}>
//                             <td>{m.mineral}</td>
//                             <td>{m.quantity}</td>
//                             <td>{m.unit}</td>
//                         </tr>
//                     ))}
//                     </tbody>
//                 </table>
//             </section>
//         </div>
//     );
// }


import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ProductDetail.css';
import { useTranslation } from 'react-i18next';



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
    "фрукты": { en: "fruits", ru: "фрукты"},
    "ягоды и продукты их переработки (кроме соков)": { en: "berries and their processed products (except juices)", ru: "ягоды и продукты их переработки (кроме соков)"},
    "Овощи, фрукты, ягоды и продукты их переработки (кроме соков)": {
        en: "Vegetables, fruits, berries and their processed products (except juices)",
        ru: "Овощи, фрукты, ягоды и продукты их переработки (кроме соков)"
    },
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
    "Чуйская область": { en: "Chuy Region", ru: "Чуйская область" }
};

const mineralTranslations = {
    "Натрий": { en: "Sodium", ru: "Натрий" },
    "Калий": { en: "Potassium", ru: "Калий" },
    "Фосфор": { en: "Phosphorus", ru: "Фосфор" },
    "Марганец": { en: "Manganese", ru: "Марганец" },
    "Цинк": { en: "Zinc", ru: "Цинк" },
    "Скандий": { en: "Scandium", ru: "Скандий" },
    "Медь": { en: "Copper", ru: "Медь" },
    "Железо": { en: "Iron", ru: "Железо" },
    "Йод": { en: "Iodine", ru: "Йод" },
    "Бор": { en: "Boron", ru: "Бор" },
    "Литий": { en: "Lithium", ru: "Литий" },
    "Алюминий": { en: "Aluminium", ru: "Алюминий" },
    "Магний": { en: "Magnesium", ru: "Магний" },
    "Ванадий": { en: "Vanadium", ru: "Ванадий" },
    "Нитрий": { en: "Nitrate", ru: "Нитрий" },
    "Ковальт": { en: "Cobalt", ru: "Ковальт" },
    "Хром": { en: "Chromium", ru: "Хром" },
    "Олово": { en: "Tin", ru: "Олово" },
    "Кальций": { en: "Calcium", ru: "Кальций" },
    "Барий": { en: "Barium", ru: "Барий" },
};


const nutrientTranslations = {
    "Энергетическая ценность": { en: "Energy Value", ru: "Энергетическая ценность" },
    "Влажность": { en: "Moisture", ru: "Влажность" },
    "Белок": { en: "Protein", ru: "Белок" },
    "Жир": { en: "Fat", ru: "Жир" },
    "Зольность": { en: "Ash Content", ru: "Зольность" },
    "Углеводы": { en: "Carbohydrates", ru: "Углеводы" }
};
export default function ProductDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const API = process.env.REACT_APP_API_URL;

    const { t, i18n } = useTranslation();

    useEffect(() => {
        const lang = i18n.language || 'ru';
        fetch(`${API}/product/details/${id}?lng=${lang}`, { mode: 'cors' })
            .then(res => {
                if (!res.ok) throw new Error(`${t('error')} ${res.status}`);
                return res.json();
            })
            .then(json => setData(json))
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    }, [id, i18n.language, t]);

    if (loading) return <p className="pd-loading">{t('loading')}</p>;
    if (error) return <p className="pd-error">{t('error_message', { error })}</p>;

    const lang = i18n.language || 'ru';

    return (
        <div className="product-detail">
            <button className="back-btn" onClick={() => navigate(-1)}>
                ← {t('back')}
            </button>

            <h1 className="title">{data.name}</h1>
            <p className="subtitle">
                {regionTranslations[data.regionName]?.[lang] || data.regionName} · {categoryTranslations[data.categoryName]?.[lang] || data.categoryName}
            </p>

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
                    {data.chemicalComposition?.map(c => (
                        <tr key={c.id}>
                            {/* Переводим compoundName с использованием nutrientTranslations */}
                            <td>{nutrientTranslations[c.compoundName]?.[lang] || c.compoundName}</td>
                            <td>{c.quantity}</td>
                            <td>{c.unit}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </section>

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
                    {data.mineralComposition?.map(m => (
                        <tr key={m.id}>
                            <td>{mineralTranslations[m.mineral]?.[lang] || m.mineral}</td>
                            <td>{m.quantity}</td>
                            <td>{m.unit}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </section>

            {data.nutritionalComposition && (
                <section>
                    <h2 className="section-title">{t('nutritional_composition')}</h2>
                    <table className="comp-table">
                        <thead>
                        <tr>
                            <th>{t('nutrient')}</th>
                            <th>{t('quantity')}</th>
                            <th>{t('per_100g')}</th>
                        </tr>
                        </thead>
                        <tbody>
                        {data.nutritionalComposition.map(n => (
                            <tr key={n.id}>
                                <td>{nutrientTranslations[n.nutrient]?.[lang] || n.nutrient}</td>
                                <td>{n.quantity}</td>
                                <td>{n.unit}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </section>
            )}
        </div>
    );
}