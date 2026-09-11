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
