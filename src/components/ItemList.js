import React from "react";
import { Link } from "react-router-dom";

function ItemList({ items, handleDelete }) {
  return (
    <>
      <h2>Item List</h2>
      <table>
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Buying Price</th>
            <th>Selling Price</th>
            <th>Entered By</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.itemId}>
              <td>{item.itemName}</td>
              <td>{item.itemBuyingPrice}</td>
              <td>{item.itemSellingPrice}</td>
              <td>{item.itemEnteredByUser}</td>
              <td>{item.itemStatus}</td>
              <td>
                <Link to={`/edit-item/${item.itemId}`} state={{ itemData: item }}>
                  <button className="actionButtons">Edit</button>
                </Link>
                <button className="actionButtons" onClick={() => handleDelete(item.itemId)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default ItemList;
