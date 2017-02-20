// ============================================
// Store Picker
// ============================================

import React from 'react';
import {History} from 'react-router';
import h from '../helpers';
import reactMixins from 'react-mixin';
import autobind from 'autobind-decorator'


@autobind
class StorePicker extends React.Component{

	goToStore(event) {
		event.preventDefault();

		var storeId = this.refs.storeId.value;
		this.history.pushState(null, '/store/' + storeId);

	}

	render() {
		return (
			<form action="" className="store-selector" onSubmit={this.goToStore}>
				<h2>Please Enter A Store</h2>
				<input type="text" ref="storeId" defaultValue={h.getFunName()}/>
				<input type="Submit" defaultValue="Submit" />
			</form>
		)
	}
};

reactMixins.onClass(StorePicker, History);


export default StorePicker;