var React=require("react/addons");
var BaseView = require("ksana-layer-react").BaseView;
var MultiSelectView = require("ksana-layer-react").MultiSelectView;

var ReviseView = require("ksana-layer-react").ReviseView;
var Interline=require("ksana-layer-react").Interline;
var testdata=require("./testdata");
var styles={
  fontSize:"24px"
}
var E=React.createElement;

var Interline=require("ksana-layer-react").Interline;

var inputStyle={background:"black",color:"white","border": "1px solid #BBBBBB"};
var TestItem=React.createClass({
  mixins: [React.addons.PureRenderMixin]
  ,onselect:function(start,len,thechar) {
    console.log(this.props.index,start,len,thechar);
  }
  ,loadMarkups:function(markups) {
    return markups.map(function(m,idx){
    	var payload=JSON.parse(JSON.stringify(m[2]));
    	var insertstyle={},insertText;
    	if (payload.type=="replacePreview") {
    		insertText=E("span",{style:{textDecoration:"overline"}},payload.t);	
    	} else if (payload.type=="replaceEdit") {
    		insertText=E("input",{style:inputStyle,size:1,defaultValue:payload.t},"");
    	} else if (payload.type=="replaceActive") {
    		insertText=E("span",{},payload.t);	
    	}
    	
    	payload.before=E("span",{},E(Interline,{key:idx}),insertText);
    	return [m[0],m[1],payload];
    })
  } 
  //markups={item.hits}  markupStyles={markupStyles}
  ,render:function() {
      var markups=this.loadMarkups(this.props.markups||[]);
      return E(BaseView,{index:this.props.index,
              showCaret:true,markups:markups, onSelect:this.onselect, text:(this.props.text||"")}
       );
  }
});

var TestMain=React.createClass({
	renderItem:function(item,idx) {
		return <tr key={idx}><td><TestItem key={idx}text={item.text} markups={item.markups}/></td></tr>
	}
	,render:function() {
		return <table>{testdata.map(this.renderItem)}</table>
	}
})

module.exports=TestMain;