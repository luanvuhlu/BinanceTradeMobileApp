import React, {Component} from 'react';
import {
	Text,
	View,
	Keyboard
} from 'react-native';
import {SearchBar} from 'react-native-elements';

class Header extends React.PureComponent {
	render(){
		return (
			<View>
				<SearchBar
					round
					lightTheme
					onChangeText={this.props.onChangeText}
					placeholder='Search here'
				/>
			</View>
		);
	}
}

export default Header;