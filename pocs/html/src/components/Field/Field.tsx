import { createContext, use, useId, useState } from "react";

import { ErrorProps, FieldContextValue, FieldProps, HintProps, InputProps, LabelProps } from "./types";

const FieldContext = createContext<FieldContextValue | null>(null);

function useFieldContext(component: string): FieldContextValue {
    const ctx = use(FieldContext);
    if (!ctx) throw new Error(`<Field.${component}> deve estar dentro de um <Field>`);
    return ctx;
}

const Field = ({ children, disabled, required }: FieldProps) => {
    const id = useId();
    const [error, setError] = useState<string | null>(null);

    return (
        <FieldContext value={{ id, error, setError, disabled, required }}>
            <div className="field">{children}</div>
        </FieldContext>
    );
};

Field.Label = ({ children }: LabelProps) => {
    const { id, required } = useFieldContext("Label");

    return (
        <label htmlFor={id} className="field-label">
            {children}
            {required && (
                <span aria-hidden="true" className="field-required">
                    *
                </span>
            )}
        </label>
    );
};

Field.Input = ({ ref, ...props }: InputProps) => {
    const { id, error, disabled, required } = useFieldContext("Input");

    const describedBy = [
        error ? `${id}-error` : null,
        props["aria-describedby"] ?? null,
    ]
        .filter(Boolean)
        .join(" ") || undefined;

    return (
        <input
            id={id}
            ref={ref}
            disabled={disabled ?? props.disabled}
            required={required ?? props.required}
            aria-invalid={error ? true : undefined}
            aria-describedby={describedBy}
            {...props}
        />
    );
};

Field.Hint = ({ children }: HintProps) => {
    const { id } = useFieldContext("Hint");

    return (
        <span id={`${id}-hint`} className="field-hint">
            {children}
        </span>
    );
};

Field.Error = ({ children }: ErrorProps) => {
    const { id, error } = useFieldContext("Error");

    const message = children ?? error;
    if (!message) return null;

    return (
        <span id={`${id}-error`} role="alert" className="field-error">
            {message}
        </span>
    );
};

export default Field;