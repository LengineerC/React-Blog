import { DEFAULT_SHOW_TOC } from '@/utils/constants';
import React, { createContext, JSX, useContext, useState } from 'react';

type PostContextType = {
  showTOC: boolean;
  setShowTOC: React.Dispatch<React.SetStateAction<boolean>>;
  showTOCDrawer: boolean;
  setShowTOCDrawer: React.Dispatch<React.SetStateAction<boolean>>;
  inPost: boolean;
  setInPost: React.Dispatch<React.SetStateAction<boolean>>;
};
const PostContext = createContext<null | PostContextType>(null);

type Props = {
  children: JSX.Element,
}

export function PostProvider({ children }: Props) {
  const [showTOC, setShowTOC] = useState<boolean>(DEFAULT_SHOW_TOC);
  const [showTOCDrawer, setShowTOCDrawer] = useState<boolean>(false);
  const [inPost, setInPost] = useState<boolean>(false);
  

  return (
    <PostContext.Provider
      value={{
        showTOC,
        setShowTOC,
        showTOCDrawer,
        setShowTOCDrawer,
        inPost,
        setInPost
      }}
    >
      {children}
    </PostContext.Provider>
  );
}

export const usePostContext = () => {
  const ctx = useContext(PostContext);
  if (!ctx) {
    throw new Error('usePostContext must be used within PostProvider');
  }
  return ctx;
};
