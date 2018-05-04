import React, {
    Component
} from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import classNames from 'classnames';

import './index.css';

const bodyNode = document.getElementsByTagName('body')[0];

export default class Modal extends Component {
    static propTypes = {
        modal: PropTypes.bool,
        noneParent: PropTypes.bool,
        className: PropTypes.string,
    };

    static defaultProps = {
        modal: true,
        noneParent: false
    };

    getNode() {
        let cls = classNames('codish-ui-modal', this.props.className, {
            'is-modal': this.props.modal
        });
        if (this.props.noneParent) {
            return this.props.children;
        }
        return (
            <div className={cls}>
                {this.props.modal ? <div className="codish-ui-modal-mask"></div> : null}
                {this.props.children}
            </div>
        );
    }

    render() {
        return ReactDOM.createPortal(
            this.getNode(),
            bodyNode,
        );
    }
}
