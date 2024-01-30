import React from "react";
import "./header.css";

interface Props {
  headName: string;
}

const Header: React.FC<Props> = ({ headName }: Props) => {
  return (
    <header className="header">
      <p>{headName}</p>
    </header>
  );
};

export default Header;
