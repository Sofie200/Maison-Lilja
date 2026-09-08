import "./Button.css";

const Button = ({
    children,        // texten i knappen
    size = "md",
    color = "default",
    onClick,         // funktion
    to,              // destination (URL)
    ...rest
}) => {
    // Om knappen har en destination → rendera en <a>
    if (to) {
        return (
            <div>
                <a
                    href={to}
                    className={`btn btn-${size} btn-${color}`}
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
                className={`btn btn-${size} btn-${color}`}
                onClick={onClick}
                {...rest}
            >
                {children}
            </button>
        </div>
    );
};

export default Button;