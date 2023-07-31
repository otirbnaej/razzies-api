import app from '@src/app';
import request from 'supertest';

describe('Testes de integração da API', () => {
  it('Deve fazer o upload do arquivo CSV e processá-lo', async () => {
    const response = await request(app)
      .post('/csv/upload')
      .attach('movielist', './src/shared/infra/temp/movielist.csv');

    expect(response.status).toBe(200);
  });


  it('Deve retornar o produtor com menor e maior intervalos entre dois prêmios consecutivos', async () => {
    const response = await request(app).get('/producers/gap');

    expect(response.status).toBe(200);
    
    expect(response.body).toEqual(
      expect.objectContaining({
        min: expect.arrayContaining([
          expect.objectContaining({
            producer: expect.any(String),
            interval: expect.any(Number),
            previousWin: expect.any(Number),
            followingWin: expect.any(Number),
          }),
        ]),
        max: expect.arrayContaining([
          expect.objectContaining({
            producer: expect.any(String),
            interval: expect.any(Number),
            previousWin: expect.any(Number),
            followingWin: expect.any(Number),
          }),
        ]),
      }),
    );
  });
});
