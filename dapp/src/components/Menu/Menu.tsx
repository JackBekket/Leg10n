import React from 'react'
import cls from 'classnames'
import Link from 'next/link'

import css from './Menu.module.scss'

export function Menu() {
    return (
        <div className={css.menu}>
            <div className={css.logo}></div>
            <ul>
                {/* 
                +delete
                +manifest
                +faq
                */}
                <Link href="/requestJoin">JOIN</Link>
                <Link href="/encrypt">ENCRYPT</Link>
                <Link href="/decrypt">DECRYPT</Link>
            </ul>
        </div>
    )
}
