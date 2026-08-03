import { InputHTMLAttributes } from "react";

export interface MainInputProps extends InputHTMLAttributes<HTMLInputElement> {
    placeholder: string;
    margin?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}