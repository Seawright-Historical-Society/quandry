import React from "react";
import { Courier_Prime } from "next/font/google"

const CourierPrime = Courier_Prime({
    subsets: ['latin'],
    weight: "400",
    variable: '--font-courier'
});

type Props = {
    children: React.ReactNode;
    className?: string;
}

const StyledComponent = (classes: string) => {
    const Component: React.FC<Props> = ({ children, className }) => {
        return (
            <div className={`${classes} ${className}`}>
                { children }
            </div>
        )
    }

    return Component;
}

export const Header: React.FC<Props> = StyledComponent('text-3xl text-bold p-3');
export const HistoricHeader: React.FC<Props> = StyledComponent(`text-3xl text-bold p-3 font-mono ${CourierPrime.variable}`)
export const SubHeader = StyledComponent('text-2xl p-3')
