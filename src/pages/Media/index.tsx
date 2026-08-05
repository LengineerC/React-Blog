import Card from '../../components/Card';
import PageTitle from '../../components/PageTitle';
import APlayer from '../../components/APlayer';
import { BILIBILI_VIDEO_URL } from '../../utils/constants';
import { useAppSelector } from '../../redux/hooks';

import './index.scss';

export default function Media() {
  const darkMode = useAppSelector(state => state.ui.darkMode);

  return (
    <div className="page-main">
      <div className="page-main-title">
        <PageTitle title="Media" />
      </div>
      <div className="page-main-content">
        <Card darkMode={darkMode}>
          <div className="media-card-main">
            <div className={darkMode ? 'media-title-dark' : 'media-title'}>🎶穢れなき音楽室</div>
            <div className={darkMode ? 'media-card-main-player-dark' : 'media-card-main-player'}>
              <APlayer fixed={false} theme="#67abff" />
            </div>

            <div className={darkMode ? 'media-title-dark' : 'media-title'}>📺远古视频</div>
            <div className="media-card-main-video">
              <iframe
                title="Bilibili video player"
                src={BILIBILI_VIDEO_URL}
                scrolling="no"
                frameBorder="no"
                allowFullScreen={true}
              ></iframe>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
