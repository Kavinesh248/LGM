import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import UserCard from "./components/UserCard";

const Navbar = styled.nav`
  background-color: #333;
  padding: 1rem;
  color: white;
  display: flex;
  justify-content: space-between;
`;

const Button = styled.button`
  background-color: #4caf50;
  border: none;
  color: white;
  padding: 0.5rem 1rem;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  cursor: pointer;
`;

const Loader = styled.div`
  border: 8px solid #f3f3f3; /* Light grey */
  border-top: 8px solid #3498db; /* Blue */
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
  margin: auto;
  margin-top: 20px;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const getUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://reqres.in/api/users?page=2");
      setUsers(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar>
        <div>Brand Name</div>
        <Button onClick={getUsers}>Get Users</Button>
      </Navbar>
      {loading ? (
        <Loader />
      ) : (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {users.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
