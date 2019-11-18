import React, { FC } from "react";

interface IProps {
  icon: string;
  spin?: boolean;
}

const FaIcon: FC<IProps> = ({ icon, spin }) => (
  <i className={`fas ${icon} ${spin ? "fa-spin" : ""}`} />
);

export { FaIcon };
