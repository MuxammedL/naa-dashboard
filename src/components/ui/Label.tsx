import type { LabelProps } from "@/types/props";
import classNames from "classnames";

const Label = ({
    className,
    children,
    variant = "success",
    size = "medium",
}: LabelProps) => {

    const classes = classNames(
        `border h-fit font-medium text-center`,
        {
            "border-success-200 bg-success-50 text-success-700": variant === "success",
            "border-warning-200 bg-warning-50 text-warning-700": variant === "warning",
            "border-error-200 bg-error-50 text-error-700": variant === "error",
            "border-blue-200 bg-blue-50 text-blue-700": variant === "blue",
            "border-purple-200 bg-purple-50 text-purple-700": variant === "purple",
            "border-[#D5D7DA]": variant === "ghost"
        },
        {
            "py-0.5 px-[6px] rounded-md text-[12px] leading-[16.4px]": size === "small",
            "py-0.5 px-2 rounded-md label1 leading-[18.4px]": size === "medium",
            "py-3 px-4 rounded-lg": size === "large",
        },
        className
    );

    return (
        <div className={classes}>{children}</div>
    )
}

export default Label