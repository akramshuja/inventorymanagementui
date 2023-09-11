// ItemForm.js
import React, { useEffect, useState } from "react";

function ItemForm({ onSubmit, isEdit, initialValues }) {
  const [itemId, setItemId] = useState("");
  const [itemName, setItemName] = useState("");
  const [buyingPrice, setBuyingPrice] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");

  const [formData, setFormData] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const formData = {
      itemId,
      itemName,
      buyingPrice,
      sellingPrice,
    };
    onSubmit(formData);

    // Reset form fields
    setItemId("");
    setItemName("");
    setSellingPrice("");
    setBuyingPrice("");
  };

  useEffect(() => {
    if (isEdit && initialValues) {
      console.log(formData);
      setFormData(initialValues);
      setItemId(formData.itemId);
      setItemName(formData.itemName);
      setBuyingPrice(formData.itemBuyingPrice);
      setSellingPrice(formData.itemSellingPrice);
    }
  }, [isEdit, initialValues, formData]);

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="itemId">Item ID:</label>
        <input
          type="number"
          id="itemId"
          value={itemId}
          onChange={(e) => setItemId(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="itemName">Item Name:</label>
        <input
          type="text"
          id="itemName"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="buyingPrice">Buying Price:</label>
        <input
          type="number"
          id="buyingPrice"
          value={buyingPrice}
          onChange={(e) => setBuyingPrice(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="sellingPrice">Selling Price:</label>
        <input
          type="number"
          id="sellingPrice"
          value={sellingPrice}
          onChange={(e) => setSellingPrice(e.target.value)}
          required
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default ItemForm;
