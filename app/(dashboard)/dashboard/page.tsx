import db from '@/lib/db'
import { CreditCard, Package, User } from 'lucide-react'
import DashboardCard from '@/components/ui/dashboard-card'
import { formatCurrency, formatNumber } from '@/lib/formatters'

export const metadata = { title: 'Dashboard', description: 'View your store analytics' }

async function getSalesData() {
    const sales = await db.order.aggregate({ _sum: { finalPrice: true }, _count: true })

    return { totalSales: sales._sum.finalPrice || 0, totalOrders: sales._count }
}
async function getUserData() {
    const [userCount, orderCount] = await Promise.all([db.user.count({ where: { role: 'user' } }), db.order.aggregate({ _sum: { finalPrice: true } })])

    return {
        userCount,
        totalSales: userCount === 0 ? 0 : (orderCount._sum.finalPrice || 0) / userCount,
    }
}
async function getProductData() {
    const [activeCount, inactiveCount] = await Promise.all([await db.product.count({ where: { state: 'published' } }), await db.product.count({ where: { state: 'draft' } })])

    return { activeCount, inactiveCount }
}

const DashboardPage = async () => {
    const [salesData, userData, productData] = await Promise.all([getSalesData(), getUserData(), getProductData()])

    return (
        <section className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <DashboardCard title="Sales" icon={<CreditCard className="size-4" />} content={formatCurrency(salesData.totalSales)} description={`${formatNumber(salesData.totalOrders)} orders`} />

            <DashboardCard icon={<User className="size-4" />} title="Customers" content={formatNumber(userData.userCount)} description={`${formatCurrency(userData.totalSales)} average value`} />

            <DashboardCard
                icon={<Package className="size-4" />}
                title="Active Products"
                description={`${formatNumber(productData.inactiveCount)} inactive`}
                content={formatNumber(productData.activeCount)}
            />
        </section>
    )
}

export default DashboardPage
