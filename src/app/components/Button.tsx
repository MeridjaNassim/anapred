import React, { ReactNode } from 'react'
import { CSSProperties } from '@material-ui/core/styles/withStyles'
import {default as Btn} from '@material-ui/core/Button/Button';
import { PropTypes } from '@material-ui/core';
interface Props {
    text : string,
    style? : CSSProperties,
    className? : string,
    icon ?:ReactNode,
    size : "small" | "medium" | "large",
    variant?:"text" | "outlined" | "contained"
    color ?:PropTypes.Color
}

const Button = ({text , style, className ,icon ,color ,variant,size , ...rest}: Props) => {
    return (
        <Btn
        {...rest}
        style={style}
        variant={variant}
        color={color}
        size={size}
        className={className}
        startIcon={icon}
      >
        {text} 
      </Btn>
    )
}

export default Button
