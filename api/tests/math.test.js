

import { add ,subtract} from '../src/utils/math.js';
import { expect } from 'chai';
import app from '../src/index.js';
import request from 'supertest';

describe('Test api users', () => {
  it('Endpoint /users', async () => {
    const res = await request(app).get('/users');
   // expect(res)

   expect(res.status).to.equal(200);
  });
  it('Endpoint /videos', async () => {
    const res = await request(app).get('/videos');
   // expect(res)

    expect(res.status).to.equal(200);
  });

  
});


describe('Math Functions', ()=>{
    it('Retourne la somme de 2 + 3', () => {
        const result = add(2,3);
        const attempt_result = 5;
        expect(result).to.equal(attempt_result);
    })
    it("substract",()=>{
      const result=subtract(2,3);
      const attempt_result=-1;
    //  expect(result===attempt_result);
      expect(result).to.equal(attempt_result);
    })
})

