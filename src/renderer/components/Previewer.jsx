import React from "react";
import style from "./Previewer.css";
import SvgNode from "./SvgNode"

export default class Previewer extends React.Component {

    constructor(props) {
        super(props);

        this.state = { className: props.className, text: props.value, text2: "[" + props.value + "]" };
        this.onChangeText = this.onChangeText.bind(this);
    }

    componentDidMount() {
        console.log("componentDidMount");
    }

    componentWillReceiveProps(nextProps) {
        console.log("componentWillReceiveProps");
        this.setState({ text: nextProps.value, text2: "[" + nextProps.value + "]" });
    }

    onChangeText(e) {
        this.setState({ text: e.target.value, text2: "[" + e.target.value + "]" });
    }

    render() {
        return (
            <div
              id="previewer"
              className={`${this.state.className} ${style.previewer}`}
            >
              {/*
              <span
               dangerouslySetInnerHTML={{ __html: this.state.text }}
              />
              */}
              <svg version="1.1" xmlns="http://www.w3.org/2000/svg"
                width="500px" height="400px" viewBox="0 0 500 400" enableBackground="new 0 0 126.829 126.829">
                {/* <rect x="0" y="50" rx="8" ry="8" width="100" height="40" stroke="black" strokeWidth="2" fill="none"/>
                <rect x="100" y="50" rx="8" ry="8" width="40" height="40" stroke="black" strokeWidth="2" fill="none"/>
                <circle cx="20" cy="24" r="20" stroke="yellow" strokeWidth="4" fill="orange"/> */}

                <defs>
                    <marker id="mu_mh" markerUnits="strokeWidth" markerWidth="8" markerHeight="8" viewBox="0 0 16 10" refX="8" refY="5" orient="auto">
                        <polygon points="0,0 0,10 16,5" fill="black"/>
                    </marker>
                </defs>
                <g fontSize="16" fill="black">
                    <SvgNode onChange={ this.onChangeText } text={ this.state.text } />
                    {/* <text fontFamily="sans-serif" x="18" y="205" stroke="red">救い</text> */}
                </g>
                {/*
                <g stroke="black">
                    <line x1="40" y1="100" x2="92" y2="100" strokeWidth="2" markerEnd="url(#mu_mh)"/>
                    <line x1="60" y1="150" x2="30" y2="186" strokeWidth="2" markerEnd="url(#mu_mh)"/>
                </g>
                */}
              </svg>

            </div>
        );
    }
}
