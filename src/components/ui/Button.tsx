import classNames from "classnames";
import { Link } from "react-router-dom";
import type { ButtonProps } from "@/types/props";

const Button = ({
    className,
    type = "button",
    children,
    handleClick,
    variant = "ghost",
    size = "medium",
    href,
    form
}: ButtonProps) => {
    const classes = classNames(
        `rounded-[100px] w-fit outline-none flex whitespace-nowrap cursor-pointer overflow-hidden relative items-center font-semibold border-black-200 group borderflex gap-2 items-center border cursor-pointer font-semibold label1`,
        {
            "border-cloud-gray text-sidebar-icon-color ": variant === "ghost",
            "border-[#9BC6F5] text-[#2B58CA]": variant === "secondary",
            "bg-secondary border-[#FFFFFF1F] text-white": variant === "primary"
        },
        {
            "py-1 px-x rounded-md": size === "small",
            "py-[7px] px-3 rounded-lg": size === "medium",
            "py-3 px-4 rounded-xl": size === "large",
        },
        className
    );

    return href ? (
        <Link
            to={href}
            className={classes}
            aria-label={typeof children === "string" ? children : "Navigation button"}
        >
            {children}
        </Link>
    ) : (
        <button
            type={type}
            form={form}
            onClick={handleClick}
            className={classes}
            aria-label={typeof children === "string" ? children : "Action button"}
        >
            {children}
        </button>
    );
};

export default Button;
