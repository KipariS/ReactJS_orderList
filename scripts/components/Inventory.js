// ============================================
// Inventory
// ============================================

import React from 'react';
import AddFishForm from './AddFishForm';
import autobind from 'autobind-decorator'



@autobind
class Inventory extends React.Component{

	renderInventory(key) {
		var linkState = this.props.linkState;
		return (
			<div key={key} className="fish-edit">
				<input type="text" placeholder="Fish Name" valueLink={linkState('fishes.' + key + '.name')} />
				<input type="text" placeholder="Fish Price" valueLink={linkState('fishes.' + key + '.price')}/>
				<select valueLink={linkState('fishes.' + key + '.status')}>
					<option value="available">Fresh!</option>
					<option value="unavailable">Sold Out!</option>
				</select>
				<textarea type="text" placeholder="Fish Description" valueLink={linkState('fishes.' + key + '.desc')}></textarea>
				<input type="text" className="imgurl" placeholder="URL to Image" valueLink={linkState('fishes.' + key + '.image')}/>
				<button type="submit" onClick={this.props.removeFish.bind(null, key)}>Remove Item</button>

			</div>
		)
	}

	render() {
		return (
			<div>
				<h2>Inventory</h2>

				{Object.keys(this.props.fishes).map(this.renderInventory)}

				<AddFishForm addFish={this.props.addFish}/>
				<button onClick={this.props.loadSample}>Load Fish Sample</button>


			</div>
		)
	}
	
};



Inventory.propTypes = {
	addFish: React.PropTypes.func.isRequired,
	loadSample: React.PropTypes.func.isRequired,
	fishes: React.PropTypes.object.isRequired,
	linkState: React.PropTypes.func.isRequired,
	removeFish: React.PropTypes.func.isRequired
}


export default Inventory;