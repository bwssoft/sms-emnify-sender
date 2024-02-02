import { cn } from "@/app/utils/cn";
import {
    ExclamationCircleIcon,
    QuestionMarkCircleIcon,
} from "@heroicons/react/20/solid";
import React, { ReactNode, forwardRef } from "react";

export type IInputType = React.InputHTMLAttributes<HTMLInputElement> & {
    label: ReactNode;
    labelClassName?: string;
    helper?: string;
    error?: string;
};

export const Input = forwardRef<HTMLInputElement, IInputType>(
    ({ label, helper, labelClassName, error, ...props }, ref) => {
        return (
            <div className="flex flex-col w-full h-full">
                <label
                    className={cn(
                        "flex text-sm font-medium leading-6 text-gray-900",
                        labelClassName
                    )}
                    htmlFor={props.name}
                >
                    {label}
                </label>
                <div className="relative mt-1 rounded-md shadow-sm">
                    <input
                        ref={ref}
                        className={cn(
                            "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 p-2 outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6",
                            error &&
                                "text-red-900 ring-red-300 placeholder:text-red-300 focus:ring-red-500"
                        )}
                        {...props}
                    />
                    {error && (
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                            <ExclamationCircleIcon
                                className="h-5 w-5 text-red-500"
                                aria-hidden="true"
                            />
                        </div>
                    )}
                </div>
                {error && (
                    <p className="mt-2 text-sm text-red-600" id="email-error">
                        {error}
                    </p>
                )}
                {helper && (
                    <p
                        className="mt-2 text-xs text-gray-500"
                        id="email-description"
                    >
                        {helper}
                    </p>
                )}
            </div>
        );
    }
);

Input.displayName = "Input";
