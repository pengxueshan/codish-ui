import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default class TabPane extends Component {
    static propTypes = {
        className: PropTypes.string,
        label: PropTypes.string,
        closable: PropTypes.bool,
    };

    static defaultProps = {
        className: '',
    };

    render() {
        let {className} = this.props;
        let cls = classNames('codish-ui-tab-pane', className);
        return (
            <div className={cls}>
                {this.props.children}
            </div>
        );
    }
}
