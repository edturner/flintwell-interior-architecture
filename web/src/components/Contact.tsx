"use client";

import { useState } from 'react';
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
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setStatus('submitting');

        const formData = new FormData(e.currentTarget);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            number: formData.get('number'),
            location: formData.get('location'),
            message: formData.get('message'),
        };

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) throw new Error('Failed to send message');

            setStatus('success');
            (e.target as HTMLFormElement).reset();
        } catch (error) {
            console.error(error);
            setStatus('error');
        }
    }

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

                    <form className={styles.form} onSubmit={handleSubmit}>
                        <div className={styles.field}>
                            <label htmlFor="name">Name</label>
                            <input type="text" id="name" name="name" required disabled={status === 'submitting'} />
                        </div>

                        <div className={styles.field}>
                            <label htmlFor="email">Email Address</label>
                            <input type="email" id="email" name="email" required disabled={status === 'submitting'} />
                        </div>

                        <div className={styles.field}>
                            <label htmlFor="number">Number</label>
                            <input type="tel" id="number" name="number" required disabled={status === 'submitting'} />
                        </div>

                        <div className={styles.field}>
                            <label htmlFor="location">Location / Project Site</label>
                            <input type="text" id="location" name="location" required disabled={status === 'submitting'} />
                        </div>

                        <div className={styles.field}>
                            <label htmlFor="message">Message</label>
                            <textarea
                                id="message"
                                name="message"
                                rows={4}
                                className={styles.textarea}
                                disabled={status === 'submitting'}
                            />
                        </div>

                        <button
                            type="submit"
                            className={styles.submitButton}
                            disabled={status === 'submitting'}
                        >
                            {status === 'submitting' ? 'SENDING...' : (contactData?.buttonText || '[ SEND INQUIRY ]')}
                        </button>

                        {status === 'success' && (
                            <p className={styles.successMessage}>
                                Thank you for your inquiry. We have sent a confirmation email with our brochure.
                            </p>
                        )}

                        {status === 'error' && (
                            <p className={styles.errorMessage}>
                                Something went wrong. Please try again later.
                            </p>
                        )}
                    </form>
                </div>
            </div>
        </section>
    );
}
