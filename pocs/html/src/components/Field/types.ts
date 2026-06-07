import { ReactNode } from "react";

export type FieldContextValue = {
  id: string;
  error: string | null;
  setError: (error: string | null) => void;
  disabled?: boolean;
  required?: boolean;
};

export type InputProps = {
  ref?: React.Ref<HTMLInputElement>;
} & React.InputHTMLAttributes<HTMLInputElement>;

export type LabelProps = {
  children: ReactNode;
};

export type HintProps = {
  children: ReactNode;
};

export type ErrorProps = {
  children: ReactNode;
};

export type FieldProps = {
  children: ReactNode;
  disabled?: boolean;
  required?: boolean;
};