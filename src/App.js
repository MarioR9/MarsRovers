import React from 'react';
import './App.css';
import { InputGroup, FormControl, Button } from 'react-bootstrap';


let counter = 1;
export default class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {gridX: '',gridY: '', numberOfRovers: 0 ,roverMoves: '', deployedRovers: []};
  }
  
  handleMovements=(e)=>{ //Regex will prevent from storing any numbers or symbols. Only storeing set moves either M or L.
    const checkForLorM = /[^l^m]/gi;
    let moves = e.currentTarget.value.replace(checkForLorM,'')
    this.setState({roverMoves: moves.toUpperCase()})
  }
  handleRovers=()=>{ //handler will create instaces of the desired amount of rovers and push them into and array.
   let rovers = []
   let nOfRovers = parseInt(this.state.numberOfRovers)
   for(let i=0; i < nOfRovers; i++){
     rovers.push(`rover#${i}`)
   }
   this.setState({deployedRovers: rovers})
   console.log(this.state.deployedRovers)
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
        <div>
        <InputGroup className="mb-3"> 
          <InputGroup.Prepend>
          <InputGroup.Text id="basic-addon1"># of Rovers</InputGroup.Text>
          <FormControl className="input-group" onChange={(e)=>{this.setState({numberOfRovers: e.currentTarget.value})}}
          aria-label="numberOfRovers"
          />
          <Button onClick={this.handleRovers} variant="info">Generate</Button>{' '}
          </InputGroup.Prepend>
        </InputGroup>
        </div>
        {this.state.deployedRovers.map(rover => 
        
          <div > 
          <InputGroup className="mb-3"> 
            <InputGroup.Prepend>
            <InputGroup.Text id="basic-addon1">Rover#{counter++} init location</InputGroup.Text>
            <FormControl className="input-group" 
            aria-label="gridPositionX"
            />
            <InputGroup.Text id="basic-addon1">Movments</InputGroup.Text>
            <FormControl className="input-group-move" onChange={this.handleMovements}
            aria-label="numberOfRovers"
            />
            </InputGroup.Prepend>
          </InputGroup>
          </div>

          )}

        </div>
   
      </div>
    );
  }
  
}

