import React, {Component} from 'react';
import {
	Text,
	View,
	Keyboard
} from 'react-native';
import {SearchBar} from 'react-native-elements';

class Header extends React.PureComponent {

	componentDidMount(){
		this.search.focus();
	}

	render(){
		return (
			<View>
				<SearchBar
					lightTheme
					ref={search => this.search = search}
					onChangeText={this.props.onChangeText}
					placeholder='Search here'
				/>
			</View>
		);
	}
}

export default Header;