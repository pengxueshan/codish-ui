import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Modal from '../modal';
import Button from '../button';
import uuid from 'uuid';
import Draggable from '../draggable';
import classNames from 'classnames';
import _ from 'lodash';
import Shortcut from '../shortcut';

import './index.css';

export default class Popup extends Component {
    static propTypes = {
        title: PropTypes.string,
        buttons: PropTypes.array,
        onBtnClick: PropTypes.func,
        onClose: PropTypes.func,
        draggable: PropTypes.bool,
        className: PropTypes.string,
        width: PropTypes.number,
        height: PropTypes.number,
        style: PropTypes.object,
    };

    static defaultProps = {
        title: '提示',
        onClose: () => {},
        draggable: true
    };

    headerId = 'header' + uuid.v4();

    renderFooter() {
        if (!this.props.buttons || this.props.buttons.length < 1) return null;
        if (!_.isArray(this.props.buttons)) return null;
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
        if (typeof this.props.onBtnClick === 'function'
            && this.props.buttons
            && _.isArray(this.props.buttons)
            && this.props.buttons.length > 0) {
            let index = (e && e.target.dataset['index']) || 0;
            let ret = this.props.onBtnClick(index, e);
            if (ret) {
                this.close();
            }
        }
    }

    close = () => {
        this.props.onClose();
    }

    getBodyDom() {
        return document.getElementsByTagName('body')[0];
    }

    handleKeyDown = (e, which, keycode) => {
        if (keycode === 'escape') {
            this.close();
        } else if (keycode === 'enter') {
            this.handleBtnClick();
        }
    }

    render() {
        let cls = classNames('codish-ui-popup', this.props.className);
        let style = this.props.style || {};
        if (this.props.width) {
            style.width = this.props.width + 'px';
        }
        if (this.props.height) {
            style.height = this.props.height + 'px';
        }
        return (
            <Modal>
                <Shortcut
                    onShortKeyDown={this.handleKeyDown}
                    occupy>
                    <Draggable dragId={this.headerId} draggable={this.props.draggable} getBoundaryDom={this.getBodyDom}>
                        <div className={cls} style={style}>
                            <div className="codish-ui-popup-header" id={this.headerId}>
                                <div className="codish-ui-popup-title">{this.props.title}</div>
                                <div className="codish-ui-popup-close" onClick={this.close}></div>
                            </div>
                            <div className="codish-ui-popup-content">{this.props.children}</div>
                            {this.renderFooter()}
                        </div>
                    </Draggable>
                </Shortcut>
            </Modal>
        );
    }
}
