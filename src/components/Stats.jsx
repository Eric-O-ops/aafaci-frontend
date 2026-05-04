import {useEffect, useState} from 'react';
import './Stats.css';
import { useTranslation } from 'react-i18next';

function Stats() {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(null);
    const API = process.env.REACT_APP_API_URL
    const { t } = useTranslation();


    useEffect(() => {
        fetch(`${API}/stats`)
            .then(r => {
                if (!r.ok) throw new Error();
                return r.json();
            })
            .then(setStats)
            .catch(err => console.error('Stats load error', err))
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return <section className="stats">Загрузка...</section>;
    }
    if (!stats) {
        return <section className="stats">¯\_(ツ)_/¯</section>
    }


    return (
        <section className="stats">
            <div className="stat-box">
                <h2>{stats.products}</h2>
                <p>{t('products_in_db')}</p>
            </div>

            <div className="stat-box">
                <h2>{stats.national}</h2>
                <p>{t('national_dishes')}</p>
            </div>
        </section>
    );
}

export default Stats;