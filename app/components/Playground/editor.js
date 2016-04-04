/* eslint new-cap:0 no-unused-vars:0 */
import React from "react";
import brace from 'brace';
import AceEditor from 'react-ace';
import 'brace/mode/javascript';
import 'brace/theme/monokai';
import 'brace/ext/language_tools';

function camelize(str) {
  return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function(match, index) {
    if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces
    return index == 0 ? match.toLowerCase() : match.toUpperCase();
  });
}

const Editor = React.createClass({
  propTypes: {
    theme: React.PropTypes.string,
    readOnly: React.PropTypes.bool,
    external: React.PropTypes.bool,
    codeText: React.PropTypes.string,
    onChange: React.PropTypes.func,
    style: React.PropTypes.object,
    className: React.PropTypes.string
  },
  componentDidMount() {
     this.refs.ace.editor.on("change", this._handleChange);
  },

  componentDidUpdate() {
    if (this.props.readOnly || this.props.external) {
      this.refs.ace.editor.setValue(this.props.codeText);
    }
  },

  _handleChange() {
    if (!this.props.readOnly && this.props.onChange) {
      this.props.onChange(this.refs.ace.editor.getValue());
    }
  },

  render() {
    var title = camelize(this.props.title) + this.props.idx;
    return (
      <div style={this.props.style} className={this.props.className}>
        <AceEditor
          ref="ace"
          mode="javascript"
          theme={this.props.theme}
          onChange={this._handleChange}
          value={this.props.codeText}
          showGutter={false}
          showPrintMargin={false}
          name={title}
          editorProps={{$blockScrolling: true}}
          enableBasicAutocompletion={true}
          enableLiveAutocompletion={true}
          width="100%"
          maxLines={Infinity}
          fontSize="15px"
        />
      </div>
    );
  }
});

export default Editor;
