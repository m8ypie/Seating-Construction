import React, { Component } from "react";
import elements from "../seatingValues/Elements"
import { Menu, Icon } from 'antd';
import { connect } from 'react-redux'
import { addTable } from '../state/seatingActions'
const SubMenu = Menu.SubMenu;

class ElementSelection extends Component {


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
                            return <Menu.Item label={subElement.label} key={subElement.value}>{subElement.label}</Menu.Item>
                        })
                    }
                </SubMenu>
        })
    }

    onOpenChange(openKeys){
        const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
        if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            this.setState({ openKeys });
        } else {
            this.setState({
                openKeys: latestOpenKey ? [latestOpenKey] : [],
            });
        }
    }

      handleElementSelection(key, label) {
        const {width, height, tableMap, addTable} = this.props
        const newTableId = tableMap.tables.length
        const newTableValue = {
            x: width/2,
            y: height/2,
            elementType:key,
            label:label,
            id: newTableId,
            seats:[]
        }
        addTable(newTableId,newTableValue)
      }

    render() {
        const items = this.constructSeatingMenus()
        const {height, onElementSelection} = this.props
        return <Menu
            mode="inline"
            theme={'dark'}
            openKeys={this.state.openKeys}
            onClick={(object) => onElementSelection(object.key, object.item.props.label)}
            selectedKeys={[]}
            onOpenChange={this.onOpenChange}
            style={{ width: 200, height:height}}
        >
            {items}
        </Menu>
    }
}

export default connect((state, ownProps) => ({ 
    tableMap: state.tableMap
  }),
  { addTable}
)(ElementSelection);