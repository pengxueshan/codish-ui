import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import uuid from 'uuid';
import Scrollable from '../scrollable';

import './index.css';

export default class Table extends Component {
    static propTypes = {
        className: PropTypes.string,
        style: PropTypes.object,
        head: PropTypes.array,
        body: PropTypes.array,
        headFixed: PropTypes.bool,
        bodyWidth: PropTypes.number,
        itemHeight: PropTypes.number,
        overScan: PropTypes.number,
        trHoverClassName: PropTypes.string,
        trSelectedClassName: PropTypes.string,
        onTrClick: PropTypes.func,
        onTrDoubleClick: PropTypes.func,
    };

    static defaultProps = {
        style: {},
        headFixed: false,
        headPositon: 0,
        itemHeight: 28,
        overScan: 2
    };

    state = {
        headWidth: [],
        curDataList: [],
        deltaIndex: 0,
        hoverIndex: -1,
    };

    headId = 'head-' + uuid.v4();
    bodyId = 'body-' + uuid.v4();

    componentDidMount() {
        this.calcHeadWidth();
        this.calcItemHeight();
    }

    componentWillUnmount() {
        if (this.ps) {
            this.ps.element.removeEventListener('ps-scroll-x', this.handleScrollX);
            this.ps.element.removeEventListener('ps-scroll-y', this.handleScrollY);
        }
    }

    calcItemHeight = () => {
        let td = document.querySelector(`#${this.bodyId} td`);
        if (td) {
            this.setState({
                itemHeight: td.getBoundingClientRect().height
            });
        }
    }

    shouldUpdateCurDataList = () => {
        if (this.props.headFixed) {
            this.updateCurDataList();
        }
    }

    handleScrollX = () => {
        this.setState({
            headPositon: this.ps.element.scrollLeft
        });
    }

    handleScrollY = () => {
        this.updateCurDataList();
    }

    updateCurDataList = () => {
        if (!this.ps || !this.ps.element) return;
        let scrollHeight = this.ps.element.scrollTop || 0;
        let itemHeight = this.state.itemHeight || this.props.itemHeight;
        let showNum = Math.ceil(this.ps.element.clientHeight / itemHeight);
        let scrollNum = Math.floor(scrollHeight / itemHeight);
        let delta = scrollHeight - scrollNum * itemHeight;
        this.setState({
            curDataList: this.props.body.slice(scrollNum, scrollNum + showNum + this.props.overScan),
            tableTop: scrollHeight - delta,
            deltaIndex: scrollNum
        });
    }

    calcHeadWidth = () => {
        let heads = document.querySelectorAll(`#${this.headId} th`);
        let widths = [];
        heads.forEach(item => {
            widths.push(item.getBoundingClientRect().width);
        });
        this.setState({
            headWidth: widths
        });
    }

    renderHead() {
        let ths = this.props.head.map((item, index) => {
            let text = item;
            let key = index;
            if (typeof item === 'object' && item !== null && item !== undefined) {
                key = item.key || index;
                text = item.label || key;
            }
            return (
                <th key={key} data-key={key}>{text}</th>
            );
        });
        let tableStyle = {};
        if (this.props.headFixed) {
            if (this.props.bodyWidth) {
                tableStyle.width = this.props.bodyWidth + 'px';
            }
            if (this.state.headPositon) {
                tableStyle.marginLeft = '-' + this.state.headPositon + 'px';
            }
        }
        return (
            <table style={tableStyle}>
                <thead>
                    <tr>{ths}</tr>
                </thead>
            </table>
        );
    }

    updateScrollBar = ps => {
        this.ps = ps;
        this.shouldUpdateCurDataList();
        if (this.ps) {
            this.ps.element.addEventListener('ps-scroll-x', this.handleScrollX);
            this.ps.element.addEventListener('ps-scroll-y', this.handleScrollY);
        }
    }

    renderBody() {
        if (this.props.headFixed) {
            let style = {};
            if (this.props.bodyWidth) {
                style.width = this.props.bodyWidth + 'px';
                let itemHeight = this.state.itemHeight || this.props.itemHeight;
                style.height = itemHeight * this.props.body.length + 'px';
            }
            return (
                <Scrollable className="table-scroll-wrap" getInstance={this.updateScrollBar}>
                    <div className="codish-ui-table-body-wrap" style={style} id={this.bodyId}>
                        {this.renderBodyContent()}
                    </div>
                </Scrollable>
            );
        }
        return (
            <div className="codish-ui-table-body-wrap">
                {this.renderBodyContent()}
            </div>
        );
    }

    renderBodyContent() {
        let data = this.state.curDataList || this.props.body;
        let deltaIndex = this.state.deltaIndex;
        let trs = data.map((bodyItem, bodyIndex) => {
            let realIndex = deltaIndex + bodyIndex;
            let tr = this.props.head.map((headItem, headIndex) => {
                let key = headItem;
                if (typeof headItem === 'object' && headItem !== null && headItem !== undefined) {
                    key = headItem.key;
                }
                let child = bodyItem[key] || '';
                if (typeof child === 'object' && child !== null && child !== undefined) {
                    child = child.content;
                }
                let cls = classNames(headItem.className, child.className);
                let style = {};
                let width = this.state.headWidth[headIndex];
                if (width) {
                    style.width = width + 'px';
                }
                return (
                    <td key={`${realIndex}-${headIndex}`} data-row={realIndex} data-col={headIndex} className={cls}
                        style={style}>{child}</td>
                );
            });
            let trCls = classNames({
                [this.props.trHoverClassName]: +this.state.hoverIndex === realIndex
            });
            return (
                <tr key={realIndex} onMouseOver={this.handleTrHover} data-index={realIndex}
                    className={trCls}
                    onClick={this.handleTrClick}
                    onDoubleClick={this.handleTrDoubleClick}>{tr}</tr>
            );
        });
        let style = {};
        if (this.props.headFixed && this.state.tableTop) {
            style.position = 'absolute';
            style.left = '0';
            style.width = '100%';
            style.top = this.state.tableTop + 'px';
        }
        return (
            <table style={style}>
                <tbody>
                    {trs}
                </tbody>
            </table>
        );
    }

    handleTrHover = e => {
        this.setState({
            hoverIndex: e.currentTarget.dataset['index']
        });
    }

    handleTrClick = e => {
        if (typeof this.props.onTrClick === 'function') {
            this.props.onTrClick(e);
        }
    }

    handleTrDoubleClick = e => {
        if (typeof this.props.onTrDoubleClick === 'function') {
            this.props.onTrDoubleClick(e);
        }
    }

    render() {
        let cls = classNames('codish-ui-table', this.props.className, {
            'is-headfixed': this.props.headFixed
        });
        return (
            <div className={cls} style={this.props.style}>
                <div className="codish-ui-table-inner">
                    <div className="codish-ui-table-head-wrap" id={this.headId}>
                        {this.renderHead()}
                    </div>
                    {this.renderBody()}
                </div>
            </div>
        );
    }
}
