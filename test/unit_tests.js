const { expect } = require('chai');
const request = require('supertest');

// This block runs after all tests are finished.
// It closes the server to prevent the test process from hanging.
after((done) => {
    server.close(done);
});
const { app, server } = require('../src/server');

describe('API Endpoints', () => {
    
    it('GET / should return a welcome message', (done) => {
        request(app)
            .get('/')
            .end((err, res) => {
                expect(res.statusCode).to.equal(200);
                expect(res.text).to.equal('Welcome to the simple Node.js backend app!');
                done();
            });
    });

    describe('/api/users', () => {
        it('GET /api/users should return an array of users', (done) => {
            request(app)
                .get('/api/users')
                .end((err, res) => {
                    expect(res.statusCode).to.equal(200);
                    expect(res.body).to.be.an('array');
                    expect(res.body.length).to.be.at.least(2);
                    done();
                });
        });

        it('POST /api/users should create a new user', (done) => {
            request(app)
                .post('/api/users')
                .send({ name: 'Charlie' })
                .end((err, res) => {
                    expect(res.statusCode).to.equal(201);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('id');
                    expect(res.body.name).to.equal('Charlie');
                    done();
                });
        });

        it('GET /api/users/:id should return a single user', (done) => {
            request(app)
                .get('/api/users/1')
                .end((err, res) => {
                    expect(res.statusCode).to.equal(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body.name).to.equal('Alice');
                    done();
                });
        });

        it('PUT /api/users/:id should update a user', (done) => {
            request(app)
                .put('/api/users/1')
                .send({ name: 'Alice Smith' })
                .end((err, res) => {
                    expect(res.statusCode).to.equal(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body.name).to.equal('Alice Smith');
                    done();
                });
        });
        
        it('DELETE /api/users/:id should delete a user', (done) => {
            request(app)
                .delete('/api/users/2')
                .end((err, res) => {
                    expect(res.statusCode).to.equal(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body.id).to.equal(2);
                    done();
                });
        });

        it('GET /api/users/:id should return 404 for a non-existent user', (done) => {
            request(app)
                .get('/api/users/999')
                .end((err, res) => {
                    expect(res.statusCode).to.equal(404);
                    done();
                });
        });
    });
});
