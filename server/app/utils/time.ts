const now = new Date();
now.toLocaleString('vn-VI', { timeZone: 'Asia/Ho_Chi_Minh' }); // set timezone vietnam

export const getDay = () => {
    return now.getDate();
}

export const getMonth = () => {
    return now.getMonth()+1;
}

export const getYear = () => {
    return now.getFullYear();
}

export const getHours = () => {
    return now.getHours();
}

export const getMinutes = () => {
    return now.getMinutes();
}

export const getSeconds = () => {
    return now.getSeconds();
}