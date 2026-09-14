import "./Button.css";

// Semantiska namn → faktiska Material Symbols-ikonnamn.
// Lägg till fler här när ni behöver fler ikon-varianter.
const ICONS = {
    plus: "add",
    arrow: "arrow_forward",
};

// Rimlig standardplacering per ikon (plus brukar stå före text, pil efter) —
// kan alltid overridas via iconPosition-prop om du behöver något annat.
const DEFAULT_ICON_POSITION = {
    plus: "start",
    arrow: "end",
};

const Button = ({
    children,
    size = "md",
    color = "default",
    loading = false,
    icon,
    iconPosition,
    onClick,
    to,
    ...rest
}) => {

    const position = iconPosition ?? DEFAULT_ICON_POSITION[icon] ?? "end";

    const content = (
        <>

            <span className="btn-label">{children}</span>

            {icon && position === "start" && (
                <span className="material-symbols-rounded btn-icon" aria-hidden="true">
                    {ICONS[icon]}
                </span>
            )}

            {icon && position === "end" && (
                <span className="material-symbols-rounded btn-icon" aria-hidden="true">
                    {ICONS[icon]}
                </span>
            )}
        </>
    );

    if (to) {
        return (
            <div className="btn-wrapper">

                <a href={to}
                className={`btn btn-${size} btn-${color} ${loading ? "btn-loading" : ""}`}
                aria-disabled={loading}
                {...rest}
                >
                {content}
            </a>
            </div>
        );
    }

return (
    <div className="btn-wrapper">
        <button
            className={`btn btn-${size} btn-${color} ${loading ? "btn-loading" : ""}`}
            onClick={loading ? undefined : onClick}
            disabled={loading}
            {...rest}
        >
            {content}
        </button>
    </div>
);
};

export default Button;