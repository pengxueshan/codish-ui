import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Modal from '../modal';
import Button from '../button';
import uuid from 'uuid';
import Draggable from '../draggable';

import './index.css';

export default class Popup extends Component {
    static propTypes = {
        title: PropTypes.string,
        buttons: PropTypes.array,
        onBtnClick: PropTypes.func,
        onClose: PropTypes.func,
        draggable: PropTypes.bool
    };

    static defaultProps = {
        title: '提示',
        onClose: () => {},
        draggable: true
    };

    state = {
        show: true
    };

    headerId = uuid.v4();

    renderFooter() {
        if (!this.props.buttons) return null;
        return (
            <div className="codish-ui-popup-footer">
                {this.props.buttons.map((item, index) => {
                    return (
                        <Button data-index={index} className="codish-ui-popup-button"
                            onClick={this.handleBtnClick}
                            key={index}>{item}</Button>
                    );
                })}
            </div>
        );
    }

    handleBtnClick = e => {
        if (typeof this.props.onBtnClick === 'function') {
            let index = e.target.dataset['index'];
            let ret = this.props.onBtnClick(index, e);
            if (ret) {
                this.close();
            }
        }
    }

    close = () => {
        this.setState({
            show: false
        }, this.props.onClose);
    }

    getBodyDom() {
        return document.getElementsByTagName('body')[0];
    }

    render() {
        return (
            <Modal show={this.state.show}>
                <Draggable dragId={this.headerId} draggable={this.props.draggable} getBoundaryDom={this.getBodyDom}>
                    <div className="codish-ui-popup">
                        <div className="codish-ui-popup-header" id={this.headerId}>
                            <div className="codish-ui-popup-title">{this.props.title}</div>
                            <div className="codish-ui-popup-close" onClick={this.close}></div>
                        </div>
                        <div className="codish-ui-popup-content">{this.props.children}</div>
                        {this.renderFooter()}
                    </div>
                </Draggable>
            </Modal>
        );
    }
}
