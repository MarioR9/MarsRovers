import React from 'react'
import { ScatterChart,Scatter ,Legend, ZAxis, CartesianGrid, YAxis, XAxis, Tooltip } from 'recharts';


export default class Graph extends React.Component{

    render(){
    let randomColor = '#'+Math.floor(Math.random()*16777215).toString(16) //generate random color
        return(
            <div>
                <div>
                    <ScatterChart width={700} height={300}
                    margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
                    <CartesianGrid strokeDasharray="5 5" />
                    <XAxis dataKey="x"  />
                    <YAxis dataKey="y"  />
                    <ZAxis dataKey="z" dataKey="heading/"  range={[700]}/>
                    <Tooltip cursor={{ strokeDasharray: '5  5' }} />
                    <Legend />
                    <Scatter name="rover#1" data={this.props.data} fill={randomColor} />
                    </ScatterChart>
                </div>
            </div>
        )
    }
}