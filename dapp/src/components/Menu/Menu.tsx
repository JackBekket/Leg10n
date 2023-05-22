import React from 'react'
import cls from 'classnames'
import Link from 'next/link'

export function Menu() {
    return (
        <div className="menu">
            <div className="logo"></div>
            <ul>
                <Link href="/requestJoin"></Link>
            </ul>
        </div>
    )
}
