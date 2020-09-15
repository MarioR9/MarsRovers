import React from 'react'
import { Chart } from "react-google-charts";
import { Accordion, Card, Button , Container, Row, Col  } from 'react-bootstrap';

export default class Graph extends React.Component{
    
    render(){
    let randomColor = '#'+Math.floor(Math.random()*16777215).toString(16) //generate random color
        return(
            <div>

            <Container>
            <Row>
                <Col>
                <Chart
                width={'1200px'}
                height={'400px'}
                chartType="LineChart"
                loader={<div>Loading Chart</div>}
                data={this.props.data.data}
                options={{
                    colors: [`${randomColor}`],
                    title: `Rovers Route`,
                    pointShape: 'diamond',
                    pointSize: 18,
                    hAxis: { title: 'S', minValue: 0, maxValue: this.props.bounds.x },
                    vAxis: { title: 'W', minValue: 0, maxValue: this.props.bounds.y },
                }}
                rootProps={{ 'data-testid': '1' }}
                />
                </Col>
                <Col>
                <Accordion>
                <Card>
                    <Card.Header>
                    <Accordion.Toggle as={Button} variant="link" eventKey="0">
                        Rover's Report
                    </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="0">
                    <Card.Body>Current Location: {this.props.data.data[2]} {this.props.data.data[0][1]} </Card.Body>
                    </Accordion.Collapse>
                </Card>
                </Accordion>
                </Col>
            </Row>
            </Container>
               
            </div>
        )
    }
}

