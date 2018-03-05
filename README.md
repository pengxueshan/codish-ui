# Input

## props

### type: string
input value type, support `number`(float number), `int`(integer)

### regExp: object

### nativeType: string
input type

### className: string
custom class names

### placeholder: string

### digits: number
floating number digits

### label: string
label for input

### labelWidth: number
custom label width

### renderExtra: func
render the content behind input, return a react component

### extraWidth: number
custom width of extra content

### inner: bool
whether the extra content is inside input

### onChange: func

### onFocus: func

### onBlur: func

### defaultValue: string | number

### inline: bool
whether the input component is inline

## usage
```js
import React, {Component} from 'react';
import {Input} from 'codish-ui';

class TestInput extends Component {
    state = {
        value: ''
    }

    handleChange = v => {
        this.setState({
            value: v
        });
    }

    render() {
        return (
            <div>
                <Input
                    type="number"
                    digits={3}
                    placeholder="input number"
                    onChange={this.handleChange} />
                <Input
                    type="int"
                    placeholder="input integer" />
                <Input
                    regExp={/^(a|b|c)*$/i}
                    placeholder="just input a, b or c" />
                <Input
                    defaultValue="default input value" />
                <Input
                    inline
                    placeholder="inline input"
                    label="weight"
                    labelWidth={100}
                    renderExtra={() => <div>kg</div>}
                    inner />
                <Input
                    nativeType="password"
                    placeholder="password" />
            </div>
        );
    }
}
```

# Button

## props

### className: string

### inline: bool

### onClick: func

### disabled: bool

## usage
```js
import React, {Component} from 'react';
import {Button} from 'codish-ui';

class TestButton extends Component {
    state = {
        disabled: false
    }

    handleClick = () => {
        console.log('button clicked');
        this.setState({
            disabled: !this.state.disabled
        });
    }

    render() {
        return (
            <Button className="test-button"
                disabled={this.state.disabled}
                onClick={this.handleClick}>button</Button>
        );
    }
}
```
