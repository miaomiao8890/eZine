'use strict';

import React from 'react';
import Reflux from 'reflux';
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
    return (
      <li className="grid-item" id={"grid-item-" + cid}  style={this.state}>
        <Link to={`/${this.props.listViewType}/${cid}`} data-cid={cid} ref="gridItem" onClick={this.getListData} >
          <img src={ this.props.icon } width="100%" />
          <p className="grid-title">{this.props.name}</p>
        </Link>
      </li>
    );
  },
  getListData(event) {
    event.preventDefault();
    document.querySelector(".loading-bar").style.display = "block";
    let cid = this.refs.gridItem.getDOMNode().dataset.cid
        , url = this.refs.gridItem.getDOMNode().href;
    if ("news" == this.props.listViewType) {
      ListAction.getAll(cid, 1, url);
    } else {
      ListAction.getAll(cid, null, url);
    }
  }
});

export default GridItem;
