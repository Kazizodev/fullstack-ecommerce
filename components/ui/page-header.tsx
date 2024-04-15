import { CardHeader } from './card'

interface HeadingProps {
    title: string
    description?: string
}

const PageHeader: React.FC<HeadingProps> = ({ title, description }) => {
    return (
        <CardHeader>
            <div>
                <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
                {description && <p className="text-sm text-muted-foreground">{description}</p>}
            </div>
        </CardHeader>
    )
}

export default PageHeader
