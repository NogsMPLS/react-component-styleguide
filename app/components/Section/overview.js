import React from "react";
import ReactDOM from "react-dom";
import marked from "marked";
import Playground from '../Playground';
import Spinner from './Spinner';

class Overview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {loading: true};
  }

  componentDidMount() {
    this.setState({loading: false});
    this.renderPlaygrounds();
  }
  componentDidUpdate() {
    this.renderPlaygrounds();
  }
  findPlayground(className) {
    return ReactDOM.findDOMNode(this.refs.overview).getElementsByClassName(className);
  }
  renderPlaygrounds() {
    const playgrounds = Array.prototype.slice.call(this.findPlayground("lang-playground"), 0);
    for (const p in playgrounds) {
      if (playgrounds.hasOwnProperty(p)) {
        const source = playgrounds[p].textContent;
        ReactDOM.render(
          <div className="Interactive">
            <Playground
              codeText={source}
              scope={this.props.scope}
              noRender={true}
              title={this.props.title}
              description={this.props.description}
              idx={this.props.idx}
              theme={this.props.playgroundtheme ? this.props.playgroundtheme : "monokai"}/>
          </div>,
          playgrounds[p].parentNode
        );
      }
    }
    const playgroundsNoRender =
      Array.prototype.slice.call(this.findPlayground("lang-playground_norender"), 0);
    for (const p in playgroundsNoRender) {
      if (playgroundsNoRender.hasOwnProperty(p)) {
        const source = playgroundsNoRender[p].textContent;
        ReactDOM.render(
          <div className="Interactive">
            <Playground
              codeText={source}
              scope={this.props.scope}
              noRender={false}
              title={this.props.title}
              idx={this.props.idx}
              description={this.props.description}
              theme={this.props.playgroundtheme ? this.props.playgroundtheme : "monokai"}/>
          </div>,
          playgroundsNoRender[p].parentNode
        );
      }
    }
  }
  render() {
    const markdown = marked(this.props.markdown);
    var overviewStyles = this.state.loading ? {display: "none"} : {display: "block"};
    var spinnerStyles = this.state.loading ? {display: "block"} : {display: "none"};
    return (
    <div>
        <Spinner style={spinnerStyles} />
        <div ref="overview" dangerouslySetInnerHTML={{__html: markdown}} style={overviewStyles}>
        </div>
      </div>
    );
  }
}

Overview.propTypes = {
  markdown: React.PropTypes.string,
  playgroundtheme: React.PropTypes.string,
  scope: React.PropTypes.object,
  loading: React.PropTypes.bool
};

Overview.defaultProps = {
  loading: true
}

export default Overview;