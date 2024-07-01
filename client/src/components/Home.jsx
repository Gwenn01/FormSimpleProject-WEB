import React, { useState, useEffect } from "react";

const Home = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/home")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <section className="container-fluid custom-section mt-5">
      <div className="row justify-content-center align-items-center">
        <div className="col-lg-6 text-center">
          <h1 className="display-4 mb-4">Welcome to my website!</h1>
          <p className="lead">
            This is a sample React application demonstrating how to integrate
            Bootstrap for styling.
          </p>
          {data ? <p>{data.message}</p> : <p>Loading...</p>}
        </div>
      </div>
    </section>
  );
};

export default Home;
