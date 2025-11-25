import { useState, useEffect } from 'react';
import { PostConfig } from '../../../utils/types';
import { saveSelectedPostConfig } from '../../../redux/slices/postSlice';
import PostCard from '../../../components/PostCard';
import { Pagination, ConfigProvider } from 'antd';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { motion } from 'framer-motion';

import './index.scss';

type Props = {};

export default function HomePosts({ }: Props) {
  const postList = useAppSelector(state => state.post.postList);
  const [pagination, setPagination] = useState<number>(1);
  const [pageSize] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<PostConfig[]>([]);

  const darkMode = useAppSelector(state => state.ui.darkMode);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (postList.length !== 0) {
      let slicedPage = [...postList];
      slicedPage = slicedPage.slice((pagination - 1) * pageSize, pagination * pageSize);
      // console.log(slicedPage);

      setCurrentPage(slicedPage);
    }
  }, [pagination, postList]);

  const setSelectedPost = (selectedPost: PostConfig) => {
    dispatch(saveSelectedPostConfig(selectedPost));
  };

  const createPostCards = () => {
    // console.log("postlist",postList);
    // console.log("currentPage",currentPage);

    return currentPage.map(item => {
      return (
        <motion.div
          style={{ width: '100%', marginBottom: '3vh' }}
          onClick={() => setSelectedPost(item)}
          key={item.id}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <PostCard config={item} key={item.id} limit={250} showLimitContent={true} />
        </motion.div>
      );
    });
  };

  const onChange = (page: number) => {
    // console.log(`page: ${page}`);
    // console.log(`pageSize: ${pageSize}`);
    setPagination(page);
  };

  const getPaginationTheme = () => {
    if (!darkMode)
      return {
        token: {
          fontFamily: 'CustomFont1',
          colorPrimary: '#67abff',
          colorText: '#001447',
        },
        components: {
          Pagination: {
            itemActiveBg: '#ffffff11',
            itemBg: '#ffffff00',
          },
        },
      };
    else
      return {
        token: {
          fontFamily: 'CustomFont1',
          colorPrimary: '#00e80f',
          colorText: '#ffffffdd',
        },
        components: {
          Pagination: {
            itemActiveBg: '#ffffff11',
            itemBg: '#ffffff00',
          },
        },
      };
  };

  return (
    <>
      {createPostCards()}
      <ConfigProvider theme={getPaginationTheme()}>
        <div className={darkMode ? 'page-options-line-dark' : 'page-options-line'}>
          <Pagination
            total={postList.length}
            showTotal={total => `共 ${total} 篇文章`}
            defaultCurrent={pagination}
            defaultPageSize={pageSize}
            onChange={page => onChange(page)}
            showSizeChanger={false}
          />
        </div>
      </ConfigProvider>
    </>
  );
}
