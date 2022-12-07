import React, {
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  FC,
  FormEvent,
} from "react";
import "../../App.css";
import { User } from "../../types/User";

interface HeaderProps {
  setUsers: Dispatch<SetStateAction<User[] | null>>;
  setTotal: Dispatch<SetStateAction<number>>;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  numberPerPage: number;
}

const Header: FC<HeaderProps> = ({
  setUsers,
  setTotal,
  page,
  setPage,
  numberPerPage,
}) => {
  const [querySearch, setQuerySearch] = useState<string>("");
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
        console.log("You have exceeded the rate limit, please wait a bit");
      if (err === 422)
        console.log("Only the first 1000 search results are available");
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
    if (querySearch && (page || numberPerPage)) {
      const timeOutId = setTimeout(() => {
        getUsers();
      }, 1000);

      return () => {
        setLoading(false);
        clearTimeout(timeOutId);
      };
    } else {
      setUsers(null);
    }
  }, [querySearch, page, numberPerPage]);

  return (
    <>
      <div className="header">GitHub Search</div>
      <div className="searchBar">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={querySearch}
            onChange={handleChangeQuery}
            placeholder="Who are you looking for ?"
          />
        </form>
        {loading && <div className="loader"></div>}
      </div>
    </>
  );
};

export default Header;
