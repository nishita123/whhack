import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { addFile, clearDisplay } from './actions'
import { trackEvent } from './analytics'

var HeaderImpl = React.createClass({
  setupInputNode(node) {
    // Hack because react's <input> doesn't support this yet
    node.setAttribute("webkitdirectory", "");
    node.setAttribute("mozdirectory", "");

    this._inputNode = node;
  },

  render() {
    return (
      <div className="row form-inline">
        <div className="header-box">
          <input className="col-xs-offset-8 col-xs-3 form-control" ref={this.setupInputNode} type="file" name="selector-box"/>
          <button className="col-xs-1 btn btn-success" onClick={this.goButtonClicked}>Go!</button>
        </div>
      </div>
    );
  },

  goButtonClicked() {
    if (this._inputNode) {
      trackEvent({
        eventCategory: 'selection',
        eventAction: 'go_click',
        eventValue: this._inputNode.files.length
      })
      this.props.onFilesPicked();
      var files = this._inputNode.files;
      for (var i = 0; i < files.length; i++) {
        this.props.onEachFile(files[i]);
      }
    }
  }
});

var Header = connect(
  () => { return {} },
  (dispatch) => {
    return {
      onEachFile: (file) => {
        dispatch(addFile(file));
      },
      onFilesPicked: () => {
        dispatch(clearDisplay());
      }
    }
  }
)(HeaderImpl)

module.exports = Header;
