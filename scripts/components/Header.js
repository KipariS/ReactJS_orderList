// ============================================
// Header
// ============================================

import React from 'react';



class Header extends React.Component{
	render() {
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


};


Header.propTypes = {
	titleLine: React.PropTypes.string.isRequired
}



export default Header;