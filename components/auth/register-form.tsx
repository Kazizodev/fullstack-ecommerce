'use client'
import Link from 'next/link'
import { Loader2 } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next13-progressbar'
import { Button } from '@/components/ui/button'
import { registerSchema } from '@/lib/schemas/auth'
import { z, zodResolver, useForm } from '@/lib/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { useAction } from 'next-safe-action/hooks'
import { safeRegister } from '@/app/(auth)/_actions/auth'
import { toast } from 'sonner'

const RegisterForm = () => {
    const router = useRouter()

    const form = useForm<z.infer<typeof registerSchema>>({ resolver: zodResolver(registerSchema), defaultValues: { email: '', firstName: '', lastName: '', password: '' } })

    const { execute, status } = useAction(safeRegister, {
        onSuccess: data => {
            if (data.error) toast.error(data.error)
            if (data.success) {
                toast.success(`Account created successfully!`)
                router.push('/login')
            }
        },
    })
    const loading = status === 'executing'

    const onSubmit = async (values: z.infer<typeof registerSchema>) => execute(values)

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>First Name</FormLabel>
                                <FormControl>
                                    <Input id="firstName" type="text" placeholder="Max" className="w-full" disabled={loading} {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>First Name</FormLabel>
                                <FormControl>
                                    <Input id="lastName" type="text" placeholder="Rohbinson" className="w-full" disabled={loading} {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

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
                    Create an account
                </Button>
            </form>

            <div className="mt-4 text-center text-sm">
                Already have an account?{' '}
                <Link href="/login" className="underline">
                    Login
                </Link>
            </div>
        </Form>
    )
}

export default RegisterForm
