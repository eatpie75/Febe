var Promise = require('bluebird');
var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = chai.expect;
chai.use(chaiHttp);
chai.request.addPromises(Promise);

var app = require('../../app');
var models = require('../../db');

var http = chai.request.agent(app);

var clean_up = function(ids, cb) {
  models.db.query('MATCH (n) WHERE id(n) IN {ids} OPTIONAL MATCH (n)-[r]-() OPTIONAL MATCH (te:TimelineEntry)<-[r2]->(n) DELETE n,r,r2,te', {'ids': ids}, function() {
    cb();
  }, function() {
    cb();
  });
};

describe('Project Route Tests', function() {
  var ids_to_be_deleted = [];
  var instances = {};

  before(function(done) {
    models.User.create({'kind': 'rep', 'first_name': 'test', 'last_name': 'user', 'email': 'p_test_rep@gmail.com', 'password': '$2a$10$rRuOCaxfc4p16.cjoAYI2els/JeZvqB9kb707zNcWpFB6ZlP1yzYe'}).then(function(user) {
      instances.user = user;
      ids_to_be_deleted.push(instances.user.id);
      return http.post('/auth/login').send({'email': 'p_test_rep@gmail.com', 'password': 'testtest'});
    }).then(function() {
      return models.Organization.create({
        'ein': '123',
        'name': 'test_org',
        'description': 'abc',
        'website_url': 'http://cats.com',
        'location': 'cat city'
      }, instances.user.id);
    }).then(function(organization) {
      instances.organization = organization;
      ids_to_be_deleted.push(instances.organization.id);
      done();
    });
  });

  after(function(done) {
    clean_up(ids_to_be_deleted, done);
  });

  it('should be able to create a Project', function(done) {
    http.post('/project')
    .send({
      'name': 'test_project',
      'complete_by': Date.now(),
      'description': 'def',
      'links': ['http://facebook.com/cats']
    }).then(function(res) {
      instances.project = res.body;
      ids_to_be_deleted.push(instances.project.id);

      expect(res).to.have.status(200);
      expect(res).to.be.json;
      expect(res.body.name).to.be.eql('test_project');

      models.Project.with_extras(instances.project).then(function(project) {
        expect(project.links).to.have.length(1);
        expect(project.links[0]).to.be.eql('facebook|http://facebook.com/cats');
        expect(project.active).to.be.true;
        done();
      });
    }, done);
  });

  it('should be able to update a Project', function(done) {
    http.put('/project/' + instances.project.id)
    .send({
      'name': 'updated_test_project',
      'links': ['http://facebook.com/cats', 'http://cats.com']
    }).then(function(res) {
      expect(res).to.have.status(200);
      return models.Project.read(instances.project.id);
    }).then(function(project) {
      expect(project.name).to.be.eql('updated_test_project');
      expect(project.links).to.have.length(2);
      done();
    });
  });

});
