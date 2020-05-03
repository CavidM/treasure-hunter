import React from 'react';
import {useSelector, useDispatch} from 'react-redux';

function ScoreContainer() {

    let scores = useSelector(((state:any) => state.Game.scores));

    let scoresElem:any = [];

    scores.sort((l:any, r:any) => {
        return r.score - l.score;
    })

    scores.forEach((scoreData:any) => {
        
        let date = new Date(parseInt(scoreData.created_at));
        
        let readableDate = `${date.toDateString()} ${date.getUTCHours()}:${date.getMinutes()}`
        
        scoresElem.push(
            <tr>
                <td></td>
                <td>{scoreData.score}</td>
                <td>{readableDate}</td>
            </tr>
        );
    });

    return (
        <table className="scores">
            <tbody>
                <tr>
                    <th>ID</th>
                    <th>Score</th>
                    <th>Date</th>
                </tr>
                {scoresElem}
            </tbody>
        </table>
    );
}

export default ScoreContainer;
