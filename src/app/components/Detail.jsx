'use strict';

import React from 'react';
import Reflux from 'reflux';

import HotWords from './HotWords.jsx';
import ListUl from './ListUl.jsx';
import AjaxMixin from '../mixins/AjaxMixin.js';
import StorageMixin from '../mixins/StorageMixin.js';
import ajaxConfig from '../util/ajaxConfig.js';
import HotWordsAction from '../actions/HotWordsAction';
import DetailAction from '../actions/DetailAction';
import HotWordsStore from '../stores/HotWordsStore';
import DetailStore from '../stores/DetailStore';
import { Link } from 'react-router';

const Detail = React.createClass({
  
  mixins: [ 
    AjaxMixin, 
    StorageMixin,
    Reflux.connect(DetailStore, 'detail'), 
    Reflux.listenTo(DetailStore, 'onStatusChange'),
    Reflux.connect(HotWordsStore, 'hotwords'), 
    Reflux.listenTo(HotWordsStore, 'onHotWordsStatusChange')
  ],
  
  getInitialState() {
    let initialData = this.getData("preData");
    if (!initialData || initialData == "") {
      return {
        data: {
          content: {
            current: {},
            next: {
              title: ""
            },
            last: {
              title: ""
            }
          },
          recommend: {
            cotnentBases: []
          }
        },
        hotwordsGroup: 1,
        hotwordslist: [],
        style: {
          display: 'block'
        },
        loadingStyle: {
          display: 'none'
        }
      };
    } else {
      return {
        data: initialData.data,
        hotwordsGroup: initialData.hotwordsGroup,
        hotwordslist: initialData.hotwordslist,
        style: {
          display: 'block'
        },
        loadingStyle: {
          display: 'none'
        }
      };
    }
  },
  componentDidMount() {
    if (!this.getData("preData")) {
      DetailAction.getInfo(
        this.props.location.query.cid,
        this.props.location.query.bid,
        this.props.location.query.oid,
        this.props.location.query.st,
        this.props.location.query.viewType
      );
    } else {
      localStorage.removeItem("preData");
    }
  },
  componentWillReceiveProps(nextProps) {
    let oldQuery = this.props.location.query;
    let newQuery = nextProps.location.query;

    if (oldQuery !== newQuery) {
      // window.location.reload();
     
      this.setState({
        loadingStyle: {
          display: 'none'
        }
      });
     
      DetailAction.getInfo(
        newQuery.cid,
        newQuery.bid,
        newQuery.oid,
        newQuery.st,
        newQuery.viewType
      );
    }
  },
  componentDidUpdate() {
    this.handleShare();
  },

  shouldComponentUpdate(nextProps, nextState) {
    var ret = typeof nextState.data.content.current.objectId !== "undefined" &&
           nextState.data.content.current.objectId != "";
    return ret;
  }
  ,

  render() {
    let imgContent,recommendNode,detailUrlNode;
    if (this.state.data.content.current.sourceType == 1 
        || this.state.data.content.current.sourceType == 4
        || this.state.data.content.current.sourceType == 5) {
      imgContent = <img className="light-img" src={this.state.data.content.current.middlePic} />
    }
    if (this.state.data.recommend) {
      recommendNode = (
        <div className="recommend mt10">
          <h2 className="recommend-title">猜你喜欢</h2>
          <div className="recommend-list">
            <ListUl 
              newslist={this.state.data.recommend.cotnentBases} 
              cid={this.state.data.recommendId} 
              bid={this.state.data.recommend.batchId}
              viewType={this.state.data.recommendViewType}
              isRecommend={true}
            />
          </div>
        </div>
      )
    }
    if (this.state.data.content.current.sourceType != 1) {
      detailUrlNode = <a href={this.state.data.content.current.url} className="news-detail-url">查看原网页</a>
    }

    return (
      <div id="listdetail" className="full-height" style={this.state.style}>
        <header className="header-bar">
          <i className="back-btn">
            <Link to={`/${this.props.location.query.viewType}/${this.state.data.cid}`}></Link>
          </i>
          <i className="header-right-btn">
            <a className="share-btn"></a>
          </i>
        </header>
        <div className="news-detail-box">
          <h1 className="news-detail-title" ref="detailTitle">{this.state.data.content.current.title}</h1>
          <div className="news-detail-content" dangerouslySetInnerHTML={this.getContext(this.state.data.content.current.context)}></div>
          {imgContent}
          <div className="news-detail-bottom">
            <span className="news-detail-time">{this.state.data.content.current.authorName}</span>
            {detailUrlNode}
          </div>
        </div>
        <div className="news-detail-beside">
          {this.getNextPrev(this.state.data.content.last, "上一条")}
          {this.getNextPrev(this.state.data.content.next, "下一条")}
        </div>
        <HotWords hotwordslist={this.state.hotwordslist} handleChangeFn={this.handleChange} />
        {recommendNode}
        <div className="bottom-nav mt10">
          <ul className="clearfix">
            <li className="nav-icon-news"><Link to={`/small/158`}>头条</Link></li>
            <li className="nav-icon-stuff"><Link to={`/small/159`}>Hi段子</Link></li>
            <li className="nav-icon-beauty"><Link to={`/waterfall/160`}>美女</Link></li>
            <li className="nav-icon-finance"><Link to={`/small/157`}>财经</Link></li>
            <li className="nav-icon-society"><Link to={`/small/153`}>社会</Link></li>
            <li className="nav-icon-entertainment"><Link to={`/small/154`}>娱乐</Link></li>
            <li className="nav-icon-sexes"><Link to={`/light/161`}>两性</Link></li>
            <li className="nav-icon-sport"><Link to={`/small/155`}>体育</Link></li>
            <li className="nav-icon-exposure"><Link to={`/small/162`}>曝光台</Link></li>
            <li className="nav-icon-comic"><Link to={`/light/163`}>暴漫</Link></li>
            <li className="nav-icon-sexy"><Link to={`/waterfall/164`}>性感</Link></li>
            <li className="nav-icon-toilet"><Link to={`/small/166`}>厕所读物</Link></li>
            <li className="nav-icon-selfie"><Link to={`/light/167`}>自拍</Link></li>
            <li className="nav-icon-emotion"><Link to={`/small/168`}>情感</Link></li>
            <li className="nav-icon-private"><Link to={`/small/170`}>私密话</Link></li>
            <li className="nav-icon-cars"><Link to={`/light/171`}>汽车</Link></li>
            <li className="nav-icon-military"><Link to={`/small/172`}>军事</Link></li>
            <li className="nav-icon-figure"><Link to={`/waterfall/174`}>萌图</Link></li>
            <li className="nav-icon-technology"><Link to={`/small/175`}>科技</Link></li>
            <li className="nav-icon-joke"><Link to={`/small/156`}>笑话</Link></li>
          </ul>
        </div>
        <footer className="footer-bar">
          <ul className="clearfix">
            <li><Link to={`/feedback`}>意见反馈</Link></li>
            <li><Link to={`/copyright`}>版权声明</Link></li>
          </ul>
        </footer>
        <div className="loading-bg" style={this.state.loadingStyle}>
          <div className="loading-icon"></div>
        </div>
      </div>
    );
  },
  onStatusChange(data) {
    // console.log(data)
    if (data.isRecommend) {
      let url = "";
      if (data.data.content.current.sourceType == 3 || data.data.content.current.sourceType == 4) {
        url = "/go.do?st="+data.data.content.current.sourceType+"&url="+data.data.content.current.url;
      } else {
        url = "/dev3/app.html#/detail/?cid="+data.data.cid+
              "&bid="+data.data.bid+
              "&oid="+data.data.content.current.objectId+
              "&viewType="+data.viewType+
              "&st="+data.data.content.current.sourceType+
              "&trace=list_"+data.data.cid;
      }
      window.history.pushState('listdetail', '', url);
    }

    if (this.isMounted()) {
      this.setState({
        data: data.data,
        hotwordslist: data.hotwordslist,
        hotwordsGroup: data.hotwordsGroup,
        style: {
          display: 'block'
        },
        loadingStyle: {
          display: 'none'
        }
      });
      window.scroll(0,0);
    }
  },
  getContext(context) {
    return {__html: context}; 
  },
  getNextPrev(data, type) {
    let besideNode;
    if (data) {
      besideNode = (
        // <Link to={`/detail/`} query={{ 
        //   cid: this.state.data.cid, 
        //   bid: this.state.data.bid, 
        //   oid: data.objectId,
        //   viewType: this.props.location.query.viewType
        // }} className="news-detail-side">{ type + "：" + data.title }</Link>
        <a className="news-detail-side" href={"/dev3/app.html#/detail/?cid="+this.state.data.cid+"&bid="+this.state.data.bid+"&oid="+data.objectId+"&viewType="+this.props.location.query.viewType}>
          <span>{type}</span>{"：" + data.title }
        </a>
      );
    }
    return besideNode;
  },
  handleChange() {
    HotWordsAction.changeItem(this.state.hotwordsGroup);
  },
  handleShare() {
    if (this.state.data.content.current.context) {
      let title = "";
      if (this.state.data.content.current.title) {
        title = this.state.data.content.current.title;
      } else {
        title = this.state.data.content.current.context.substring(0, 40) + "...";
      }
      document.querySelector(".share-btn").href="javascript:ShareInPage.nativeShare('"+document.title+"', '"+title+" "+window.location.href+"', '"+window.location.href+"', '"+window.location.href+"')";
    }
  },
  onHotWordsStatusChange(data) {
    if (this.isMounted()) {
      this.setState({
        hotwordslist: data.list,
        hotwordsGroup: data.nextGroup
      });
    }
  },
});

export default Detail;