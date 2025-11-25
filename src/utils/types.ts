import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

//post文件配置
export type PostConfig = {
  id: string;
  title: string;
  author: string;
  time: string;
  lock: boolean;
  password: string;
  path: string;
  top?: boolean;
  category: string;
  tags: string[];
};

export type Categories = Record<string, PostConfig[]>;

export type Tags = Record<string, PostConfig[]>;

// Nav菜单配置(要展开子菜单path不能以/开头)
export type MenuConfig = {
  name: string;
  path: string;
  key: string;
  clickable: boolean;
  icon: IconDefinition;
  options: {
    subMenuEnable: boolean;
    subItems?: SubItem[];
  };
};
type SubItem = Pick<MenuConfig, 'name' | 'path' | 'icon'>;

export type MobileMenuConfig = {
  name: string;
  path: string;
  key: string;
  icon: IconDefinition;
  subItems?: SubItem[];
};

export type ToolMenuConfigItem = {
  name: string;
  path: string;
  key: string;
  info: string;
};

// 友链json格式
export type FriendUrl = {
  url: string;
  avatar: string;
  title: string;
  description: string;
};
