import React, { ReactElement } from 'react'
import NombreCas from './NombreCas'
import { Paper, Typography } from '@material-ui/core'
interface Props {
    path: string
}

export default function Dashboard({ }: Props): ReactElement {
    return (
        <div style={{
            paddingTop: "5%"
        }}>
            <Typography variant="h4" style={{
                color :"white",
                marginBottom :"40px",
                fontFamily :"var(--font)"
            }}>Dashboard de la situation sanitaire</Typography>
            <Paper style={{
            boxShadow : "var(--drop-shadow)",
            padding :"60px",
            display :"flex",
            borderRadius : 'var(--border-radius)'
        }}>
            
            <NombreCas data={[0,2 ,10,40,100,300,800,1600]} title="Cas confirmé" color="#1174EF"></NombreCas>
            <NombreCas data={[0,2,8,30,50,100,600,1000]} title="Cas Actifs" color="#00910c"></NombreCas>
            <NombreCas data={[0,1,2,4,6,12,20,50]} title="Cas decédé" color="#FF0000"></NombreCas>
            </Paper>
           
        </div>

    )
}
