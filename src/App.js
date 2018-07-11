import React, {Component} from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import './App.css';

const particlesOptions = {
  particles: {
    number: {
      value: 50,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
};

const app = new Clarifai.App({
  apiKey: 'f2f6d2c46b0a4cf3b681862a704e8d62'
});

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      boxes: [],
      route: 'signin',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entires: '',
        joined: ''
      }
    };
  }

  updateUser = user => {
    this.setState({
      user
    });
  };

  calculateFaceLocation = data => {
    const boxes = [];
    data.outputs[0].data.regions.map(res => {
      const bounding = res.region_info.bounding_box;
      const image = document.getElementById('inputImage');
      const width = Number(image.width);
      const height = Number(image.height);
      const box = {
        leftCol: bounding.left_col * width,
        topRow: bounding.top_row * height,
        rightCol: width - bounding.right_col * width,
        bottomRow: height - bounding.bottom_row * height
      };
      boxes.push(box);
      return null;
    });
    return boxes;
  };

  displayFaceBox = boxes => {
    this.setState({
      boxes
    });
  };

  onInputChnage = event => {
    this.setState({
      input: event.target.value
    });
  };

  onKeyPress = event => {
    if (event.key === 'Enter') {
      this.onSubmit();
    }
  };

  onSubmit = () => {
    this.setState({
      imageUrl: this.state.input
    });
    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then(response => {
        this.setState({
          response
        });
        fetch('http://localhost:3001/image', {
          method: 'put',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            id: this.state.user.id
          })
        })
          .then(respond => respond.json())
          .then(count => {
            this.setState(
              Object.assign(this.state.user, {
                entries: count
              })
            );
          });
        this.displayFaceBox(this.calculateFaceLocation(response));
      })
      .catch(err => console.log(err));
  };

  onRouteChange = route => {
    if (route === 'home') {
      this.setState({
        isSignedIn: true
      });
    }

    if (route === 'signin') {
      this.setState({
        isSignedIn: false
      });
    }

    if (route === 'register') {
      this.setState({
        isSignedIn: false
      });
    }
    this.setState({
      route
    });
  };

  render() {
    const {route, isSignedIn, boxes, imageUrl} = this.state;
    return (
      <div className="App">
        <Particles className="particles" params={particlesOptions} />
        <Navigation
          isSignedIn={isSignedIn}
          onRouteChange={this.onRouteChange}
        />
        {route === 'home' ? (
          <div>
            <Logo />
            <Rank user={this.state.user} />
            <ImageLinkForm
              onInputChnage={this.onInputChnage}
              onButtonSubmit={this.onSubmit}
              onKeyPress={this.onKeyPress}
            />
            <FaceRecognition boxes={boxes} url={imageUrl} />
          </div>
        ) : route === 'signin' ? (
          <Signin
            updateUser={this.updateUser}
            onRouteChange={this.onRouteChange}
          />
        ) : (
          <Register
            onRouteChange={this.onRouteChange}
            updateUser={this.updateUser}
          />
        )}
      </div>
    );
  }
}

export default App;
