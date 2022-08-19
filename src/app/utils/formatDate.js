export function formatDate(data) {
    const date = new Date(data);
    // формат гггг-мм-дд
    let month = date.getMonth();
    let day = date.getDate();
    month = month + 1 < 10 ? `0${month + 1}` : `${month + 1}`;
    day = day < 10 ? `0${day}` : `${day}`;
    
    return `${date.getFullYear()}-${month}-${day}`;
}
