import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Layer from '../layer';
import {getPageScrollInfo} from '../utils';

import './tool-tip.css';

const GAP = 8;

export default class ToolTip extends Component {
    static propTypes = {
        className: PropTypes.string,
        direction: PropTypes.string,
    };

    static defaultProps = {
        direction: 'top'
    };

    state = {
        showLayer: false,
        position: {}
    };

    componentDidMount() {
        this.getPosition();
    }

    getPosition() {
        if (this.wrap && this.wrap.firstChild) {
            let info = this.wrap.firstChild.getBoundingClientRect();
            let scrollInfo = getPageScrollInfo();
            let position = {
                x: scrollInfo.scrollLeft + info.x,
                y: scrollInfo.scrollTop + info.y
            };
            switch (this.props.direction) {
                case 'top':
                    position.x += info.width / 2;
                    position.y -= GAP;
                    break;
                case 'right':
                    position.x += info.width + GAP;
                    position.y += info.height / 2;
                    break;
                case 'bottom':
                    position.x += info.width / 2;
                    position.y += info.height + GAP;
                    break;
                case 'left':
                    position.x -= GAP;
                    position.y += info.height / 2;
                    break;
            }
            this.setState({
                position
            });
        }
    }

    handleMouseEnter = () => {
        this.setState({
            showLayer: true
        }, this.getPosition);
    }

    handleMouseLeave = () => {
        this.setState({
            showLayer: false
        });
    }

    renderLayer() {
        if (this.state.showLayer && this.props.tipText) {
            let cls = classNames('codish-ui-tool-tip__pop', this.props.direction);
            return (
                <Layer position={this.state.position}
                    className={cls}>
                    <div className="codish-ui-tool-tip__pop-inner">
                        {this.props.tipText}
                    </div>
                </Layer>
            );
        }
        return null;
    }

    render() {
        let cls = classNames('codish-ui-tool-tip', this.props.className);
        return (
            <div className={cls} ref={node => this.wrap = node}
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}>
                {this.props.children}
                {this.renderLayer()}
            </div>
        );
    }
}
