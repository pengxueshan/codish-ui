import React, {Component} from 'react';
import classNames from 'classnames';

import './index.css';

const FILTER_DATA = [
    //第一层
    {
        title: 'filter 1',
        items: [
            {id: 'A1', label: 'A1'},
            {id: 'A2', label: 'A2'},
            {id: 'A3', label: 'A3'},
        ]
    },
    //第二层
    {
        title: 'filter 2',
        items: [
            {id: 'B1', label: 'B1', parent: ['A1', 'A2']},
            {id: 'B2', label: 'B2', parent: ['A1', 'A2', 'A3']},
            {id: 'B3', label: 'B3', parent: ['A3']},
        ]
    },
    //第三层
    {
        title: 'filter 3',
        items: [
            {id: 'C1', label: 'C1', parent: ['B1']},
            {id: 'C2', label: 'C2', parent: ['B2']},
            {id: 'C3', label: 'C3', parent: ['B3']},
        ]
    },
];

export default class Filter extends Component {
    state = {
        active: [],
    };

    renderItems() {
        return FILTER_DATA.map((outItem, outIndex) => {
            return (
                <div className="codish-ui-filter__item" key={outIndex}>
                    <div className="codish-ui-filter__item-title">
                        {outItem.title}
                    </div>
                    <div className="codish-ui-filter__item-content">
                        {
                            outItem.items.map((item, index) => {
                                let active = this.state.active[outIndex - 1];
                                if (active && item.parent && !item.parent.includes(active)) {
                                    return null;
                                }
                                let cls = classNames({
                                    'active': this.state.active[outIndex] === item.id
                                });
                                return (
                                    <span className={cls} key={item.id} onClick={() => {
                                        this.handleItemClick(outIndex, item);
                                    }}>{item.label}</span>
                                );
                            })
                        }
                    </div>
                </div>
            );
        });
    }

    handleItemClick = (index, data) => {
        let cur = this.state.active;
        let id = data && data.id;
        let tmp = cur.concat();
        for (let i = 0; i < FILTER_DATA.length; i++) {
            let item = cur[i];
            if (index === i) {
                if (item === id) {
                    tmp[i] = undefined;
                } else {
                    tmp[i] = id;
                }
            } else if (i > index) {
                tmp[i] = undefined;
            }
        }
        this.setState({
            active: tmp
        });
    }

    render() {
        return (
            <div className="codish-ui codish-ui-filter">
                {this.renderItems()}
            </div>
        );
    }
}