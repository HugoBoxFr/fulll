import React, { Dispatch, FC, SetStateAction } from "react";

interface UserPaginationProps {
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  numberPerPage: number;
  setNumberPerPage: Dispatch<SetStateAction<number>>;
  total: number;
}

const UsersPagination: FC<UserPaginationProps> = ({
  page,
  setPage,
  numberPerPage,
  setNumberPerPage,
  total,
}) => {
  const handlePrevPage = (e: React.MouseEvent<HTMLButtonElement>) => {
    page <= 1 ? setPage(1) : setPage(page - 1);
  };

  const handleNextPage = (e: React.MouseEvent<HTMLButtonElement>) => {
    setPage(page + 1);
  };

  const handleSelectPerPage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPage(1);
    setNumberPerPage(parseInt(e.target.value, 10));
  };

  return (
    <div className="usersPaginationContainer">
      <div className="usersPagination content">
        <select
          name="choices"
          id="per_page_select"
          onChange={(e) => handleSelectPerPage(e)}
        >
          <option value="30">30</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>

        <p>{`${page} / ${
          Math.ceil(total / numberPerPage) === 0
            ? 1
            : Math.ceil(total / numberPerPage)
        }`}</p>

        <button onClick={handlePrevPage} disabled={page <= 1}>
          Prev
        </button>

        <button
          onClick={handleNextPage}
          disabled={total < page * numberPerPage}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UsersPagination;
