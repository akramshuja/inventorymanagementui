import React, { useEffect, useState } from "react";
import { useOktaAuth } from "@okta/okta-react";
import { Link } from "react-router-dom";
import "./Home.css";
import LoginModal from "./LoginModal";
import axios from "axios";
import ItemForm from "./ItemForm";

function Home() {
  const { oktaAuth, authState } = useOktaAuth();
  const [userInfo, setUserInfo] = useState(null);

  const [showModal, setShowModal] = useState(false);

  const [items, setItems] = useState([]);

  const login = async () => {
    await oktaAuth.signInWithRedirect();
  };

  const logout = async () => {
    await oktaAuth.signOut();
  };

  const handleSubmit = async (formData) => {
    try {
      const token = oktaAuth.getAccessToken();
      console.log(formData.itemId);

      await axios.post(
        "http://localhost:8080/app/item",
        {
          itemId: formData.itemId,
          itemName: formData.itemName,
          itemBuyingPrice: formData.itemBuyingPrice,
          itemSellingPrice: formData.itemSellingPrice,
          itemEnteredByUser: userInfo,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Refresh the item list
      fetchItems();
    } catch (error) {
      console.error("Error submitting item:", error);
    }
  };

  const handleDelete = async (itemId) => {
    try {
      const token = oktaAuth.getAccessToken();

      await axios.delete(`http://localhost:8080/app/item/${itemId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

      // Refresh the item list
      fetchItems();
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  useEffect(() => {
    if (!authState?.isAuthenticated) {
      setShowModal(true);
      setUserInfo(null);
    } else {
      setShowModal(false);
      oktaAuth.getUser().then((info) => {
        setUserInfo(info.name);
      });
      fetchItems();
    }
  }, [authState]);

  const fetchItems = async () => {
    try {
      const token = oktaAuth.getAccessToken();

      const response = await axios.get("http://localhost:8080/app/item", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setItems(response.data);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  return (
    <>
      <h2>Inventory Management System</h2>
      {authState?.isAuthenticated ? (
        <>
          <ItemForm onSubmit={handleSubmit} />

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
                  
                  <Link to= {`/edit-item/${item.itemId}`} state={{ itemData: item }}>
                      Edit
                    </Link>
                    <button onClick={e => {handleDelete(item.itemId)}}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <div>
          <button onClick={login}>Login</button>
        </div>
      )}
      {showModal && !authState?.isAuthenticated && <LoginModal login={login} />}
    </>
  );
}

export default Home;
