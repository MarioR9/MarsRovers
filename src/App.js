import React from 'react';
import './App.css';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import CreateRovers from './components/createRovers.js'
import Graph from './components/graph.js'


let dataMovm=[]
export default class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {gridX: '',
    gridY: '', 
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
  handleRoverMovment=()=>{

    let north = 'N'
    let south = 'S'
    let west = 'W'
    let east = 'E'
    let initCoord= [1,2,"N"]
    let movement = "LMLMLMLMM"
    let currentX= initCoord[0]
    let currenty= initCoord[1]
    let currentHeading = initCoord[2]
    movement.split("")
    for(let i=0; i<movement.length; i++){

      switch (movement[i]) {
        case "L":
          if(currentHeading == north){
            currentHeading = west
            console.log("heading " + west )
            break;
          }else if(currentHeading == west){
            currentHeading = south
            console.log("heading " + south )
            break;
          }else if(currentHeading == south){
            currentHeading = east
            console.log("heading " + east )
            break;
          }else if(currentHeading == east){
            currentHeading = north
            console.log("heading " + north )
            break;
          }
        case "R":
          if(currentHeading == north){
            currentHeading = east
            console.log("heading " + east )
            break;
          }else if(currentHeading == east){
            currentHeading = south
            console.log("heading " + south )
            break;
          }else if(currentHeading == south){
            currentHeading = west
            console.log("heading " + west )
            break;
          }else if(currentHeading == west){
            currentHeading = north
            console.log("heading " + north )
            break;
          }  
        } 
    }
    console.log("nop")
  }

  render(){
    return (
      
      <div className="App"> 
      {this.handleRoverMovment()}
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
          <CreateRovers handleRoverLocationY={this.handleRoverLocationY} handleRoverLocationX={this.handleRoverLocationX} handleMovementsInput={this.handleMovementsInput} handleMovements={this.handleMovements} rover={rover}/>
          )}
         {this.state.start === "notready" ? null :  <Button onClick={this.handleUnitsDeployment} variant="info">Deploy units</Button>}
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

