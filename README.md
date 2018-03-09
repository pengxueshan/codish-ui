A React-based UI library

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

# Dragable

## props

### dragId: string
drag bar's id

### draggable: bool

### onMoveStart: func

### onMoving: func

### onMoveEnd: func

### getBoundaryDom: func
return the boundary area dom of drag

## usage
```js
import React, {Component} from 'react';
import {Draggable} from 'codish-ui';

class TestDraggable extends Component {
    getBoundaryDom = () => {
        return document.getElementsByTagName('body')[0];
    }

    render() {
        return (
            <Draggable
                dragId="dragbar-id"
                getBoundaryDom={this.getBoundaryDom}>
                <div>
                    <div id="drag-id"></div>
                    draggable
                </div>
            </Draggable>
        );
    }
}
```

# Modal

## props

### className: string

### modal: bool

### show: bool

### noneParent: bool

## usage
```js
import React, {Component} from 'react';
import {Modal} from 'codish-ui';

class TestModal extends Component {
    state = {
        show: false
    };

    handleHideClick = () => {
        this.setState({
            show: false
        });
    }

    handleShowClick = () => {
        this.setState({
            show: true
        });
    }

    render() {
        return (
            <div>
                <p onClick={this.handleShowClick}>click and show modal</p>
                {
                    this.state.show ? <Modal
                        show={this.state.show}>
                        <div onClick={this.handleHideClick}>test modal</div>
                    </Modal> : null
                }
            </div>
        );
    }
}
```

# Layer

## props

### className: string

### position: object
{x: 0, y: 0}

### fixed: bool
the css property position fixed

### show: bool

### autoHide: bool
click document to hide layer

### onClose: func
document click handler

### delayClose: number

## usage
```js
import React, {Component} from 'react';
import {Layer} from 'codish-ui';

class TestLayer extends Component {
    state = {
        show: false
    };

    handleClose = () => {
        this.setState({
            show: false
        });
    }

    handleShowClick = () => {
        this.setState({
            show: true
        });
    }

    render() {
        return (
            <div>
                <p onClick={this.handleShowClick}>click and show Layer</p>
                {
                    this.state.show ? <Layer
                        onClose={this.handleClose}>
                            <div>test layer</div>
                        </Layer> : null
                }
            </div>
        );
    }
}
```

# Menu

## props

### className: string

### width: number

### height: number

### data: array

### onItemClick: func

### position: object

### onClose: func

## usage
```js
import React, {Component} from 'react';
import {Menu} from 'codish-ui';

class TestMenu extends Component {
    data = [
        'menu item 1',
        {
            text: 'menu item 2'
        },
        '__sep__',
        {
            text: 'menu item 3',
            children: [
                'menu item 3-1',
                'menu item 3-2',
            ]
        }
    ];

    state = {
        show: false,
        position: {x: 0, y: 0}
    };

    handleClose = () => {
        this.setState({
            show: false
        });
    }

    handleShowClick = (e) => {
        this.setState({
            show: true,
            position: {
                x: e.pageX,
                y: e.pageY
            }
        });
    }

    handleItemClick = (text, index) => {
        console.log(text, index);
    }

    render() {
        return (
            <div>
                <p onClick={this.handleShowClick}>click and show Menu</p>
                {
                    this.state.show ? <Menu
                        data={this.data}
                        onItemClick={this.handleItemClick}
                        onClose={this.handleClose}
                        width={150}
                        position={this.state.position} /> : null
                }
            </div>
        );
    }
}
```

# Popup

## props

### title: string

### buttons: array

### onBtnClick: func

### onClose: func

### draggable: bool

### className: string

### width: number

### height: number

### style: object

## usage
```js
import React, {Component} from 'react';
import {Popup} from 'codish-ui';

class TestPopup extends Component {
    state = {
        show: false
    };

    handleClose = () => {
        this.setState({
            show: false
        });
    }

    handleShowClick = () => {
        this.setState({
            show: true
        });
    }

    handleBtnClick = (index, e) => {
        console.log(index, e);
    }

    render() {
        return (
            <div>
                <p onClick={this.handleShowClick}>click and show popup</p>
                {
                    this.state.show ? <Popup
                        onClose={this.handleClose}
                        title="test popup"
                        buttons={['ok', 'cancel']}
                        onBtnClick={this.handleBtnClick}
                        draggable={false}
                        width={300}
                        height={150}>
                            <div>test popup</div>
                        </Popup> : null
                }
            </div>
        );
    }
}
```

# Scrollable

## props

### className: string

### style: object

### options: object
see: [perfect-scrollbar](https://github.com/utatti/perfect-scrollbar)

### getInstance: func
return the instance of [perfect-scrollbar](https://github.com/utatti/perfect-scrollbar)

# Select

## props

### className: string

### options: array
same with the property data of Menu

### onItemClick: func

### defaultActiveIndex: number

### placeholder: string

### width: number

## usage
```js
import React, {Component} from 'react';
import {Select} from 'codish-ui';

class TestSelect extends Component {
    data = ['item 1', 'item 2'];

    handleItemClick = (text, index) => {
        console.log(text, index);
    }

    render() {
        return (
            <div>
                <Select
                    options={this.data}
                    placeholder="pls select..."
                    defaultActiveIndex={1}
                    onItemClick={this.handleItemClick}
                    width={150} />
            </div>
        );
    }
}
```

# Tab and TabPane

## Tab props

### className: string

### tabClassName: string
tab item class name

### showClose: bool
show tab item close button

### showAdd: string
show add tab item button

### tools: any
tab's tool buttons

### vertical: bool
vertically arrange the tab item

## TabPane props

### className: string

### label: string
the tab item text

### closable: bool

## usage
```js
import React, {Component} from 'react';
import {Tab, TabPane, Button} from 'codish-ui';

class TestTab extends Component {
    state = {
        tabArr: ['tab1', 'tab2', 'tab3']
    }

    tabs = {
        'tab1': <TabPane label="tab1" closable={false} key="tab1">das 1</TabPane>,
        'tab2': <TabPane label="tab2" key="tab2">das 2</TabPane>,
        'tab3': <TabPane label="tab3" key="tab3">das 3</TabPane>
    };

    handleTabClose = (index, key) => {
        let tmpset = new Set(this.state.tabArr);
        tmpset.delete(key);
        this.setState({
            tabArr: [...tmpset]
        });
    }

    handleAddClick = (activeIndex, total) => {
        let newkey = `tabnew${total + 1}`;
        this.tabs[newkey] = (
            <TabPane label={newkey} key={newkey}>das new</TabPane>
        )
        let arr = this.state.tabArr;
        arr.push(newkey);
        this.setState({
            tabArr: arr
        });
    }

    render() {
        return (
            <div>
                <Tab className="testtab" showClose showAdd
                    onClose={this.handleTabClose}
                    onAddClick={this.handleAddClick}
                    tools={<Button>tab tool button</Button>}>
                    {tabs}
                </Tab>
                <Tab vertical>
                    <TabPane label="tab1">tab bar item is vertical 1</TabPane>
                    <TabPane label="tab2">tab bar item is vertical 2</TabPane>
                </Tab>
            </div>
        );
    }
}
```

# Table

## props

### className: string

### style: object

### head: array
table head data

### body: array
table body data

### headFixed: bool
fix the table head when table scroll

### resizable: bool
resize the table head item

### bodyWidth: number
table body width

### itemHeight: number
the height of table body item(tr)

### overScan: number

### trHoverClassName: string

### onTrClick: func

### onTrDoubleClick: func

## usage
```js
import React, {Component} from 'react';
import {Table} from 'codish-ui';

class TestTable extends Component {
    render() {
        return (
            <div>
                <Table
                    style={{height: '100px'}}
                    headFixed
                    bodyWidth={1800}
                    trHoverClassName="hover-class"
                    resizable
                    head={[<div onClick={() => {console.log('test')}}>dada</div>, {key: 'key1', label: 'key1 label'}, 'key2', 'key3']}
                    body={[
                        {
                            key1: 'key1-content',
                            key2: 'key2-content',
                            key3: {
                                className: 'testclass',
                                content: <div><input type="text"/></div>
                            },
                        },
                        {
                            key1: 'key1-content',
                            key2: 'key2-content',
                            key3: {
                                className: 'testclass',
                                content: 'key3-content'
                            },
                        },
                        {
                            key1: 'key1-content',
                            key2: 'key2-content',
                            key3: {
                                className: 'testclass',
                                content: 'key3-content'
                            },
                        },
                        {
                            key1: 'key1-content',
                            key2: 'key2-content',
                            key3: {
                                className: 'testclass',
                                content: 'key3-content'
                            },
                        },
                        {
                            key1: 'key1-content',
                            key2: 'key2-content',
                            key3: {
                                className: 'testclass',
                                content: 'key3-content'
                            },
                        },
                        {
                            key1: 'key1-content',
                            key2: 'key2-content',
                            key3: {
                                className: 'testclass',
                                content: 'key3-content'
                            },
                        },
                        {
                            key1: 'key1-content',
                            key2: 'key2-content',
                            key3: {
                                className: 'testclass',
                                content: 'key3-content'
                            },
                        },
                        {
                            key1: 'key1-content',
                            key2: 'key2-content',
                            key3: {
                                className: 'testclass',
                                content: 'key3-content'
                            },
                        },
                        {
                            key1: 'key1-content',
                            key2: 'key2-content',
                            key3: {
                                className: 'testclass',
                                content: 'key3-content'
                            },
                        },
                        {
                            key1: 'key1-content',
                            key2: 'key2-content',
                            key3: {
                                className: 'testclass',
                                content: 'key3-content'
                            },
                        }
                    ]} />
            </div>
        );
    }
}
```
