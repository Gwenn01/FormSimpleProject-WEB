import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const UserUpdate = () => {
  // get the data form the navigation
  const location = useLocation();
  const { userData } = location.state || {};
  // State for storing the form input values
  const [template, setTemplate] = useState({
    id: userData.id,
    name: userData.person_name,
    amount: userData.amount,
    spendTime: userData.spend_date,
    category: userData.category,
  });
  // navigate to data again
  const navigate = useNavigate();
  // Function to handle input changes
  const onInputChange = (e) => {
    // Destructure name and value from the event target (the input field)
    const { name, value } = e.target;
    // Update the template state with the new value
    setTemplate((prevTemplate) => ({
      ...prevTemplate,
      [name]: value,
    }));
  };
  // handle the onsubmit or edit the value
  const onFormSubmitEdit = (e) => {
    e.preventDefault();
    // fetch the url to access the backend
    fetch(`http://localhost:5000/api/updateData/${userData.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(template),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Data sent successfully:", data);
      })
      .catch((error) => {
        console.error("Error sending data:", error);
      });

    toast.success("Data Updated Successfully");
    setTimeout(() => {
      navigate("/data");
    }, 2000);
  };
  return (
    <div className="container d-flex justify-content-center align-content-center">
      <div className="card m-3" style={{ width: "40rem" }}>
        <div className="card-body border shadow rounded-2 bg-body-secondary p-5">
          <h1 className="card-title text-center">Update the Data</h1>
          <form className="row row-cols-1" onSubmit={onFormSubmitEdit}>
            <div className="col form-floating p-1 m-1">
              <input
                type="number"
                className="form-control"
                id="inputId"
                name="id"
                placeholder="Place id here"
                value={template.id}
                onChange={onInputChange}
              />
              <label htmlFor="inputName" className="form-label">
                Enter Id
              </label>
            </div>
            <div className="col form-floating p-1 m-1">
              <input
                type="text"
                className="form-control"
                id="inputName"
                name="name"
                placeholder="Place name here"
                value={template.name}
                onChange={onInputChange}
              />
              <label htmlFor="inputName" className="form-label">
                Enter Name
              </label>
            </div>
            <div className="col form-floating p-1 m-1">
              <input
                type="number"
                className="form-control"
                id="inputAmount"
                name="amount"
                placeholder="Place amount here"
                value={template.amount}
                onChange={onInputChange}
              />
              <label htmlFor="inputAmount" className="form-label">
                Enter amount
              </label>
            </div>
            <div className="col form-floating p-1 m-1">
              <input
                type="text"
                className="form-control"
                id="inputSpendTime"
                name="spendTime"
                placeholder="Place spend time here"
                value={template.spendTime}
                onChange={onInputChange}
              />
              <label htmlFor="inputSpendTime" className="form-label">
                Enter Spend Time
              </label>
            </div>
            <div className="col form-floating p-1 m-1">
              <input
                type="text"
                className="form-control"
                id="inputCategory"
                name="category"
                placeholder="Place category here"
                value={template.category}
                onChange={onInputChange}
              />
              <label htmlFor="inputCategory" className="form-label">
                Enter Category
              </label>
            </div>
            <div className="col mt-3">
              <button type="submit" className="btn btn-warning p-2 w-100">
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserUpdate;
