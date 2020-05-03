import React, { ReactElement, ReactNode, useState, EventHandler, SyntheticEvent } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { PlayTurn, CreateGame, GameScores } from '../../store/actions/GameAction';
import ScoreContainer from './ScoreContainer';

// interface IcellEvent extends Target {
    // target
// }

function GameContainer() {   
    
    const dispatch = useDispatch();

    let gamepPlay = useSelector(((state:any) => state.Game.current));

    let [turns, setTurns] = useState<string[]>([]);

    let dashboard: any = [];

    let treasureCount = 0;

    gamepPlay.forEach((row: any, rowIndex:number) => {

        let rowComponent:any = [];

        row.forEach((element: any, columnIndex:number) => {

            let style = '';

            if(turns.indexOf(`${rowIndex}${columnIndex}`) !== -1) {
                console.log(turns);
                console.log(turns.indexOf(`${rowIndex}${columnIndex}`));
                style = 'selected';
            }

            if(element.type === 4) {
                treasureCount++;
            }

            rowComponent.push(<td 
                key={columnIndex} 
                data-id={`${rowIndex}${columnIndex}`} 
                className={`cell ${style}`} >
                    {element.type}
                </td>
            )
        });

        dashboard.push(
            <tr key={rowIndex}>{rowComponent}</tr>
        );
    });

    if(treasureCount === 3) {
        console.log('all founds, new game dashboard');
        dispatch(CreateGame());
        dispatch(GameScores())
    }


    const onTableClick = (e:any) => {

        if(turns.length === 3) {

            console.log('select max 3 elements');

            return;
        }

        let currentTurns:any = [];

        const id = e.target.dataset.id;

        currentTurns = turns.indexOf(id) === -1 ? [...turns, id] : turns;

        setTurns(currentTurns);
    }

    const playTurn = (e:SyntheticEvent) => {

        if(!turns.length) {
            alert('Select at least 1 cell')
        }

        dispatch(PlayTurn(turns));

        setTurns([]);
    }

    console.log(turns);

    return(
        <React.Fragment>
            <ScoreContainer/>
            <div className="game-play">
            <table className="game-table" onClick={onTableClick}>
                <tbody>
                {dashboard}
                </tbody>
            </table>
            <button className="play" type="button" onClick={playTurn}>Play</button>
        </div>
        </React.Fragment>
    );
}

export default GameContainer;