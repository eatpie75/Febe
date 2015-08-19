var _ = require('lodash');
var React = require('react');
var Reflux = require('reflux');
var mui = require('material-ui');
var ThemeManager = new mui.Styles.ThemeManager();
var Header = require('../components/shared/header');
var Footer = require('../components/shared/footer');
var Router = require('react-router');
var ThumbnailList = require('../components/thumbnail/thumbnailList');
var Link = Router.Link;

var TimelineStore = require('../stores/timeline-store');
var Actions = require('../actions');

var TimelineEntry = require('../components/dashboard/timelineEntry');

module.exports = React.createClass({
  mixins: [Reflux.listenTo(TimelineStore, 'onLoad')],
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },
  getChildContext: function(){ 
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },
  componentWillMount: function(){
    Actions.getTimeline();
  },
  getInitialState: function() {
    return {
      'timeline': []
    };
  },
  onLoad: function(event, timeline) {
    this.setState({'timeline': timeline});
  },
  render: function(){
    return (
      <div>
        <Header link='/' title='Browse'/>
        <div className="timeline-container">
          {this.state.timeline.map(function(entry) {
            return <TimelineEntry key={entry.entry.id} entry={entry}/>;
          }.bind(this))}
        </div> 
        <Link to="/devprofile"><button className="btn btn-primary">Dev Profile</button></Link>
        <Link to="/createproject"><button className="btn btn-primary">Create Project</button></Link>
        <Link to="/npprofile"><button className="btn btn-primary">View NP Profile</button></Link>
        <Link to="/createorg"><button className="btn btn-primary">Create Organization</button></Link>
        <div>
          <ThumbnailList />
        </div> 
        <Footer />
      </div>
    );
  }
});
