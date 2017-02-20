// ============================================
// Order
// ============================================


import React from 'react';
import h from '../helpers';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import autobind from 'autobind-decorator'



@autobind
class Order extends React.Component{

	renderOrder(key) {
		var fish = this.props.fishes[key];
		var count = this.props.order[key];
		var removeBtn = <button onClick={this.props.removeFromOrder.bind(null, key)}>&times;</button>

		if(!fish) {
			return <li key={key}>Sorry, fish no longer available! {removeBtn}</li>
		}

		return(
			<li key={key}>
				<span>
					<CSSTransitionGroup
						component="span"
						transitionName="counter"
						transitionEnterTimeout={300}
						transitionLeaveTimeout={300}>					
							<span key={count}>{count}</span>
					</CSSTransitionGroup>
					&nbsp;lbs&nbsp;&nbsp;
					{fish.name}&nbsp;
					{removeBtn}
				</span>
				<span className="price">{h.formatPrice(fish.price * count)} </span>
			</li>
		)
	}

	render() {
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
				<CSSTransitionGroup
					className="order"
					component="ul"
					transitionName="olist"
					transitionEnterTimeout={500}
					transitionLeaveTimeout={500}>
						{orderIDs.map(this.renderOrder)}
						<li className="total">
							<strong>Total:</strong>
							{h.formatPrice(total)}
						</li>
				</CSSTransitionGroup>
			</div>
		)
	}
};


Order.propTypes = {
	fishes: React.PropTypes.object.isRequired,
	order: React.PropTypes.object.isRequired,
	removeFromOrder: React.PropTypes.func.isRequired
}



export default Order;