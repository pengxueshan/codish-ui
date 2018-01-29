import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import PerfectScrollbar from 'perfect-scrollbar';
import uuid from 'uuid';
import _ from 'lodash';

import './index.css';

export default class Scrollable extends Component {
    static propTypes = {
        className: PropTypes.string,
        style: PropTypes.object,
        options: PropTypes.object,
        getInstance: PropTypes.func,
    };

    static defaultProps = {
        style: {}
    };

    containerId = 'ps-' + uuid.v4();

    delayUpdate = _.throttle(this.update, 100);

    componentDidMount() {
        let options = Object.assign({
            minScrollbarLength: 20
        }, this.props.options);
        this.ps = new PerfectScrollbar(`#${this.containerId}`, options);
        if (typeof this.props.getInstance === 'function') {
            this.props.getInstance(this.ps);
        }
        window.addEventListener('resize', this.delayUpdate);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.style.width !== this.props.style.width ||
            nextProps.style.height !== this.props.style.height) {
            this.update();
        }
    }

    componentWillUnmount() {
        if (this.ps) {
            this.ps.destroy();
            this.ps = null;
        }
        window.removeEventListener('resize', this.delayUpdate);
    }

    update() {
        if (this.ps) {
            this.ps.update();
        }
    }

    render() {
        let {className, style} = this.props;
        let cls = classNames('codish-ui-scrollable', className);
        let sty = style || {};
        return (
            <div className={cls} style={sty} id={this.containerId}>
                <div className="codish-ui-scrollable-content">
                    {this.props.children}
                </div>
            </div>
        );
    }
}
