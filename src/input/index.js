import React, {Component} from 'react';

import './index.css';

export default class Input extends Component {
    state = {
        value: ''
    }

    render() {
        let {value} = this.state;
        return (
            <div className="codish-ui-input">
                <input
                    type="text"
                    value={value} />
            </div>
        );
    }
}