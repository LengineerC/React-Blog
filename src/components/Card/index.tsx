import './index.scss';

type Props = {
  scale?: boolean;
  className?: 'aside-card' | 'card';
  children?: React.ReactNode;
  bgImage?: string;
  opacity?: number;
  background?: string;
  darkMode: boolean;
};

export default function Card({
  scale = false,
  children,
  className = 'card',
  bgImage,
  opacity = 1,
  background,
  darkMode,
}: Props) {
  return (
    <div
      className={`${scale ? 'card-main-scale' : 'card-main'} ${className} ${darkMode ? 'card-main-dark' : ''}`}
      style={{
        backgroundImage: `url(${bgImage})`,
        opacity: `${opacity}`,
        background: `${background}`,
      }}
    >
      {children}
    </div>
  );
}
