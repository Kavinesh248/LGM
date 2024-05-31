import React from "react";
import styled from "styled-components";

const Card = styled.div`
  border: 1px solid #ccc;
  border-radius: 8px;
  margin: 10px;
  padding: 10px;
  width: 200px;
`;

const UserCard = ({ user }) => {
  return (
    <Card>
      <img src={user.avatar} alt={user.first_name} style={{ width: "100%" }} />
      <h3>{`${user.first_name} ${user.last_name}`}</h3>
      <p>{user.email}</p>
    </Card>
  );
};

export default UserCard;
