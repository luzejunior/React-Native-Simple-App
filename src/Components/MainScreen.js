import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert
} from 'react-native';
import MovieList from './MovieList'
import { fetchMovies, startLoading } from '../Redux/Actions/MoviesActions';
import { connect } from 'react-redux';

class MainScreen extends Component {

  componentDidMount() {
    this.props.startLoading()
    this.fetchData();
  }

  fetchData = () => {
    let requestPage = this.props.data.page + 1;
    //alert(requestPage);
    if (this.props.data.numberOfPages >= requestPage) {
      this.props.fetchMovies(requestPage);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.titleStyle}>Upcoming Movies</Text>
        <TextInput
          style = {styles.searchBar}
          placeholder = 'Search for movie'
        />
        <MovieList
          isFetching = {this.props.data.isFetching}
          data = {this.props.data.movies}
          fetchMoreData = {this.fetchData}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex : 1,
    justifyContent : 'flex-start',
    flexDirection: 'column'
  },
  titleStyle: {
    marginTop: 40,
    marginLeft: 22,
    fontSize: 28,
    fontWeight: 'bold'
  },
  searchBar: {
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 10,
    height: 40,
    paddingLeft: 10,
    paddingRight: 10,
    borderWidth: 2,
    borderRadius: 6,
    borderColor: 'rgba(0, 0, 0, 0.1)'
  }
});

const mapStateToProps = state => {
  return {
    data: state
  }
};

export default connect(mapStateToProps, { fetchMovies, startLoading })(MainScreen);
