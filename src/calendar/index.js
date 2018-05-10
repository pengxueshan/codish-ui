import React, {Component} from 'react';
import classNames from 'classnames';

import './index.css';

const WEEK = {
    '1': {'zh': '一'},
    '2': {'zh': '二'},
    '3': {'zh': '三'},
    '4': {'zh': '四'},
    '5': {'zh': '五'},
    '6': {'zh': '六'},
    '7': {'zh': '日'},
};

const M_SECONDS_OF_ONE_DAY = 1000 * 60 * 60 * 24;

const MONTHS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

export default class Calendar extends Component {
    static defaultProps = {
        curTime: new Date().getTime(),
        weekSort: ['1', '2', '3', '4', '5', '6', '7'],
        lang: 'zh'
    };

    state = {
        curYear: '',
        curMonth: '',
        curDay: '',
        showMonthLayer: false,
        deltaYearIndex: 0,
        showYearLayer: false
    };

    componentDidMount() {
        let d;
        if (!this.props.curTime) {
            d = new Date();
        } else {
            d = new Date(this.props.curTime);
        }
        this.setState({
            curYear: d.getFullYear(),
            curMonth: d.getMonth(),
            curDay: d.getDate(),
        });
    }

    renderHeader() {
        let year = this.state.curYear;
        let month = this.state.curMonth;
        if (year === undefined || month === undefined) {
            let d = new Date();
            year = d.getFullYear();
            month = d.getMonth();
        }
        return (
            <div className="codish-ui-calendar__header">
                <span className="prev-year" onClick={this.prevYear}> &lt;&lt; </span>
                <span className="prev-month" onClick={this.prevMonth}> &lt; </span>
                <span onClick={this.showYearLayer}> {year} 年</span>
                <span onClick={this.showMonthLayer}> {month + 1} 月</span>
                <span className="next-month" onClick={this.nextMonth}> &gt; </span>
                <span className="next-year" onClick={this.nextYear}> &gt;&gt; </span>
            </div>
        );
    }

    showMonthLayer = () => {
        this.setState({
            showMonthLayer: true
        });
    }

    showYearLayer = () => {
        this.setState({
            showYearLayer: true
        });
    }

    prevYear = () => {
        let year = this.state.curYear;
        this.setState({
            curYear: year - 1
        });
    }

    prevMonth = () => {
        let month = this.state.curMonth;
        let year = this.state.curYear;
        month -= 1;
        if (month < 0) {
            month = 11;
            year -= 1;
        }
        this.setState({
            curMonth: month,
            curYear: year
        });
    }

    nextYear = () => {
        let year = this.state.curYear;
        this.setState({
            curYear: year + 1
        });
    }

    nextMonth = () => {
        let month = this.state.curMonth;
        let year = this.state.curYear;
        month += 1;
        if (month > 11) {
            month = 0;
            year += 1;
        }
        this.setState({
            curMonth: month,
            curYear: year
        });
    }

    renderWeek() {
        return (
            <div className="codish-ui-calendar__week">
                {this.props.weekSort.map(item => {
                    return (
                        <span key={item} className="cell">{WEEK[item][this.props.lang]}</span>
                    )
                })}
            </div>
        );
    }

    renderDays() {
        let year = this.state.curYear;
        let month = this.state.curMonth;
        let d = new Date(year, month);
        let deltaDay = Math.abs(Number(this.props.weekSort[0]) - d.getDay());
        let firstDayTime = d.getTime() - M_SECONDS_OF_ONE_DAY * deltaDay;
        let ret = [];
        let today = new Date();
        for (let i = 0; i < 6; i++) {
            let cols = [];
            for (let j = 0; j < Object.keys(WEEK).length; j++) {
                let curDate = new Date(firstDayTime + (i * 7 + j) * M_SECONDS_OF_ONE_DAY);
                let text = curDate.getDate();
                let cls = classNames('cell', {
                    'cur': curDate.getMonth() == d.getMonth(),
                    'cur-day': curDate.getFullYear() == today.getFullYear() && curDate.getMonth() == today.getMonth() && text == today.getDate()
                });
                cols.push(
                    <span key={`${i}-${j}`} className={cls}
                        data-day={text}
                        data-month={curDate.getMonth()}
                        data-year={curDate.getFullYear()}
                        onClick={this.handleDayClick}>{text}</span>
                );
            }
            let row = <div key={`${i}`}>{cols}</div>;
            ret.push(row);
        }
        return <div className="codish-ui-calendar__days">{ret}</div>;
    }

    handleDayClick = e => {
        let year = e.target.dataset.year;
        let month = Number(e.target.dataset.month) + 1;
        let day = e.target.dataset.day;
        if (typeof this.props.onChange === 'function') {
            this.props.onChange({
                year,
                month,
                day
            });
        }
    }

    setMonth = e => {
        this.setState({
            curMonth: +e.target.dataset.month - 1,
            showMonthLayer: false
        });
    }

    renderMonthLayer() {
        if (!this.state.showMonthLayer) {
            return null;
        }
        return (
            <div className="month-layer">
                {MONTHS.map(item => {
                    return <span key={item} onClick={this.setMonth} data-month={item}>{item}</span>;
                })}
            </div>
        );
    }

    setYear = e => {
        this.setState({
            curYear: +e.target.dataset.year,
            showYearLayer: false,
            deltaYearIndex: 0
        });
    }

    prevYearIndex = () => {
        this.setState({
            deltaYearIndex: this.state.deltaYearIndex - 1
        });
    }

    nextYearIndex = () => {
        this.setState({
            deltaYearIndex: this.state.deltaYearIndex + 1
        });
    }

    renderYearLayer() {
        if (!this.state.showYearLayer) {
            return null;
        }
        let years = [];
        let start = this.state.deltaYearIndex * 9 + this.state.curYear;
        for (let i = 0; i < 9; i++) {
            years.push(
                <span key={start + i} onClick={this.setYear} data-year={start + i}>{start + i}</span>
            );
        }
        return (
            <div className="year-layer">
                <div className="year-layer__header">
                    <span className="year-layer__prev" onClick={this.prevYearIndex}>&lt;</span>
                    {this.state.curYear}
                    <span className="year-layer__next" onClick={this.nextYearIndex}>&gt;</span>
                </div>
                <div className="year-layer__years">{years}</div>
            </div>
        );
    }

    render() {
        let cls = classNames('codish-ui-calendar', this.props.className);
        return (
            <div className={cls}>
                {this.renderHeader()}
                {this.renderWeek()}
                {this.renderDays()}
                {this.renderMonthLayer()}
                {this.renderYearLayer()}
            </div>
        );
    }
}
