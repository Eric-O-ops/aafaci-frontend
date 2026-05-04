// import React from 'react';
// import './AboutUs.css';
// import { motion } from 'framer-motion';
// import { Users, Beaker, Calendar } from 'lucide-react';
//
// export default function AboutUs() {
//     return (
//         <section className="about-us">
//             <motion.div
//                 className="about-container"
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true, amount: 0.3 }}
//                 transition={{ duration: 0.6, ease: 'easeOut' }}
//             >
//                 <motion.h1
//                     className="about-heading"
//                     initial={{ opacity: 0 }}
//                     whileInView={{ opacity: 1 }}
//                     viewport={{ once: true }}
//                     transition={{ delay: 0.2, duration: 0.4 }}
//                 >
//                     Проект AFACI
//                 </motion.h1>
//
//                 <motion.p
//                     className="about-intro"
//                     initial={{ opacity: 0 }}
//                     whileInView={{ opacity: 1 }}
//                     transition={{ delay: 0.4, duration: 0.4 }}
//                 >
//                     Азиатская инициатива по сотрудничеству в области продовольствия и сельского
//                     хозяйства (AFACI) совместно с КГТУ имени И. Раззакова и Департаментом
//                     перерабатывающей промышленности и органического сельского хозяйства
//                     Министерство водных ресурсов, сельского хозяйства и перерабатывающей промышленности Кыргызской Республики проводит исследования
//                     по созданию базы данных по составу пищевых продуктов в Кыргызской Республике с декабря 2021 года по настоящее время.
//                 </motion.p>
//
//                 <div className="timeline">
//                     <motion.div
//                         className="timeline-item"
//                         initial={{ opacity: 0, x: -20 }}
//                         whileInView={{ opacity: 1, x: 0 }}
//                         transition={{ delay: 0.6, duration: 0.4 }}
//                     >
//                         <div className="icon-wrapper">
//                             <Users size={32} />
//                         </div>
//                         <div className="content">
//                             <h2>Наша команда</h2>
//                             <ul>
//                                 <li>Председатель: Джамакеева А. Д., к. т. н., профессор.</li>
//                                 <li>Главный исследователь: Чыналиев М. Т., директор департамента.</li>
//                                 <li>Члены Комитета:
//                                     <ul>
//                                         <li>Эсенаманова М. К., д. м. н., профессор.</li>
//                                         <li>Кожобекова К. К., к. т. н., профессор.</li>
//                                         <li>Ажибекова А., главный технолог ОсОО "Риха".</li>
//                                         <li>Аксупова А. М., научный секретарь.</li>
//                                         <li>Ашимова А. Ж., IT-программист.</li>
//                                     </ul>
//                                 </li>
//                             </ul>
//                         </div>
//                     </motion.div>
//
//                     <motion.div
//                         className="timeline-item reverse"
//                         initial={{ opacity: 0, x: 20 }}
//                         whileInView={{ opacity: 1, x: 0 }}
//                         transition={{ delay: 0.8, duration: 0.4 }}
//                     >
//                         <div className="icon-wrapper">
//                             <Beaker size={32} />
//                         </div>
//                         <div className="content">
//                             <h2>Методы исследования</h2>
//                             <p>
//                                 ГОСТы: высушивание в шкафу СЭШ-3М, аппарат Сокслета, рефрактометр RL-2,
//                                 АЭС-ИСП (ICAP). Энергетическая ценность — расчётный метод. Аминокислотный
//                                 состав — ВЖХ по МН 1363-2000, жирнокислотный — ГХ по МН 1364-2000.
//                             </p>
//                         </div>
//                     </motion.div>
//
//                     <motion.div
//                         className="timeline-item"
//                         initial={{ opacity: 0, y: 20 }}
//                         whileInView={{ opacity: 1, y: 0 }}
//                         transition={{ delay: 1.0, duration: 0.4 }}
//                     >
//                         <div className="icon-wrapper">
//                             <Calendar size={32} />
//                         </div>
//                         <div className="content">
//                             <h2>Итоги по годам</h2>
//                             <div className="year-block">
//                                 <h3>2022</h3>
//                                 <ul>
//                                     <li>Мясо, молоко, зерно, орехи, овощи, фрукты.</li>
//                                     <li>Химический, минеральный, аминокислотный и жирнокислотный состав.</li>
//                                     <li>Публикации в профильных журналах.</li>
//                                 </ul>
//                             </div>
//                             <div className="year-block">
//                                 <h3>2023</h3>
//                                 <ul>
//                                     <li>11 статей; тестирование продуктов из 6 областей КР.</li>
//                                 </ul>
//                             </div>
//                             <div className="year-block">
//                                 <h3>2024</h3>
//                                 <ul>
//                                     <li>30 продуктов; семинар AFCD в Бангкоке (13 стран).</li>
//                                     <li>Публикации в отечественных и международных журналах.</li>
//                                 </ul>
//                             </div>
//                         </div>
//                     </motion.div>
//                 </div>
//             </motion.div>
//         </section>
//     );
// }
/*

import React from 'react';
import './AboutUs.css';
import { motion } from 'framer-motion';
import { Users, Beaker, Calendar, Info } from 'lucide-react'; // добавлена иконка Info
import { useTranslation } from 'react-i18next';

export default function AboutUs() {
    const { t } = useTranslation();

    return (
        <section className="about-us">
            <motion.div
                className="about-container"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
            >
                <motion.h1
                    className="about-heading"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                >
                    {t('aboutUs.title')}
                </motion.h1>

                <motion.p
                    className="about-intro"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.4 }}
                >
                    {t('aboutUs.intro')}
                </motion.p>

                <div className="timeline">
                    <motion.div className="timeline-item reverse"
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3, duration: 0.4 }}
                    >
                        <div className="icon-wrapper">
                            <Info size={32} />
                        </div>
                        <div className="content">
                            <h2>{t('aboutUs.newSectionTitle')}</h2>
                            <p>{t('aboutUs.newSectionTextIntro')}</p>
                            <p className="">{t('aboutUs.newSectionTextHighlight')}</p>
                        </div>
                    </motion.div>
                    <motion.div className="timeline-item"
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.6, duration: 0.4 }}
                    >
                        <div className="icon-wrapper">
                            <Users size={32} />
                        </div>
                        <div className="content">
                            <h2>{t('aboutUs.teamTitle')}</h2>
                            <ul>
                                <li>{t('aboutUs.chair')}</li>
                                {/!*<li>{t('aboutUs.lead')}</li>*!/}
                                <li>{t('aboutUs.membersTitle')}
                                    <ul>
                                        <li>{t('aboutUs.member1')}</li>
                                        <li>{t('aboutUs.member2')}</li>
                                        <li>{t('aboutUs.member3')}</li>
                                        <li>{t('aboutUs.member4')}</li>
                                        <li>{t('aboutUs.member5')}</li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </motion.div>

                    <motion.div className="timeline-item reverse"
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.8, duration: 0.4 }}
                    >
                        <div className="icon-wrapper">
                            <Beaker size={32} />
                        </div>
                        <div className="content">
                            <h2>{t('aboutUs.methodsTitle')}</h2>
                            <p>{t('aboutUs.methods')}</p>
                        </div>
                    </motion.div>

                    <motion.div className="timeline-item"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.0, duration: 0.4 }}
                    >
                        <div className="icon-wrapper">
                            <Calendar size={32} />
                        </div>
                        <div className="content">
                            <h2>{t('aboutUs.resultsTitle')}</h2>
                            <div className="year-block">
                                <h3>2021-2022</h3>
                                <ul>
                                    <li>{t('aboutUs.y2022.0')}</li>
                                    <li>{t('aboutUs.y2022.1')}</li>
                                    <li>{t('aboutUs.y2022.2')}</li>
                                </ul>
                            </div>
                            <div className="year-block">
                                <h3>2022-2023</h3>
                                <ul>
                                    <li>{t('aboutUs.y2023.0')}</li>
                                </ul>
                            </div>
                            <div className="year-block">
                                <h3>2023-2024</h3>
                                <ul>
                                    <li>{t('aboutUs.y2024.0')}</li>
                                    <li>{t('aboutUs.y2024.1')}</li>
                                </ul>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
}
*/

import React, { useState } from 'react';
import './AboutUs.css';
import { motion } from 'framer-motion';
import { Users, Beaker, Calendar, Info, HeartHandshake } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Lightbox from './Lightbox';

export default function AboutUs() {
    const { t } = useTranslation();
    const [selectedImage, setSelectedImage] = useState(null);

    const photos = [
        { src: '/images/about/photo1.jpg', year: '2023' },
        { src: '/images/about/photo2.jpg', year: '2024' },
        { src: '/images/about/photo3.jpg', year: '2025' },
        { src: '/images/about/photo4.jpg', year: '2025' },
    ];
    return (
        <section className="about-us">
            <motion.div
                className="about-container"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
            >
                {/* Заголовок и описание */}
                <motion.h1
                    className="about-heading"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    {t('aboutUs.title')}
                </motion.h1>

                <motion.p
                    className="about-intro"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    {t('aboutUs.intro')}
                </motion.p>



                <motion.div
                    className="photo-card-grid"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                >
                    {photos.map((photo, index) => (
                        <motion.div
                            key={index}
                            className="photo-card"
                            whileHover={{ scale: 1.02, y: -3 }}
                            transition={{ duration: 0.3 }}
                            onClick={() => setSelectedImage(photo.src)}
                            style={{ cursor: 'pointer' }}
                        >
                            <img src={photo.src} alt={`Photo ${index + 1}`} />
                            <p className="photo-year">{photo.year}</p>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Таймлайн секция */}
                <div className="timeline">
                    <motion.div className="timeline-item reverse"
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3, duration: 0.4 }}
                    >
                        <div className="icon-wrapper">
                            <Info size={32} />
                        </div>
                        <div className="content">
                            <h2>{t('aboutUs.newSectionTitle')}</h2>
                            <p>{t('aboutUs.newSectionTextIntro')}</p>
                            <p>{t('aboutUs.newSectionTextHighlight')}</p>
                        </div>
                    </motion.div>

                    <motion.div className="timeline-item"
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.6, duration: 0.4 }}
                    >
                        <div className="icon-wrapper">
                            <Users size={32} />
                        </div>
                        <div className="content">
                            <h2>{t('aboutUs.teamTitle')}</h2>
                            <ul>
                                <li>{t('aboutUs.chair')}</li>
                                <li>{t('aboutUs.membersTitle')}
                                    <ul>
                                        <li>{t('aboutUs.member1')}</li>
                                        <li>{t('aboutUs.member2')}</li>
                                        <li>{t('aboutUs.member3')}</li>
                                        <li>{t('aboutUs.member4')}</li>
                                        <li>{t('aboutUs.member5')}</li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </motion.div>

                    <motion.div className="timeline-item reverse"
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.8, duration: 0.4 }}
                    >
                        <div className="icon-wrapper">
                            <Beaker size={32} />
                        </div>
                        <div className="content">
                            <h2>{t('aboutUs.methodsTitle')}</h2>
                            <p>{t('aboutUs.methods')}</p>
                        </div>
                    </motion.div>

                    <motion.div className="timeline-item"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.0, duration: 0.4 }}
                    >
                        <div className="icon-wrapper">
                            <Calendar size={32} />
                        </div>
                        <div className="content">
                            <h2>{t('aboutUs.resultsTitle')}</h2>
                            <div className="year-block">
                                <h3>2021-2022</h3>
                                <ul>
                                    <li>{t('aboutUs.y2022.0')}</li>
                                    <li>{t('aboutUs.y2022.1')}</li>
                                    <li>{t('aboutUs.y2022.2')}</li>
                                </ul>
                            </div>
                            <div className="year-block">
                                <h3>2022-2023</h3>
                                <ul>
                                    <li>{t('aboutUs.y2023.0')}</li>
                                </ul>
                            </div>
                            <div className="year-block">
                                <h3>2023-2024</h3>
                                <ul>
                                    <li>{t('aboutUs.y2024.0')}</li>
                                    <li>{t('aboutUs.y2024.1')}</li>
                                </ul>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Миссия и ценности
                <motion.div
                    className="mission-section"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2, duration: 0.6 }}
                >
                    <h2><HeartHandshake size={28} />{t('aboutUs.missionTitle')}</h2>
                    <div className="mission-cards">
                        <div className="card">
                            <h3>{t('aboutUs.mission1Title')}</h3>
                            <p>{t('aboutUs.mission1Text')}</p>
                        </div>
                        <div className="card">
                            <h3>{t('aboutUs.mission2Title')}</h3>
                            <p>{t('aboutUs.mission2Text')}</p>
                        </div>
                        <div className="card">
                            <h3>{t('aboutUs.mission3Title')}</h3>
                            <p>{t('aboutUs.mission3Text')}</p>
                        </div>
                    </div>
                </motion.div>*/}
                {/* ⬇️ ВСТАВЬ СЮДА Lightbox */}
                <Lightbox image={selectedImage} onClose={() => setSelectedImage(null)} />
            </motion.div>
        </section>
    );
}
