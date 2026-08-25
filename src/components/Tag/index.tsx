import { useState } from 'react';
import { genRandomInt } from '@lengineerc/utils';

import './index.scss';
import { NavLink } from 'react-router-dom';

type Props = {
  tag: string;
  reload?: boolean;
};

export default function Tag({ tag, reload = false }: Props) {
  const [bgColor] = useState(() => genRandomInt(0, 2));

  const colorChooser = (color: number): string => {
    let style = 'tag-bg-color-';
    return style + color;
  };

  const reloadPage = () => {
    if (reload) {
      window.location.reload();
    }
  };

  return (
    <div className="tag-main">
      <NavLink onClick={reloadPage} to={`/tags/${tag}`} style={{ textDecoration: 'none' }}>
        <div className={colorChooser(bgColor)}>{tag}</div>
      </NavLink>
    </div>
  );
}
