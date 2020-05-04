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
            let selected = '';

            if(turns.indexOf(`${rowIndex}${columnIndex}`) !== -1) {
                style = 'selected';
            }

            if(element.type === 4) {
                treasureCount++;
            }

            rowComponent.push(<td 
                key={columnIndex} 
                data-id={`${rowIndex}${columnIndex}`}
                data-selected={`${selected}`}
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
        dispatch(CreateGame());
        dispatch(GameScores())
    }


    const onTableClick = (e:any) => {

        const data = e.target.dataset;
        const id = data.id;
        const selectedIndex = turns.indexOf(id);

        if(turns.length === 3 && selectedIndex === -1) {

            return;
        }

        let currentTurns:any = [...turns];

        selectedIndex == -1 ? currentTurns.push(id) : currentTurns.splice(selectedIndex, 1);

        console.log(turns, currentTurns);

        setTurns(currentTurns);
    }

    const playTurn = (e:SyntheticEvent) => {

        if(!turns.length) {
            alert('Select at least 1 cell')
        }

        dispatch(PlayTurn(turns));

        setTurns([]);
    }

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