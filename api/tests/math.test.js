
import { expect } from 'chai';
import { add } from '../src/utils/math.mjs';
import app from '../src/index.js';

describe('Math Functions', ()=>{
    it('Retourne la somme de 2 + 3', () => {
        const result = add(2,3);
        const attempt_result = 5;
        expect(result).to.equal(attempt_result);
    })
})

// describe('Math Functions', ()=>{
//     it('Retourne la somme de 2 + 3', (done) => {
//         chai.request(app)
//             .get('/ping')
//             .end((err, res)=>{

//             })
//     })
// })