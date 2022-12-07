import React, {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from "react";

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
  const [numberOfResults, setNumberOfResults] = useState<number>(0);

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

  useEffect(() => {
    const result =
      page * numberPerPage < total
        ? page * numberPerPage
        : total - (page - 1) * numberPerPage + (page - 1) * numberPerPage;
    setNumberOfResults(result);
  }, [page, numberPerPage, total]);

  return (
    <div className="usersPaginationContainer">
      <div className="usersPagination">
        <select
          name="choices"
          id="per_page_select"
          onChange={(e) => handleSelectPerPage(e)}
        >
          <option value="30">30</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>

        <button onClick={handlePrevPage} disabled={page <= 1}>
          Prev
        </button>

        <p>{`${numberOfResults} / ${total}`}</p>

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
