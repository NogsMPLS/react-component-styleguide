import React from "react";
import PropTable from "./PropTable";
import Overview from "./Overview";

export default class Ecology extends React.Component {
  renderPropTable(source) {
    if (source) {
      return (
        <div className="Documentation">
          <PropTable source={this.props.source}/>
        </div>
      );
    }
  }
  render() {
    return (
      <div className="Ecology">
        <div className="Overview">
          <Overview
            markdown={this.props.overview}
            scope={this.props.scope}
            playgroundtheme={this.props.playgroundtheme}/>
        </div>
        {this.renderPropTable(this.props.source)}
      </div>
    );
  }
}

Ecology.propTypes = {
  overview: React.PropTypes.string,
  playgroundtheme: React.PropTypes.string,
  source: React.PropTypes.object,
  scope: React.PropTypes.object
};
