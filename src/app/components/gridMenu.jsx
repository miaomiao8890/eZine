'use strict';

import React from 'react';
import GridItem from './gridItem.jsx';

let data = [{"detailViewType":"default","icon":"http://img2.oupeng.com/ezine/58/03/2D/21/24/6D/A7/70/338445454_large.jpg","id":55,"listViewType":"default","name":"今日头条"},{"detailViewType":"default","icon":"http://img2.oupeng.com/ezine/CF/16/B6/CC/15/29/69/B7/1764508356_large.jpg","id":59,"listViewType":"default","name":"内涵段子"},{"detailViewType":"beauty","icon":"http://img2.oupeng.com/ezine/BE/BE/18/D3/70/F4/EB/EC/981883792_large.jpg","id":19,"listViewType":"beauty","name":"绝色美图"},{"detailViewType":"default","icon":"http://img2.oupeng.com/ezine/35/8C/9E/8D/97/53/29/36/569519583_large.jpg","id":20,"listViewType":"default","name":"笑话"},{"detailViewType":"default","icon":"http://img2.oupeng.com/ezine/1F/BE/30/43/63/72/B0/7E/828501977_large.jpg","id":15,"listViewType":"default","name":"社会"},{"detailViewType":"default","icon":"http://img2.oupeng.com/ezine/6D/8B/53/E5/33/A6/4D/60/201715238_large.jpg","id":16,"listViewType":"default","name":"财经"},{"detailViewType":"default","icon":"http://img2.oupeng.com/ezine/0A/12/55/C1/12/0B/EF/03/143820536_large.jpg","id":52,"listViewType":"default","name":"军事"},{"detailViewType":"default","icon":"http://img2.oupeng.com/ezine/59/5A/4B/AA/0D/D2/32/DD/1491081307_large.jpg","id":21,"listViewType":"default","name":"娱乐"},{"detailViewType":"default","icon":"http://img2.oupeng.com/ezine/D1/7D/16/3E/3A/D3/79/43/139403825_large.jpg","id":29,"listViewType":"default","name":"两性"},{"detailViewType":"default","icon":"http://img2.oupeng.com/ezine/4C/7B/45/D5/1D/6C/B8/F7/1475484153_large.jpg","id":25,"listViewType":"default","name":"情感"},{"detailViewType":"default","icon":"http://img2.oupeng.com/ezine/8A/C6/37/EE/D9/CE/A5/38/1840768649_large.jpg","id":23,"listViewType":"default","name":"星座"},{"detailViewType":"beauty","icon":"http://img2.oupeng.com/ezine/E1/15/E5/E0/C9/13/4D/93/815828113_large.jpg","id":24,"listViewType":"beauty","name":"性感"},{"detailViewType":"default","icon":"http://img2.oupeng.com/ezine/3B/7C/E3/65/3E/F9/11/14/725296976_large.jpg","id":47,"listViewType":"default","name":"生活"},{"detailViewType":"beauty","icon":"http://img2.oupeng.com/ezine/0C/D4/49/77/6D/B5/6C/F0/999187872_large.jpg","id":124,"listViewType":"beauty","name":"白富美"},{"detailViewType":"default","icon":"http://img2.oupeng.com/ezine/97/1A/E3/EE/55/E9/FB/5A/2134965614_large.jpg","id":110,"listViewType":"default","name":"自拍"},{"detailViewType":"default","icon":"http://img2.oupeng.com/ezine/61/66/E8/44/1A/0F/69/0B/756398806_large.jpg","id":75,"listViewType":"default","name":"私密话"},{"detailViewType":"beauty","icon":"http://img2.oupeng.com/ezine/B0/DA/60/4A/E1/63/25/6A/1044068082_large.jpg","id":125,"listViewType":"beauty","name":"比基尼"},{"detailViewType":"default","icon":"http://img2.oupeng.com/ezine/40/59/1D/01/71/0D/C6/95/2012263487_large.jpg","id":82,"listViewType":"default","name":"值得买"},{"detailViewType":"default","icon":"http://img2.oupeng.com/ezine/C6/51/A8/2A/72/45/ED/C6/1258464977_large.jpg","id":120,"listViewType":"default","name":"曝光台"},{"detailViewType":"default","icon":"http://img2.oupeng.com/ezine/39/84/BF/4E/8E/5A/59/0B/1066014671_large.jpg","id":121,"listViewType":"default","name":"神吐槽"},{"detailViewType":"default","icon":"http://img2.oupeng.com/ezine/F4/47/32/60/C8/5B/6D/E9/1177282765_large.jpg","id":83,"listViewType":"default","name":"暴走漫画"},{"detailViewType":"default","icon":"http://img2.oupeng.com/ezine/09/1B/E5/45/F5/32/CB/E3/1095717475_large.jpg","id":131,"listViewType":"default","name":"彩票"},{"detailViewType":"beauty","icon":"http://img2.oupeng.com/ezine/0D/DA/82/34/A6/1C/C7/14/1081674331_large.jpg","id":26,"listViewType":"beauty","name":"萌图"},{"detailViewType":"beauty","id":162,"listViewType":"beauty","name":"清纯"},{"detailViewType":"beauty","id":166,"listViewType":"beauty","name":"性感webkit"},{"detailViewType":"beauty","id":167,"listViewType":"beauty","name":"360测试"}]

const GridMenu = React.createClass({
  getInitialState() {
    return {
      grids: []
    };
  },
  componentDidMount() {
    this.setState({ 
      grids: data 
    });
  },
  render() {
    let gridNodes = this.state.grids.map(function (grid) {
      return (
        <GridItem key={grid.id} name={grid.name}/>
      );
    });
    return (
      <ul className="grid-menu clearfix">
        { gridNodes }
      </ul>
    );
  }
});

export default GridMenu;