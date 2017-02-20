// ============================================
// Fish
// ============================================

import React from 'react';
import h from '../helpers';
import autobind from 'autobind-decorator'


@autobind
class Fish extends React.Component{
	orderBtn() {
		this.props.addToOrder(this.props.index);
	}
	render() {
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
}


export default Fish;


