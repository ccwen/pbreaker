/* material-ui tab doesn't listen to onClick */
var React = require('react');

var Tab = React.createClass({displayName: "Tab",
  propTypes: {
    handleTouchTap: React.PropTypes.func,
    selected: React.PropTypes.bool
  },
  handleTouchTap: function(){
    this.props.handleTouchTap(this.props.tabIndex, this);
  },
  render: function(){
    var styles = {
      width: this.props.width
    };
    var classes="mui-tab-item";
    if (this.props.selected) classes+=" mui-tab-is-active";

    return (
    React.createElement("div", {className: classes, style: styles, onClick:this.handleTouchTap,onTouchTap: this.handleTouchTap, routeName: this.props.route}, 
      this.props.label
    )
    )
  }
});

module.exports = Tab;