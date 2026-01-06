import Link from "next/link";
import styles from "./page.module.css";

export default function Contact() {
    return (
        <main className={styles.main}>
            {/* Left Side: Atmospheric Image */}
            <section className={styles.imageSide}>
                <div className={styles.imageOverlay}>
                    <Link href="/" className={styles.homeLink}>[ HOME ]</Link>
                    <div className={styles.atmosphericText}>
                        TOOLS OF THE TRADE
                    </div>
                </div>
            </section>

            {/* Right Side: Qualification Form */}
            <section className={styles.formSide}>
                <div className={styles.formContainer}>
                    <h1 className={styles.title}>START A PROJECT</h1>
                    <p className={styles.subtitle}>
                        We take on a limited number of commissions per year. Tell us about your vision.
                    </p>

                    <form className={styles.form}>
                        <div className={styles.field}>
                            <label htmlFor="name">NAME</label>
                            <input type="text" id="name" name="name" required />
                        </div>

                        <div className={styles.field}>
                            <label htmlFor="email">EMAIL</label>
                            <input type="email" id="email" name="email" required />
                        </div>

                        <div className={styles.field}>
                            <label htmlFor="budget">BUDGET RANGE</label>
                            <select id="budget" name="budget">
                                <option value="">Select a range...</option>
                                <option value="50-100k">£50k - £100k</option>
                                <option value="100-250k">£100k - £250k</option>
                                <option value="250k+">£250k+</option>
                            </select>
                        </div>

                        <div className={styles.field}>
                            <label htmlFor="type">PROJECT TYPE</label>
                            <select id="type" name="type">
                                <option value="renovation">Renovation</option>
                                <option value="new-build">New Build</option>
                                <option value="commercial">Commercial</option>
                            </select>
                        </div>

                        <button type="submit" className={styles.submitButton}>
                            [ SEND INQUIRY ]
                        </button>
                    </form>
                </div>
            </section>
        </main>
    );
}
