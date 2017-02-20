// ============================================
// App
// ============================================
import React from 'react';
import {LinkedStateMixin} from 'react-catalyst'
import autobind from 'autobind-decorator'
import mixin from 'react-mixin'

import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import Fish from './Fish';



// ============================================
// Firebase
// ============================================
import Rebase from 're-base'
var base = Rebase.createClass("https://reactjs-orderlist.firebaseio.com");
// ============================================



@autobind
class App extends React.Component{

	constructor(){
		super();

		this.state = {
			fishes: {},
			order: {}
		}
	}

	componentDidMount () {
		base.syncState(this.props.params.storeId + "/fishes", {
			context: this,
			state: 'fishes'
		});

		var localStorageRef = localStorage.getItem('store: '+ this.props.params.storeId);
		if (localStorageRef) {
			this.setState({
				order: JSON.parse(localStorageRef)
			})
		}
	}

	componentWillUpdate(nextProps, nextState) {
		localStorage.setItem( ('store: '+ this.props.params.storeId), JSON.stringify(nextState.order) );
	}

	addFish(fish) {
		var timeStamp = (new Date()).getTime();
		this.state.fishes['fish-'+timeStamp] = fish;
		this.setState({ fishes: this.state.fishes });
	}

	removeFish(key) {
		if (confirm('Are you sure you want to delete this fish ?')) {
			this.state.fishes[key] = null;
			this.setState({ fishes: this.state.fishes });			
		}
	}

	loadFishSample() {
		this.setState({
			fishes: require('../sample-fishes')
		})
	}

	addToOrder(fishKey) {
		this.state.order[fishKey] = this.state.order[fishKey] + 1 || 1;
		this.setState({ order: this.state.order });
	}

	removeFromOrder(key) {
		delete this.state.order[key];
		this.setState({ order: this.state.order });
	}

	// Render
	renderFish(key) {
		return <Fish key={key} index={key} data={this.state.fishes[key]} addToOrder={this.addToOrder} />
	}

	render() {
		return (
			<div className="app">
				<div className="menu">
					<Header titleLine="Sea food restaurant"/>
					<ul className="list-of-fishes">
						{Object.keys(this.state.fishes).map(this.renderFish)}
					</ul>
				</div>
				<Order fishes={this.state.fishes} order={this.state.order} removeFromOrder={this.removeFromOrder}/>
				<Inventory addFish={this.addFish} loadSample={this.loadFishSample} fishes={this.state.fishes} linkState={this.linkState.bind(this)} removeFish={this.removeFish} />
			</div>
		)
	}
};

mixin.onClass(App, LinkedStateMixin)


export default App;
