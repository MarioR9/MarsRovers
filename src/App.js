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
    this.state = {
    gridX: !'',
    gridY: '', 
    gridZ: '',
    numberOfRovers: 0 ,
    roverMoves: '', 
    deployedRovers: [],
    start: false,
    disabled: false,
    deployUnits: false,
    data:[],
    clearBtn: false,
    boundX:'',
    boundY:'',
    bounds:[],
    };
  }
  handleClearBtn=()=>{
    this.setState({clearBtn: true})
  }
  handleShowBtn=()=>{
    this.setState({show: false})
  }
  handleCollectBtn=()=>{
    this.setState({bounds: {x:this.state.boundX, y:this.state.boundY}})
  }
  handleMovementsInput=(e)=>{
    const checkForLorM = /[^l^m^r]/gi;
    let moves = e.currentTarget.value.replace(checkForLorM,'')
    this.setState({roverMoves: moves.toUpperCase()})
  }
  handleRovers=()=>{ //handler will create instaces of the desired amount of rovers and push them into and array.
   let counter = 0
   let rovers = []
   dataMovm=[]
   let nOfRovers = parseInt(this.state.numberOfRovers)
    for(let i=0; i < nOfRovers; i++){
      rovers.push(counter++)
    }
  this.setState({deployedRovers: rovers})
  }

  handleRoverLocationX=(e)=>{
    let input = e.currentTarget.value.split("")
    this.setState({gridX: input[0],gridY: input[1], gridZ: input[2]})
  }
  handleInfoLoading=()=>{
    dataMovm.push({x: parseInt(this.state.gridX), 
    y: parseInt(this.state.gridY), 
    mvm: this.state.roverMoves, 
    z: this.state.gridZ})
    this.setState({data: dataMovm})
  }
  handleRoverMovment=()=>{
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
              break;
            }else if(currentHeading === west){
              currentHeading = south
              break;
            }else if(currentHeading === south){
              currentHeading = east
              break;
            }else if(currentHeading === east){
              currentHeading = north
              break;
            }
            break;
          case "R":
            if(currentHeading === north){
              currentHeading = east
              break;
            }else if(currentHeading === east){
              currentHeading = south
              break;
            }else if(currentHeading === south){
              currentHeading = west
              break;
            }else if(currentHeading === west){
              currentHeading = north
              break;
            }
            break;
          case "M": 
            if(currentHeading === north){
              currentY++
              break;
            }else if(currentHeading === east){
              currentX++
              break;
            }else if(currentHeading === south){
              currentY--
              break;
            }else if(currentHeading === west){
              currentX--
              break;
          }  
        }
      }
      finalCoordinates.push({data:[["x",`heading: ${currentHeading}`],[this.state.data[k].x,this.state.data[k].y],[currentX, currentY]]})
    }
   
  }

  render(){
    return (
      
      <div className="App">
        {this.state.clearBtn === true ? <Button onClick={()=>{window.location.reload()}}>Clear</Button>:null}
      
        <div className="input-location">
        <div>
        <InputGroup className="mb-2"> 
        <InputGroup.Prepend>
          <InputGroup.Text id="basic-addon1">Bonds</InputGroup.Text>
          <FormControl className="input-group"  onChange={(e)=>{this.setState({boundX: e.currentTarget.value})}}/>
          <FormControl className="input-group"  onChange={(e)=>{this.setState({boundY: e.currentTarget.value})}}/>
          <Button onClick={this.handleCollectBtn} disabled={this.state.disabled} variant="info">Collect!</Button>
          </InputGroup.Prepend>
          <br></br>
          <InputGroup.Prepend>
          <InputGroup.Text id="basic-addon1"> Rovers </InputGroup.Text>
          <FormControl className="input-group" onChange={(e)=>{this.setState({numberOfRovers: e.currentTarget.value})}}/>
          <Button onClick={this.handleRovers} disabled={this.state.disabled} variant="info">Build</Button>
          </InputGroup.Prepend>
        </InputGroup>
        </div>

        {this.state.deployedRovers.map(rover => 
          <CreateRovers rover={rover} key={rover}
          handleRoverLocationZ={this.handleRoverLocationZ} 
          handleRoverLocationY={this.handleRoverLocationY} 
          handleRoverLocationX={this.handleRoverLocationX} 
          handleMovementsInput={this.handleMovementsInput} 
          handleInfoLoading={this.handleInfoLoading}
          numberOfRovers={this.state.numberOfRovers}
          handleRoverMovment={this.handleRoverMovment}
          data={this.state.data}
          show={this.state.show}
          closeShow={this.state.handleShowBtn}/>
        )}

        </div>
      
        <div>
        {finalCoordinates.map(data =>
         <Graph  bounds={this.state.bounds} handleClearBtn={this.handleClearBtn} data={data}/>
        )}
        </div>
        
       
          
      </div>
    );
  }
  
}

