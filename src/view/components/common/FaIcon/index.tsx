import React, { FC } from 'react';

interface IProps {
  icon: string;
}

const FaIcon: FC<IProps> = ({ icon }) => <i className={`fas ${icon}`} />;

export { FaIcon };
