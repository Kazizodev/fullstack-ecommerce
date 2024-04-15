import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

type Props = {
    title: string
    description?: string
    icon?: React.ReactNode
    content: string
}

export default function DashboardCard({ title, content, description, icon }: Props) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div>
                    <CardTitle className="text-sm font-medium">{title}</CardTitle>
                    <CardDescription>{description}</CardDescription>
                </div>
                {icon}
            </CardHeader>
            <CardContent>
                <p className="text-2xl font-bold">{content}</p>
            </CardContent>
        </Card>
    )
}
