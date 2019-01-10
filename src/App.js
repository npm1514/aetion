import React, { Component } from 'react'
import ButtonColorful from './components/ButtonColorful'
import { TextInput } from './components/TextInput'
import { VideoPlayer } from './components/VideoPlayer'
import logo from './logo.svg'
import './App.css'

const potentialColors = ['plum', 'goldenrod', 'coral', 'cornflowerblue', 'mediumseagreen', 'teal']

const sectionStyle = {
  minHeight: 200,
  padding: 20,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderTop: '1px solid white',
}

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      activeColorIndex: 0,
      colors: potentialColors,
      bgColor: potentialColors[0],
      submittedText: '',
      text: ''
    }
    //bind this so that this.setstate can be used in handle functions
    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleClick(){
    const {colors, activeColorIndex} = this.state
    //put some logic here to check current index. if its at the end of the list of colors, start over again
    const newIndex = (activeColorIndex == colors.length - 1) ? 0 : (activeColorIndex + 1);
    const bgColor = colors[newIndex]
    this.setState({
      activeColorIndex: newIndex,
      bgColor
    })
  }
  //create hand submit function for when text is submitted into the input field, preventDefault so page doesnt reload, reassign submittedText so title updates
  handleSubmit(e, text){
    e.preventDefault();
    this.setState({
      submittedText: text
    })
  }

  render() {
    const {bgColor} = this.state
    const calculatedStyles = {padding: 50, transition: 'all 1s', backgroundColor: bgColor}
    return (
      <div className="App" style={calculatedStyles}>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Aetion Front-End Homework Exercise</h1>
          <h3>Submitted text input data: <code>{this.state.submittedText}</code></h3>
        </header>
        <p className="App-intro">
          Clicking the below button will change the background color of the parent div.
        </p>
        <div style={sectionStyle}>
          <ButtonColorful onClick={this.handleClick} bgColor={bgColor}/>
        </div>
        <div style={sectionStyle}>
          <TextInput onSubmit={this.handleSubmit}/>
        </div>
        <div style={sectionStyle}>
          <VideoPlayer />
        </div>
      </div>
    )
  }
}

export default App
