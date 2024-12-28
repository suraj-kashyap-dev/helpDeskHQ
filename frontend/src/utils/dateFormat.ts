function formatDate(date: string | Date, format: string): string {
    const d = new Date(date);

    const map: { [ key: string ]: string | number } = {
        'yyyy': d.getFullYear(),
        'MM': String(d.getMonth() + 1).padStart(2, '0'),
        'dd': String(d.getDate()).padStart(2, '0'),
        'HH': String(d.getHours()).padStart(2, '0'),
        'mm': String(d.getMinutes()).padStart(2, '0'),
        'ss': String(d.getSeconds()).padStart(2, '0'),
        'SSS': String(d.getMilliseconds()).padStart(3, '0')
    };

    return format.replace(/yyyy|MM|dd|HH|mm|ss|SSS/g, (match) => map[ match ] as string);
}

export default formatDate;