import React, { FC, useState } from "react";
import { User } from "../../types/User";
import "../../App.css";
import { slicedTxt } from "../../utils/useSlicedText";

interface UserCardProps {
  user: User;
}

const UserCard: FC<UserCardProps> = ({ user }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="userCard"
    >
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
