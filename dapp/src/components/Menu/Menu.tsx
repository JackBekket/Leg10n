import React from 'react'
import cls from 'classnames'
import Link from 'next/link'

import css from './Menu.module.scss'

export function Menu() {
    return (
        <div className={css.menu}>
            <div className={css.logo}></div>
            <ul>
                <Link href="/telesend">CHAT</Link>
                <Link href="/requestJoin">MANIFEST</Link>
                <Link href="/acceptRequest">ACCEPT</Link>
                <Link href="/requestJoin">JOIN</Link>
                <Link href="/requestJoin">FAQ</Link>
            </ul>
        </div>
    )
}
