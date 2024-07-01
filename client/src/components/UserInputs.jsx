import React, { useState } from "react";
import { toast } from "react-toastify";
const UserInputs = () => {
  // State for storing the form input values
  const [template, setTemplate] = useState({
    id: 0,
    name: "",
    amount: "",
    spendTime: "",
    category: "",
  });

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

  // Function to handle form submission
  const onFormSubmit = (e) => {
    e.preventDefault();

    // Sending data to the server
    fetch("http://localhost:5000/api/addData", {
      method: "POST",
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
        // Handle errors
      });
    // message successfull
    toast.success("Data sent successfully!");
    // Reset the input fields after submit
    setTemplate({
      id: 0,
      name: "",
      amount: "",
      spendTime: "",
      category: "",
    });
  };

  return (
    <div className="container d-flex justify-content-center align-content-center">
      <div className="card m-3" style={{ width: "40rem" }}>
        <div className="card-body border shadow rounded-2 bg-body-secondary p-5">
          <h1 className="card-title text-center">Register</h1>
          <form className="row row-cols-1" onSubmit={onFormSubmit}>
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
              <button type="submit" className="btn btn-primary p-2 w-100">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserInputs;
