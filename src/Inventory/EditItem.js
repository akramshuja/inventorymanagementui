import { useOktaAuth } from "@okta/okta-react";
import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import ItemForm from './ItemForm';

function EditItem(props) {
  const location = useLocation();
  const itemData = location.state?.itemData || {};

  const { oktaAuth, authState } = useOktaAuth();
  const navigate = useNavigate();

  console.log(itemData);

  const handleSubmit = async (formData) => {
    const token = oktaAuth.getAccessToken();

    try {
      console.log(formData);
      await axios.put(
        `http://localhost:8080/app/item/`+formData.itemId,
        {
          itemId: formData.itemId,
          itemName: formData.itemName,
          itemBuyingPrice: formData.buyingPrice,
          itemSellingPrice: formData.sellingPrice,
          itemEnteredByUser: 'Samar',
          itemStatus: 'AVAILABLE'
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Navigate to Home
      navigate('/');
    } catch (error) {
      console.error("Error submitting item:", error);
    }
  };

  return (
    <div>
      <h2>Edit Item</h2>
      <ItemForm onSubmit={handleSubmit} isEdit={true} initialValues={itemData}/>
    </div>
  );
}

export default EditItem;
