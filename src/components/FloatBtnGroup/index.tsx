import { ConfigProvider, FloatButton } from 'antd';
import { UnorderedListOutlined } from '@ant-design/icons';
import { usePostContext } from '@/context/PostContext';
import { useAppSelector } from '@/redux/hooks';
import Top from '../Top';

import './index.scss';

export default function FloatBtnGroup() {
  const { inPost, setShowTOC, setShowTOCDrawer } = usePostContext();
  const darkMode: boolean = useAppSelector(state => state.ui.darkMode);
  const handleShowTOC = () => {
    setShowTOC(v => !v);
    setShowTOCDrawer(v => !v);
  }

  const getTocBtnToken = () => {
    let colorBgElevated = darkMode ? '#46466c7b' : '#ffffff7b';
    let colorFillContent = darkMode ? '#686894bb' : '#ffffffbb';
    let colorText = '#ffffff99';
    let token: any = {
      colorBgElevated,
      colorFillContent,
    };
    if (darkMode) {
      if (!token.hasOwnProperty('colorText')) {
        token['colorText'] = colorText;
      }
    }
    return token;
  };

  return (
    <FloatButton.Group style={{ boxShadow: 'none' }} shape='square'>
      {inPost && <ConfigProvider
        theme={{
          token: getTocBtnToken(),
        }}
      >
        <FloatButton
          className="float-btn"
          icon={<UnorderedListOutlined />}
          onClick={handleShowTOC}
        />
      </ConfigProvider>}
      <Top className='float-btn' darkMode={darkMode} />
    </FloatButton.Group>
  )
}
