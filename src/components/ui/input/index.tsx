import * as React from "react";
import { cn } from "@/lib/utils";
import { ErrorMessage, useField } from "formik";
import classNames from "classnames";
import styles from "./input.module.css"
import type { InputProps } from "@/types/props";

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ containerClass, className, type = "text", icon, id, ...props }, ref) => {
        const [field, meta] = useField(props);

        const inputId = id || props.name;
        const errorId = `${inputId}-error`;

        return (
            <div className={cn(containerClass, "min-h-[84px]")}>
                <div className="relative flex flex-col gap-[6px]">
                    {props.label && (
                        <label
                            htmlFor={inputId}
                            className={`${styles.label}`}
                        >
                            {props.label} {props.required ? <span className="text-error-message">*</span> : null}
                        </label>
                    )}
                    <input
                        id={inputId}
                        type={type}
                        aria-invalid={meta.touched && !!meta.error}
                        aria-describedby={meta.touched && meta.error ? errorId : undefined}
                        className={cn(
                            classNames(
                                styles.input,
                                {
                                    "focus:border-gray-medium": !meta.error || !meta.touched,
                                    "border-red-100": meta.error && meta.touched,
                                    "pl-10": icon
                                }
                            ),
                            className
                        )}
                        ref={ref}
                        {...field}
                        {...props}
                    />
                    {icon && <span className="absolute left-3 bottom-2 text-[#414651]">
                        {React.createElement(icon, { width: 20, height: 20 })}
                    </span>}
                </div>

                {meta.touched && meta.error && (
                    <div
                        id={errorId}
                        className="label1 text-error-message"
                    >
                        <ErrorMessage name={props.name} /> sdss
                    </div>
                )}
            </div>
        );
    }
);

Input.displayName = "Input";

export { Input };
