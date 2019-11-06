import React from 'react';
import Home from '.';
import { shallow } from 'enzyme';
import styles from './styles.module.scss';

describe('Home', () => {
  const wrapper = shallow(<Home />);

  it('mounts', () => {
    expect(wrapper.find(`.${styles.banner}`).length).toBe(1);
  })
});