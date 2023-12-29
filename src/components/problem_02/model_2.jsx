import React from 'react';
import API_Model from './api_model';

const Model_2 = ({ hadnleCurrenentModel, setSelectedContact, modelCloseHanlder }) => {


  return (
    <API_Model 
      hadnleCurrenentModel={hadnleCurrenentModel}
      setSelectedContact={setSelectedContact}
      defaultUrl="https://contact.mediusware.com/api/country-contacts/United States/"
      modelCloseHanlder={modelCloseHanlder}
    />
     
  
  )
};

export default Model_2;
