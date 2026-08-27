import { useMemo, useState } from 'react';
import PostCard from '../../../components/PostCard';
import { Pagination, ConfigProvider } from 'antd';
import { useAppSelector } from '../../../redux/hooks';
import { motion } from 'framer-motion';
import { CUSTOM_FONT_FAMILY } from '../../../utils/constants';

import './index.scss';

export default function HomePosts() {
  const postList = useAppSelector(state => state.post.postList);
  const [pagination, setPagination] = useState<number>(1);
  const pageSize = 10;
  const currentPage = useMemo(
    () => postList.slice((pagination - 1) * pageSize, pagination * pageSize),
    [pagination, postList],
  );

  const darkMode = useAppSelector(state => state.ui.darkMode);

  const createPostCards = () => {
    // console.log("postlist",postList);
    // console.log("currentPage",currentPage);

    return currentPage.map(item => {
      return (
        <motion.div
          style={{ width: '100%', marginBottom: '3vh' }}
          key={item.id}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <PostCard config={item} />
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
          fontFamily: CUSTOM_FONT_FAMILY,
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
          fontFamily: CUSTOM_FONT_FAMILY,
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
