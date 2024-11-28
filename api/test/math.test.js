
import { use, expect } from 'chai';

import chaiHttp, { request } from 'chai-http';

import { add } from '../src/utils/math.js';
import app from '../src/index.js';

use(chaiHttp);


describe('Math Functions', ()=>{
    it('Retourne la somme de 2 + 3', () => {
        const result = add(2,3);
        const attempt_result = 5;
        expect(result).to.equal(attempt_result);
    })
})

describe('Math Functions', ()=>{
    it('Fetch', (done) => {
        request("http://127.0.0.1:3000/")
            .get('/ping')
            .end((err, res)=>{
                expect(res).to.have.status(200);
            })
    })
})
