import * as React from "react";
import { cn } from "@/lib/utils";
import { ErrorMessage, useField } from "formik";
import classNames from "classnames";
import styles from "./input.module.css"
import type { InputProps } from "@/types/props";

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ containerClass, className, type = "text", id, ...props }, ref) => {
        const [field, meta] = useField(props);

        const inputId = id || props.name;
        const errorId = `${inputId}-error`;

        return (
            <div className={cn(containerClass, "min-h-[74px] md:min-h-[76px] lg:min-h-[84px]")}>
                <div className="relative flex-col-reverse flex items-start justify-start -mt-5">
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
                                }
                            ),
                            className
                        )}
                        ref={ref}
                        {...field}
                        {...props}
                    />
                    {props.label && (
                        <label
                            htmlFor={inputId}
                            className={`${styles.label} ${field.value && styles.active}`}
                        >
                            {props.label}
                        </label>
                    )}
                </div>

                {meta.touched && meta.error && (
                    <div
                        id={errorId}
                        className="ml-4 label2 text-red-300"
                    >
                        <ErrorMessage name={props.name} />
                    </div>
                )}
            </div>
        );
    }
);

Input.displayName = "Input";

export { Input };
