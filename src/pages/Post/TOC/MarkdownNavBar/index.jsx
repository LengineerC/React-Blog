import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { throttle } from '@lengineerc/utils';

/**
 * 使用构建阶段生成的目录数据，避免在浏览器中重复解析 Markdown。
 */
export function MarkdownNavbar({
  items,
  ordered,
  headingTopOffset,
  smoothScroll,
  className,
  onNavItemClick,
  onHashChange,
}) {
  const [currentId, setCurrentId] = useState('');
  const headingElementsRef = useRef([]);

  useEffect(() => {
    headingElementsRef.current = items
      .map(item => ({
        item,
        element: document.getElementById(item.id),
      }))
      .filter(entry => entry.element);

    setCurrentId(items[0]?.id ?? '');

    const updateActiveHeading = throttle(() => {
      const headings = headingElementsRef.current;
      if (headings.length === 0) return;

      const currentPosition = window.scrollY + headingTopOffset + 1;
      let activeHeading = headings[0];

      for (const heading of headings) {
        const headingTop = heading.element.getBoundingClientRect().top + window.scrollY;
        if (headingTop > currentPosition) break;
        activeHeading = heading;
      }

      setCurrentId(previousId =>
        previousId === activeHeading.item.id ? previousId : activeHeading.item.id,
      );
    }, 100);

    updateActiveHeading();
    window.addEventListener('scroll', updateActiveHeading, { passive: true });
    window.addEventListener('resize', updateActiveHeading);

    return () => {
      window.removeEventListener('scroll', updateActiveHeading);
      window.removeEventListener('resize', updateActiveHeading);
      headingElementsRef.current = [];
    };
  }, [headingTopOffset, items]);

  const scrollToTarget = id => {
    const target = document.getElementById(id);
    if (!target) return;

    const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    const top = target.getBoundingClientRect().top + window.scrollY - headingTopOffset;

    window.scrollTo({
      top,
      left: 0,
      behavior: smoothScroll && !prefersReducedMotion ? 'smooth' : 'auto',
    });
  };

  return (
    <div className={`markdown-navigation ${className}`}>
      {items.map(item => {
        const cls = `title-anchor title-level${item.level} ${
          currentId === item.id ? 'active' : ''
        }`;

        return (
          <div
            className={cls}
            onClick={event => {
              if (item.id !== currentId) {
                onHashChange(item.id, currentId);
              }
              onNavItemClick(event, event.currentTarget, item.id);
              scrollToTarget(item.id);
              setCurrentId(item.id);
            }}
            key={item.id}
          >
            {ordered ? <small>{item.listNo}</small> : null}
            {item.text}
          </div>
        );
      })}
    </div>
  );
}

MarkdownNavbar.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      level: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
      listNo: PropTypes.string.isRequired,
    }),
  ).isRequired,
  ordered: PropTypes.bool,
  headingTopOffset: PropTypes.number,
  smoothScroll: PropTypes.bool,
  className: PropTypes.string,
  onNavItemClick: PropTypes.func,
  onHashChange: PropTypes.func,
};

MarkdownNavbar.defaultProps = {
  items: [],
  ordered: true,
  headingTopOffset: 0,
  smoothScroll: true,
  className: '',
  onNavItemClick: () => {},
  onHashChange: () => {},
};

export default MarkdownNavbar;
