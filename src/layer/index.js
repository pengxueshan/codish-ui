import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Modal from '../modal';
import classNames from 'classnames';

import './index.css';

export default class Layer extends Component {
    static propTypes = {
        className: PropTypes.string,
        position: PropTypes.object,
        fixed: PropTypes.bool,
        show: PropTypes.bool,
        autoHide: PropTypes.bool,
        onClose: PropTypes.func,
    };

    static defaultProps = {
        position: {x: 0, y: 0},
        className: '',
        show: true,
        autoHide: true
    };

    componentDidMount() {
        if (this.props.autoHide) {
            document.addEventListener('click', this.handleDocClick);
        }
    }

    componentWillUnmount() {
        if (this.props.autoHide) {
            document.removeEventListener('click', this.handleDocClick);
        }
    }

    handleDocClick = () => {
        if (typeof this.props.onClose === 'function') {
            this.props.onClose();
        }
    }

    handleCurClick = e => {
        e.nativeEvent.stopImmediatePropagation();
        e.stopPropagation();
    }

    render() {
        let cls = classNames('codish-ui-layer', this.props.className);
        let style = {
            left: this.props.position.x + 'px',
            top: this.props.position.y + 'px',
            position: this.props.fixed ? 'fixed' : 'absolute',
        };
        return (
            <Modal noneParent show={this.props.show}>
                <div className={cls} style={style} onClick={this.handleCurClick}>{this.props.children}</div>
            </Modal>
        );
    }
}
