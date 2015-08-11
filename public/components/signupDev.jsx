var React = require('react');
var Formsy = require('formsy-react');
var Router = require('react-router');
var Link = Router.Link;

module.exports = React.createClass({	
	render: function() {
		return (
	    <form>
	      <div className="form-group techstrengths">
			    <label htmlFor="techstrengths">Tech Strengths (optional)</label> 
		      <input type="text" id="techstrengths" placeholder="Angular.js, Node.js, Python, Databases, etc." className="form-control" />
		    </div>
				<div className="form-group techstrengths" id="addlLinks">
			    <label htmlFor="links">Additional Links (optional)</label>
		      <input type="text" id="links" placeholder="LinkedIn, Github, Angel List, Website, etc." className="form-control" />
		    </div>
		    <div className="signupCentered">
			    <button className="btn signupBtn" onClick={this.addLinks.bind(this, this.divId, this.newLinkHTML)}>Add +</button> <br />
			    <div className="form-group">
				    <input type="checkbox" value="" className="checkbox-inline"> Open to being contacted</input>
				    <input type="checkbox" value="" className="checkbox-inline"> I agree to the terms</input>
				  </div>
          <Link to={this.authenticate()}>
			      <button type="submit" className="btn signupBtn text-center">Sign Up</button>
          </Link>
			  </div>
			</form> 
		)
	},
  authenticate: function(){
    var auth = true;
    if(auth){
      return "/dashboard";
    } else{
      return "/";
    }
  },
	divId: 'addlLinks',
	newLinkHTML: '<input type="text" value="" id="links" placeholder="LinkedIn, Github, Angel List, Website, etc." class="form-control formBox form-margin" />',

	addlFieldCount: 2,
	addlFieldLimit: 4,
	addLinks: function(divId, newLink) {
    if (this.addlFieldCount === this.addlFieldLimit) {
    	console.log("Maximum fields added");
    } else {
    	var newdiv = document.createElement('div');
		  newdiv.innerHTML = newLink;
    	document.getElementById(divId).appendChild(newdiv);
    	this.addlFieldCount++;
    }
	}
})