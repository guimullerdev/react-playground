import Field from "./Field";
import { InputProps } from "./types";

const Input = ({ label, hint, error, ...props }: InputProps & { label?: string; hint?: string; error?: string }) => (
    <Field>
        {label && <Field.Label>{label}</Field.Label>}
        <Field.Input {...props} />
        {hint && <Field.Hint>{hint}</Field.Hint>}
        {error && <Field.Error>{error}</Field.Error>}
    </Field>
);

export default Input;