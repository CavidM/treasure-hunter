import {
    IElement, 
    ElementTypes,
    ElementThree,
    ElementTwo,
    ElementOne,
    ElementLimits,
    elementFactory
} from '../components/Game';
import {enumToArray, arrayRandomElem} from '../utils/DataHelper';
import Store from '../components/Store';
import {gamePlay, IGamePlay, ITurn} from '../components/GamePlay';

export default class GameBll {

    game: any[] = [];

    //count every element for avoiding wrong game dashboard
    Counter: {[index: number]:any};

    constructor() {}

    public getCounter() {
        return {
            [ElementTypes.Treasure]: 0,
            [ElementTypes.One]: 0,
            [ElementTypes.Three]: 0,
            [ElementTypes.Two]: 0
        }
    }

    public create(username: string): ITurn[] {

        let userGamePlay: IGamePlay = Store().get(username);

        console.log('store: ',userGamePlay);

        this.createGame();

        userGamePlay.current.game = this.game;
        userGamePlay.current.created_at = Date.now();
        userGamePlay.current.turns = [];

        Store().set(username, userGamePlay);

        console.log('store update: ',userGamePlay);

        // console.log(this.game);
        // console.log(this.Counter);
        console.log(this.parseReadableGame());

        return userGamePlay.current.turns;
    }

    public createGame():any {

        this.Counter = Object.assign({}, this.getCounter());
        const Elements =  enumToArray(ElementTypes);

        for (let i=0; i<5; i++) {

            this.game[i] = [];
        
            for(let k=0; k<5; k++) {
        
                //in case of not found element then recreate game again
                let avoidCounter = 0;

                let randomElem: any = null;
        
                //If its first element install any random element
                if(i === 0 && k === 0) {
                    randomElem = arrayRandomElem(Elements);
                }
        
                // If we are on the first row
                if(i === 0 && k !== 0) {
                    let prevElem = Object.assign({}, this.game[i][k-1]);
        
                    while(randomElem === null) {

                        avoidCounter++;

                        if(avoidCounter>5) {
                            return this.createGame();
                        }
        
                        randomElem = arrayRandomElem(prevElem.next);
        
                        if(this.Counter[randomElem] === ElementLimits[randomElem]) {
                            randomElem = null;
                        }
                    }
                }
        
                // if we're on first element of each row
                if(i !== 0 && k === 0) {
                    let prevElem = Object.assign({}, this.game[i-1][k]);
        
                    while(randomElem === null) {
        
                        avoidCounter++;
                        if(avoidCounter>5) {
                            return this.createGame();
                        }

                        randomElem = arrayRandomElem(prevElem.next);
        
                        if(this.Counter[randomElem] === ElementLimits[randomElem]) {
                            randomElem = null;
                        }
                    }
                }
        
                // if we're near to center
                if(i !== 0 && k !== 0) {
                    let leftPrevElem = Object.assign({}, this.game[i][k-1]);
                    let topPrevElem = Object.assign({}, this.game[i-1][k]);
        
                    while(randomElem === null) {
        
                        avoidCounter++;
                        if(avoidCounter>10) {
                            return this.createGame();
                        }

                        //FIXME:get common available next elements
                        let mergedArrays = leftPrevElem.next.filter((v:any) => topPrevElem.next.includes(v));
        
                        randomElem = arrayRandomElem(mergedArrays);
        
                        if(this.Counter[randomElem] === ElementLimits[randomElem]) {
                            randomElem = null;
                        }
                    }
                }
        
                this.Counter[randomElem] += 1;
        
                this.game[i][k] = elementFactory(randomElem);
            }
        }

        return true;
    }

    public parseReadableGame() {

        return this.game.map(current => {

            return current.reduce((acc:[], val:any) => {
        
                return [...acc, val.symbol];
            }, []);
        });
    }

    public play(turns:[], username: string) {

        let userGamePlay: IGamePlay = Store().get(username);
        let game = userGamePlay.current.game;

        let turnsType:any[] = [];
        let treasureCount = 0;
        let treasureExists = false;
        let threeExists = false;

        turns.forEach((val:any) => {

            let indexes:number[] = val.split('');

            let cellType:any = game[indexes[0]][indexes[1]].type;

            if(cellType) {
                turnsType.push({
                    index: val,
                    type: cellType 
                });

                if(cellType == ElementTypes.Treasure) {
                    treasureExists = true;
                    treasureCount++;
                }
                else if(cellType == ElementTypes.Three) {
                    threeExists = true;
                }
            }
        });

        let finalTurns = [];

        for(let i = 0; i < turnsType.length; i++) {

            if(treasureExists) {

                if(turnsType[i].type == ElementTypes.Treasure) {
                    finalTurns.push(turnsType[i]);
                }

                continue;
            }
            else if (threeExists) {

                if(turnsType[i].type == ElementTypes.Three) {
                    
                    finalTurns.push(turnsType[i]);
                    
                    break;
                }

                continue;
            }
            finalTurns.push(turnsType[i]);
        }

        console.log('333333: ',threeExists);
        console.log('ffffff: ',finalTurns);

        userGamePlay.current.turns = userGamePlay.current.turns.concat(finalTurns);

        let allTreasures = userGamePlay.current.turns.reduce((acc:number, val:ITurn):number => {

            if(val.type === ElementTypes.Treasure) {
                return acc += 1;
            }

            return acc;

        }, 0);

        if(allTreasures === ElementLimits[ElementTypes.Treasure]) {

            console.log('all treasures finded');

            userGamePlay.scores.push({
                created_at: Date.now(),
                score: userGamePlay.current.turns.length
            });
        }

        console.log('finish: ', userGamePlay);


        Store().set(username, userGamePlay);


        return {
            finalTurns
        }
    }

    public scores(username: string) {

        let store = Store().get(username);

        return store.scores;
    }
}