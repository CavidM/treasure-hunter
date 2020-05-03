import GameBll from '../../bll/GameBll';
import * as chai from 'chai';

let expect = chai.expect;

describe('GameBll',  () => {

    let bll = new GameBll();

    it('fn createGame() should create game dasbhoard', () => {

        bll.createGame();

        expect(bll.game).to.have.lengthOf(5);

    });

});