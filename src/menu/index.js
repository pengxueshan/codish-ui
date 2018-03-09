import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Modal from '../modal';
import classNames from 'classnames';

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
        show: true
    };

    componentDidMount() {
        document.addEventListener('click', this.close);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.close);
    }

    handleItemClick = e => {
        let target = e.currentTarget;
        this.props.onItemClick(target.dataset['text'], target.dataset['index'], e);
        this.close();
    }

    renderItem(data) {
        return data.map((item, index) => {
            if (item === '__sep__') {
                return <div key={index} className="codish-ui-menu-sep"></div>;
            }
            if (item.children) {
                let text = item.text || '';
                return (
                    <div key={index} className="codish-ui-menu-item has-children" onClick={this.handleItemClick}
                        data-index={index} data-text={text} data-children={true}>
                        {text}
                        <div className="codish-ui-menu-children">{this.renderItem(item.children)}</div>
                    </div>
                );
            }
            let text = item.text || item;
            return (
                <div key={index} className="codish-ui-menu-item" onClick={this.handleItemClick}
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
        this.setState({
            show: false
        });
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
            <Modal show={this.state.show} modal={false}>
                <div className={cls} style={style}>
                    {this.renderItem(this.props.data)}
                </div>
            </Modal>
        );
    }
}
