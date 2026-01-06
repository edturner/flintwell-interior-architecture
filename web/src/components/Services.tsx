import styles from './Services.module.css';

interface Service {
    _id: string;
    title: string;
    description: string;
    items?: string[];
    price: string;
}

interface ServicesProps {
    services?: Service[];
}

export default function Services({ services }: ServicesProps) {
    if (!services || services.length === 0) {
        return null;
    }

    return (
        <section id="services" className={styles.servicesSection}>
            <div className={styles.container}>
                <h2 className={styles.title}>OUR PROCESS</h2>

                <div className={styles.grid}>
                    {services.map((service, index) => (
                        <div key={service._id} className={styles.serviceCard}>
                            <span className={styles.serviceNumber}>[{String(index + 1).padStart(2, '0')}]</span>
                            <h3 className={styles.serviceTitle}>{service.title}</h3>
                            <p className={styles.serviceDescription}>{service.description}</p>

                            {service.items && (
                                <ul className={styles.serviceList}>
                                    {service.items.map((item, idx) => (
                                        <li key={idx} className={styles.serviceItem}>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            )}

                            <div className={styles.pricing}>
                                {service.price}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
