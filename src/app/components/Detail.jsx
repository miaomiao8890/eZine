'use strict';

import React from 'react';
import Reflux from 'reflux';

import HotWords from './HotWords.jsx';
import ListUl from './ListUl.jsx';
import AjaxMixin from '../mixins/AjaxMixin.js';
import ajaxConfig from '../util/ajaxConfig.js';
import HotWordsAction from '../actions/HotWordsAction';
import DetailAction from '../actions/DetailAction';
import HotWordsStore from '../stores/HotWordsStore';
import DetailStore from '../stores/DetailStore';
import { Link } from 'react-router';

const Detail = React.createClass({
  
  mixins: [ 
    AjaxMixin, 
    Reflux.connect(DetailStore, 'detail'), 
    Reflux.listenTo(DetailStore, 'onStatusChange'),
    Reflux.connect(HotWordsStore, 'hotwords'), 
    Reflux.listenTo(HotWordsStore, 'onHotWordsStatusChange')
  ],
  
  getInitialState() {
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
        display: 'none'
      }
    };
  },
  componentDidMount() {
    DetailAction.getInfo(
      this.props.location.query.cid,
      this.props.location.query.bid,
      this.props.location.query.oid
    );
  },
  componentWillReceiveProps(nextProps) {
    let oldCid = this.props.location.query;
    let newCid = nextProps.location.query;

    if (oldCid !== newCid) {
      window.location.reload();
    }
  },
  componentDidUpdate() {
    this.handleShare();
  },
  render() {
    let imgContent,recommendNode,detailUrlNode;
    if (this.props.location.query.viewType == 'light') {
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
          <li className="nav-icon-news"><Link to={`/news/55`}>头条</Link></li>
          <li className="nav-icon-stuff"><Link to={`/light/59`}>Hi段子</Link></li>
          <li className="nav-icon-beauty"><Link to={`/waterfall/19`}>美女</Link></li>
          <li className="nav-icon-finance"><Link to={`/news/16`}>财经</Link></li>
          <li className="nav-icon-society"><Link to={`/news/15`}>社会</Link></li>
          <li className="nav-icon-entertainment"><Link to={`/news/21`}>娱乐</Link></li>
          <li className="nav-icon-sexes"><Link to={`/news/29`}>两性</Link></li>
          <li className="nav-icon-sport"><Link to={`/news/18`}>体育</Link></li>
          <li className="nav-icon-exposure"><Link to={`/light/120`}>曝光台</Link></li>
          <li className="nav-icon-comic"><Link to={`/light/83`}>暴漫</Link></li>
          <li className="nav-icon-sexy"><Link to={`/waterfall/24`}>性感</Link></li>
          <li className="nav-icon-toilet"><Link to={`/light/134`}>厕所读物</Link></li>
          <li className="nav-icon-selfie"><Link to={`/light/110`}>自拍</Link></li>
          <li className="nav-icon-emotion"><Link to={`/light/25`}>情感</Link></li>
          <li className="nav-icon-private"><Link to={`/light/75`}>私密话</Link></li>
          <li className="nav-icon-cars"><Link to={`/light/131`}>汽车</Link></li>
          <li className="nav-icon-military"><Link to={`/light/52`}>军事</Link></li>
          <li className="nav-icon-figure"><Link to={`/waterfall/26`}>萌图</Link></li>
          <li className="nav-icon-technology"><Link to={`/news/17`}>科技</Link></li>
          <li className="nav-icon-joke"><Link to={`/light/20`}>笑话</Link></li>
        </ul>
      </div>
        <footer className="footer-bar">
          <ul className="clearfix">
            <li><Link to={`/feedback`}>意见反馈</Link></li>
            <li><Link to={`/copyright`}>版权声明</Link></li>
          </ul>
        </footer>
      </div>
    );
  },
  onStatusChange(data) {
    if (this.isMounted()) {
      this.setState({
        data: data.data,
        hotwordslist: data.hotwordslist,
        hotwordsGroup: data.hotwordsGroup,
        style: {
          display: 'block'
        }
      });
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
          { type + "：" + data.title }
        </a>
      );
    }
    return besideNode;
  },
  handleChange() {
    HotWordsAction.changeItem(this.state.hotwordsGroup);
  },
  handleShare() {
    let title = this.refs.detailTitle.getDOMNode().innerHTML;
    document.querySelector(".share-btn").href="javascript:ShareInPage.nativeShare('"+document.title+"', '"+title+"', '"+null+"', '"+document.URL+"')";
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