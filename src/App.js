import React from 'react';
import './App.css';
import { InputGroup, FormControl } from 'react-bootstrap';


export default class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {gridX: '',gridY: '', numberOfRovers:'' };
  }
  render(){
    return (
      <div className="App">
        <div className="input-location">
        <InputGroup className="mb-3">
          <InputGroup.Prepend>
          <InputGroup.Text id="basic-addon1">Grid Bounds </InputGroup.Text>
          <FormControl className="input-group" onChange={(e)=>{this.setState({gridX: e.currentTarget.value})}}
          aria-label="gridPositionX"
          />
          <FormControl className="input-group" onChange={(e)=>{this.setState({gridY: e.currentTarget.value})}}
          aria-label="gridPositionY"
          />
          </InputGroup.Prepend>
        </InputGroup>

        <InputGroup className="mb-3">
          <InputGroup.Prepend>
          <InputGroup.Text id="basic-addon1"># of Rovers</InputGroup.Text>
          <FormControl className="input-group" onChange={(e)=>{this.setState({numberOfRovers: e.currentTarget.value})}}
          aria-label="numberOfRovers"
          />
          </InputGroup.Prepend>
        </InputGroup>
        </div>
   
      </div>
    );
  }
  
}

