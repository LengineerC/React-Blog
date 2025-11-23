import { ConfigProvider, Drawer } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { MenuFoldOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHouse,
  faBook,
  faFileZipper,
  faLink,
  faAddressCard,
  faMusic,
  faAngleDown,
  faAngleUp,
  faToolbox,
  faWindowRestore,
} from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../../redux/hooks';

import './index.scss';
import { MobileMenuConfig } from '@/utils/types';

type Props = {
  open: boolean;
  handleMenuClose: Function;
};

const custom_menu_fold_outlined = {
  fontSize: '25px',
  color: '#fff',
};

const menuConig: MobileMenuConfig[] = [
  {
    path: '/posts',
    key: 'posts',
    name: '文章',
    icon: faBook,
  },
  {
    path: '/archives',
    key: 'archives',
    name: '归档',
    icon: faFileZipper,
  },
  {
    name: '应用',
    path: 'application',
    key: 'application',
    icon: faWindowRestore,
    subItems: [
      {
        path: '/media',
        name: '媒体',
        icon: faMusic,
      },
      {
        path: '/toolbox',
        name: '工具箱',
        icon: faToolbox,
      },
    ],
  },
  {
    path: '/friends',
    key: 'friends',
    name: '友链',
    icon: faLink,
  },
  {
    path: '/about',
    key: 'about',
    name: '关于',
    icon: faAddressCard,
  },
];

export default function MobileMenu({ open, handleMenuClose }: Props) {
  const [_open, setOpen] = useState<boolean>(open);
  const [expandedKeys, setExpandedKeys] = useState<Set<string>>(new Set());
  // const [isDarkMode,setIsDarkMode]=useState<boolean>(store.getState().darkMode);
  const darkMode = useAppSelector(state => state.ui.darkMode);
  const colorBgElevatedRef = useRef<string>('#ffffffdd');

  const changeColorBgElevatedRef = () => {
    colorBgElevatedRef.current = darkMode ? '#30307a99' : '#ffffffdd';
  };

  useEffect(() => {
    changeColorBgElevatedRef();
  }, [darkMode]);

  useEffect(() => {
    setOpen(open);
  }, [open]);

  const onClose = () => {
    setOpen(false);
    handleMenuClose();
  };

  const handleFoldContainerClick = (e: any, key: string) => {
    e.stopPropagation();

    setExpandedKeys(prevKeys => {
      const newKeys = new Set(prevKeys);
      if (newKeys.has(key)) {
        newKeys.delete(key);
      } else {
        newKeys.add(key);
      }
      return newKeys;
    });
  };

  const createMenuItems = () => {
    return menuConig.map(menuItem => {
      const { path, name, key, icon, subItems } = menuItem;
      const isExpanded = expandedKeys.has(key);

      return !subItems ? (
        <NavLink key={key} to={path}>
          <div
            className={
              darkMode ? 'menu-body-content-container-dark' : 'menu-body-content-container'
            }
          >
            <span className="icon-block">
              <FontAwesomeIcon style={darkMode ? { color: '#ffffffdd' } : {}} icon={icon} />
            </span>

            <span className={`menu-item-label ${darkMode && 'dark'}`}>{name}</span>

            <span className="menu-body-content-container-extend">&nbsp;</span>
          </div>
        </NavLink>
      ) : (
        <div
          key={key}
          className="foldable-content-container"
          onClick={e => handleFoldContainerClick(e, key)}
        >
          <>
            <div
              className={
                darkMode ? 'menu-body-content-container-dark' : 'menu-body-content-container'
              }
            >
              <span className="icon-block">
                <FontAwesomeIcon style={darkMode ? { color: '#ffffffdd' } : {}} icon={icon} />
              </span>
              <span className={`menu-item-label ${darkMode && 'dark'}`}>{name}</span>
              <span className="menu-body-content-container-extend">
                {isExpanded ? (
                  <FontAwesomeIcon icon={faAngleUp} />
                ) : (
                  <FontAwesomeIcon icon={faAngleDown} />
                )}
              </span>
            </div>
          </>

          <div
            className={`submenu-container ${darkMode && 'dark'}`}
            style={{
              height: isExpanded ? `${subItems.length * 60}px` : 0,
            }}
          >
            {subItems.map((subItem, index) => (
              <NavLink to={subItem.path} key={index}>
                <div className="submenu-item-container" onClick={onClose}>
                  <span className="icon-block">
                    <FontAwesomeIcon
                      style={darkMode ? { color: '#ffffffdd' } : {}}
                      icon={subItem.icon}
                    />
                  </span>
                  <span className={`submenu-item-label ${darkMode && 'dark'}`}>{subItem.name}</span>

                  <span>&nbsp;</span>
                </div>
              </NavLink>
            ))}
          </div>
        </div>
      );
    });
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          padding: 0,
          paddingLG: 0,
          paddingXS: 0,
          colorBgElevated: colorBgElevatedRef.current,
        },
      }}
    >
      <Drawer
        className="custom-drawer"
        open={_open}
        placement="left"
        width={250}
        // destroyOnClose
        onClose={onClose}
        // closeIcon={<MenuFoldOutlined style={custom_menu_fold_outlined}/>}
        closeIcon={null}
      >
        <div className={darkMode ? 'menu-header-dark' : 'menu-header'}>
          <div className="menu-header-btn-line">
            <NavLink to="/">
              <div className="menu-header-btn-block" onClick={onClose}>
                <FontAwesomeIcon style={custom_menu_fold_outlined} icon={faHouse} />
              </div>
            </NavLink>

            <div className="menu-header-btn-block" onClick={onClose}>
              <MenuFoldOutlined style={custom_menu_fold_outlined} />
            </div>
          </div>

          <div className="menu-header-title">q(≧▽≦q)</div>

          <div className="menu-header-subtitle">Welcome to my blog!</div>
        </div>

        <div className={darkMode ? 'menu-body-dark' : 'menu-body'}>
          <div onClick={onClose}>{createMenuItems()}</div>
        </div>
      </Drawer>
    </ConfigProvider>
  );
}
