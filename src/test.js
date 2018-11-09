import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Input from './input';
import Tab from './tab';
import TabPane from './tab/tab-pane';
import Button from './button';
import Scrollable from './scrollable';
import Table from './table';
import Menu from './menu';
import Popup from './popup';
import Calendar from './calendar';
import DatePicker from './date-picker';
import Select from './select';
import Badge from './badge';
import ToolTip from './tool-tip';
import Upload from './upload';
import Shortcut from './shortcut';

import './test.css';

class App extends Component {
    state = {
        defaultValue: '带默认值的输入框',
        tabArr: ['tab1', 'tab2', 'tab3'],
        showPopup: true
    }

    tabs = {
        'tab1': <TabPane label="tab1" closable={false} key="tab1">das 1</TabPane>,
        'tab2': <TabPane label="tab2" key="tab2">das 2</TabPane>,
        'tab3': <TabPane label="tab3" key="tab3">das 3</TabPane>
    };

    closePopup = () => {
        this.setState({
            showPopup: false
        });
    }

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
                <div className="item">
                    <Input
                        nativeType="password"
                        placeholder="password" />
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
                <Tab>
                    <TabPane label="tab1" key="tab1">tab1</TabPane>
                    <TabPane label="tab2" key="tab2">tab2</TabPane>
                    <TabPane label="tab3" key="tab3">tab3</TabPane>
                </Tab>
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
                <p>head fix table</p>
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
                <p>normal table</p>
                <Table
                    trHoverClassName="hover-class"
                    resizable
                    head={[<div onClick={() => {console.log('test')}}>dada</div>, {key: 'key1', label: 'key1 label'}, 'key2', 'key3']}
                    body={[
                        {
                            key1: 'key1-content',
                            key2: 'key2-content',
                            key3: {
                                className: 'testclass',
                                content: 'dadas'
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
                <h2>menu</h2>
                <div style={{height: '100px', border: '1px solid #ddd'}} onContextMenu={e => {
                    e.preventDefault();
                    this.setState({
                        showMenu: true,
                        menuPosition: {
                            x: e.pageX,
                            y: e.pageY
                        }
                    });
                }}>
                    {this.state.showMenu ? <Menu data={['menu item1', {text: 'menu item2', children: ['children', 'children']}]} position={this.state.menuPosition}
                        onClose={() => {
                            this.setState({
                                showMenu: false
                            });
                        }} onItemClick={(text, index) => {
                            console.log(text, index);
                        }} /> : null}
                </div>
                {
                    this.state.showPopup ? <Popup onClose={this.closePopup}><div>test</div></Popup> : null
                }
                <h2>calendar</h2>
                <Calendar />
                <h2>date picker</h2>
                <DatePicker />
                <h2>select</h2>
                <Select options={[1, 2, 3, 4]} />
                <h2>badge</h2>
                <Badge value="99">
                    <div>test badge</div>
                </Badge>
                <Badge value="99" max={50}>
                    <div>test badge</div>
                </Badge>
                <Badge value="99" max={50} isDot>
                    <div>test badge</div>
                </Badge>
                <h2>tool tip</h2>
                <ToolTip tipText="teddslakjfkla">
                    <div style={{padding: '5px', border: '1px solid #000', marginRight: '10px'}}>提示在顶部</div>
                </ToolTip>
                <ToolTip tipText="teddslakjfkla" direction="right">
                    <div style={{padding: '5px', border: '1px solid #000', marginRight: '10px'}}>提示在右侧</div>
                </ToolTip>
                <ToolTip tipText="teddslakjfkla" direction="bottom">
                    <div style={{padding: '5px', border: '1px solid #000', marginRight: '10px'}}>提示在底部</div>
                </ToolTip>
                <ToolTip tipText="teddslakjfkla" direction="left">
                    <div style={{padding: '5px', border: '1px solid #000', marginRight: '10px'}}>提示在左侧</div>
                </ToolTip>
                <h2>upload</h2>
                <Upload><button>upload</button></Upload>
                <h2>shortcut</h2>
                <Shortcut
                    onKeyDown={() => {
                        console.log('key down1 !!!!');
                    }}
                    isGlobal
                ><div>test short cut1</div></Shortcut>
                <Shortcut
                    onKeyDown={() => {
                        console.log('key down2 !!!!');
                    }}
                    onKeyUp={(e, code) => {
                        console.log('key up2:', e, code);
                    }}
                    prevent
                ><div>test short cut2</div></Shortcut>
                <p>test</p>
                <p>test</p>
                <p>test</p>
                <p>test</p>
                <p>test</p>
                <p>test</p>
                <p>test</p>
                <p>test</p>
                <p>test</p>
                <p>test</p>
                <p>test</p>
                <p>test</p>
                <p>test</p>
                <p>test</p>
                <p>test</p>
                <p>test</p>
                <p>test</p>
                <p>test</p>
                <p>test</p>
                <p>test</p>
                <p>test</p>
                <p>test</p>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
