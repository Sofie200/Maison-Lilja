import "./Button.css";

// Semantiska namn → faktiska Material Symbols-ikonnamn.
//plus: "add"
//arrow: "arrow_forward"

const Button = ({
    children = "Läs mer",
    size = "lg",
    color = "default",
    loading = false,
    icon = "arrow_forward",
    onClick,
    to,
    ...rest
}) => {

    const content = (
        <>

            <span className="btn-label">{children}</span>

            <span className="material-symbols-rounded btn-icon" aria-hidden="true">
                {icon}
            </span>

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