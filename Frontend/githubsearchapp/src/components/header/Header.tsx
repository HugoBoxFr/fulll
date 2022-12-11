import React, {
  FC,
  ChangeEventHandler,
  FormEventHandler,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import "../../App.css";

export interface HeaderProps {
  loading: boolean;
  handleChangeQuery: ChangeEventHandler<HTMLInputElement>;
  handleSubmit: FormEventHandler<HTMLFormElement>;
  querySearch: string;
  editMode: boolean;
  setEditMode: Dispatch<SetStateAction<boolean>>;
}

const Header: FC<HeaderProps> = ({
  loading,
  handleChangeQuery,
  handleSubmit,
  querySearch,
  editMode,
  setEditMode,
}) => {
  const [hoverEdit, setHoverEdit] = useState<boolean>(false);

  return (
    <>
      <div className="header">
        <h1>GitHub Search</h1>
      </div>

      <div className="headerContent content">
        <div className="searchBar">
          <form onSubmit={handleSubmit}>
            <label htmlFor="searchInput" style={{ display: "none" }}>
              search
            </label>
            <input
              id="searchInput"
              type="text"
              name="search"
              value={querySearch}
              onChange={handleChangeQuery}
              placeholder="Who are you looking for ?"
            />
          </form>
          {loading && <div className="loader"></div>}
        </div>

        {querySearch && (
          <div className="editBtnContainer">
            <button
              onClick={() => setEditMode(!editMode)}
              className={editMode || hoverEdit ? "settingContentHover" : ""}
              onPointerOver={() => setHoverEdit(true)}
              onPointerOut={() => setHoverEdit(false)}
              id="editbtn"
            >
              <img
                src={require("../../assets/img/edit.png")}
                alt="copy"
                title="Edit"
              />
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
