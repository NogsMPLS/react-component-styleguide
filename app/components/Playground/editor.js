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

function isCommentFold(line) {
  var isAFold = false;
  if (/^\s*(\/\*|\/\/)#?region\b/.test(line)) { isAFold = true; }
  if (/\/\/(.*)\{/.test(line)) { isAFold = true; }
  if(/^\s*(\/\*\*\*).*\*\/\s*$/.test(line)) { isAFold = true; }
  return isAFold;
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
     this.refs.ace.editor.session.setUseWorker(false);
     this.refs.ace.editor.session.__proto__.foldRegion = function(startRow, endRow, depth) {
      if (depth == undefined)
          depth = 100000; // JSON.stringify doesn't hanle Infinity
      var foldWidgets = this.foldWidgets;
      if (!foldWidgets)
          return; // mode doesn't support folding
      endRow = endRow || this.getLength();
      startRow = startRow || 0;
      for (var row = startRow; row < endRow; row++) {
          if (foldWidgets[row] == null)
              foldWidgets[row] = this.getFoldWidget(row);
          if (foldWidgets[row] != "start") continue;
          if (!isCommentFold(this.getLine(row))) continue
          var range = this.getFoldWidgetRange(row);
          // sometimes range can be incompatible with existing fold
          // TODO change addFold to return null istead of throwing
          if (range && range.isMultiLine()
              && range.end.row <= endRow
              && range.start.row >= startRow
          ) {
              row = range.end.row;
              try {
                  // addFold can change the range
                  var fold = this.addFold("...", range);
                  if (fold)
                      fold.collapseChildren = depth;
              } catch(e) {}
          }
      }
    };
   this.refs.ace.editor.session.foldRegion();
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
          showPrintMargin={false}
          name={title}
          editorProps={{$blockScrolling: Infinity}}
          enableBasicAutocompletion={true}
          enableLiveAutocompletion={true}
          width="100%"
          maxLines={Infinity}
          fontSize={15}
        />
      </div>
    );
  }
});

export default Editor;
