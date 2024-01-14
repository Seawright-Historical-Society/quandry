import React from "react";

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
export const SubHeader = StyledComponent('text-2xl p-3')
