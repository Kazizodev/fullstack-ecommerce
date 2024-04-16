'use client'
import Link from 'next/link'
import { toast } from 'sonner'
import { useState } from 'react'
import { Loader2 } from 'lucide-react'
import { signIn } from 'next-auth/react'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next13-progressbar'
import { Button } from '@/components/ui/button'
import { loginSchema } from '@/lib/schemas/auth'
import { z, zodResolver, useForm } from '@/lib/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'

const LoginForm = () => {
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    const form = useForm<z.infer<typeof loginSchema>>({ resolver: zodResolver(loginSchema), defaultValues: { email: '', password: '' } })

    const onSubmit = async (values: z.infer<typeof loginSchema>) => {
        try {
            setLoading(true)

            const login = await signIn('credentials', { email: values.email, password: values.password, redirect: false })
            if (login?.status !== 200) throw new Error('Invalid email or password')

            toast.success('Welcome back!')
            router.push('/')
            router.refresh()
        } catch (error) {
            toast.error('Invalid email or password')
        } finally {
            setLoading(false)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input id="email" type="email" placeholder="m@example.com" className="w-full" disabled={loading} {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <div className="flex items-center">
                                <FormLabel>Password</FormLabel>
                                <Link href="/forget-password" className="ml-auto inline-block text-sm underline">
                                    Forgot your password?
                                </Link>
                            </div>
                            <FormControl>
                                <Input id="password" type="password" placeholder="your password" className="w-full" disabled={loading} {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" className="w-full" disabled={loading}>
                    {loading && <Loader2 className="mr-2 size-4 animate-spin" />}
                    Login
                </Button>
            </form>

            <div className="mt-4 text-center text-sm">
                Don&apos;t have an account?{' '}
                <Link href="/register" className="underline">
                    Sign up
                </Link>
            </div>
        </Form>
    )
}

export default LoginForm
