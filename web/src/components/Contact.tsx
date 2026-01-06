import styles from "./Contact.module.css";

export default function Contact() {
    return (
        <section id="contact" className={styles.section}>
            {/* Left Side: Light/Clean aesthetic */}
            <div className={styles.imageSide}>
                <div className={styles.toolsText}>
                    [ TOOLS OF THE TRADE ]
                </div>
            </div>

            {/* Right Side: Form */}
            <div className={styles.formSide}>
                <div className={styles.formContainer}>
                    <h2 className={styles.title}>LET&apos;S TALK</h2>

                    <form className={styles.form}>
                        <div className={styles.field}>
                            <label htmlFor="name">Name</label>
                            <input type="text" id="name" name="name" required />
                        </div>

                        <div className={styles.field}>
                            <label htmlFor="address">Address</label>
                            <input type="text" id="address" name="address" required />
                        </div>

                        <div className={styles.field}>
                            <label htmlFor="number">Number</label>
                            <input type="tel" id="number" name="number" required />
                        </div>

                        <div className={styles.field}>
                            <label htmlFor="location">Location / Project Site</label>
                            <input type="text" id="location" name="location" required />
                        </div>

                        <button type="submit" className={styles.submitButton}>
                            [ SEND INQUIRY ]
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}
