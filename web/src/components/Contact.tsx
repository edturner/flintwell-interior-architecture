"use client";

import { useState } from "react";
import styles from "./Contact.module.css";
import SectionLabel from "./SectionLabel";

interface ContactProps {
    contactData?: {
        title?: string;
        intro?: string;
        buttonText?: string;
    };
}

const FALLBACK_INTRO =
    "The starting point is never fixed, we find that almost all of our work starts with a friendly conversation!\n\nthe door is always open…";

/**
 * Existing Sanity copy is written in the previous brand's "[ BRACKETED ]"
 * idiom. Strip the brackets so stale content still reads correctly here.
 */
function unbracket(text: string) {
    return text.replace(/^\s*\[\s*|\s*\]\s*$/g, "").trim();
}

const FIELDS = [
    { name: "name", label: "Name", type: "text", required: true },
    { name: "number", label: "Number", type: "tel", required: true },
    { name: "email", label: "Email", type: "email", required: true },
    { name: "location", label: "Location", type: "text", required: true },
] as const;

export default function Contact({ contactData }: ContactProps) {
    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const form = e.currentTarget;
        setStatus("submitting");

        const formData = new FormData(form);
        const data = {
            name: formData.get("name"),
            email: formData.get("email"),
            number: formData.get("number"),
            location: formData.get("location"),
            message: formData.get("message"),
        };

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (!response.ok) throw new Error("Failed to send message");

            setStatus("success");
            form.reset();
        } catch (error) {
            console.error(error);
            setStatus("error");
        }
    }

    return (
        <section id="contact" className={styles.section}>
            <div className={styles.header}>
                <SectionLabel>{unbracket(contactData?.title || "lets chat")}</SectionLabel>
            </div>

            <div className={styles.intro}>
                {(contactData?.intro || FALLBACK_INTRO)
                    .split("\n\n")
                    .map((paragraph) => paragraph.trim())
                    .filter(Boolean)
                    .map((paragraph, i) => (
                        <p key={i}>{paragraph}</p>
                    ))}
            </div>

            <form className={styles.form} onSubmit={handleSubmit}>
                {FIELDS.map((field) => (
                    <div className={styles.field} key={field.name}>
                        <label className={styles.label} htmlFor={field.name}>
                            {field.label}
                        </label>
                        <input
                            className={styles.input}
                            type={field.type}
                            id={field.name}
                            name={field.name}
                            required={field.required}
                            disabled={status === "submitting"}
                        />
                    </div>
                ))}

                <div className={styles.field}>
                    <label className={styles.label} htmlFor="message">
                        Message
                    </label>
                    <textarea
                        className={styles.textarea}
                        id="message"
                        name="message"
                        rows={3}
                        disabled={status === "submitting"}
                    />
                </div>

                <button type="submit" className={styles.submit} disabled={status === "submitting"}>
                    {status === "submitting" ? "sending" : unbracket(contactData?.buttonText || "send")}
                </button>

                {status === "success" && (
                    <p className={styles.message} role="status">
                        Thank you for your enquiry. We have sent a confirmation email with our
                        brochure.
                    </p>
                )}

                {status === "error" && (
                    <p className={`${styles.message} ${styles.error}`} role="alert">
                        Something went wrong. Please try again, or email us directly.
                    </p>
                )}
            </form>
        </section>
    );
}
