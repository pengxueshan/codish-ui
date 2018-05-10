import React, {Component} from 'react';
import {findDOMNode} from 'react-dom';
import PropTypes from 'prop-types';
import Menu from '../menu';
import classNames from 'classnames';

import './index.css';

export default class Select extends Component {
    static propTypes = {
        className: PropTypes.string,
        options: PropTypes.array,
        onItemClick: PropTypes.func,
        defaultActiveIndex: PropTypes.number,
        placeholder: PropTypes.string,
        width: PropTypes.number,
    };

    static defaultProps = {
        className: '',
        placeholder: '请选择...',
        options: [],
        onItemClick: () => {},
        width: 150,
    };

    state = {
        show: false,
        activeIndex: this.props.defaultActiveIndex || -1
    };

    componentDidMount() {
        this.optionPosition = this.getOptionPosition();
    }

    getOptionPosition = () => {
        let curDom = findDOMNode(this).getBoundingClientRect();
        return {
            x: window.scrollX + curDom.x,
            y: window.scrollY + curDom.y + curDom.height,
        };
    }

    handleItemClick = (text, index) => {
        this.closeOptions();
        this.setState({
            activeIndex: index
        });
        this.props.onItemClick(text, index);
    }

    closeOptions = () => {
        this.setState({
            show: false
        });
    }

    showOptions = () => {
        this.setState({
            show: true
        });
    }

    render() {
        let {className, placeholder} = this.props;
        let {activeIndex, show} = this.state;
        let cls = classNames('codish-ui-select', className);
        let text = placeholder;
        if (activeIndex > -1) {
            let activeItem = this.props.options[activeIndex];
            text = activeItem.text || activeItem;
        }
        let style = {
            width: this.props.width + 'px'
        };
        return (
            <div className={cls} style={style}>
                <div className="codish-ui-select-active" onClick={this.showOptions}>{text}</div>
                {show ? <Menu data={this.props.options} onItemClick={this.handleItemClick}
                    onClose={this.closeOptions} position={this.optionPosition}
                    width={this.props.width} /> : null}
            </div>
        );
    }
}
