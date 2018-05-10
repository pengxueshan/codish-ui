import React, {Component} from 'react';
import Calendar from '../calendar';
import Layer from '../layer';

export default class DatePicker extends Component {
    state = {
        showCalendar: false,
        date: ''
    };

    close = () => {
        this.setState({
            showCalendar: false
        });
    }

    renderCalendar() {
        if (!this.state.showCalendar || !this.input) return null;
        let inputRect = this.input.getBoundingClientRect();
        let x = window.scrollX + inputRect.x;
        let y = window.scrollY + inputRect.y;
        if (window.innerHeight - inputRect.bottom < 200) {
            y = window.scrollY + inputRect.y - 190;
        } else {
            y = window.scrollY + inputRect.y + inputRect.height + 5;
        }
        let position = {
            x,
            y
        };
        return (
            <Layer position={position} onClose={this.close}>
                <Calendar className="codish-ui-date-picker-calendar"
                    onChange={this.handleCalendarChange} />
            </Layer>
        );
    }

    handleClick = () => {
        this.setState({
            showCalendar: !this.state.showCalendar
        });
    }

    handleCalendarChange = date => {
        this.setState({
            date: `${date.year}-${date.month}-${date.day}`,
            showCalendar: false
        }, () => {
            if (typeof this.props.onChange === 'function') {
                this.props.onChange(this.state.date, date);
            }
        });
    }

    render() {
        return (
            <div className="codish-ui-date-picker">
                <input type="text" ref={node => this.input = node}
                    onClick={this.handleClick}
                    value={this.state.date} />
                {this.renderCalendar()}
            </div>
        );
    }
}
