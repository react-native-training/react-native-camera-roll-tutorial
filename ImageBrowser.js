import React from 'react'

import {
  View,
  Text,
  Button,
  Image,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  ScrollView,
  CameraRoll,
  TouchableHighlight,
  Platform,
  Alert
} from 'react-native'

import RNFetchBlob from 'react-native-fetch-blob'

const { width, height } = Dimensions.get('window')
let styles
class ImageBrowser extends React.Component {
  static navigationOptions = {
    title: 'Unsplash Images',
  }

  state = {
    images: [],
    loading: true,
    page: 1
  }

  componentDidMount() {
    this.fetchPhotos()
  }

  fetchPhotos = () => {
    this.setState({ loading: true })
    fetch(`https://api.unsplash.com/photos/?page=${this.state.page}&per_page=30&client_id=${YOURAPPID}`)
      .then(res => res.json())
      .then(images => {
        this.state.images.push(...images)
        console.log('this.state.images: ', this.state.images)
        this.setState({ images: this.state.images, loading: false, page: this.state.page + 1 })
      })
  }

  saveToCameraRoll = (image) => {
    if (Platform.OS === 'android') {
      RNFetchBlob
      .config({
        fileCache : true,
        appendExt : 'jpg'
      })
      .fetch('GET', image.urls.small)
      .then((res) => {
        CameraRoll.saveToCameraRoll(res.path())
          .then(Alert.alert('Success', 'Photo added to camera roll!'))
          .catch(err => console.log('err:', err))
      })
    } else {
      CameraRoll.saveToCameraRoll(image.urls.small)
        .then(Alert.alert('Success', 'Photo added to camera roll!'))
    }
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <Text style={styles.title}>Unsplash Images</Text>
        {
          this.state.loading ? (
            <Text style={{ padding: 10, textAlign: 'center' }}>Loading...</Text>
          ) : (
            <Button
              onPress={this.fetchPhotos}
              title='View More'
            />
          )
        }
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {
            this.state.images.map((image, i) => {
              return (
                <TouchableHighlight
                  key={i}
                  onPress={() => this.saveToCameraRoll(image)}
                  underlayColor='transparent'
                >
                  <Image
                    style={styles.image}
                    source={{ uri: image.urls.small }}
                  />
                </TouchableHighlight>
              )
            })
          }
        </ScrollView>
      </View>
    )
  }
}

styles = StyleSheet.create({
  scrollContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  centerLoader: {
    height: height - 100,
    width,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: width / 2, height: width / 2
  },
  title: {
    textAlign: 'center',
    padding: 20
  }
})

export default ImageBrowser
