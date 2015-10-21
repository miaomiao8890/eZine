'use strict';

import React from 'react';
import { Link } from 'react-router';

import ListAction from '../actions/ListAction';
import ListStore from '../stores/ListStore';

const GridItem = React.createClass({

  mixins: [ 
    Reflux.connect(ListStore, 'list'), 
  ],

  getInitialState() {
    return {
      height: 0
    };
  },
  componentDidMount() {
    this.setState({ 
      height: document.body.scrollWidth/3
    });
  },
  render() {
    let cid = this.props.cid;
    let listViewType = this.props.listViewType;
    return (
      <li className="grid-item" id={"grid-item-" + cid} data-cid={cid} style={this.state} ref="gridItem" onClick={this.getListData} >
        <Link to={`/${listViewType}/${cid}`} >
          <img src={ this.props.icon } width="100%" />
          <p className="grid-title">{this.props.name}</p>
        </Link>
      </li>
    );
  },
  getListData(event) {
    event.preventDefault();
    let cid = this.refs.gridItem.getDOMNode().dataset.cid;
    ListAction.getAll(this.props.params.cid);
  }
});

export default GridItem;
