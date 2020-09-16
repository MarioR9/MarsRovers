import React from 'react'
import { InputGroup, FormControl, Button,Form ,Col } from 'react-bootstrap';
import SweetAlert from 'sweetalert2-react';



export default class CreateRovers extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
        show: false
        };
      }
    handleAlert=()=>{ //handles state of notificaions as well as loading info for each rovers
        this.props.handleInfoLoading()
        this.setState({ show: true })
    }  

     
    render(){
        return(
            <div>
            <div > 
            <Form >
            <Form.Row>
                <Col xs={3}>
                <InputGroup.Text id="basic-addon1">Rover's Coordinates</InputGroup.Text>
                <FormControl className="input-group-move"  placeholder="ex: 12N" onChange={this.props.handleRoverLocationX}/>
                </Col>
                <Col>
                <InputGroup.Text>Instructions</InputGroup.Text>
                <FormControl className="input-group-move" placeholder="ex: LMLMLMLMM" onChange={this.props.handleMovementsInput}/>
                </Col>
                <Col>
                <Button onClick={this.handleAlert} variant="outline-info">Load Data</Button>
                <Button onClick={this.props.handleRoverMovment} variant="outline-danger">Start</Button>
                <Button onClick={this.props.handleVisual} variant="outline-dark">Clear</Button>
                </Col>
            </Form.Row>
           
            </Form>
                <div>
                <SweetAlert
                    show={this.state.show} //Notification that data has beenn loded to the current rover's memory
                    title="Data Loaded"
                    text="Press Start to deploy"
                    onConfirm={() => this.setState({ show: false })}/>
                </div>

            </div> 
            </div>
        )
    }
}
