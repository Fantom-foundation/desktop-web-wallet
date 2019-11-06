import React from 'react';
import { shallow } from 'enzyme';
import { DialogPrompt} from '.';

describe('DialogPrompt', () => {
  const onClose = jest.fn();
  const wrapper = shallow(<DialogPrompt title="TITLE" body="BODY" onClose={onClose} isOpened />);

  it('mounts', () => {
    expect(wrapper.findWhere(el => el.text() === 'TITLE').length).toBeGreaterThanOrEqual(1);
    expect(wrapper.findWhere(el => el.text() === 'BODY').length).toBeGreaterThanOrEqual(1);
  });
});
