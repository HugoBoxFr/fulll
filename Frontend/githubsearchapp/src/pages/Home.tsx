import React, { FormEvent, useEffect, useRef, useState } from "react";
import Header from "../components/header/Header";
import "../App.css";
import UsersList from "../components/user/UsersList";
import UsersPagination from "../components/user/UsersPagination";
import { User } from "../types/User";

const Home = () => {
  const [querySearch, setQuerySearch] = useState<string>("");
  const [users, setUsers] = useState<User[] | null>(null);
  const [total, setTotal] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [numberPerPage, setNumberPerPage] = useState<number>(30);
  const [checkedUsers, setCheckUsers] = useState<User[]>([]);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const errorRef = useRef<HTMLDivElement>(null);
  const [message, setMessage] = useState("");
  const [editMode, setEditMode] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const getUsers = async () => {
    setLoading(true);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}search/users?q=${querySearch}&page=${page}&per_page=${numberPerPage}`
      );

      if (response.status === 200) {
        const data = await response.json();
        setUsers(data.items);
        setTotal(data.total_count);
      } else {
        console.error(await response.json());
        throw response.status;
      }
    } catch (err) {
      console.error(err);
      if (err === 403)
        setErrorMsg("You have exceeded the rate limit, please wait a bit");
      if (err === 422)
        setErrorMsg("Only the first 1000 search results are available");
    } finally {
      setLoading(false);
    }
  };

  const handleChangeQuery = (e: FormEvent<HTMLInputElement>) => {
    setPage(1);
    setQuerySearch(e.currentTarget.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPage(1);
    getUsers();
  };

  useEffect(() => {
    let timeOutId: string | number | NodeJS.Timeout | undefined;
    if (querySearch && (page || numberPerPage)) {
      timeOutId = setTimeout(() => {
        setCheckUsers([]);
        getUsers();
      }, 1000);
    } else {
      setUsers(null);
    }
    return () => {
      setLoading(false);
      clearTimeout(timeOutId);
    };
  }, [querySearch, page, numberPerPage]);

  useEffect(() => {
    if (!editMode) {
      setCheckUsers([]);
    }
  }, [editMode]);

  useEffect(() => {
    if (errorRef && errorMsg) {
      const elt = errorRef.current;
      if (elt) {
        setTimeout(() => {
          elt.className = "fadeOut toast";
        }, 5000);
        setTimeout(() => {
          setErrorMsg("");
        }, 6000);
      }
    }
  }, [errorRef, errorMsg]);

  const EmptyUser = () => {
    useEffect(() => {
      let timerId: string | number | NodeJS.Timeout | undefined;

      if (total === 0 && users?.length === 0) {
        setMessage("Sorry, no user was found for your query");
      } else if (total > page * numberPerPage) {
        setMessage("No results, we redirect you on the next page");
        timerId = setTimeout(() => {
          setPage((prevState) => prevState + 1);
          setMessage("");
        }, 2000);
      } else {
        setMessage("No results, we redirect you on the prev page");
        timerId = setTimeout(() => {
          setPage((prevState) => prevState - 1);
          setMessage("");
        }, 2000);
      }

      return () => {
        clearTimeout(timerId);
        setMessage("");
      };
    }, []);

    return <p className="noResult">{message}</p>;
  };

  return (
    <div className="home">
      <Header
        loading={loading}
        handleChangeQuery={handleChangeQuery}
        handleSubmit={handleSubmit}
        querySearch={querySearch}
        editMode={editMode}
        setEditMode={setEditMode}
      />

      {users?.length ? (
        <UsersList
          users={users}
          setUsers={setUsers}
          checkedUsers={checkedUsers}
          setCheckUsers={setCheckUsers}
          editMode={editMode}
        />
      ) : users?.length === 0 ? (
        <EmptyUser />
      ) : null}

      <UsersPagination
        page={page}
        setPage={setPage}
        numberPerPage={numberPerPage}
        setNumberPerPage={setNumberPerPage}
        total={total}
      />

      {errorMsg && (
        <div className="toast" ref={errorRef}>
          <div className="title">
            <img
              src={require("../assets/img/github.png")}
              alt="copy"
              title="Duplicate"
            />
            <h3>Sorry !</h3>
          </div>

          <div className="content">
            <p>{errorMsg}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
