import "./Button.css";

const Button = ({
    children,
    size = "md",
    color = "default",
    ...rest
}) => {
    return (
        <div>
            <button
                className={`btn btn-${size} btn-${color}`}
                {...rest}
            >
                {children}
            </button>
        </div>
    );
};

export default Button;