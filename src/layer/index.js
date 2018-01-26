import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Modal from '../modal';
import classNames from 'classnames';

export default class Layer extends Component {
    static defaultProps = {
        position: {x: 0, y: 0},
        className: '',
        show: true
    };

    render() {
        let cls = classNames('codish-ui-layer', this.props.className);
        let style = {
            left: this.props.position.x + 'px',
            top: this.props.position.y + 'px',
            position: this.props.fixed ? 'fixed' : 'absolute',
        };
        return (
            <Modal noneParent show={this.props.show}>
                <div className={cls} style={style}>{this.props.children}</div>
            </Modal>
        );
    }
}

Layer.propTypes = {
    className: PropTypes.string,
    position: PropTypes.object,
    fixed: PropTypes.bool,
    show: PropTypes.bool,
};
