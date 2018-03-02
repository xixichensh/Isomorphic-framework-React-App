import React, { Component } from 'react';
import Style                from "./trade.less";

export default class extends Component{
	constructor(props){
        super(props);
        const _this = this;
    }

    render(){
        return (<div className={ Style.aaa }>123</div>);
    }
}