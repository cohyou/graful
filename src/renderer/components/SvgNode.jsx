import React from "react";
import ReactDOM from 'react-dom'

export default class SvgNode extends React.Component {
    constructor(props) {
        super(props);

        this.state = { text: props.text, bbox: null, deleting: false };
    }

    updateBBox(deleting) {
        // Trigger re-rendering
        let textSvg = ReactDOM.findDOMNode(this.refs.bboxtext).getBBox();
        if (textSvg) {
            console.log("いけた");
            this.setState({
                bbox: textSvg, deleting: deleting
            });
        } else {
            console.log("あかん");
        }

    }

    componentDidMount() {
        // Will trigger a re-rendering at mount
        this.updateBBox(false);
    }

    componentWillReceiveProps(nextProps) {
        // console.log("componentWillReceiveProps");
        this.setState({ text: nextProps.text });
    }

    componentDidUpdate(prevProps, prevState) {
        // If content has changed, re-render
        if (this.props.text !== prevProps.text) {
            console.log("やるで");
            this.updateBBox( (this.props.text.length < prevProps.text.length) );
        }
    }

    render() {
        // Render according to size from current bounding box if any cached
        let bbox = this.state.bbox;
        let x = bbox ? bbox.x : 0;
        let y = bbox ? bbox.y : 0;
        let height = bbox ? bbox.height : 0;
        let width = bbox ? bbox.width : 0;

        let padding = (x===0 && y===0) ? 0 : 4;

        let text_x = 380/2 - width/2
        var rect_x, rect_width;
        if (this.state.deleting) {
            // 削除中
            rect_x = x;
            rect_width = width+padding*3;
        } else {
            // 入力中
            rect_x = x-2*padding;
            rect_width = width+padding*2;
        }
        return (
        <svg>
          <text ref="bboxtext" fontFamily="sans-serif" x={text_x} y="100">{this.state.text}</text>
          <rect x={rect_x} y={y-padding} rx="4" ry="4" width={rect_width} height={height+padding*2}
            stroke="black" strokeWidth="2" fill="none"/>
        </svg>
        );
    }
}
