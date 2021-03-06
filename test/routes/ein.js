var chai     = require('chai');
var expect   = require('chai').expect;
var chaiHttp = require('chai-http');
var ein      = require('../../routes/ein');
var app      = require('../../app');

chai.use(chaiHttp);

describe('EIN API tests', function() {

    it('should not return an error with a valid EIN', function(done) {
      chai.request(app)
      // GOODWILL ein
        .get('/ein/530196517')
        .end(function (err, res) {
           expect(err).to.be.null;
          done();
        });
    });

    it('should return a valid JSON response', function(done) {
      chai.request(app)
        .get('/ein/530196517')
        .end(function (err, res) {
           expect(res).to.be.json;
          done();
        });
    });

    it('should return a 200 response with a successful call', function(done) {
      chai.request(app)
        .get('/ein/530196517')
        .end(function (err, res) {
           expect(res).to.have.status(200);
          done();
        });
    });

    it('should return a 404 with a bad call', function(done) {
      chai.request(app)
        .get('/ein/badEIN')
        .end(function (err, res) {
           expect(res).to.have.status(200);
           expect(res.text.slice(84, 87).toString()).to.equal('404');
          done();
        });
    });

    it('should return a valid org, address, city and state', function(done) {
      chai.request(app)
        .get('/ein/530196517')
        .end(function (err, res) {
          expect(res.body).to.have.property('name');
          expect(res.body.name).to.be.a('string');
          expect(res.body).to.have.property('address');
          expect(res.body.address).to.be.a('string');
          expect(res.body).to.have.property('city');
          expect(res.body.city).to.be.a('string');
          expect(res.body).to.have.property('state');
          expect(res.body.state).to.be.a('string');
          done();
        });
    });

});
