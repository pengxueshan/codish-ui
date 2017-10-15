import React, {Component} from 'react';
import _ from 'lodash';
import {REGEXP} from './constants';

import './index.css';

export default class Input extends Component {
    static defaultProps = {
        type: 'text',
        placeholder: ''
    }

    state = {
        value: ''
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.defaultValue && nextProps.defaultValue !== this.props.defaultValue) {
            let value = this.checkValue(nextProps.defaultValue);
            if (value !== false) {
                this.setState({
                    value: nextProps.defaultValue
                });
            }
        }
    }

    handleChange = e => {
        let originValue = e.target.value;
        if (originValue === '') {
            return this.setValue(originValue, e);
        }
        let value = this.checkValue(originValue);
        if (value) {
            this.setValue(value, e);
        }
    }

    setValue = (value, e) => {
        this.setState({
            value
        });
        if (_.isFunction(this.props.onChange)) {
            this.props.onChange(value, e);
        }
    }

    checkValue = origin => {
        let {regExp} = this.props;
        if (regExp) {
            if (!regExp.test(origin)) {
                return false;
            } else {
                return origin;
            }
        }
        let {type} = this.props;
        if (type && REGEXP[type] && !REGEXP[type].test(origin)) {
            return false;
        }
        let {digits} = this.props;
        if (type === 'number' && digits !== undefined) {
            origin = origin.replace(new RegExp(`(\\.\\d{${digits}})(.*)`), '$1');
        }

        return origin;
    }

    render() {
        let {value} = this.state;
        return (
            <div className="codish-ui codish-ui-input">
                <input
                    type="text"
                    value={value}
                    onChange={this.handleChange}
                    placeholder={this.props.placeholder} />
            </div>
        );
    }
}
