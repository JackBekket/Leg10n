import React, { useState } from 'react'
import cls from 'classnames'
import clsx from 'clsx'
import css from './SimpleInput.module.scss'

// import type * as API from '~/API'

export function SimpleInput({
    placeholder,
    className,
    id,
    error,
    mandatory,
    value,
    setValue,
    isEmail,
    isPassword
}: {
    placeholder: string
    className?: string
    id?: string
    error?: string
    mandatory?: boolean
    value: string
    setValue: (x: string) => void
    isEmail?: boolean
    isPassword?: boolean
}) {
    const [inputFullness, setInputFullness] = useState<boolean | undefined>(undefined)
    const [internalValue, setInternalValue] = useState(value)

    return (
        <div className={css.simpleInputWrapper}>
            <div className={clsx(css.inputWrapper, { [`css.${className}`]: className })}>
                <input
                    id={id}
                    type={`${isPassword ? 'password' : isEmail ? 'email' : 'text'}`}
                    autoComplete="on"
                    placeholder={placeholder}
                    value={internalValue}
                    onChange={el => {
                        setInputFullness(Boolean(el.target.value.trim().length))
                        setInternalValue(el.target.value)
                        setValue(el.target.validity.valid ? el.target.value : '')
                        console.log(value)
                    }}
                />
            </div>
            {/* {!inputFullness && inputFullness !== undefined && error && <span>{error}</span>} */}
        </div>
    )
}
