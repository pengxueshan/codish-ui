import React, {
    Component
} from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

import './index.css';

const bodyNode = document.getElementsByTagName('body')[0];

export default class Modal extends Component {
    static defaultProps = {
        modal: true,
        show: false
    };

    getNode() {
        return (
            <div className="codish-ui-modal">
                {this.props.modal ? <div className="codish-ui-modal-mask"></div> : null}
                {this.props.children}
            </div>
        );
    }

    render() {
        if (!this.props.show) {
            return null;
        }
        return ReactDOM.createPortal(
            this.getNode(),
            bodyNode,
        );
    }
}

Modal.propTypes = {
    modal: PropTypes.bool,
    show: PropTypes.bool,
};
