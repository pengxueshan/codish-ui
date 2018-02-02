import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Input from './input';
import Tab from './tab';
import TabPane from './tab/tab-pane';
import Button from './button';
import Scrollable from './scrollable';
import Table from './table';

import './test.css';

class App extends Component {
    state = {
        defaultValue: '带默认值的输入框',
        tabArr: ['tab1', 'tab2', 'tab3']
    }

    tabs = {
        'tab1': <TabPane label="tab1" closable={false} key="tab1">das 1</TabPane>,
        'tab2': <TabPane label="tab2" key="tab2">das 2</TabPane>,
        'tab3': <TabPane label="tab3" key="tab3">das 3</TabPane>
    };

    handleChangeButtonClick = () => {
        this.setState({
            defaultValue: Math.random()
        });
    }

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
        let tabs = this.state.tabArr.map(item => {
            return this.tabs[item];
        });
        return (
            <div className="test-root">
                <h2>input</h2>
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
                <div className="item">
                    <Input
                        inline
                        placeholder="inline 模式"
                        label="带标题的" />
                </div>
                <div className="item" style={{width: '300px'}}>
                    <Input
                        inline
                        placeholder="inline 模式"
                        label="自定义标题长度"
                        labelWidth={100} />
                </div>
                <div className="item">
                    <Input
                        inline
                        placeholder="inline 模式"
                        label="输入框后面有内容-内部"
                        renderExtra={() => <div>test</div>}
                        inner />
                </div>
                <div className="item">
                    <Input
                        inline
                        placeholder="inline 模式"
                        label="输入框后面有内容"
                        renderExtra={() => <div>test</div>} />
                </div>
                <h2>scroll</h2>
                <Scrollable style={{height: '50px', border: '1px solid #000'}}>
                    <p>dadadasdad</p>
                    <p>dadadasdad</p>
                    <p>dadadasdad</p>
                    <p>dadadasdad</p>
                    <p>dadadasdad</p>
                    <p>dadadasdad</p>
                    <p>dadadasdad</p>
                    <p>dadadasdad</p>
                    <p>dadadasdad</p>
                    <p>dadadasdad</p>
                    <p>dadadasdad</p>
                    <p>dadadasdad</p>
                    <p>dadadasdad</p>
                    <p>dadadasdad</p>
                    <p>dadadasdad</p>
                    <p>dadadasdad</p>
                    <p>dadadasdad</p>
                    <p>dadadasdad</p>
                    <p>dadadasdad</p>
                    <p>dadadasdad</p>
                </Scrollable>
                <h2>tab</h2>
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
                <Table
                    style={{height: '100px'}}
                    headFixed
                    bodyWidth={1800}
                    trHoverClassName="hover-class"
                    head={[<div onClick={() => {console.log('test')}}>dada</div>, 'key1', 'key2', 'key3']}
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

ReactDOM.render(<App />, document.getElementById('root'));
