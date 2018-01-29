import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import uuid from 'uuid';
import _ from 'lodash';
import Menu from '../menu';

import './index.css';

export default class Tab extends Component {
    static propTypes = {
        className: PropTypes.string,
        tabClassName: PropTypes.string,
        showClose: PropTypes.bool,
        showAdd: PropTypes.bool,
        tools: PropTypes.any,
        vertical: PropTypes.bool,
    };

    static defaultProps = {
        className: '',
    };

    state = {
        activeIndex: this.props.activeIndex || 0,
        showMore: false,
        showMoreMenu: false
    };

    barId = 'id' + uuid.v4();
    itemsContainerId = 'id' + uuid.v4();
    itemsId = 'id' + uuid.v4();
    toolsId = 'id' + uuid.v4();
    addId = 'id' + uuid.v4();
    moreId = 'id' + uuid.v4();

    componentDidMount() {
        this.calcItems();
        window.addEventListener('resize', this.delayResize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.delayResize);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.activeIndex !== this.props.activeIndex) {
            if (nextProps.activeIndex !== this.state.activeIndex) {
                this.setState({
                    activeIndex: nextProps.activeIndex
                }, this.justifyActiveIndex);
            }
        }
        this.justifyActiveIndex(nextProps);
    }

    justifyActiveIndex = (props = this.props) => {
        if (this.state.activeIndex >= React.Children.count(props.children)) {
            this.setState({
                activeIndex: React.Children.count(props.children) - 1
            });
        }
    }

    handleItemClick = e => {
        let index = e.target.dataset['index'];
        let key = e.target.dataset['key'];
        if (index !== undefined) {
            if (typeof this.props.onTabClick === 'function') {
                let ret = this.props.onTabClick(index, key);
                if (ret) {
                    this.setState({
                        activeIndex: +index
                    });
                }
            } else {
                this.setState({
                    activeIndex: +index
                });
            }
        }
    }

    handleItemClose = e => {
        e.stopPropagation();
        if (typeof this.props.onClose === 'function') {
            this.props.onClose(e.target.dataset['index'], e.target.dataset['key']);
        }
    }

    renderTabText = (label, props) => {
        if (typeof this.props.renderTab === 'function') {
            return this.props.renderTab(label, props);
        }
        return label || 'Tab';
    }

    renderTabBar() {
        return React.Children.map(this.props.children, (child, index) => {
            let cls = classNames('codish-ui-tab-item', child.props.tabClassName, {
                'is-active': index === this.state.activeIndex
            });
            return (
                <div className={cls} data-index={index} data-key={child.key || index}
                    onClick={this.handleItemClick}>
                    {this.renderTabText(child.props.label, child.props)}
                    {
                        this.props.showClose && child.props.closable !== false ?
                            <span className="codish-ui-tab-close"
                                data-index={index} data-key={child.key || index}
                                onClick={this.handleItemClose}></span> : null
                    }
                </div>
            );
        });
    }

    renderTabContent() {
        return React.Children.map(this.props.children, (child, index) => {
            if (this.state.activeIndex !== index) return null;
            return child;
        });
    }

    handleAddClick = () => {
        if (typeof this.props.onAddClick === 'function') {
            this.props.onAddClick(this.state.activeIndex, React.Children.count(this.props.children));
        }
    }

    renderAdd() {
        if (this.props.showAdd) {
            return (
                <div className="codish-ui-tab-add"
                    onClick={this.handleAddClick} id={this.addId}>+</div>
            );
        }
    }

    handleWindowResize = () => {
        this.calcItems();
    }

    delayResize = _.throttle(this.handleWindowResize, 200);

    calcItems = () => {
        let container = document.getElementById(this.itemsContainerId).getBoundingClientRect();
        let containerSize = container.width;
        if (this.props.vertical) {
            containerSize = container.height;
        }
        let items = document.querySelectorAll(`#${this.itemsId} .codish-ui-tab-item`);
        let total = 0;
        for (let i = 0; i < items.length; i++) {
            let cur = items[i].getBoundingClientRect();
            if (this.props.vertical) {
                total += cur.height;
            } else {
                total += cur.width;
            }
            if (total > containerSize) {
                this.setState({
                    showMore: true,
                    delta: 0
                });
                this.calcHideItems();
                return;
            }
        }
        this.setState({
            showMore: false,
            delta: 0
        });
    }

    calcHideItems = () => {
        let container = document.getElementById(this.itemsContainerId).getBoundingClientRect();
        let containerSize = container.width;
        if (this.props.vertical) {
            containerSize = container.height;
        }
        let delta = this.state.delta || 0;
        let items = document.querySelectorAll(`#${this.itemsId} .codish-ui-tab-item`);
        let total = 0;
        for (let i = 0; i < items.length; i++) {
            let cur = items[i].getBoundingClientRect();
            let curSize = cur.width;
            if (this.props.vertical) {
                curSize = curSize.height;
            }
            total += curSize;
            if (this.state.activeIndex === i) {
                if (delta > total - curSize) {
                    this.setState({
                        delta: total - curSize
                    });
                }
                if (delta + containerSize < total) {
                    this.setState({
                        delta: total - containerSize
                    });
                }
            }
        }
    }

    renderMore() {
        if (this.state.showMore) {
            return (
                <div className="codish-ui-tab-more" id={this.moreId}
                    onClick={this.handleMoreClick}>more</div>
            );
        }
        return null;
    }

    handleMoreClick = () => {
        let more = document.getElementById(this.moreId).getBoundingClientRect();
        this.menuPosition = {
            x: more.x,
            y: more.y + more.height
        };
        if (this.props.vertical) {
            this.menuPosition = {
                x: more.x + more.width,
                y: more.y
            };
        }
        this.menuData = this.getHideMenu();
        this.setState({
            showMoreMenu: true
        });
    }

    getHideMenu = () => {
        let menu = [];
        let total = 0;
        let items = document.querySelectorAll(`#${this.itemsId} .codish-ui-tab-item`);
        let container = document.getElementById(this.itemsContainerId).getBoundingClientRect();
        let containerSize = container.width;
        if (this.props.vertical) {
            containerSize = container.height;
        }
        let delta = this.state.delta || 0;
        React.Children.forEach(this.props.children, (item, index) => {
            let cur = items[index].getBoundingClientRect();
            let curSize = cur.width;
            if (this.props.vertical) {
                curSize = curSize.height;
            }
            if (total < delta || total + curSize > delta + containerSize) {
                menu.push({
                    index,
                    text: item.props.label
                });
            }
            total += curSize;
        });
        return menu;
    }

    handleMenuClose = () => {
        this.setState({
            showMoreMenu: false
        });
    }

    handleMenuClick = (label, index) => {
        this.setState({
            activeIndex: this.menuData[index].index
        }, this.calcHideItems);
    }

    render() {
        let {className} = this.props;
        let cls = classNames('codish-ui-tab', className, {
            'is-vertical': this.props.vertical
        });
        let style = {};
        if (this.props.vertical) {
            style.transform = `translateY(-${this.state.delta || 0}px)`;
        } else {
            style.transform = `translateX(-${this.state.delta || 0}px)`;
        }
        return (
            <div className={cls}>
                <div className="codish-ui-tab-bar" id={this.barId}>
                    <div className="codish-ui-tab-items-container" id={this.itemsContainerId}>
                        <div className="codish-ui-tab-items" id={this.itemsId}
                            style={style}>
                            {this.renderTabBar()}
                        </div>
                    </div>
                    {this.renderMore()}
                    {this.renderAdd()}
                    <div className="codish-ui-tab-tools" id={this.toolsId}>
                        {this.props.tools}
                    </div>
                </div>
                <div className="codish-ui-tab-content">
                    {this.renderTabContent()}
                </div>
                {this.state.showMoreMenu ? <Menu data={this.menuData} position={this.menuPosition}
                    onClose={this.handleMenuClose}
                    onItemClick={this.handleMenuClick} /> : null}
            </div>
        );
    }
}
