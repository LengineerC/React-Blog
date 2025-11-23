import { useEffect } from 'react';
import Card from '../../../../../components/Card';
import Tag from '../../../../../components/Tag';

import './index.scss';
import { useAppSelector } from '../../../../../redux/hooks';

export default function TagsCard() {
  const tagsList = useAppSelector(state => state.taxonomy.tagsList);
  const darkMode = useAppSelector(state => state.ui.darkMode);

  const tags = Object.keys(tagsList);

  const createTags = () => {
    if (tags.length > 0) {
      return tags.map(tag => {
        return (
          <div className="tag-container" key={tag}>
            <Tag tag={tag} />
          </div>
        );
      });
    }
  };

  return (
    <Card className="aside-card" scale={true} darkMode={darkMode}>
      <div className="tags-card-main">{createTags()}</div>
    </Card>
  );
}
