import React from 'react';
import './App.css';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import CreateRovers from './components/createRovers.js'
import Graph from './components/graph.js'

let finalCoordinates = []
let dataMovm=[]

export default class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {gridX: '',
    gridY: '', 
    gridZ: '',
    numberOfRovers: 0 ,
    roverMoves: '', 
    deployedRovers: [],
    start: "notready",
    disabled: false,
    deployUnits: false,
    data:[]
    };
  }
  handleMovements=(e)=>{ //Regex will prevent from storing any numbers or symbols. Only storeing set moves either M or L.
    dataMovm.push({x: parseInt(this.state.gridX), y: parseInt(this.state.gridY), mvm: this.state.roverMoves, z: this.state.gridZ})
    this.setState({data: dataMovm})
  }
 
  handleMovementsInput=(e)=>{
    const checkForLorM = /[^l^m^r]/gi;
    let moves = e.currentTarget.value.replace(checkForLorM,'')
    this.setState({roverMoves: moves.toUpperCase()})
  }
  handleRovers=()=>{ //handler will create instaces of the desired amount of rovers and push them into and array.
   let counter = 1
   let rovers = []
   dataMovm=[]
   let nOfRovers = parseInt(this.state.numberOfRovers)
    for(let i=0; i < nOfRovers; i++){
      rovers.push(counter++)
    }
  this.setState({deployedRovers: rovers, start: 'ready'})
  }

  handleRoverLocationX=(e)=>{
    this.setState({gridX: e.currentTarget.value})
  }
  handleRoverLocationY=(e)=>{
    this.setState({gridY: e.currentTarget.value})
  }
  handleRoverLocationZ=(e)=>{
    this.setState({gridZ: e.currentTarget.value})
  }
  handleRoverMovment=()=>{
    dataMovm.push({x: parseInt(this.state.gridX), y: parseInt(this.state.gridY), mvm: this.state.roverMoves, z: this.state.gridZ})
    this.setState({data: dataMovm})

    let north = 'N'
    let south = 'S'
    let west = 'W'
    let east = 'E'

    for(let k=0; k<this.state.data.length; k++){
      let movement = this.state.data[k].mvm.split("")
      let currentX= this.state.data[k].x
      let currentY= this.state.data[k].y
      let currentHeading = this.state.data[k].z

      for(let i=0; i<movement.length; i++){ //we are going to loop over movements after sliting the movement string. we going to check one by one whether is L or R to determine were the rover is heading next.
        switch (movement[i]) {
          case "L":
            if(currentHeading === north){
              currentHeading = west
              finalCoordinates.push({x:currentX, y:currentY, z:currentHeading})
              break;
            }else if(currentHeading === west){
              currentHeading = south
              finalCoordinates.push({x:currentX, y:currentY, z:currentHeading})
              break;
            }else if(currentHeading === south){
              currentHeading = east
              finalCoordinates.push({x:currentX, y:currentY, z:currentHeading})
              break;
            }else if(currentHeading === east){
              currentHeading = north
              finalCoordinates.push({x:currentX, y:currentY, z:currentHeading})
              break;
            }
            break;
          case "R":
            if(currentHeading === north){
              currentHeading = east
              finalCoordinates.push({x:currentX, y:currentY, z:currentHeading})
              break;
            }else if(currentHeading === east){
              currentHeading = south
              finalCoordinates.push({x:currentX, y:currentY, z:currentHeading})
              break;
            }else if(currentHeading === south){
              currentHeading = west
              finalCoordinates.push({x:currentX, y:currentY, z:currentHeading})
              break;
            }else if(currentHeading === west){
              currentHeading = north
              finalCoordinates.push({x:currentX, y:currentY, z:currentHeading})
              break;
            }
            break;
          case "M": 
            if(currentHeading === north){
              currentY++
              finalCoordinates.push({x:currentX, y:currentY, z:currentHeading})
              break;
            }else if(currentHeading === east){
              currentX++
              finalCoordinates.push({x:currentX, y:currentY, z:currentHeading})
              break;
            }else if(currentHeading === south){
              currentY--
              finalCoordinates.push({x:currentX, y:currentY, z:currentHeading})
              break;
            }else if(currentHeading === west){
              currentX--
              finalCoordinates.push({x:currentX, y:currentY, z:currentHeading})
              break;
          }  
        }
      }
      finalCoordinates.push({x:currentX, y:currentY, z:currentHeading})
    }
    console.log(finalCoordinates)
  }

  render(){
    return (
      
      <div className="App">
      {/* <Button onClick={()=>{window.location.reload()}}>Start Again</Button> */}
        <div className="input-location">
        <div>
        <InputGroup className="mb-3"> 
          <InputGroup.Prepend>
          <InputGroup.Text id="basic-addon1"># of Rovers</InputGroup.Text>
          <FormControl className="input-group" onChange={(e)=>{this.setState({numberOfRovers: e.currentTarget.value})}}
          />
          <Button onClick={this.handleRovers} variant="info">Build</Button>
          </InputGroup.Prepend>
        </InputGroup>
        </div>

        {this.state.deployedRovers.map(rover => 
          <CreateRovers rover={rover} key={rover}
          handleRoverLocationZ={this.handleRoverLocationZ} 
          handleRoverLocationY={this.handleRoverLocationY} 
          handleRoverLocationX={this.handleRoverLocationX} 
          handleMovementsInput={this.handleMovementsInput} 
          handleRoverMovment={this.handleRoverMovment}/>
        )}

        </div>
        
        {finalCoordinates.map(data =>
         <Graph data={finalCoordinates}/>
        )}
       
       
          
      </div>
    );
  }
  
}

