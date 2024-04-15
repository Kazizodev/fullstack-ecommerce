import { twMerge } from 'tailwind-merge'
import { type ClassValue, clsx } from 'clsx'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function isDashboardLink(link: string) {
    return link.startsWith('/dashboard/')
}

export function randomColor() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16)
}

export function slugify(name: string) {
    return name
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '')
}
