export function displayDiffDate(data) {
    // const date = new Date(parseInt(data));
    const date = new Date(data);
    const dateNow = new Date();
    const yearDifference = dateNow.getFullYear() - date.getFullYear();
    
    if (yearDifference === 0) {
        const dayDifference = dateNow.getDate() - date.getDate();
        
        if (dayDifference === 0) {
            const hourDifference = dateNow.getHours() - date.getHours();
            
            if (hourDifference === 0) {
                const minutesDifference =
                    dateNow.getMinutes() - date.getMinutes();
                
                if (minutesDifference >= 0 && minutesDifference < 5) {
                    return '1 минуту назад';
                }
                if (minutesDifference >= 5 && minutesDifference < 10) {
                    return '5 минут назад';
                }
                if (minutesDifference >= 10 && minutesDifference < 30) {
                    return '10 минут назад';
                }
                
                return `${date.getHours()}:${date.getMinutes()}`;
            }
            
            return `${date.getDate()} ${date.toLocaleString('default', {
                month: 'long'
            })}`;
        }
    }
    return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
}
