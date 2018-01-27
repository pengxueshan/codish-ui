import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './index.css';

export default class Button extends Component {
    static propTypes = {
        className: PropTypes.string,
        inline: PropTypes.bool,
        onClick: PropTypes.func,
        disabled: PropTypes.bool,
    };

    static defaultProps = {
        className: '',
        inline: true,
        onClick: () => {}
    };

    handleClick = e => {
        if (!this.props.disabled) {
            this.props.onClick(e);
        }
    }

    render() {
        let {inline, className, disabled, children, ...rest} = this.props;
        let cls = classNames('codish-ui-button', className, {
            'is-inline': inline,
            'is-disabled': disabled
        });
        return (
            <div className={cls} {...rest} onClick={this.handleClick}>{children}</div>
        );
    }
}
