import React, { FC, ReactSVGElement } from 'react';
import identicons from 'identicons';

interface IProps {
  width: number;
  size: number;
  id: string;
}

const Identicons: FC<IProps> = (props) => {
  const { width, size, id } = props;
  const newWidth = width;
  const newsize = size;
  const side = newWidth / (newsize * 2 - 1);
  let color;
  const rects: ReactSVGElement[] = [];
  
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
        style: { fill: color, saturation: 0, brightness: 0 },
      });
      rects.push(rect);
    },
    end() {},
  });

  return (
    <svg width={width} height={width + 10}>
      <g>{rects}</g>
    </svg>
  );
}

export default Identicons;
