import React from 'react'
import clsx from 'clsx'
import css from './Form.module.scss'

export function Form({
    title,
    children,
    className,
    handler,
    asyncHandler,
    buttonText
}: {
    title: string
    children: React.ReactNode | React.ReactNode[]
    className?: string
    handler?: () => void
    asyncHandler?: (e: React.FormEvent) => Promise<void>
    buttonText?: string
}) {
    const longText = buttonText && buttonText.length > 14

    return (
        <div className={clsx(css.formContainer, { [`css.${className}`]: className })}>
            <h4>{title}</h4>
            {children}
            {buttonText && (
                <button onClick={handler || asyncHandler}>
                    <div className={clsx(css.buttonText, { [css.longText]: longText })}>
                        {buttonText}
                    </div>
                </button>
            )}
        </div>
    )
}
