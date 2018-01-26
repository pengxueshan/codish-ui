import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Input from './input';

import './test.css';

class App extends Component {
    state = {
        defaultValue: '带默认值的输入框'
    }

    handleChangeButtonClick = () => {
        this.setState({
            defaultValue: Math.random()
        });
    }

    render() {
        return (
            <div className="test-root">
                <div className="item">
                    <Input
                        placeholder="这是一个输入框" />
                </div>
                <div className="item">
                    <Input
                        type="number"
                        digits={3}
                        placeholder="这是一个可以输入3位小数的浮点数输入框" />
                </div>
                <div className="item">
                    <Input
                        type="int"
                        placeholder="这是一个整数输入框" />
                </div>
                <div className="item">
                    <Input
                        regExp={/^(a|b|c)*$/i}
                        placeholder="这是一个自定义正则表达式的输入框(只能输入a,b,c)" />
                </div>
                <div className="item">
                    <Input
                        defaultValue={this.state.defaultValue} />
                    <button onClick={this.handleChangeButtonClick}>改变默认值</button>
                </div>
                <div className="item">
                    <Input
                        inline
                        placeholder="inline 模式" />
                </div>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
