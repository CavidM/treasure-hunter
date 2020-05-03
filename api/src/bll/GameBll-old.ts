export default class GameBll {

    public land:any[number][number] = [];
    public keys:string[] = [];       
    public reservedCells:any = [];

    constructor() {

        this.init = this.init.bind(this);
        this.createGame = this.createGame.bind(this);
        this.createDiagonalElements = this.createDiagonalElements.bind(this);
        this.createNearbyWays = this.createNearbyWays.bind(this);

        for(let i=0; i<5; i++) {
        this.land[i] = new Array(5).fill(null);

        let j = 0;

        while(j < 5) {
            this.keys.push(`${i}${j}`);
            j++;
        }
        }
    }

    public async init() {
        this.createGame(3);
    }

    public createGame(count: number): any {

        // console.log(randomElem, keys[randomElem]);

        let reservedCells:any = [];

        if(count === 0) {
            return this.land;
        }

        let randomElem = Math.floor(Math.random()*this.keys.length);

        let key = this.keys[randomElem].split('');
        console.log('random treasuer: ', key);

        let leftI = key[0];
        let rightI = key[1];

        this.land[leftI][rightI] = 'T';

        // console.log(leftI, rightI);

        this.reservedCells.push(this.keys[randomElem]);
        this.createNearbyWays(parseInt(leftI), parseInt(rightI), 3, false);
        this.createDiagonalElements(parseInt(leftI), parseInt(rightI));

        this.keys = this.keys.filter(value => !this.reservedCells.includes(value));

        console.log(this.reservedCells);
        // console.log(key);

        console.table(this.land);
        
        return this.createGame(--count);
    }

    public createDiagonalElements(leftI: number, rightI: number) {

        if(this.land[leftI-1] && this.land[leftI-1][rightI-1] === null) {
            this.land[leftI-1][rightI-1] = 2;
      
            this.reservedCells.push(`${leftI-1}${rightI-1}`);
        }
      
        if(this.land[leftI-1] && this.land[leftI-1][rightI+1] === null) {
            this.land[leftI-1][rightI+1] = 2;
      
            this.reservedCells.push(`${leftI-1}${rightI+1}`);
        }
      
        if(this.land[leftI+1] && this.land[leftI+1][rightI+1] === null) {
            this.land[leftI+1][rightI+1] = 2;
      
            this.reservedCells.push(`${leftI+1}${rightI+1}`);
        }
      
        if(this.land[leftI+1] && this.land[leftI+1][rightI-1] === null) {
            this.land[leftI+1][rightI-1] = 2;
      
            this.reservedCells.push(`${leftI+1}${rightI-1}`);
        }
      
        this.reserveDiagonalNearbyElements(leftI-1, rightI-1);
        this.reserveDiagonalNearbyElements(leftI-1, rightI+1);
        this.reserveDiagonalNearbyElements(leftI+1, rightI+1);
        this.reserveDiagonalNearbyElements(leftI+1, rightI-1);

        this.createEntryWays([
            [leftI-1, rightI-1],
            [leftI-1, rightI+1],
            [leftI+1, rightI+1],
            [leftI+1, rightI-1]
        ]);
    }

    public createEntryWays(arr:Array<any>[]) {

        let find = false;

        for(let i=0; i<arr.length; i++) {

            let leftOperand = parseInt(arr[i][0]);
            let rightOperand = parseInt(arr[i][1]);

            let res = this.createNearbyWays(leftOperand, rightOperand, 1);

            if(res){

                console.log('curren1: ', arr[i]);
                this.reserveDiagonalNearbyElements(leftOperand, rightOperand);

                break;
            }

        }
    }

    public createNearbyWays(leftI: number, rightI: number, symbol: number, once=true) {

        if(this.land[leftI] && this.land[leftI][rightI + 1] === null) {
            this.land[leftI][rightI + 1] = symbol;
      
            this.reservedCells.push(`${leftI}${rightI + 1}`);

            if(once) return true;
        }
      
        if(this.land[leftI] && this.land[leftI][rightI - 1] === null) {
            this.land[leftI][rightI - 1] = symbol;
      
            this.reservedCells.push(`${leftI}${rightI - 1}`);

            if(once) return true;
        }
      
        if(this.land[leftI + 1] && this.land[leftI + 1][rightI] === null) {
            this.land[leftI + 1][rightI] = symbol;
      
            this.reservedCells.push(`${leftI + 1}${rightI}`);

            if(once) return true;
        }
      
        if(this.land[leftI - 1] && this.land[leftI - 1][rightI] === null) {
            this.land[leftI - 1][rightI] = symbol;
      
            this.reservedCells.push(`${leftI - 1}${rightI}`);

            if(once) return true;
        }
    }

    public reserveDiagonalNearbyElements(leftI: number, rightI: number) {

        if(this.land[leftI] && this.land[leftI][rightI + 1] === null) {
            this.reservedCells.push(`${leftI}${rightI + 1}`);
        }
      
        if(this.land[leftI] && this.land[leftI][rightI - 1] === null) {
            this.reservedCells.push(`${leftI}${rightI - 1}`);
        }
      
        if(this.land[leftI + 1] && this.land[leftI + 1][rightI] === null) {
            this.reservedCells.push(`${leftI + 1}${rightI}`);
        }
      
        if(this.land[leftI - 1] && this.land[leftI - 1][rightI] === null) {
            this.reservedCells.push(`${leftI - 1}${rightI}`);
        }
      }
}