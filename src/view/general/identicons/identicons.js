import React from 'react';
import identicons from 'identicons';

/**
 * Identicons()  : Function for creating Identicons.
 */

export default function Identicons(props) {
  // eslint-disable-next-line react/prop-types
  const { width, size, id } = props;
  const newWidth = width;
  const newsize = size;
  const side = newWidth / (newsize * 2 - 1);
  let color;
  const rects = [];
  identicons.generate(id, props, {
    start(value) {
      color = `#${Math.abs(value)
        .toString(16)
        .substring(0, 6)}`;
    },
    rect(x, y) {
      const rect = React.createElement('rect', {
        key: String(rects.length),
        x: String(Math.floor(x * side)),
        y: String(Math.floor(y * side)),
        width: String(Math.ceil(side)),
        height: String(Math.ceil(side)),
        style: { fill: color },
      });
      rects.push(rect);
    },
    end() {},
  });
  return React.createElement('svg', null, rects);
}
