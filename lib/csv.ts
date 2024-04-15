export function createAndDownloadCSV(data: any[]) {
    const titles = Object.keys(data[0])
    const csv = [titles.join(',')]
    data.forEach(item => {
        const values = titles.map(title => {
            const value = item[title]
            return typeof value === 'string' ? `"${value}"` : value
        })
        csv.push(values.join(','))
    })

    const blob = new Blob([csv.join('\n')], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.setAttribute('hidden', '')
    a.setAttribute('href', url)
    a.setAttribute('download', 'data.csv')
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
}
