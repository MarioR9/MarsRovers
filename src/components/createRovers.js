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
    handleAlert=()=>{
        if(parseInt(this.props.numberOfRovers) === this.props.data.length){
            this.props.handleRoverMovment()
        }
        this.props.handleInfoLoading()
        this.setState({ show: true })
        console.log(this.props.numberOfRovers)
        console.log(this.props.data.length)
   
    }  
    render(){
        return(
            <div>
            <div > 
            <Form>
            <Form.Row>
                <Col xs={3}>
                <InputGroup.Text id="basic-addon1">Rover#{this.props.rover}</InputGroup.Text>
                <FormControl className="input-group-move"  placeholder="ex: 12N" onChange={this.props.handleRoverLocationX}/>
                </Col>
                <Col>
                <InputGroup.Text>Moves</InputGroup.Text>
                <FormControl className="input-group-move" placeholder="ex: LMLMLMLMM" onChange={this.props.handleMovementsInput}/>
                </Col>
                <Col>
                <Button onClick={this.handleAlert} variant="info">Load Data</Button>
                </Col>
            </Form.Row>
            </Form>
                <div>
                <SweetAlert
                    show={this.state.show}
                    title="Info Loading"
                    text="Continue..."
                    onConfirm={() => this.setState({ show: false })}/>
                </div>

            </div> 
            </div>
        )
    }
}