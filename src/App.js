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
    dataMovm.push({x:this.state.gridX,y:this.state.gridY,mvm:this.state.roverMoves})
    this.setState({data: dataMovm})
    console.log(this.state.data)
  }
 
  handleMovementsInput=(e)=>{
    const checkForLorM = /[^l^m]/gi;
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
  handleUnitsDeployment=()=>{
    this.setState({deployUnits: true})
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

    let north = 'N'
    let south = 'S'
    let west = 'W'
    let east = 'E'
    
    let initCoord= [3,3,"E"]
    let movement = "MMRMMRMRRM".split("")
    let currentX= initCoord[0]
    let currentY= initCoord[1]
    let currentHeading = initCoord[2]
    
    for(let i=0; i<movement.length; i++){ //we are going to loop over movements after sliting the movement string. we going to check one by one whether is L or R to determine were the rover is heading next.
      switch (movement[i]) {
        case "L":
          if(currentHeading == north){
            currentHeading = west
            finalCoordinates.push({x:currentX, y:currentY, heading:currentHeading})
            break;
          }else if(currentHeading == west){
            currentHeading = south
            finalCoordinates.push({x:currentX, y:currentY, heading:currentHeading})
            break;
          }else if(currentHeading == south){
            currentHeading = east
            finalCoordinates.push({x:currentX, y:currentY, heading:currentHeading})
            break;
          }else if(currentHeading == east){
            currentHeading = north
            finalCoordinates.push({x:currentX, y:currentY, heading:currentHeading})
            break;
          }
        case "R":
          if(currentHeading == north){
            currentHeading = east
            finalCoordinates.push({x:currentX, y:currentY, heading:currentHeading})
            break;
          }else if(currentHeading == east){
            currentHeading = south
            finalCoordinates.push({x:currentX, y:currentY, heading:currentHeading})
            break;
          }else if(currentHeading == south){
            currentHeading = west
            finalCoordinates.push({x:currentX, y:currentY, heading:currentHeading})
            break;
          }else if(currentHeading == west){
            currentHeading = north
            finalCoordinates.push({x:currentX, y:currentY, heading:currentHeading})
            break;
          }
          case "M": 
            if(currentHeading == north){
              currentY++
              finalCoordinates.push({x:currentX, y:currentY, heading:currentHeading})
              break;
            }else if(currentHeading == east){
              currentX++
              finalCoordinates.push({x:currentX, y:currentY, heading:currentHeading})
              break;
            }else if(currentHeading == south){
              currentY--
              finalCoordinates.push({x:currentX, y:currentY, heading:currentHeading})
              break;
            }else if(currentHeading == west){
              currentX--
              finalCoordinates.push({x:currentX, y:currentY, heading:currentHeading})
              break;
            }  
        } 
    }
    console.log(finalCoordinates)
    
  }

  render(){
    return (
      
      <div className="App"> 
      {/* <Button onClick={()=>{window.location.reload()}}>Start Again</Button> */}0
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
          <CreateRovers handleRoverLocationZ={this.handleRoverLocationZ} handleRoverLocationY={this.handleRoverLocationY} handleRoverLocationX={this.handleRoverLocationX} handleMovementsInput={this.handleMovementsInput} handleMovements={this.handleMovements} rover={rover}/>
          )}
         {this.state.start === "notready" ? null :  <Button onClick={this.handleRoverMovment} variant="info">Deploy units</Button>}
        </div>
        {this.state.deployUnits === true
        ?
          this.state.data.map(data=>
        <div>
        <Graph data={this.state.data}/>
       </div>
          )
        
          :
          null
          }
      </div>
    );
  }
  
}

