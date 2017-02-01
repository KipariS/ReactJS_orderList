var React = require('react');
var ReactDOM = require('react-dom');

var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var History = ReactRouter.History;
var createBrowserHistory = require('history/lib/createBrowserHistory');

var h = require('./helpers')



// ============================================
// Firebase
// ============================================
var Rebase = require('re-base');
var base = Rebase.createClass("https://reactjs-orderlist.firebaseio.com");








// ============================================
// App
// ============================================
var App = React.createClass({
	getInitialState: function() {
		return {
			fishes: {},
			order: {}
		}
	},

	componentDidMount: function () {
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
	},

	componentWillUpdate: function(nextProps, nextState) {
		localStorage.setItem( ('store: '+ this.props.params.storeId), JSON.stringify(nextState.order) );
	},

	addFish: function(fish) {
		var timeStamp = (new Date()).getTime();
		this.state.fishes['fish-'+timeStamp] = fish;
		this.setState({ fishes: this.state.fishes });
	},

	loadFishSample: function() {
		this.setState({
			fishes: require('./sample-fishes')
		})
	},

	addToOrder: function(fishKey) {
		this.state.order[fishKey] = this.state.order[fishKey] + 1 || 1;
		this.setState({ order: this.state.order });
	},

	// Render
	renderFish: function(key) {
		return <Fish key={key} index={key} data={this.state.fishes[key]} addToOrder={this.addToOrder} />
	},

	render: function() {
		return (
			<div className="app">
				<div className="menu">
					<Header titleLine="Sea food restaurant"/>
					<ul className="list-of-fishes">
						{Object.keys(this.state.fishes).map(this.renderFish)}
					</ul>
				</div>
				<Order fishes={this.state.fishes} order={this.state.order}/>
				<Inventory addFish={this.addFish} loadSample={this.loadFishSample}/>
			</div>
		)
	}
});


// ============================================
// Fish
// ============================================
var Fish = React.createClass({
	orderBtn: function() {
		this.props.addToOrder(this.props.index);
	},
	render: function() {
		var data = this.props.data;
		var isAvailable = (data.status === 'available' ? true : false);
		var buttonText = (isAvailable ? 'Add To Order' : 'Sold Out!');
		return(
			<li className="menu-fish">
				<img src={data.image} alt={data.name}/>
				<h3 className="fish-name">
					{data.name}
					<span className="price">{h.formatPrice(data.price)}</span>
				</h3>
				<p>{data.desc}</p>
				<button disabled={!isAvailable} onClick={this.orderBtn}>{buttonText}</button>
			</li>
		)
	}
})


// ============================================
// Add Fish
// ============================================
var AddFishForm = React.createClass({

	createFish: function(event) {
		// Stop submitting
		event.preventDefault();

		// Add data to Obj
		var fish = {
			name: this.refs.name.value,
			price: this.refs.price.value,
			status: this.refs.status.value,
			desc: this.refs.desc.value,
			image: this.refs.image.value
		}
		// Add the fish to App
		this.props.addFish(fish);
		this.refs.fishForm.reset();
	},

	render: function() {
		return (
			<form className="fish-edit" ref="fishForm" onSubmit={this.createFish}>
				<input type="text" ref="name" placeholder="Fish Name"/>
				<input type="text" ref="price" placeholder="Fish Price"/>
				<select ref="status">
					<option value="available">Fresh!</option>
					<option value="unavailable">Sold Out!</option>
				</select>
				<textarea type="text" ref="desc" placeholder="Fish Description"></textarea>
				<input type="text" ref="image" className="imgurl" placeholder="URL to Image"/>
				<button type="submit">+ Add Item</button>
			</form>
		)
	}
});


// ============================================
// Header
// ============================================
var Header = React.createClass({

	render: function() {
		return (
			<header className="top">
				<h1>
					Catch 
					<span className="ofThe">
						<span className="of">of</span> 
						<span className="the">the</span> 						
					</span>
					day
				</h1>
				<h3>
					<span className="">{this.props.titleLine}</span>
				</h3>
			</header>
		)
	}
});


// ============================================
// Order
// ============================================
var Order = React.createClass({

	renderOrder: function(key) {
		var fish = this.props.fishes[key];
		var count = this.props.order[key];

		if(!fish) {
			return <li key={key}>Sorry, fish no longer available!</li>
		}

		return(
			<li key={key}>
				{count}lbs
				{fish.name}
				<span className="price">{h.formatPrice(fish.price * count)}</span>
			</li>
		)
	},

	render: function() {
		var orderIDs = Object.keys(this.props.order);
		var total = orderIDs.reduce( (prev, item) => {
			var fish = this.props.fishes[item];
			var count = this.props.order[item];
			var isAvailable = fish && fish.status === "available";

			if ( isAvailable ) {
				prev += (fish.price * count)
			}

			return prev;
		}, 0)

		return (
			<div className="order-wrap">
				<h2 className="order-title">Your Order</h2>
				<ul className="order">
					{orderIDs.map(this.renderOrder)}
					<li className="total">
						<strong>Total:</strong>
						{h.formatPrice(total)}
					</li>
				</ul>
			</div>
		)
	}
});


// ============================================
// Inventory
// ============================================
var Inventory = React.createClass({

	render: function() {
		return (
			<div>
				<h2>Inventory</h2>
				<AddFishForm addFish={this.props.addFish}/>
				<button onClick={this.props.loadSample}>Load Fish Sample</button>
			</div>
		)
	}
});



// ============================================
// Store Picker
// ============================================
var StorePicker = React.createClass({
	mixins: [History],

	goToStore: function(event) {
		event.preventDefault();

		var storeId = this.refs.storeId.value;
		this.history.pushState(null, '/store/' + storeId);

		console.log(storeId);
	},

	render: function() {
		return (
			<form action="" className="store-selector" onSubmit={this.goToStore}>
				<h2>Please Enter A Store</h2>
				<input type="text" ref="storeId" defaultValue={h.getFunName()}/>
				<input type="Submit" defaultValue="Submit" />
			</form>
		)
	}
});



// ============================================
// 404
// ============================================
var NoPage = React.createClass({

	render: function() {
		return (
			<h1>Sorry this page does not exist</h1>
		)
	}
});



// ============================================
// Routing
// ============================================
var routing = (
	<Router history={createBrowserHistory()}>
		<Route path="/" component={StorePicker} />
		<Route path="/store/:storeId" component={App} />
		<Route path="*" component={NoPage} />
	</Router>
)


ReactDOM.render( routing, document.querySelector('#root') )
















