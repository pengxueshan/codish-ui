import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './index.css';

export default class Badge extends Component {
    static propTypes = {
        value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        max: PropTypes.number,
        isDot: PropTypes.bool,
        className: PropTypes.string
    };

    renderMark() {
        if (this.props.isDot) {
            return (
                <div className="codish-ui-badge-mark"></div>
            );
        }
        let value = this.props.value;
        let max = this.props.max;
        if (value == undefined) return null;
        if (max && !isNaN(Number(max)) && !isNaN(Number(value))) {
            if (Number(value) > Number(max)) {
                value = `${max}+`;
            }
        }
        return (
            <div className="codish-ui-badge-mark">{value}</div>
        );
    }

    render() {
        let cls = classNames('codish-ui-badge', this.props.className, {
            'is-dot': this.props.isDot
        });
        return (
            <div className={cls}>
                {this.props.children}
                {this.renderMark()}
            </div>
        );
    }
}
