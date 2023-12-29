import React from 'react';
import { Backdrop } from '../backdrop';
import classes from './model.module.css';


const Model = ({close, children, sx}) => {

  return (
    <Backdrop
      close={close}
    >
     
     <div className={classes.root}
      style={{...(sx && sx)}}
     >
      {children}
     </div>

    </Backdrop>
  )

}

export default Model;
