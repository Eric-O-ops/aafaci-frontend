/*
// src/pages/ProductsPage.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProductsPage.css';
import { useTranslation } from 'react-i18next';


export default function ProductsPage() {
    const navigate = useNavigate();

    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedRegion, setSelectedRegion] = useState('');

    const [categoriesList, setCategoriesList] = useState([]);
    const [regionsList, setRegionsList] = useState([]);

    const ITEMS_PER_PAGE = 10;
    const API = process.env.REACT_APP_API_URL


    //Перевод
    const { t, i18n } = useTranslation();
    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        setProducts([]);
        setPage(0);
    };
    // Загрузка списков категорий и регионов

    useEffect( () => {
        fetch(`${API}/product/getCategoryList`, { mode: 'cors' })
            .then(res => res.ok ? res.json() : [])
            .then(setCategoriesList)
            .catch(() => setCategoriesList([]));
        fetch(`${API}/product/getRegionsList`, { mode: 'cors' })
            .then(res => res.ok ? res.json() : [])
            .then(setRegionsList)
            .catch(() => setRegionsList([]));
    }, []);

    // Базовый запрос страницы
    const loadPage = useCallback(() => {
        setLoading(true);
        setError(null);

        const lang = i18n.language || 'ru'; //fallback на РУ

        fetch(`${API}/product?page=${page}&size=${ITEMS_PER_PAGE}&lng=${lang}`, { mode: 'cors' })
            .then(res => {
                if (!res.ok) throw new Error(res.status);
                return res.json();
            })
            .then(({ content, totalPages }) => {
                setProducts(prev => page === 1 ? content : [...prev, ...content]);
                setTotalPages(totalPages);
            })
            .catch(err => setError(err))
            .finally(() => setLoading(false));
    }, [page, i18n.language]);

    // Поиск без пагинации
    const doSearch = useCallback(() => {
        if (!searchTerm) return;
        setLoading(true);

        const lang = i18n.language || 'ru';
        fetch(`${API}/product/search?name=${encodeURIComponent(searchTerm)}&lng=${lang}`, { mode: 'cors' })
            .then(res => res.json())
            .then(list => setProducts(list))
            .catch(err => setError(err))
            .finally(() => setLoading(false));
    }, [searchTerm]);

    // Фильтрация по категории без пагинации
    const doFilterCategory = useCallback(() => {
        if (!selectedCategory) return;
        setLoading(true);

        const lang = i18n.language || 'ru';
        fetch(`${API}/product/searchcategory?id=${encodeURIComponent(selectedCategory)}&lng=${lang}`, { mode: 'cors' })
            .then(res => res.json())
            // .then(list => setProducts(list))
            .then(data => {
                const list = Array.isArray(data) ? data : (data.content || []);
                setProducts(list);
                setTotalPages(data.totalPages || 1);
            })
            .catch(err => setError(err))
            .finally(() => setLoading(false));
    }, [selectedCategory]);

    /!*!// Фильтрация по региону без пагинации
    const doFilterRegion = useCallback(() => {
        if (!selectedRegion) return;
        setLoading(true);
        fetch(`http://localhost:9876/api/product/searchregion?id=${encodeURIComponent(selectedRegion)}`, { mode: 'cors' })
            .then(res => res.json())
            .then(list => setProducts(list))
            .catch(err => setError(err))
            .finally(() => setLoading(false));
    }, [selectedRegion]);*!/
    // Фильтрация по региону без пагинации
    // Фильтрация по региону без пагинации
    const doFilterRegion = useCallback(() => {
        if (!selectedRegion) return;
        setLoading(true);
        setError(null);
        const lang = i18n.language || 'ru';
        fetch(
            `${API}/product/searchregion?id=${encodeURIComponent(
                selectedRegion
            )}&lang=${lang}`,
            { mode: 'cors' }
        )
            .then(res => {
                if (!res.ok) throw new Error(`Ошибка: ${res.status}`);
                return res.json();
            })
            .then(data => {
                // Ожидаем массив результатов
                const list = Array.isArray(data) ? data : (data.content || []);
                setProducts(list);
                setTotalPages(data.totalPages || 1);
            })
            .catch(err => setError(err))
            .finally(() => setLoading(false));
    }, [selectedRegion]);

    useEffect(() => {
        setProducts([]);
        setPage(1);
    }, [i18n.language]);

    // При изменении page/search/category/region
    useEffect(() => {
        if (searchTerm) {
            doSearch();
        } else if (selectedCategory) {
            doFilterCategory();
        } else if (selectedRegion) {
            doFilterRegion();
        } else {
            loadPage();
        }
    }, [page, searchTerm, selectedCategory, selectedRegion, loadPage, doSearch, doFilterCategory, doFilterRegion]);

    // Infinite scroll только без поиска и фильтров
    useEffect(() => {
        if (searchTerm || selectedCategory || selectedRegion) return;
        const onScroll = () => {
            if (loading || page >= totalPages) return;
            if (window.innerHeight + window.scrollY >= document.documentElement.offsetHeight - 100) {
                setPage(prev => prev + 1);
            }
        };
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, [loading, page, totalPages, searchTerm, selectedCategory, selectedRegion]);

    if (error) return <div className="error">Ошибка: {error.message}</div>;

    return (

        <div className="products-page">
            {/!* Поиск и фильтры *!/}
            <div className="filter-bar">
                <input
                    type="text"
                    className="search-input"
                    placeholder={t('search.placeholder')}
                    value={searchTerm}
                    onChange={e => {
                        setSearchTerm(e.target.value);
                        setSelectedCategory('');
                        setSelectedRegion('');
                        setPage(1);
                    }}
                />
                <div className="select-group">
                    {/!* Фильтр по категории *!/}
                    <select
                        value={selectedCategory}
                        onChange={e => {
                            setSelectedCategory(e.target.value);
                            setSearchTerm('');
                            setSelectedRegion('');
                            setPage(1);
                        }}
                    >
                        <option value="">-------</option>
                        {categoriesList.map(c => (
                            <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                    </select>
                    {/!* Фильтр по региону *!/}
                    <select
                        value={selectedRegion}
                        onChange={e => {
                            setSelectedRegion(e.target.value);
                            setSearchTerm('');
                            setSelectedCategory('');
                            setPage(1);
                        }}
                    >
                        <option value="">-------</option>
                        {regionsList.map(r => (
                            <option key={r.id} value={r.id}>{r.name}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/!* Список продуктов *!/}
            <div className="products-list">
                <table>
                    <thead>
                    <tr>
                        <th>{t('table.name')}</th>
                        <th>{t('table.category')}</th>
                        <th>{t('table.region')}</th>
                        {/!*<th>Дата добавления</th>*!/}
                    </tr>
                    </thead>
                    <tbody>
                    {products.map(p => (
                        <tr
                            key={p.id}
                            onClick={() => navigate(`/products/${p.id}`)}
                            style={{ cursor: 'pointer' }}
                        >
                            <td>{p.name}</td>
                            <td>{p.categories || '-'}</td>
                            <td>{p.region || '-'}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                {!loading && products.length === 0 && <p>Продукты не найдены.</p>}
            </div>

            {/!* Индикатор загрузки *!/}
            <div className="infinite-footer">
                {loading && <p>Загрузка ещё...</p>}
                {!loading && page >= totalPages && <p>Больше нет данных</p>}
            </div>
        </div>
    );
}
*/

import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProductsPage.css';
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

export default function ProductsPage() {
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();

    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedRegion, setSelectedRegion] = useState('');

    const [categoriesList, setCategoriesList] = useState([]);
    const [regionsList, setRegionsList] = useState([]);

    const ITEMS_PER_PAGE = 10;
    const API = process.env.REACT_APP_API_URL;

    // Загрузка категорий и регионов с переводами
    useEffect(() => {
        fetch(`${API}/product/getCategoryList`, { mode: 'cors' })
            .then(res => res.ok ? res.json() : [])
            .then(categories => {
                const translatedCategories = categories.map(c => ({
                    ...c,
                    name: categoryTranslations[c.name]?.[i18n.language] || c.name
                }));
                setCategoriesList(translatedCategories);
            })
            .catch(() => setCategoriesList([]));

        fetch(`${API}/product/getRegionsList`, { mode: 'cors' })
            .then(res => res.ok ? res.json() : [])
            .then(regions => {
                const translatedRegions = regions.map(r => ({
                    ...r,
                    name: regionTranslations[r.name]?.[i18n.language] || r.name
                }));
                setRegionsList(translatedRegions);
            })
            .catch(() => setRegionsList([]));
    }, [i18n.language]);

    // Базовый запрос для страницы
    const loadPage = useCallback(() => {
        setLoading(true);
        setError(null);

        const lang = i18n.language || 'ru';

        fetch(`${API}/product?page=${page}&size=${ITEMS_PER_PAGE}&lng=${lang}`, { mode: 'cors' })
            .then(res => {
                if (!res.ok) throw new Error(res.status);
                return res.json();
            })
            .then(({ content, totalPages }) => {
                const translatedProducts = content.map(p => ({
                    ...p,
                    name: p.name,
                    categories: typeof p.categories === 'string'
                        ? p.categories.split(',').map(category => categoryTranslations[category.trim()]?.[lang] || category.trim()) // Преобразуем строку в массив и переводим
                        : p.categories,
                    region: regionTranslations[p.region]?.[lang] || p.region
                }));
                setProducts(prev => page === 1 ? translatedProducts : [...prev, ...translatedProducts]);
                setTotalPages(totalPages);
            })
            .catch(err => setError(err))
            .finally(() => setLoading(false));
    }, [page, i18n.language]);

    // Поиск без пагинации
    const doSearch = useCallback(() => {
        if (!searchTerm) return;
        setLoading(true);

        const lang = i18n.language || 'ru';
        fetch(`${API}/product/search?name=${encodeURIComponent(searchTerm)}&lng=${lang}`, { mode: 'cors' })
            .then(res => res.json())
            .then(list => {
                const translatedList = list.map(p => ({
                    ...p,
                    name: p.name,
                    categories: typeof p.categories === 'string'
                        ? p.categories.split(',').map(category => categoryTranslations[category.trim()]?.[lang] || category.trim()) // Преобразуем строку в массив и переводим
                        : p.categories,
                    region: regionTranslations[p.region]?.[lang] || p.region
                }));
                setProducts(translatedList);
            })
            .catch(err => setError(err))
            .finally(() => setLoading(false));
    }, [searchTerm, i18n.language]);

    // Фильтрация по категории без пагинации
    const doFilterCategory = useCallback(() => {
        if (!selectedCategory) return;
        setLoading(true);

        const lang = i18n.language || 'ru';
        fetch(`${API}/product/searchcategory?id=${encodeURIComponent(selectedCategory)}&lng=${lang}`, { mode: 'cors' })
            .then(res => res.json())
            .then(data => {
                const translatedList = data.map(p => ({
                    ...p,
                    name: p.name,
                    categories: typeof p.categories === 'string'
                        ? p.categories.split(',').map(category => categoryTranslations[category.trim()]?.[lang] || category.trim()) // Преобразуем строку в массив и переводим
                        : p.categories,
                    region: regionTranslations[p.region]?.[lang] || p.region
                }));
                setProducts(translatedList);
                setTotalPages(data.totalPages || 1);
            })
            .catch(err => setError(err))
            .finally(() => setLoading(false));
    }, [selectedCategory, i18n.language]);

    // Фильтрация по региону
    const doFilterRegion = useCallback(() => {
        if (!selectedRegion) return;
        setLoading(true);
        setError(null);
        const lang = i18n.language || 'ru';
        fetch(`${API}/product/searchregion?id=${encodeURIComponent(selectedRegion)}&lang=${lang}`, { mode: 'cors' })
            .then(res => {
                if (!res.ok) throw new Error(`Ошибка: ${res.status}`);
                return res.json();
            })
            .then(data => {
                const translatedList = data.map(p => ({
                    ...p,
                    name: p.name,
                    categories: typeof p.categories === 'string'
                        ? p.categories.split(',').map(category => categoryTranslations[category.trim()]?.[lang] || category.trim()) // Преобразуем строку в массив и переводим
                        : p.categories,
                    region: regionTranslations[p.region]?.[lang] || p.region
                }));
                setProducts(translatedList);
                setTotalPages(data.totalPages || 1);
            })
            .catch(err => setError(err))
            .finally(() => setLoading(false));
    }, [selectedRegion, i18n.language]);

    useEffect(() => {
        setProducts([]);
        setPage(1);
    }, [i18n.language]);

    // При изменении page/search/category/region
    useEffect(() => {
        if (searchTerm) {
            doSearch();
        } else if (selectedCategory) {
            doFilterCategory();
        } else if (selectedRegion) {
            doFilterRegion();
        } else {
            loadPage();
        }
    }, [page, searchTerm, selectedCategory, selectedRegion, loadPage, doSearch, doFilterCategory, doFilterRegion]);

    // Infinite scroll
    useEffect(() => {
        if (searchTerm || selectedCategory || selectedRegion) return;
        const onScroll = () => {
            if (loading || page >= totalPages) return;
            if (window.innerHeight + window.scrollY >= document.documentElement.offsetHeight - 100) {
                setPage(prev => prev + 1);
            }
        };
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, [loading, page, totalPages, searchTerm, selectedCategory, selectedRegion]);

    if (error) return <div className="error">Ошибка: {error.message}</div>;

    return (
        <div className="products-page">
            {/* Поиск и фильтры */}
            <div className="filter-bar">
                <input
                    type="text"
                    className="search-input"
                    placeholder={t('search.placeholder')}
                    value={searchTerm}
                    onChange={e => {
                        setSearchTerm(e.target.value);
                        setSelectedCategory('');
                        setSelectedRegion('');
                        setPage(1);
                    }}
                />
                <div className="select-group">
                    {/* Фильтр по категории */}
                    <select
                        value={selectedCategory}
                        onChange={e => {
                            setSelectedCategory(e.target.value);
                            setSearchTerm('');
                            setSelectedRegion('');
                            setPage(1);
                        }}
                    >
                        <option value="">-------</option>
                        {categoriesList.map(c => (
                            <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                    </select>
                    {/* Фильтр по региону */}
                    <select
                        value={selectedRegion}
                        onChange={e => {
                            setSelectedRegion(e.target.value);
                            setSearchTerm('');
                            setSelectedCategory('');
                            setPage(1);
                        }}
                    >
                        <option value="">-------</option>
                        {regionsList.map(r => (
                            <option key={r.id} value={r.id}>{r.name}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Список продуктов */}
            <div className="products-list">
                <table>
                    <thead>
                    <tr>
                        <th>{t('table.name')}</th>
                        <th>{t('table.category')}</th>
                        <th>{t('table.region')}</th>
                    </tr>
                    </thead>
                    <tbody>
                    {products.map(p => (
                        <tr key={p.id} onClick={() => navigate(`/products/${p.id}`)} style={{ cursor: 'pointer' }}>
                            <td>{p.name}</td>
                            <td>{p.categories.join(', ') || '-'}</td>
                            <td>{p.region || '-'}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                {!loading && products.length === 0 && <p>{t('no.products')}</p>}
            </div>

            {/* Индикатор загрузки */}
            <div className="infinite-footer">
                {loading && <p>{t('loading')}</p>}
                {!loading && page >= totalPages && <p>{t('no.more.data')}</p>}
            </div>
        </div>
    );
}

