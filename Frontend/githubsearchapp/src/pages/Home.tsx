import React, { useState, useEffect } from "react";
import Header from "../components/header/Header";
import "../App.css";
import UsersList from "../components/user/UsersList";
import UsersPagination from "../components/user/UsersPagination";
import { User } from "../types/User";

const Home = () => {
  const [users, setUsers] = useState<User[] | null>(null);
  const [total, setTotal] = useState<number>(0);
  const [page, setPage] = useState(1);
  const [numberPerPage, setNumberPerPage] = useState<number>(30);

  return (
    <div className="home">
      <Header
        setUsers={setUsers}
        setTotal={setTotal}
        page={page}
        setPage={setPage}
        numberPerPage={numberPerPage}
      />

      {users?.length ? (
        <UsersList
          users={users}
          total={total}
          page={page}
          numberPerPage={numberPerPage}
        />
      ) : users?.length === 0 ? (
        <p className="noResult">Sorry, no user was found for your query</p>
      ) : null}

      {users?.length && (
        <UsersPagination
          page={page}
          setPage={setPage}
          numberPerPage={numberPerPage}
          setNumberPerPage={setNumberPerPage}
          total={total}
        />
      )}
    </div>
  );
};

export default Home;
