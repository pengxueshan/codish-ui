import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Modal from '../modal';
import classNames from 'classnames';
import key from 'keymaster';
import uuid from 'uuid';

import './index.css';

export default class Menu extends Component {
    static propTypes = {
        className: PropTypes.string,
        width: PropTypes.number,
        height: PropTypes.number,
        data: PropTypes.array,
        onItemClick: PropTypes.func,
        position: PropTypes.object,
        onClose: PropTypes.func,
    };

    static defaultProps = {
        className: '',
        data: [],
        onItemClick: () => {},
        onClose: () => {},
        position: {x: 0, y: 0},
    };

    state = {
        cur: ''
    };

    columnIndex = 0;

    scope = `menu-${uuid.v4()}`;

    componentDidMount() {
        key('esc', this.scope, () => {
            this.close();
        });
        key('down', this.scope, () => {
            let arr = this.state.cur.split('-');
            let columnIndex = this.columnIndex || 0;
            let curIndex = arr[columnIndex];
            if (curIndex === undefined || curIndex === '') {
                curIndex = 0;
            } else {
                curIndex = parseInt(curIndex) + 1;
            }
            let curData = this.getCurChildrenData();
            if (curIndex < curData.length) {
                arr[columnIndex] = curIndex;
                this.setState({
                    cur: arr.join('-')
                });
            }
        });
        key('up', this.scope, () => {
            let arr = this.state.cur.split('-');
            let columnIndex = this.columnIndex || 0;
            let curIndex = arr[columnIndex];
            if (curIndex === undefined || curIndex === '') {
                curIndex = 0;
            } else {
                curIndex = parseInt(curIndex) - 1;
            }
            if (curIndex >= 0) {
                arr[columnIndex] = curIndex;
                this.setState({
                    cur: arr.join('-')
                });
            }
        });
        key('right', this.scope, () => {
            let arr = this.state.cur.split('-');
            if (this.columnIndex === undefined) {
                this.columnIndex = 1;
            } else {
                let curData = this.getCurChildrenData();
                let curItem = curData && curData[arr[this.columnIndex]];
                if (curItem && curItem.children) {
                    this.columnIndex++;
                }
            }
            arr[this.columnIndex] = arr[this.columnIndex] || 0;
            this.setState({
                cur: arr.join('-')
            });
        });
        key('left', this.scope, () => {
            if (this.columnIndex === undefined) {
                this.columnIndex = 0;
            } else {
                let index = this.columnIndex - 1;
                this.columnIndex = index < 0 ? 0 : index;
            }
        });
        key('enter', this.scope, () => {
            let arr = this.state.cur.split('-');
            let index = arr[this.columnIndex];
            let data = this.getCurChildrenData();
            let item = data[index];
            if (item) {
                this.props.onItemClick(item.text || item, index);
                this.close();
            }
        });
        key.setScope(this.scope);
    }

    componentWillUnmount() {
        key.deleteScope(this.scope);
    }

    getCurChildrenData = () => {
        let arr = this.state.cur.split('-');
        let columnIndex = this.columnIndex || 0;
        let curData;
        if (columnIndex === 0) {
            curData = this.props.data;
        } else {
            let tmp = arr.slice(0, columnIndex);
            let tmpData = this.props.data;
            for (let i = 0; i < tmp.length; i++) {
                let index = tmp[i];
                tmpData = tmpData && tmpData[index].children;
            }
            curData = tmpData;
        }
        return curData;
    }

    handleItemClick = e => {
        let target = e.currentTarget;
        this.props.onItemClick(target.dataset['text'], target.dataset['index'], e);
        this.close();
    }

    renderItem(data, deep = 0) {
        let cur = this.state.cur || '';
        this.tmpCur = cur.split('-');
        let curIndex = parseInt(this.tmpCur[deep]);
        return data.map((item, index) => {
            if (item === '__sep__') {
                return <div key={index} className="codish-ui-menu-sep"></div>;
            }
            let cls = classNames('codish-ui-menu-item', {
                'has-children': item.children,
                'item-hover': curIndex === index
            });
            if (item.children) {
                let text = item.text || '';
                return (
                    <div key={index} className={cls} onClick={this.handleItemClick}
                        data-index={index} data-text={text} data-children={true}>
                        {text}
                        <div className="codish-ui-menu-children">{this.renderItem(item.children, index++)}</div>
                    </div>
                );
            }
            let text = item.text || item;
            return (
                <div key={index} className={cls} onClick={this.handleItemClick}
                    data-index={index} data-text={text}>{text}
                    {item.tail ? <span className="codish-ui-menu-item-tail">{item.tail}</span> : null}
                </div>
            );
        });
    }

    getPos = () => {
        let ret = {left: 0, top: 0};
        let {position} = this.props;
        ret.left = position.x + 'px';
        ret.top = position.y + 'px';
        return ret;
    }

    close = () => {
        this.props.onClose();
    }

    render() {
        let {className} = this.props;
        let cls = classNames('codish-ui-menu', className);
        let style = this.getPos();
        if (this.props.width) {
            style.width = this.props.width + 'px';
        }
        if (this.props.height) {
            style.height = this.props.height + 'px';
            style.overflow = 'hidden';
        }
        return (
            <Modal modal={false} noneParent>
                <div className={cls} style={style}>
                    {this.renderItem(this.props.data)}
                </div>
            </Modal>
        );
    }
}
