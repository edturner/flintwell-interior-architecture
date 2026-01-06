import Image from "next/image";
import styles from "./Contact.module.css";
import { urlFor } from "@/sanity/lib/image";

interface ContactProps {
    contactData?: {
        title: string;
        toolsText: string;
        image: any;
        buttonText: string;
    }
}

export default function Contact({ contactData }: ContactProps) {
    return (
        <section id="contact" className={styles.section}>
            {/* Left Side: Light/Clean aesthetic */}
            <div className={styles.imageSide}>
                {contactData?.image ? (
                    <Image
                        src={urlFor(contactData.image).url()}
                        alt="Contact us"
                        fill
                        style={{ objectFit: 'cover' }}
                    />
                ) : (
                    <div className={styles.toolsText}>
                        {contactData?.toolsText || '[ TOOLS OF THE TRADE ]'}
                    </div>
                )}
            </div>

            {/* Right Side: Form */}
            <div className={styles.formSide}>
                <div className={styles.formContainer}>
                    <h2 className={styles.title}>{contactData?.title || "LET'S TALK"}</h2>

                    <form className={styles.form}>
                        {/* Fields remain the same */}
                        <div className={styles.field}>
                            <label htmlFor="name">Name</label>
                            <input type="text" id="name" name="name" required />
                        </div>

                        <div className={styles.field}>
                            <label htmlFor="address">Email Address</label>
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
                            {contactData?.buttonText || '[ SEND INQUIRY ]'}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}
