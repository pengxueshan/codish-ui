import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default class Table extends Component {
    static propTypes = {
        className: PropTypes.string,
        style: PropTypes.object,
        head: PropTypes.array,
        body: PropTypes.array,
    };

    static defaultProps = {
        style: {}
    };

    renderHead() {}

    render() {
        let cls = classNames('codish-ui-table', this.props.className);
        return (
            <div className={cls} style={this.props.style}>
                <div className="codish-ui-table-head-wrap">
                    {this.renderHead()}
                </div>
                <div className="codish-ui-table-body-wrap"></div>
            </div>
        );
    }
}
