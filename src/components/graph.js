import React, { useDebugValue } from 'react'
import { Chart } from "react-google-charts";


export default class Graph extends React.Component{

    render(){
    let randomColor = '#'+Math.floor(Math.random()*16777215).toString(16) //generate random color
        return(
            <div>
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
                legendToggle
                />
            </div>
        )
    }
}

