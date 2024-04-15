import db from './db'
import bcrypt from 'bcrypt'

export const login = async (email: string, password: string) => {
    const user = await db.user.findFirst({ where: { email } })
    if (!user) return null

    // ? check if credentials are correct using bcrypt
    const match = await bcrypt.compare(password, user.password!)
    if (!match) return null

    return user
}
