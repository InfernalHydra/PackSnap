import React , {Component} from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  TouchableOpacity
} from 'react-native';

import List from './List'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TextInput } from 'react-native-gesture-handler';
// const AppNavigator = createStackNavigator({

// });

// export default createAppContainer(AppNavigator)

const styles = StyleSheet.create({

	header: {
		color: '#ECECEC',
		fontSize: 70,
		textAlign: "center",
    marginTop: 35,
    fontFamily : 'Quicksand-Regular'
	},
	addList:{
		backgroundColor: '#90CCF4', 
		alignItems: 'center', 
        justifyContent: 'center', 
		width: 100, 
		height: 100, 
    borderRadius: 400
    
	},
	addListText: {
		color: 'white',
		fontSize: 80,
    fontWeight:'bold',
    fontFamily : 'Quicksand-Regular'
	},

	confirmButton: {
		backgroundColor: '#5DA2D5', 
		alignItems: 'center',
		justifyContent: 'center', 
		width: 120, 
		height: 40,
		borderRadius: 15,
	},
	cancelButton: {
		backgroundColor: '#F3D250', 
		alignItems: 'center',
		justifyContent: 'center', 
		width: 120, 
		height: 40,
		borderRadius:15
	}

});

export default class HomeScreen extends Component
{
  constructor(props)
  {
    super(props);
    this.state = {
      view: false,
      opacity: 1.0,
      textTitle: "",
      textNotes: "",
    }
  }

  handleOnTouch() {
    let newOpacity = this.state.view ? 1.0 : .5
    this.setState({
      view: !this.state.view,
      opacity: newOpacity,
    });
  }

  handleChangeText(type, text) {
    this.setState({["text" + type] : text});
  }

  handleSubmit()
  {
    let {textTitle, textNotes} = this.state;
    console.log(textTitle + " ", textNotes);
    this.props.navigation.navigate('EditList', {textTitle, textNotes});
  }

  render() {
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={{flex : 1, backgroundColor : "#000000"}}>
          <View style={{flex: 1, backgroundColor: "#F78888", opacity: this.state.opacity}}>
            <View style={{flex: 2, justifyContent: "space-between"}}>
              <Text style={styles.header}>
                PackSnap
              </Text>
              <List />
              <List />
            </View>
            <View style={{flex: 1, marginTop: 20, alignItems: 'center'}}>
            <TouchableOpacity onPress={this.handleOnTouch.bind(this)} style={{}}>
                  <View style = {styles.addList}>
                      <Text style = {styles.addListText}>+</Text>
                  </View>
              </TouchableOpacity>
            </View>
          </View>
          {this.state.view && 
            <View style={{position: "absolute", height: "33%", width: '100%', bottom: 0, backgroundColor: '#FFFFFF'}}>
                <TouchableOpacity style={{}}>
                  <View>
                      <TextInput placeholder="List Title" onChangeText={this.handleChangeText.bind(this, "Title")} value={this.state.text} />
                      <TextInput placeholder="Notes" onChangeText={this.handleChangeText.bind(this, "Notes")} value={this.state.text} />
                      <View style={{flexDirection: "row", justifyContent: 'space-between', width: '70%', marginLeft: '15%'}}>
                        <TouchableOpacity onPress={this.handleSubmit.bind(this)} style={{}}>
                          <View style={styles.confirmButton}>
                            <Text style={{ color: '#ECECEC', fontFamily : 'Quicksand-Regular'}}>Confirm</Text>
                          </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.handleOnTouch.bind(this)} style={{}}>
                          <View style={styles.cancelButton}
                          >
                            <Text style={{ color: '#424242', fontFamily : 'Quicksand-Regular' }}>Cancel</Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                  </View>
              </TouchableOpacity>
            </View>
          }
        </SafeAreaView>
      </>
    );
  }
}
