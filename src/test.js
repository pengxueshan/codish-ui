import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Input from './input';

class App extends Component {
    render() {
        return (
            <div>
                <Input type="number" digits="3" />
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
