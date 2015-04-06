var React=require("react");
  mui = require('material-ui'),
  RaisedButton = mui.RaisedButton,Tabs = mui.Tabs, Dialog=mui.Dialog, Menu=mui.Menu,Paper=mui.Paper
  ,Snackbar=mui.Snackbar,TextField=mui.TextField,Toolbar=mui.Toolbar,ToolbarGroup=mui.ToolbarGroup,
  DropDownMenu=mui.DropDownMenu,DropDownIcon=mui.DropDownIcon,FontIcon=mui.FontIcon;
var Tab=require("./tab");

var SvgIcon = mui.SvgIcon;
var filterOptions = [
  { payload: '1', text: 'All Broadcasts' },
  { payload: '2', text: 'All Voice' },
  { payload: '3', text: 'All Text' },
  { payload: '4', text: 'Complete Voice' },
  { payload: '5', text: 'Complete Text' },
  { payload: '6', text: 'Active Voice' },
  { payload: '7', text: 'Active Text' },
];
var iconMenuItems = [
  { payload: '1', text: 'Download' },
  { payload: '2', text: 'More Info' }
];

var maincomponent = React.createClass({
  getInitialState:function() {
    return {result:[],tofind:"君子"};
  },
  opendialog:function() {
  	this.refs.snackbar.show();
  }
  ,onChange:function(idx,tab){
  	console.log(idx,tab);
  }
  ,render: function() {
     return <div>
     		<RaisedButton mini={true} onClick={this.opendialog}  tooltip="GitHub">open</RaisedButton>
			<Tabs tabWidth={100} initialSelectedIndex={2} onchange={this.onChange}> 
			  <Tab label="Item One" > 
			    <div className="tab-template-container"> 
			      <h2 className="mui-font-style-headline">Tab One Template Example</h2> 
			      <p> 
			        This is an example of a tab template! 
			      </p> 
			      <p> 
			        You can put any sort of HTML or react component in here. 
			      </p> 
			    </div> 
			  </Tab> 
			  <Tab label="Item Two" > 
			    <div className="tab-template-container"> 
			      <h2 className="mui-font-style-headline">Tab Two Template Example</h2> 
			      <p> 
			        This is another example of a tab template! 
			      </p> 
			      <p> 
			        Fair warning - the next tab routes to home! 
			      </p> 
			    </div> 
			  </Tab> 
			  <Tab 
			    label="Item Three" 
			    route="home"> 
			    <h2>t3</h2>
			   </Tab>
			</Tabs> 
      </div>
  }

  ,_handleTouchTap:function() {
  	console.log("tap")
  }
});

module.exports=maincomponent;