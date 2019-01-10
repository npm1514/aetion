import React, { Component } from 'react'
import YouTube from 'react-youtube'

// BUG DESCRIPTION: This component is a simple implementation of a video player that wraps
// the YouTube API using the `react-youtube` library.
// It has custom playback controls living outside the YouTube iframe.

// It has a partially-implemented feature, and a minor bug to fix.

// xxx1) There are non-working fast-forward/rewind buttons to either side of the play/pause button.
// Implement fast-forward/rewind functionality using the convenience functions of the YouTube API.

// xxx2) Study how the play/pause button's label text updates when you click it--but if you click inside the YouTube iframe to pause it, the external play/pause button no longer reflects the playback state. Fix this!

// Docs and references:
// https://github.com/troybetz/react-youtube
// https://github.com/troybetz/react-youtube/blob/master/example/example.js
// https://developers.google.com/youtube/iframe_api_reference#Playback_controls

const videoId = 'uj3Lq7Gu94Y'

const opts = {
  height: '390',
  width: '640',
  playerVars: { // https://developers.google.com/youtube/player_parameters
    autoplay: 0,
    rel: 0
  }
};

const buttonStyle = {
  padding: 10,
  width: 60,
  height: 60
}

const videoContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}

export class VideoPlayer extends Component {

  constructor(props) {
    super(props);

    this.state = {
      player: null,
      buttonLabel: 'Play',
      goForward: "",
      goBackward: ""
    };
    this.onFastForward = this.onFastForward.bind(this);
    this.onRewind = this.onRewind.bind(this);
    this.returnToNorm = this.returnToNorm.bind(this);
    this.clickVideo = this.clickVideo.bind(this);
  }

  onPlayPauseClick = () => {
    const { player } = this.state;
    if (player && player.getPlayerState() === 1){
      this.setState({buttonLabel: 'Play'})
      player.pauseVideo()
    } else {
      this.setState({buttonLabel: 'Pause'})
      player.playVideo()
    }
  }
//create interval for rewinding
  onRewind(){
    var { player } = this.state;
    var norm = this.returnToNorm;
    var intervalFunc = setInterval(function(){
      var currentTime = player.getCurrentTime();
      if(currentTime > 5) {
        player.seekTo(currentTime - 5, true);
      } else {
        player.seekTo(0, true);
        norm();
      }
    }, 250);
    this.setState({
      goForward: intervalFunc
    })
  }
  //create interval for fastforwarding
  onFastForward(){
    var { player } = this.state;
    var intervalFunc = setInterval(function(){
      var currentTime = player.getCurrentTime();
      player.seekTo(currentTime + 5, true);
    }, 250);
    this.setState({
      goForward: intervalFunc
    })
  }
  //clear Intervals
  returnToNorm(){
    if(this.state.player.getPlayerState() == -1 || this.state.player.getPlayerState() == 3) this.state.player.pauseVideo()
    clearInterval(this.state.goForward)
    clearInterval(this.state.goBackward)
  }
  _onReady = (event) => {
    // Access to player in all event handlers via event.target
    this.setState({player: event.target})
  }
  //allow for label to change when video is clicked
  clickVideo(){
    const { player } = this.state;
    if (player && player.getPlayerState() === 2){
      this.setState({buttonLabel: 'Play'})
    } else {
      this.setState({buttonLabel: 'Pause'})
    }
  }

  render() {
    return (
      <div style={videoContainerStyle}>
        <div>
          <YouTube
            videoId={videoId}
            opts={opts}
            onReady={this._onReady}
            onStateChange={this.clickVideo}
          />
        </div>
      <div style={{display: 'flex'}}>
          <button
            onMouseDown={this.onRewind}
            onMouseUp={this.returnToNorm}
            style={buttonStyle}
          >«</button>
          <button
            onClick={this.onPlayPauseClick}
            style={buttonStyle}
          >
            {this.state.buttonLabel}
          </button>
          <button
            onMouseDown={this.onFastForward}
            onMouseUp={this.returnToNorm}
            style={buttonStyle}
          >»</button>
        </div>
      </div>
    )
  }
}
