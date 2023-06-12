import React from 'react'
import clsx from 'clsx'
import css from './Form.module.scss'
import { SimpleInput } from '../SimpleInput'

import { useAppContext } from '../../pages/AppContext'

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
    const { currentAccount, balance, chainId, chainName } = useAppContext()

    return (
        <div className={clsx(css.formContainer, { [`css.${className}`]: className })}>
            <h4>{title}</h4>
            {children}
            {buttonText && (
                <button onClick={handler || asyncHandler}>
                    <div>{buttonText}</div>
                </button>
            )}
        </div>
    )
}
