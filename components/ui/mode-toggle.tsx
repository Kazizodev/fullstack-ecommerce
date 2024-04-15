'use client'
import * as React from 'react'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import { MoonIcon, SunIcon } from '@radix-ui/react-icons'

export function ModeToggle() {
    const { theme, setTheme } = useTheme()

    return (
        <Button variant="custom" size="custom" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
            {theme === 'light' ? <MoonIcon className="size-5" /> : <SunIcon className="size-5" />}
            <span className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible">Toggle theme</span>
        </Button>
    )
}
