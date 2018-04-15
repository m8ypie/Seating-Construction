import React, { Component } from "react";
import elements from "../seatingValues/Elements"
import { Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;

export default class ElementSelection extends Component {


    constructor(props){
        super(props);
        this.onOpenChange = this.onOpenChange.bind(this)
        this.rootSubmenuKeys = elements.map(element => {
            return element.value
        })
        this.state = {
            openKeys: [],
        };
    }

    constructSeatingMenus(){
        return elements.map(element => {
            return <SubMenu key={element.value} title={element.label}>
                    {
                        element.data.map(subElement => {
                            return <Menu.Item key={subElement.value}>{subElement.label}</Menu.Item>
                        })
                    }
                </SubMenu>
        })
    }

    onOpenChange = (openKeys) => {
        const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
        if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            this.setState({ openKeys });
        } else {
            this.setState({
                openKeys: latestOpenKey ? [latestOpenKey] : [],
            });
        }
    }

    render() {
        const items = this.constructSeatingMenus()
        const {height, onElementSelection} = this.props
        return <Menu
            mode="inline"
            theme={'dark'}
            openKeys={this.state.openKeys}
            onClick={({key}) => onElementSelection(key)}
            selectedKeys={[]}
            onOpenChange={this.onOpenChange}
            style={{ width: 200, height:height}}
        >
            {items}
        </Menu>
    }
}