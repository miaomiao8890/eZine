'use strict';

import React from 'react';

import HeaderBar from './HeaderBar.jsx';

const CopyRight = React.createClass({
  render() {
    return (
      <div id="copyright" className="full-height">
        <HeaderBar cname="版权声明" />
        <div className="copyright-content">
          <p>1、本网所有内容，凡注明"来源：搜狐××（频道）"的所有文字、图片和音视频资料，版权均属搜狐公司所有，任何媒体、网站或个人未经本网协议授权不得转载、链接、转贴或以其他方式复制发布/发表。已经本网协议授权的媒体、网站，在下载使用时必须注明"稿件来源：搜狐网"，违者本网将依法追究责任。</p><br/>
          <p>凡本网注明"来源：XXX "的文/图等稿件，本网转载出于传递更多信息之目的，并不意味着赞同其观点或证实其内容的真实性</p><br/><br/>
          <p>2、除注明"来源：搜狐××（频道）"的内容外，本网以下内容亦不可任意转载：</p>
          <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;a.本网所指向的非本网内容的相关链接内容； </p>
          <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;b.已作出不得转载或未经许可不得转载声明的内容； </p>
          <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;c.未由本网署名或本网引用、转载的他人作品等非本网版权内容；</p> 
          <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;d.本网中特有的图形、标志、页面风格、编排方式、程序等； </p>
          <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;e.本网中必须具有特别授权或具有注册用户资格方可知晓的内容；</p> 
          <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;f.其他法律不允许或本网认为不适合转载的内容</p>
        </div>
      </div>
    );
  }
});

export default CopyRight;