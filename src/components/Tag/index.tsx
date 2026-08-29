import './index.scss';
import { NavLink } from 'react-router-dom';

type Props = {
  tag: string;
};

function getTagColor(tag: string) {
  const hash = Array.from(tag).reduce(
    (value, character) => (value * 31 + (character.codePointAt(0) ?? 0)) >>> 0,
    0,
  );

  return `tag-bg-color-${hash % 3}`;
}

export default function Tag({ tag }: Props) {
  return (
    <div className="tag-main">
      <NavLink className="tag-link" to={`/tags/${tag}`}>
        <div className={getTagColor(tag)}>{tag}</div>
      </NavLink>
    </div>
  );
}
