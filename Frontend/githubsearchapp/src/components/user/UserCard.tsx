import React, { ChangeEventHandler, FC, useState } from "react";
import { User } from "../../types/User";
import "../../App.css";
import { slicedTxt } from "../../utils/useSlicedText";

interface UserCardProps {
  user: User;
  handleCheckBox: ChangeEventHandler<HTMLInputElement>;
  checkedUsers: User[];
  editMode: boolean;
}

const UserCard: FC<UserCardProps> = ({
  user,
  handleCheckBox,
  checkedUsers,
  editMode,
}) => {
  const [hovered, setHovered] = useState<boolean>(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="userCard"
    >
      {editMode ? (
        <input
          type="checkbox"
          onChange={handleCheckBox}
          value={user.id}
          className="userCheckbox"
          checked={checkedUsers.includes(user)}
        />
      ) : null}
      <img src={user.avatar_url} alt={user.login} />

      <div className="userId">
        <p style={{ fontSize: 12 }}>{user.id}</p>
        <p>{hovered ? user.login : slicedTxt(user.login)}</p>
      </div>

      <a href={user.html_url} target="_blank" rel="noreferrer">
        <button>
          <p>View profile</p>
        </button>
      </a>
    </div>
  );
};

export default UserCard;
