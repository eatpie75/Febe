var React = require('react');
var Reflux = require('reflux');
var Footer = require('../components/shared/footer');
var Router = require('react-router');
var Actions = require('../actions');
var Navigation = require('react-router').Navigation;
var Link = Router.Link;
var Participant = require('../components/profile/participant')
var Timeline = require('../components/project/project-timeline')
var Description = require('../components/project/project-description')
var Contributors = require('../components/project/project-contrib')
var ProjectMedia = require('../components/project/project-media')
var ProjectMethods = require('../components/project/sharedProjectMethods/')
var ProjectEdit = require('../components/project/edit-components/project-body-edit')
var ProjectStore = require('../stores/project-store');
var Organization = require('../components/organization/org-description-in-project');
var ProjectTags = require('../components/project/project-tags')


module.exports = React.createClass({
  mixins: [Reflux.listenTo(ProjectStore, 'onChange'), Navigation],

  getInitialState: function(){
    return {
      title: 'Project Title',
      location: 'Project Location',
      description: 'Project info',
      tags: [],
      contributors: ['john', 'bob', 'joe', 'sally'],
      startDate: 'START DATE',
      endDate: 'END DATE',
      managerData: [],
      orgData: [],
      orgName: '',
      repData: [],
      devData: [],
      orgID: null,
      swap: false,
    };
  },

  componentWillMount: function(){
    Actions.getProject(sessionStorage.getItem('projectId'));
  },

  onChange: function(event, data){
    this.setState({
      title: data.name,
      location: data.organization.location,
      description: data.description,
      startDate: data.created,
      endDate: data.complete_by,
      ownerFirst: data.owner.first_name,
      ownerLast: data.owner.last_name,
      repData: data.owner,
      orgData: data.organization,
      orgName: data.organization.name,
      orgID: data.organization.id,
      tags: data.skills
    });
  },

  edit: function() {
    console.log('rep', this.state.repData, 'org', this.state.orgData)
    this.setState({
      swap: !this.state.swap
    });
  },

  save: function() {
    var updateData = {
      title: this.state.title,
      description: this.state.description,
    };
    ProjectMethods.updateProject('/project', updateData);
  },

  updateTitle: function(title) {
    this.setState({
      title: title
    });
  },

  updateLocation: function(location) {
    this.setState({
      location: location
    });
  },

  updateDescription: function(description) {
    this.setState({
      description: description
    });
  },

  updateTechnology: function(technology) {
    this.setState({
      technology: technology
    });
  },

  updateContributors: function(contributors) {
    this.setState({
      contributors: contributors
    });
  },

  updateMedia: function(media) {
    this.setState({
      media: media
    });
  },

  goToOrg: function(orgID){
    this.transitionTo('/organization/' + orgID);
  },

  projectEdit: function(edit) {
    return edit ? 
      <div>
        <Timeline time={this.state.endDate} />
        <Description desc={this.state.description} />
        <ProjectTags tags={this.state.technology} />
        <ProjectMedia />
      </div>
      :
      <div>
        <ProfileHeaderEdit 
            edit={this.save}
            firstName={this.state.userData.first_name}
            lastName={this.state.userData.last_name}
            updateTitle={this.updateTitle}
            updateLocation={this.updateLocation} />
        <BioEdit updateBio={this.updateBio} />
      </div>
  },

  render: function(){
    return (
      <div>
        <div>
          <h3 className='proj-title'> {this.state.title} </h3> 
          <button className='btn btn-warning edit-follow' onClick={this.edit}> Edit </button>
        </div>
        <div className='project-prof'>
        <div className='project-prof1'>
          <Participant 
            firstName={this.state.repData.first_name}
            lastName={this.state.repData.last_name}
            title={this.state.orgData.name} 
            location={this.state.repData.location} 
            type={'Non-Profit Representative'}/>
        </div>
        <div className='project-prof2'>
          <Participant 
            firstName={this.state.ownerFirst}
            lastName={this.state.ownerLast}
            title={this.state.orgName} 
            location={this.state.location} 
            type={'Project Manager'}/>
        </div>
        </div>
        <div className='org-desc'>
          <Organization 
          name={this.state.orgData.name} 
          location={this.state.orgData.location}
          website={this.state.orgData.website_url} />
        </div>
          <button className='btn btn-primary org-link-btn' onClick={this.goToOrg.bind(this, this.state.orgID)}> Organization Link </button>
        <div className='timeline-proj'>
          <Timeline 
            start={this.state.startDate}
            end={this.state.endDate} />
        </div>
        <div className='proj-desc'>
          <Description desc={this.state.description} />
          <ProjectTags tags={this.state.tags} />
          <ProjectMedia />
        </div>
        <Footer />
      </div>
    )
  },
});