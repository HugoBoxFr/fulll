import React, {
  ChangeEvent,
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { User } from "../../types/User";
import UserCard from "./UserCard";

export interface UserListProps {
  users: User[];
  setUsers: Dispatch<SetStateAction<User[] | null>>;
  checkedUsers: User[];
  setCheckUsers: Dispatch<SetStateAction<User[]>>;
  editMode: boolean;
}

const UserList: FC<UserListProps> = ({
  users,
  setUsers,
  checkedUsers,
  setCheckUsers,
  editMode,
}) => {
  const [hoverDuplicate, setHoverDuplicate] = useState<boolean>(false);
  const [hoverErase, setHoverErase] = useState<boolean>(false);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const handleCheckBox = (e: ChangeEvent<HTMLInputElement>) => {
    const currentUser = checkedUsers.find(
      (elt: User) => elt.id === parseInt(e.target.value)
    );

    if (currentUser) {
      const newUsers = checkedUsers.filter(
        (elt) => elt.id !== parseInt(e.target.value)
      );
      setCheckUsers(newUsers);
    } else {
      const newUser = users.find(
        (elt: User) => elt.id === parseInt(e.target.value)
      );
      if (newUser) setCheckUsers([...checkedUsers, newUser]);
    }
  };

  const handleDuplicate = () => {
    const randomNumber = Math.floor(Math.random() * 100);
    const usersToAdd = checkedUsers.map(
      (elt) => (elt = { ...elt, id: parseInt(`${elt.id}${randomNumber}`, 10) })
    );
    const newUsers = [...users, ...usersToAdd];
    setUsers(newUsers);
  };

  const handleErase = () => {
    const filteredUsers = users.filter((elt) => !checkedUsers.includes(elt));
    setUsers(filteredUsers);
    setCheckUsers([]);
  };

  const handleAllSelected = () => {
    if (checkedUsers.length === users.length) {
      setCheckUsers([]);
    } else {
      setCheckUsers(users);
    }
  };

  useEffect(() => {
    if (tooltipRef && editMode) {
      const elt = tooltipRef.current;
      if (elt) {
        setTimeout(() => {
          elt.className = "fadeOut tooltip";
        }, 2000);
      }
    }
  }, [tooltipRef, editMode]);

  return (
    <>
      <div className="settingContainer">
        <div
          className="settingContent content"
          style={editMode ? { height: "40px" } : { height: "0" }}
        >
          {editMode && (
            <>
              <div className="flexCenter relative">
                <div className="tooltip" ref={tooltipRef}>
                  <span />
                  Select all
                </div>
                <input
                  type="checkbox"
                  checked={users.length === checkedUsers.length}
                  onChange={handleAllSelected}
                />
                <p>{`${checkedUsers.length} element${
                  checkedUsers.length > 1 ? "s" : ""
                } selected`}</p>
              </div>

              <div className="flexCenter">
                <button
                  onClick={handleDuplicate}
                  disabled={!checkedUsers.length}
                  style={{
                    cursor: checkedUsers.length ? "pointer" : "default",
                  }}
                  className={
                    checkedUsers.length && hoverDuplicate
                      ? "settingContentHover"
                      : ""
                  }
                  onPointerOver={() => setHoverDuplicate(true)}
                  onPointerOut={() => setHoverDuplicate(false)}
                >
                  <img
                    src={require("../../assets/img/copy.png")}
                    alt="copy"
                    title="Duplicate"
                  />
                </button>

                <button
                  onClick={handleErase}
                  disabled={!checkedUsers.length}
                  style={{
                    cursor: checkedUsers.length ? "pointer" : "default",
                  }}
                  className={
                    checkedUsers.length && hoverErase
                      ? "settingContentHover"
                      : ""
                  }
                  onPointerOver={() => setHoverErase(true)}
                  onPointerOut={() => setHoverErase(false)}
                >
                  <img
                    src={require("../../assets/img/trash-bin.png")}
                    alt="copy"
                    title="Erase"
                  />
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      <div
        className="userListContainer"
        style={
          editMode
            ? { height: "calc(100vh - 244px)" }
            : { height: "calc(100vh - 204px)" }
        }
      >
        <div className="userList content">
          {users.map((user: User) => (
            <UserCard
              key={user.id}
              user={user}
              handleCheckBox={handleCheckBox}
              checkedUsers={checkedUsers}
              editMode={editMode}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default UserList;
