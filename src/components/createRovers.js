import React from 'react'
import { InputGroup, FormControl, Button } from 'react-bootstrap';
export default class CreateRovers extends React.Component{
    constructor(props) {
        super(props);
        this.state = {currentRovers:0};
      }
    componentDidMount(){
        this.setState({currentRovers: this.props.rover})
    }

    render(){
        return(
            <div>
            <div id={this.props.rover} key={this.props.rover}> 
                <InputGroup className="mb-3"> 
                    <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon1">Rover#{this.props.rover} init location</InputGroup.Text>
                    <FormControl className="input-group-move"  placeholder="ex: 12N" onChange={this.props.handleRoverLocationX}
                    />
                    <InputGroup.Text >Movements</InputGroup.Text>
                    <FormControl className="input-group-move" placeholder="LMLMLMLMM" onChange={this.props.handleMovementsInput}
                    />
                    <Button onClick={this.props.handleRoverMovment} variant="success">Build rover</Button>
                    </InputGroup.Prepend>
                </InputGroup>
            </div> 
            </div>
        )
    }
}