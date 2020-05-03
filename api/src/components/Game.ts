export interface IElement {
    type?: ElementTypes
    symbol: string
    next: ElementTypes[]
}

export enum ElementTypes {
    Treasure = 4,
    Three = 3,
    Two = 2,
    One = 1
}

export const ElementTreasure: IElement = {
    type: ElementTypes.Treasure,
    symbol: 'T',
    next: [ElementTypes.Three]
}

export const ElementThree: IElement = {
    type: ElementTypes.Three,
    symbol: '3',
    next: [ElementTypes.Two, ElementTypes.Treasure]
}

export const ElementTwo: IElement = {
    type: ElementTypes.Two,
    symbol: '2',
    next: [ElementTypes.One, ElementTypes.Three]
}

export const ElementOne: IElement = {
    type: ElementTypes.One,
    symbol: '1',
    next: [ElementTypes.Two]
}

export const ElementLimits: {[index: number]:any} = {
    [ElementTypes.Treasure]: 3,
    [ElementTypes.One]: 3,
    [ElementTypes.Three]: 10,
    [ElementTypes.Two]: 9
}

export const elementFactory = (type: ElementTypes):IElement | undefined => {

    switch(type) {
        case ElementTypes.Treasure: {
            return ElementTreasure;
        }
        case ElementTypes.Three: {
            return ElementThree;
        }
        case ElementTypes.Two: {
            return ElementTwo;
        }
        case ElementTypes.One: {
            return ElementOne;
        }
    }
}