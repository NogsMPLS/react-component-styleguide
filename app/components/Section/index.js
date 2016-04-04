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
            wrappedExample={this.props.wrappedExample}
            markdown={this.props.overview}
            title={this.props.title}
            description={this.props.description}
            code={this.props.code}
            scope={this.props.scope}
            playgroundtheme={this.props.playgroundtheme}
            idx={this.props.idx}
            />
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
  scope: React.PropTypes.object,
  wrappedExample: React.PropTypes.bool,
  code: React.PropTypes.string
};
