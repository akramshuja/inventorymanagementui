import React, { useEffect, useState } from "react";
import { useOktaAuth } from "@okta/okta-react";
import "./Home.css";
import LoginModal from "./LoginModal";
import ItemForm from "./ItemForm";
import { fetchItems, createItem, deleteItem } from "../api";
import ItemList from "./ItemList";

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
    const token = oktaAuth.getAccessToken();
    const newItem = await createItem(formData, userInfo, token);

    setItems([...items, newItem]);
  };

  const handleDelete = async (itemId) => {
    const token = oktaAuth.getAccessToken();
    await deleteItem(itemId, token);

    const updatedItems = items.filter((item) => item.itemId !== itemId);
    setItems(updatedItems);
  };

  const getItems = async () => {
    const token = oktaAuth.getAccessToken();

    const items = await fetchItems(token);

    setItems(items);
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
      getItems();
    }
  }, [authState, oktaAuth]);

  return (
    <>
      <h2>Inventory Management System</h2>
      {authState?.isAuthenticated ? (
        <>
          <ItemForm onSubmit={handleSubmit} />
          <ItemList items={items} handleDelete={handleDelete} />
          <button className="logout" onClick={logout}>
            Logout
          </button>
        </>
      ) : (
        <div>
          <p> Please login first </p>
        </div>
      )}
      {showModal && !authState?.isAuthenticated && <LoginModal login={login} />}
    </>
  );
}

export default Home;
