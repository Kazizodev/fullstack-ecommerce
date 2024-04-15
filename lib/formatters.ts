// ? Currency Formatter =================================================================================================
const CURRENCY_FORMATTER = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 1, maximumFractionDigits: 2 })
export const formatCurrency = (amount: number) => CURRENCY_FORMATTER.format(amount)

const NUMBER_FORMATTER = new Intl.NumberFormat('en-US')
export const formatNumber = (number: number) => NUMBER_FORMATTER.format(number)

// ? Date Formatter =====================================================================================================
const DATE_FORMATTER = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
export const formatDate = (date: Date) => DATE_FORMATTER.format(date)

const DATE_TIME_FORMATTER = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })
export const formatDateTime = (date: Date) => DATE_TIME_FORMATTER.format(date)
