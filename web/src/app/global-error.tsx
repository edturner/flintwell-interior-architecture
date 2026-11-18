"use client";

/**
 * Last resort: this replaces the root layout entirely, so it has to ship its
 * own <html> and <body> and cannot rely on globals.css variables being
 * applied by anything above it. Deliberately plain — if this renders, the
 * layout itself failed, and the priority is legible text and a way out.
 */
export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <html lang="en">
            <body
                style={{
                    margin: 0,
                    minHeight: "100vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "2rem",
                    background: "#ffffff",
                    color: "#1a1a1a",
                    fontFamily: 'Garamond, "Times New Roman", serif',
                }}
            >
                <div style={{ maxWidth: "34rem" }}>
                    <h1 style={{ fontSize: "2rem", fontWeight: 400, lineHeight: 1.15 }}>
                        Something went wrong
                    </h1>
                    <p style={{ marginTop: "1.25rem", lineHeight: 1.5 }}>
                        Flintwell Interior Architecture — the site failed to load.
                        Please try again.
                    </p>
                    <button
                        type="button"
                        onClick={reset}
                        style={{
                            marginTop: "2rem",
                            font: "inherit",
                            fontSize: "0.9rem",
                            letterSpacing: "0.32em",
                            textTransform: "lowercase",
                            background: "none",
                            border: "none",
                            borderBottom: "1px solid #1a1a1a",
                            padding: "0.75rem 0 0.6rem",
                            cursor: "pointer",
                            color: "inherit",
                        }}
                    >
                        try again
                    </button>
                    {error.digest && (
                        <p style={{ marginTop: "2rem", fontSize: "0.75rem", opacity: 0.62 }}>
                            reference {error.digest}
                        </p>
                    )}
                </div>
            </body>
        </html>
    );
}
