import React from 'react';
import './App.css';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import { ScatterChart,Scatter ,Legend, ZAxis, CartesianGrid, YAxis, XAxis, Tooltip } from 'recharts';


let counter = 1;

export default class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {gridX: '',gridY: '', numberOfRovers: 0 ,roverMoves: '', deployedRovers: [],start: "notready",data: [{}]};
  }
  
  handleMovements=(e)=>{ //Regex will prevent from storing any numbers or symbols. Only storeing set moves either M or L.
    const checkForLorM = /[^l^m]/gi;
    let moves = e.currentTarget.value.replace(checkForLorM,'')
    this.setState({roverMoves: moves.toUpperCase()})
  }
  handleRovers=()=>{ //handler will create instaces of the desired amount of rovers and push them into and array.
    counter = 1
   let rovers = []
   let nOfRovers = parseInt(this.state.numberOfRovers)
    for(let i=0; i < nOfRovers; i++){
      rovers.push(`rover#${i}`)
    }
    this.setState({deployedRovers: rovers, start: 'ready'})
   
   
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
          <Button onClick={this.handleRovers} variant="info">Build</Button>{' '}
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
            <FormControl className="input-group" 
            aria-label="gridPositionX"
            />
            <InputGroup.Text id="basic-addon1">Movements</InputGroup.Text>
            <FormControl className="input-group-move" onChange={this.handleMovements}
            aria-label="numberOfRovers"
            />
            </InputGroup.Prepend>
          </InputGroup>
          </div>
          )}
         {this.state.start === "notready" ? null :  <Button onClick={this.handleRovers} variant="info">Deploy</Button>}
        </div>
        
        <div>
        <ScatterChart width={700} height={300}
          margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
          <CartesianGrid strokeDasharray="5 5" />
          <XAxis dataKey="x"  />
          <YAxis dataKey="y"  />
          <ZAxis dataKey="z" dataKey="heading/"  range={[700]}/>
          <Tooltip cursor={{ strokeDasharray: '5  5' }} />
          <Legend />
          <Scatter name="rover#1" data={this.state.data} fill="#f7000042" />
        </ScatterChart>
        </div>
        
      </div>
    );
  }
  
}

