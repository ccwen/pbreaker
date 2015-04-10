var React=require("react");
var kse=require("ksana-search");
var FlattenView = require('ksana-layer-react').FlattenView;
var styles={
  fontSize:"24px"
}
var E=React.createElement;

var markupStyles={
  important:{color:"blue"}
  ,hl0:{backgroundColor:"red",color:"yellow"}
  ,hl1:{backgroundColor:"green",color:"yellow"}
};
var convertSearchResult=function(sr) {
  console.log(sr)
  return sr.excerpt.map(function(e){
    var hits=e.realHits.map(function(hit){
      return [hit[0],hit[1],{type:"hl"+hit[2]}];
    });
    return {text:e.text,hits:hits};
  });
}
var MainComponent = React.createClass({
  componentDidMount:function() {
    var that=this;
    kse.search("cbeta","優婆塞 比丘",{realPos:true,nohighlight:true,range:{start:0,maxfile:5}},function(err,result){
      if (err)return;
      that.setState({rows:convertSearchResult(result)});
    });
  }
  ,getInitialState:function() {
    return {rows:[],markups:[[1,3,{type:"warn"}],[2,3,{type:"important"}] ]}
  }
  ,onselect:function(start,len,thechar) {
    console.log(start,len,thechar);
  }
  ,renderItem:function(item,idx) {
      return <FlattenView key={idx} onSelect={this.onselect} text={item.text}
         markups={item.hits} markupStyles={markupStyles}/>
  }
  ,render: function() {
     return <div style={styles}>
        {this.state.rows.map(this.renderItem)}
     	</div>
  }

});

module.exports=MainComponent;