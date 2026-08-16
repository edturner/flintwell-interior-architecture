"use client";

import { useState } from "react";
import styles from "./Contact.module.css";
import SectionLabel from "./SectionLabel";
import type { ContactData, SiteDetails } from "@/sanity/contentTypes";

interface ContactProps {
    contactData?: ContactData | null;
    /** From the footer document. Optional — the section works without it. */
    details?: Pick<SiteDetails, "email" | "phone"> | null;
    /** Renders the section label as the page's h1. Set on /contact, where
     *  this section *is* the page and there is no other heading above it. */
    headingLevel?: "h1" | "h2";
}

/** Same hairline weight as the rules, so it can't fall back to a glyph. */
function Arrow({ className }: { className?: string }) {
    return (
        <svg
            className={className}
            viewBox="0 0 26 10"
            fill="none"
            aria-hidden="true"
            focusable="false"
        >
            <path
                d="M0 5h24M19.5 1 24 5l-4.5 4"
                stroke="currentColor"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
            />
        </svg>
    );
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
    {
        name: "name",
        label: "Name",
        type: "text",
        required: true,
        placeholder: "first and last",
        autoComplete: "name",
    },
    {
        name: "number",
        label: "Number",
        type: "tel",
        required: true,
        placeholder: "best number to reach you",
        autoComplete: "tel",
    },
    {
        name: "email",
        label: "Email",
        type: "email",
        required: true,
        placeholder: "you@example.com",
        autoComplete: "email",
    },
    {
        name: "location",
        label: "Location",
        type: "text",
        required: true,
        placeholder: "where is the project?",
        autoComplete: "address-level2",
    },
] as const;

type Status = "idle" | "submitting" | "success" | "error";

export default function Contact({ contactData, details, headingLevel = "h2" }: ContactProps) {
    const [status, setStatus] = useState<Status>("idle");
    /** True when the studio got the lead but the visitor's copy didn't send. */
    const [autoReplyMissing, setAutoReplyMissing] = useState(false);

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
            company: formData.get("company"),
        };

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (!response.ok) throw new Error("Failed to send message");

            const result = await response.json().catch(() => ({}));
            setAutoReplyMissing(result?.autoReplySent === false);
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
                <SectionLabel as={headingLevel}>
                    {unbracket(contactData?.title || "lets chat")}
                </SectionLabel>
            </div>

            <div className={styles.body}>
                <div className={styles.invitation}>
                    <div className={styles.intro}>
                        {(contactData?.intro || FALLBACK_INTRO)
                            .split("\n\n")
                            .map((paragraph) => paragraph.trim())
                            .filter(Boolean)
                            .map((paragraph, i) => (
                                <p key={i}>{paragraph}</p>
                            ))}
                    </div>

                    {/* Not everyone will fill in a form, and "the door is
                        always open" ought to have a door. */}
                    {(details?.email || details?.phone) && (
                        <div className={styles.direct}>
                            <span className={styles.directLabel}>
                                or reach us directly
                            </span>

                            {details.email && (
                                <a
                                    className={styles.directLink}
                                    href={`mailto:${details.email}`}
                                >
                                    {details.email}
                                </a>
                            )}

                            {details.phone && (
                                <a
                                    className={styles.directLink}
                                    href={`tel:${details.phone.replace(/\s/g, "")}`}
                                >
                                    {details.phone}
                                </a>
                            )}
                        </div>
                    )}
                </div>

                <form className={styles.form} onSubmit={handleSubmit}>
                {FIELDS.map((field) => (
                    <div className={styles.field} key={field.name}>
                        <label className={styles.label} htmlFor={field.name}>
                            {field.label}
                            {field.required && (
                                <span className={styles.required} aria-hidden="true">
                                    *
                                </span>
                            )}
                        </label>
                        <span className={styles.inputWrap}>
                            <input
                                className={styles.input}
                                type={field.type}
                                id={field.name}
                                name={field.name}
                                required={field.required}
                                placeholder={field.placeholder}
                                autoComplete={field.autoComplete}
                                disabled={status === "submitting"}
                            />
                        </span>
                    </div>
                ))}

                <div className={styles.field}>
                    <label className={styles.label} htmlFor="message">
                        Message
                    </label>
                    <span className={styles.inputWrap}>
                        <textarea
                            className={styles.textarea}
                            id="message"
                            name="message"
                            rows={3}
                            placeholder="tell us about it…"
                            disabled={status === "submitting"}
                        />
                    </span>
                </div>

                {/* Honeypot. Hidden from sight, from the tab order and from
                    assistive tech; only a bot filling every field will touch
                    it, and the server treats anything here as spam.
                    `aria-hidden` plus `tabIndex={-1}` is deliberate — this is
                    one of the few cases where hiding from screen readers is
                    correct, because the field is not for people. */}
                <div className={styles.honeypot} aria-hidden="true">
                    <label htmlFor="company">Company (leave blank)</label>
                    <input
                        id="company"
                        name="company"
                        type="text"
                        tabIndex={-1}
                        autoComplete="off"
                    />
                </div>

                <p className={styles.hint}>* required</p>

                    <button
                        type="submit"
                        className={styles.submit}
                        disabled={status === "submitting"}
                    >
                        <span>
                            {status === "submitting"
                                ? "sending"
                                : unbracket(contactData?.buttonText || "send")}
                        </span>
                        <Arrow className={styles.submitArrow} />
                    </button>

                    {/* The old copy promised "we have sent a confirmation
                        email with our brochure" on every success — including
                        the cases where the auto-reply failed. A false
                        confirmation is worse than a vague one, because it
                        stops the visitor doing anything about it. */}
                    {status === "success" && (
                        <p className={styles.message} role="status">
                            {autoReplyMissing
                                ? "Thank you for your enquiry — it's with the studio. We'll be in touch within 48 hours."
                                : "Thank you for your enquiry. We've sent a confirmation to your inbox, and we'll be in touch within 48 hours."}
                        </p>
                    )}

                    {status === "error" && (
                        <p className={`${styles.message} ${styles.error}`} role="alert">
                            Something went wrong and your enquiry wasn&rsquo;t sent.
                            Please try again{details?.email ? ", or email us at " : "."}
                            {details?.email && (
                                <a className={styles.errorLink} href={`mailto:${details.email}`}>
                                    {details.email}
                                </a>
                            )}
                        </p>
                    )}
                </form>
            </div>
        </section>
    );
}
