import React from 'react';
import Model from '../shared/model';

const Model_3 = ({ contact, setSelectedContact, modelCloseHanlder }) => {


  return (
    <Model close={modelCloseHanlder}
      sx={{border: '0.5rem solid #46139f'}}
    >
      <h1> id: {contact.id} </h1>
      <h1> phone: {contact.phone} </h1>

        <div style={{marginTop: '2rem'}} >  
          <button onClick={()=> setSelectedContact(null)} > 
            back 
          </button>
        </div>
    </Model>
    
  )
};

export default Model_3;
