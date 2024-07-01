import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "../App.css";
import { useNavigate } from "react-router-dom";

const UserData = () => {
  // set the data before rendering in the dom
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/display")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleDelete = (id) => {
    fetch(`http://localhost:5000/api/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((data) => {
        console.log("Data delete successfully:", data);
        setData(data.filter((user) => user.id !== id)); // Remove deleted data from the state
      })
      .catch((error) => {
        console.error("Error deleting data:", error);
      });
    toast.success("Data deleted successfully!");
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };
  // handle the update data
  const handleUpdate = (user) => {
    // go to the routes or other page sith some data and get it using usLocation function
    navigate("/update", { state: { userData: user } });
  };

  return (
    <div className="container d-flex justify-content-center align-items-center flex-column">
      <input
        type="text"
        className="form-control form-control m-4"
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="container d-flex justify-content-center align-items-center mt-3">
        <div className="card border shadow rounded-3">
          <div className="card-body">
            <h1 className="card-title text-center">User Data</h1>
            <div className="table-responsive">
              <table className="table table-striped align-middle">
                <thead className="table-dark">
                  <tr>
                    <th className="text-center">ID</th>
                    <th className="text-center">NAME</th>
                    <th className="text-center">AMOUNT</th>
                    <th className="text-center">SPEND DATE</th>
                    <th className="text-center">CATEGORY</th>
                    <th className="text-center">ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {data
                    .filter((item) =>
                      search == ""
                        ? item
                        : item.person_name
                            .toLowerCase()
                            .includes(search.toLowerCase())
                    )
                    .map((user) => (
                      <tr key={user.id}>
                        <td className="text-center">{user.id}</td>
                        <td className="text-center">{user.person_name}</td>
                        <td className="text-center">{user.amount}</td>
                        <td className="text-center">{user.spend_date}</td>
                        <td className="text-center">{user.category}</td>
                        <td className="text-center">
                          <button
                            type="button"
                            onClick={() => handleUpdate(user)}
                            className="btn btn-warning m-2"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(user.id)}
                            className="btn btn-danger m-2"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserData;
