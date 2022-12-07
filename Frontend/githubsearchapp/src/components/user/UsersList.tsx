import React, { FC } from "react";
import { User } from "../../types/User";
import { UserData } from "../../types/UserData";
import UserCard from "./UserCard";

interface UserListProps {
  users: User[];
  total: number;
  page: number;
  numberPerPage: number;
}

const UserList: FC<UserListProps> = ({ users, total, page, numberPerPage }) => {
  return (
    <div
      className="userListContainer"
      style={
        page * numberPerPage < total + numberPerPage
          ? { height: "calc(100vh - 204px)" }
          : { height: "calc(100vh - 164px)" }
      }
    >
      <div className="userList">
        {users.length ? (
          users.map((user: User) => <UserCard key={user.id} user={user} />)
        ) : (
          <p>R</p>
        )}
      </div>
    </div>
  );
};

export default UserList;
