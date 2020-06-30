import React, { ReactElement } from 'react'
import {Line} from 'react-chartjs-2';
import { Typography } from '@material-ui/core';
interface Props {
    data : number[],
    title : string,
    color ?: string
}
function NombreCas({data,title,color}: Props): ReactElement {
   const ds = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: title,
        fill: false,
        lineTension: 0.1,
        backgroundColor: color,
        borderColor: color,
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: color,
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: color,
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data : data
      }
    ]
   }
    console.log(ds)
    return (
        <div  style={{
            flex:"1"
        }}>
              <Typography variant="h5" style={{
                  fontSize :"1rem",
                  textAlign : "center"
              }} color="primary">{title}</Typography>
        <Line data={ds} />
        </div>
    )
}

export default NombreCas
