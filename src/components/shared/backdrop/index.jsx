import { createPortal } from 'react-dom';
import classes from './backdrop.module.css';


export const Backdrop = ({close, children, width}) => {


  return createPortal(
    <div 
      onClick={close}
      className={classes.root}
    >
      <div onClick={e => e.stopPropagation()}
        style={{width: width ||'80%', height: '100%'}}
      >
        {
          children
        }
      </div>
    </div>,
    document.getElementById('backdrop')
  )
}