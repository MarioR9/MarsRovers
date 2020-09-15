import React from 'react'
import { ScatterChart,Scatter ,Legend, ZAxis, CartesianGrid, YAxis, XAxis, Tooltip } from 'recharts';


export default class Graph extends React.Component{

    render(){
        const data01 = [{"x": 100,"y": 200,"z": 200}];
    let randomColor = '#'+Math.floor(Math.random()*16777215).toString(16) //generate random color
        return(
            <div>
                <div>
                <ScatterChart width={800} height={250}
                margin={{ top: 20, right: 20, bottom: 10, left: 10 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="x" />
                <YAxis dataKey="y" />
                <ZAxis dataKey="z" range={[600]} />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <Legend />
                <Scatter data={this.props.data} fill={randomColor} />
                </ScatterChart>
                </div>
            </div>
        )
    }
}