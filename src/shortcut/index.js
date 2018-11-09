import React, {Component} from 'react';
import uuid from 'uuid';

const KEY_EVENT = ['keydown', 'keyup', 'keypress'];

if (document && document.addEventListener) {
    KEY_EVENT.forEach(item => {
        document.addEventListener(item, e => {
            handleKeyEvent(e, item);
        });
    });
}

let KEY_EVENT_FN_LIST = [];

function handleKeyEvent(e, eventName) {
    for (let i = KEY_EVENT_FN_LIST.length - 1; i >= 0; i--) {
        let item = KEY_EVENT_FN_LIST[i];
        if (item && typeof item[eventName] === 'function') {
            if (i !== KEY_EVENT_FN_LIST.length - 1 && item.isGlobal) {
                item[eventName](e, code);
            } else if (i === KEY_EVENT_FN_LIST.length - 1) {
                item[eventName](e, code);
                if (item.prevent) return;
            }
        }
    }
}

export default class Shortcut extends Component {
    _id = uuid.v4();

    componentDidMount() {
        KEY_EVENT_FN_LIST.push({
            id: this._id,
            keydown: this.props.onKeyDown,
            keyup: this.props.onKeyUp,
            keypress: this.props.onKeyPress,
            isGlobal: this.props.isGlobal,
            prevent: this.props.prevent
        });
    }

    componentWillUnmount() {
        KEY_EVENT_FN_LIST = KEY_EVENT_FN_LIST.filter(item => item.id !== this._id);
    }

    handlePress = () => {
        let index = KEY_EVENT_FN_LIST.findIndex(item => item.id === this._id);
        let cur = KEY_EVENT_FN_LIST.splice(index, 1);
        KEY_EVENT_FN_LIST.push(cur);
    }

    render() {
        return (
            <div className="codish-ui codish-ui-shortcut" onClick={this.handlePress}>
                {this.props.children}
            </div>
        );
    }
}