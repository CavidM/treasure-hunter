export const enumToArray = (enumVar:any):any[] => Object.values(enumVar).filter(value => Number(value));

export const arrayRandomElem = (arr: any[]):[keyof any] =>
    arr[Math.floor(Math.random() * arr.length)];