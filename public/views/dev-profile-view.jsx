var React = require('react');
var Reflux = require('reflux');
var Header = require('../components/shared/header');
var Footer = require('../components/shared/footer');
var ProfHeader = require('../components/profile/profile-header');
var DevProfBody = require('../components/profile/dev-profile-body');
var Bio = require('../components/profile/profile-bio');
var Projects = require('../components/profile/profile-projects');
var ProfileStore = require('../stores/profile-store');
var Actions = require('../actions');


module.exports = React.createClass({
	mixins:[
		Reflux.listenTo(ProfileStore, 'onChange')
	],
	getInitialState: function(){
		return {
			userData: []
		}
	},
	render: function() {
		return (
			<div className="fullscreen">
        <Header link='/' title='Home'/>
        <div className="">
		      <ProfHeader />
		      <DevProfBody />
		      <Bio />
		      <Projects />
		      <Footer />
		    </div>
	    </div>
		)
	},
	onChange: function(event, userData){
		this.setState({userData: userData})
	}
})