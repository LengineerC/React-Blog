import { useAppSelector } from '@/redux/hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { NavLink, useNavigate } from 'react-router-dom';
import { ToolMenuConfigItem } from '@/utils/types';

import "./index.scss";

const toolMenuConfig: ToolMenuConfigItem[] = [
  {
    path: "unicode",
    key: "unicode",
    name: "Unicode转换器",
    info: "加密通话"
  },
  {
    path: "ipa-input",
    key: "ipa-input",
    name: "IPA输入",
    info: "国际音标输入法"
  },
];

const BASE_PATH = "/toolbox/";

export default function ToolMenu() {
  const darkMode = useAppSelector(state => state.darkMode);
  const navigate = useNavigate();

  const handleItemClick = (path: string) => {
    navigate(BASE_PATH + path);
  }

  const createMenuItems = () => toolMenuConfig.map(item => (
    <div
      key={item.key}
      className={`toolbox-item ${darkMode && "dark"}`}
      onClick={() => handleItemClick(item.path)}
    >
      <div className={` item-title ${darkMode && "dark"}`}>
        {item.name}
      </div>

      <div
        className={`item-center-line  ${darkMode && "dark"}`}
      />

      <div className="item-info-container">
        <div className={`item-info ${darkMode && "dark"}`}>
          {item.info}
        </div>

        <FontAwesomeIcon
          icon={faChevronRight}
          color={darkMode ? "#ffffffcc" : "#001447"}
        />
      </div>
    </div>
  ));

  return (
    <div className='toolbox-main'>
      {createMenuItems()}
    </div>
  );
}
