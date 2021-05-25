import React, { Component } from 'react';
//import Card from './Card';
import { DropTarget } from 'react-dnd';

export default class CardsContainer extends Component {
    render() {
        const { canDrop, isOver, connectDropTarget } = this.props;
        const isActive = canDrop && isOver;
        const style = {
			width: "200px",
			height: "404px",
			border: '1px dashed gray'
		};
        const backgroundColor = isActive ? 'lightgreen' : '#FFF';

        return (
            <div style = {{...style, backgroundColor}}>
                {this.props.name}
            </div>
        );
    }
}