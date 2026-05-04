// import React, { useEffect, useState } from 'react';
// import { useNavigate, useSearchParams } from 'react-router-dom';
// import './Categories.css';
//
// const categoriesData = [
//     { id: '1b030d10-7e00-491b-a45e-9fded4de1f14', name: 'Овощи', image: '/images/Pomidor.png' },
//     { id: 'meat', name: 'Мясные продукты', image: '/images/Meat.png' },
//     { id: 'fish', name: 'Рыбные продукты', image: '/images/Fish2.png' },
//     { id: 'dairy', name: 'Молочные продукты', image: '/images/Milk.png' },
//     { id: 'fats', name: 'Жировые продукты', image: '/images/Жировые.png' },
//     { id: 'grain', name: 'Зерно и продукты его переработки', image: '/images/Zerno.png' },
//     { id: 'legumes', name: 'Бобовые, орехи', image: '/images/bob.png' },
//     { id: 'fruits', name: 'Фрукты', image: '/images/Fruitss.png' },
//     { id: 'bakery', name: 'Кондитерские изделия', image: '/images/Bakery.png' },
//     { id: 'drinks', name: 'Напитки', image: '/images/Drinks.png' },
//     { id: 'mushrooms', name: 'Грибы', image: '/images/Grib.png' },
// ];
//
// export default function Categories() {
//     const navigate = useNavigate();
//     const [searchParams] = useSearchParams();
//
//     // Если пришёл query параметр classification — сбросим его после навигации
//     useEffect(() => {
//         const cls = searchParams.get('classification');
//         if (cls) {
//             // сбрасываем, чтобы не сохранять в URL постоянно
//             navigate('/products', { replace: true });
//         }
//     }, [searchParams, navigate]);
//
//     // Обработчик клика по классификации
//     const onCategoryClick = (id) => {
//         // передаём параметр classification
//         navigate(`/products?classification=${id}`);
//     };
//
//     return (
//         <section className="categories">
//             <h2>Классификации продуктов</h2>
//             <div className="categories-grid">
//                 {categoriesData.map(cat => (
//                     <div
//                         key={cat.id}
//                         className="category-card"
//                         onClick={() => onCategoryClick(cat.id)}
//                     >
//                         <img src={cat.image} alt={cat.name} />
//                         <p>{cat.name}</p>
//                     </div>
//                 ))}
//             </div>
//         </section>
//     );
// }
//
//
//
// import './Categories.css';
// import React from 'react';
// import { motion } from 'framer-motion';
//
// // Информационный блок для страницы «О нас»
// export default function InfoBlock() {
//     return (
//         <section className="info-block">
//             <motion.div
//                 className="info-content"
//                 initial={{ opacity: 0, y: 30 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true, amount: 0.3 }}
//                 transition={{ duration: 0.8, ease: 'easeOut' }}
//             >
//                 <motion.h2
//                     initial={{ opacity: 0, x: -50 }}
//                     whileInView={{ opacity: 1, x: 0 }}
//                     viewport={{ once: true, amount: 0.3 }}
//                     transition={{ delay: 0.2, duration: 0.6, ease: 'easeOut' }}
//                 >
//                     О проекте AFACI
//                 </motion.h2>
//                 <motion.p
//                     initial={{ opacity: 0 }}
//                     whileInView={{ opacity: 1 }}
//                     viewport={{ once: true, amount: 0.3 }}
//                     transition={{ delay: 0.4, duration: 0.6 }}
//                 >
//                     Азиатская инициатива по сотрудничеству в области продовольствия и сельского
//                     хозяйства (AFACI) совместно с КГТУ имени И. Раззакова и Министерством сельского
//                     хозяйства КР проводит исследование состава пищевых продуктов с декабря 2021 года.
//                 </motion.p>
//                 <motion.ul
//                     initial={{ opacity: 0, scale: 0.95 }}
//                     whileInView={{ opacity: 1, scale: 1 }}
//                     viewport={{ once: true, amount: 0.3 }}
//                     transition={{ delay: 0.6, duration: 0.6 }}
//                 >
//                     <li>Исследования проводятся в 6 областях Кыргызской Республики.</li>
//                     <li>Методы: химический анализ, минеральный состав, жирно- и аминокислотный состав.</li>
//                     <li>За 2024 год испытано более 150 продуктов, опубликовано 11 научных статей.</li>
//                 </motion.ul>
//             </motion.div>
//         </section>
//     );
// }




import './Categories.css';
import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export default function InfoBlock() {
    const { t } = useTranslation();

    return (
        <section className="info-block">
            <motion.div
                className="info-content"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
            >
                <motion.h2
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ delay: 0.2, duration: 0.6, ease: 'easeOut' }}
                >
                    {t('infoBlock.title')}
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                >
                    {t('infoBlock.description')}
                </motion.p>
                <motion.ul
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                >
                    <li>{t('infoBlock.point1')}</li>
                    <li>{t('infoBlock.point2')}</li>
                    <li>{t('infoBlock.point3')}</li>
                </motion.ul>
            </motion.div>
        </section>
    );
}
