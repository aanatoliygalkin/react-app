import { ButtonHTMLAttributes } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    text: string;
    onClick?: () => void;
    disabled?: boolean;
    to?: string;
}