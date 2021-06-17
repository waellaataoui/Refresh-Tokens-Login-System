import { expect, server, BASE_URL } from './setup';

describe('Users', () => {
  it('get users page', done => {
    server
      .get(`${BASE_URL}/users`)
      .expect(200)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.users).to.be.instanceOf(Array);
        res.body.users.forEach(m => {
          expect(m).to.have.property('id');
          expect(m).to.have.property('username');
          expect(m).to.have.property('password');
        });
        done();
      });
  });

  // it('posts messages', done => {
  //   const data = { name: 'some name', message: 'new message' };
  //   server
  //     .post(`${BASE_URL}/messages`)
  //     .send(data)
  //     .expect(200)
  //     .end((err, res) => {
  //       expect(res.status).to.equal(200);
  //       const msg = res.body.message;
  //       expect(res.body.message).to.be.instanceOf(Object);
  //       expect(msg).to.have.property('id');
  //       expect(msg).to.have.property('name', data.name);
  //       expect(msg).to.have.property('message', data.message);
  //       done();
  //     });
  // });
  // it('posts a bad message', done => {
  //   const data = { name: 'some name' };
  //   server
  //     .post(`${BASE_URL}/messages`)
  //     .send(data)
  //     .expect(400)
  //     .end((err, res) => {
  //       expect(res.status).to.equal(400);
  //       const { error } = res.body;
  //       expect(error).to.include('bad request');
  //       done();
  //     });
  // });
});
