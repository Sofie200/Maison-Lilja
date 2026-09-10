import "./Button.css";

const Button = ({
    children,
    size = "md",
    color = "default",
    loading = false,
    onClick,
    to,
    ...rest
}) => {

    // Om knappen har en destination → rendera en <a>
    if (to) {
        return (
            <div>
                <a
                    href={to}
                    className={`btn btn-${size} btn-${color} ${loading ? "btn-loading" : ""}`}
                    aria-disabled={loading}
                    {...rest}
                >
                    {children}
                </a>
            </div>
        );
    }

    // Annars → vanlig <button>
    return (
        <div>
            <button
                className={`btn btn-${size} btn-${color} ${loading ? "btn-loading" : ""}`}
                onClick={loading ? undefined : onClick}
                disabled={loading}
                {...rest}
            >
                {children}
            </button>
        </div>
    );
};

export default Button;