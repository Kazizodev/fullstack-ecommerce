'use server'
import db from '@/lib/db'
import bcrypt from 'bcrypt'
import { action } from '@/lib/safe-actions'
import { registerSchema } from '@/lib/schemas/auth'

export const safeRegister = action(registerSchema, async ({ email, firstName, lastName, password }) => {
    if (!email || !firstName || !lastName || !password) return { error: 'All fields are required' }

    email = email.toLowerCase()
    firstName = firstName.toLowerCase()
    lastName = lastName.toLowerCase()
    const name = `${firstName} ${lastName}`

    const existingUser = await db.user.findFirst({ where: { email } })
    if (existingUser) return { error: 'User already exists' }

    // ? encrypt password
    const salt = await bcrypt.genSalt(12)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await db.user.create({ data: { email, name, password: hashedPassword } })
    if (!user) return { error: 'Failed to create user' }

    return { success: true }
})
