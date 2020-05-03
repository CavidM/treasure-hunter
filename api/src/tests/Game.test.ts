import * as chai from 'chai';

import {elementFactory, ElementTreasure, ElementTypes} from '../components/Game';

let expect = chai.expect;

describe('Game Component', () => {

    it('should return Treasure element', () => {

        let element = elementFactory(ElementTypes.Treasure);

        expect(element).to.deep.equal(ElementTreasure);

    });
})
