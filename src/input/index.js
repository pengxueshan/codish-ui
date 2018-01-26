import React, {Component} from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import classNames from 'classnames';

import './index.css';

export default class Input extends Component {
    static defaultProps = {
        type: 'text',
        placeholder: '',
        nativeType: 'type',
        digits: 3,
    }

    state = {
        value: this.props.defaultValue || ''
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.defaultValue && nextProps.defaultValue !== this.props.defaultValue) {
            let value = this.checkValue(nextProps.defaultValue);
            if (value) {
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
            }
            return origin;
        }
        let {type, digits} = this.props;
        if (type === 'number') {
            origin = this.checkFloatValid(origin, digits);
        } else if (type === 'int') {
            origin = this.checkIntValid(origin);
        }

        return origin;
    }

    checkIntValid = value => {
        let isNeg = false;
        if (value[0] == '-') {
            isNeg = true;
        }
        let tmp = value.replace(/[^\d]/g, '');
        if (isNeg) {
            tmp = '-' + tmp;
        }
        return tmp;
    }

    checkFloatValid = (value, digits) => {
        if (value == '' || value == '-') return value;
        if (value == '.') return '';
        if (value == '-.') return '-';
        let isNeg = false;
        if (value[0] == '-') {
            isNeg = true;
        }
        let tmp = value.replace(/[^\d\.]/g, '');
        if (tmp[0] == '.') {
            tmp = '0' + tmp;
        }
        if (tmp.indexOf('.') > -1) {
            let arr = tmp.split('.');
            tmp = arr[0] + '.' + arr[1].slice(0, digits);
        }
        if (isNeg) {
            tmp = '-' + tmp;
        }
        return tmp;
    }

    render() {
        let {value} = this.state;
        let cls = classNames(
            'codish-ui codish-ui-input',
            {
                'is-inline': this.props.inline
            }
        );
        return (
            <div className={cls}>
                <input
                    type={this.props.nativeType}
                    value={value}
                    onChange={this.handleChange}
                    placeholder={this.props.placeholder} />
            </div>
        );
    }
}

Input.propTypes = {
    type: PropTypes.string,
    placeholder: PropTypes.string,
    nativeType: PropTypes.string,
    digits: PropTypes.number,
};
