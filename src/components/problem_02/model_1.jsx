import React from 'react';
import API_Model from './api_model';

const Model_1 = ({ hadnleCurrenentModel, setSelectedContact, modelCloseHanlder }) => {


  return (
    <API_Model 
      hadnleCurrenentModel={hadnleCurrenentModel}
      setSelectedContact={setSelectedContact}
      defaultUrl="https://contact.mediusware.com/api/contacts/"
      modelCloseHanlder={modelCloseHanlder}
    />
     
  
  )
};

export default Model_1;
