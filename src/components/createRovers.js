import React from 'react'
import { InputGroup, FormControl, Button } from 'react-bootstrap';
export default class CreateRovers extends React.Component{
    render(){
        return(
            <div>
            <div id={this.props.rover} key={this.props.rover}> 
                <InputGroup className="mb-3"> 
                    <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon1">Rover#{this.props.rover} init location</InputGroup.Text>
                    <FormControl className="input-group" onChange={this.props.handleRoverLocationX}
                    />
                    <FormControl className="input-group" onChange={this.props.handleRoverLocationY}
                    />
                    <InputGroup.Text >Movements</InputGroup.Text>
                    <FormControl className="input-group-move" onChange={this.props.handleMovementsInput}
                    />
                    <Button onClick={this.props.handleMovements} variant="success">Build rover</Button>
                    </InputGroup.Prepend>
                </InputGroup>
            </div> 
            </div>
        )
    }
}