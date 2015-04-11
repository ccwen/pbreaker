var React=require("react/addons");

var kse=require("ksana-search");
var kde=require("ksana-database");

var BaseView = require("ksana-layer-react").BaseView;
var Infinite=require("ksana2015-components").infinite;
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
  return sr.excerpt.map(function(e){
    var hits=e.realHits.map(function(hit){
      return [hit[0],hit[1],{type:"hl"+hit[2]}];
    });
    return {text:e.text,hits:hits};
  });
}

var Item=React.createClass({
  mixins: [React.addons.PureRenderMixin]
  ,onselect:function(start,len,thechar) {
    console.log(this.props.index,start,len,thechar);
  }
  //markups={item.hits}  markupStyles={markupStyles}
  ,render:function() {
      return <BaseView onSelect={this.onselect} text={(this.props.text||"")}/>
  }
});

var MainComponent = React.createClass({
  componentDidMount:function() {
    /*
    var that=this;
    kse.search("cbeta","優婆塞 比丘",{realPos:true,nohighlight:true,range:{start:0,maxfile:5}},function(err,result){
      if (err)return;
      that.setState({rows:convertSearchResult(result)});
    });
*/
    kde.open("cbeta",function(err,db){
      this.setState({db:db,moredata:this.moredata});
    },this);

  }
  ,moredata:function(now,cb) {
    var keys=[];;
    var t="";
    for (var i=0;i<100;i++) {
      var fseg=this.state.db.absSegToFileSeg(now+i);
      keys.push(["filecontents",fseg.file,fseg.seg]);
    }
    this.state.db.get(keys,function(data){
      cb(data);
    })
  }
  ,getInitialState:function() {
    return {rows:[],markups:[[1,3,{type:"warn"}],[2,3,{type:"important"}] ]}
  }

  ,renderItem:function(item,idx) {

  }
  ,render: function() {
     return <div className="infinite-example" style={styles}>
        <Infinite onLoad={this.state.moredata} itemClass={Item} height={500}/>
     	</div>
  }

});

module.exports=MainComponent;