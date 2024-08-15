import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      name,
      email,
      age,
    };

    await axios.post("http://localhost:4000/api/createStudent", userData)
      .then((result) => {
        alert("Data Saved");
        console.log(result);
        navigate("/");
      })
      .catch((err) => {
        alert(err);
        console.log(err);
      });
  };

  return (
    <div className="d-flex vh-100 bg-secondary justify-content-center align-items-center">
      <div className="w-50 h-70 bg-white rounded p-3 m-auto">
        <form onSubmit={handleSubmit}>
          <h2>Add User</h2>
          <div className="mb-2">
            <label>Name</label>
            <input
              type="text"
              placeholder="Enter Your Name"
              className="form-control"
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="mb-2">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter Your Email"
              className="form-control"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-2">
            <label>Age</label>
            <input
              type="number"
              placeholder="Enter Your Age"
              className="form-control"
              onChange={(e) => setAge(e.target.value)}
            />
          </div>

          <button className="btn btn-success">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default CreateUser;
