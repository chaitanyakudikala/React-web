import { useEffect, useState } from "react";
import "./styles.css";
import React from "react";
import { apiRequest } from "../../services/api";

type Items = { id: number; item: string; checked: boolean };

const ListItems = () => {
  const uri = "http://localhost:3500/items";
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [items, setItems] = useState<Items[]>([]);
  const [newItem, setNewItem] = useState<string>("");
  const [serach, setSearch] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsloading] = useState(true);

  useEffect(() => {
    async function fetchItems() {
      try {
        const response = await fetch(uri);
        if (!response.ok) throw Error(`Did note recieve expected data`);
        const listItems = await response.json();
        setItems(listItems);
        setErrorMessage("");
      } catch (err) {
        if (err instanceof Error) setErrorMessage(err.message);
      } finally {
        setIsloading(false);
      }
    }
    const timeoutId = setTimeout(() => {
      fetchItems();
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  const handleAddItem = async (item: string) => {
    if (!item.trim()) {
      return;
    }
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    const itemExists = items.some(
      (obj) => obj.item.toLowerCase() === item.toLowerCase()
    );
    if (itemExists) {
      alert("Item already exists");
    } else {
      const myNewItems = { id: id, item: item, checked: false };
      const listItems = [...items, myNewItems];
      setItems(listItems);

      const postOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(myNewItems),
      };
      try {
        // Make the API request
        const result = await apiRequest(uri, postOptions);
        // Handle the result if needed
        if (result) {
          setErrorMessage(result);
        }
      } catch (error) {
        // Handle API request error
        console.error("Error making API request:", error);
        setErrorMessage("Failed to add item. Please try again.");
      }
    }
  };

  const handleCheck = async (id: number) => {
    const listItems = items.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setItems(listItems);
    const checkItems = listItems.filter((item) => item.id === id);
    const updateOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ checked: checkItems[0].checked }),
    };
    const reUrl = `${uri}/${id}`;
    const result = await apiRequest(reUrl, updateOptions);
    if (result) setErrorMessage(result);
  };

  const handleDelete = async (id: number) => {
    const listItems = items.filter((item) => item.id !== id);
    setItems(listItems);
    const deleteOptions = {
      method: "DELETE",
    };
    const reUrl = `${uri}/${id}`;
    const result = await apiRequest(reUrl, deleteOptions);
    if (result) setErrorMessage(result);
  };

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!newItem) return;
    handleAddItem(newItem);
    setNewItem("");
  };
  const itemsToMap = items.filter((item) =>
    item.item.toLowerCase().includes(serach.toLowerCase())
  );
  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          autoFocus
          type="text"
          role="searchbox"
          placeholder="Search item"
          required
          value={serach}
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>

      <form onClick={handleSubmit}>
        <input
          autoFocus
          ref={inputRef}
          type="text"
          placeholder="Add item"
          required
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
        />
        <button type="submit">Add Item</button>
      </form>
      {isLoading && <p>Loading Items.......</p>}
      {errorMessage && <p>{`Error: ${errorMessage}`}</p>}
      {!errorMessage && !isLoading && (
        <>
          {itemsToMap.length ? (
            <ul>
              {itemsToMap.map((item) => (
                <li className="item" key={item.id}>
                  <input
                    type="checkbox"
                    checked={item.checked}
                    onChange={() => {
                      handleCheck(item.id);
                    }}
                  />
                  <label
                    onDoubleClick={() => {
                      handleCheck(item.id);
                    }}
                  >
                    {item.item}
                  </label>
                  <button
                    onClick={() => {
                      handleDelete(item.id);
                    }}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p>List is empty, Add using above input</p>
          )}
        </>
      )}
    </div>
  );
};

export default ListItems;
