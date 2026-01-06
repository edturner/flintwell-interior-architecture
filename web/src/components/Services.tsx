import styles from './Services.module.css';

const services = [
    {
        id: "01",
        title: "Design",
        description: "This service will provide you with working drawings and supporting design proposals. We will discuss the best process with you to match the complexity of your project.",
        items: [
            "Architectural floor plans (AutoCAD .pdf & .dwg files)",
            "Furniture design elevations & cross sections",
            "MEP plans and elevations",
            "Recommended mood board"
        ],
        price: "Starting from £500 per room"
    },
    {
        id: "02",
        title: "Source Management",
        description: "Survey, quantify and spec materials & furniture for project. Organise samples, manage lead times and logistics.",
        items: [
            "Access to private price lists from recommended suppliers",
            "Direct communication with suppliers",
            "Check order forms with suppliers to ensure accuracy",
            "Mood board adjustments as choices develop"
        ],
        price: "5% of net value"
    },
    {
        id: "03",
        title: "Installation Management",
        description: "Prep & installation management of interiors. Ensure MEP drawings provided by Flintwell are followed. Delivering high standards of prep information to ensure build accuracy.",
        items: [
            "Guidance and communication throughout the build",
            "Provide specific, technical information and direction",
            "Marking out services for mechanical, electrical & plumbing",
            "Structural requirements for wall suspended features"
        ],
        price: "Starting from £500 per room or % of build cost"
    },
    {
        id: "04",
        title: "Project Management",
        description: "A project managed service where we pull everything together. Managing logistics for labour and materials for the build. Project planning, execution and completion, ensuring quality standards and safety.",
        items: [
            "Logistics management for labour and materials",
            "Project planning, execution and completion",
            "Health & safety compliance",
            "Cross-trade communication"
        ],
        price: "% of build cost"
    }
];

export default function Services() {
    return (
        <section id="services" className={styles.servicesSection}>
            <div className={styles.container}>
                <h2 className={styles.title}>OUR PROCESS</h2>

                <div className={styles.grid}>
                    {services.map((service) => (
                        <div key={service.id} className={styles.serviceCard}>
                            <span className={styles.serviceNumber}>[{service.id}]</span>
                            <h3 className={styles.serviceTitle}>{service.title}</h3>
                            <p className={styles.serviceDescription}>{service.description}</p>

                            <ul className={styles.serviceList}>
                                {service.items.map((item, index) => (
                                    <li key={index} className={styles.serviceItem}>
                                        {item}
                                    </li>
                                ))}
                            </ul>

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
