import axios from 'axios'
import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import Card from '../Card'
import { PostConfig } from '../../utils/types'
import MDRender from '../MDRender'
import { Skeleton } from 'antd'
import Tag from '../Tag'

import './index.scss'
import Category from '../Category'

type Props = {
  config: PostConfig,
  limit: number,
  showLimitContent: boolean,
  showFooter?: boolean,
}

export default function PostCard({ config, limit, showLimitContent, showFooter = true }: Props) {
  const [postConfig] = useState<PostConfig>(config);
  const [postTitle, setPostTitle] = useState<string>("");
  const [markdown, SetMarkdown] = useState<string>("");
  const [tags, setTags] = useState([]);
  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // console.log(postConfig);
    const { title, path, lock } = postConfig;
    axios.get(path)
      .then(response => {
        // console.log(response);
        setPostTitle(title)
        SetMarkdown(response.data);
        setLoading(false);
      })
      .catch(err => {
        console.log(`PostCard:文章获取失败: ${path}`, err);

      })

    if (postConfig && postConfig.tags) {
      setTags([...postConfig.tags]);
    }

    if (postConfig && postConfig.categories) {
      setCategories([...postConfig.categories]);
    }

  }, [postConfig])


  const createTags = () => {
    if (tags) {
      return tags.map((item, index) => {
        return (
          <div key={index} className='post-card-tag-container'>
            <Tag tag={item} />
          </div>
        )
      })
    }
  }

  const createCategories = () => {
    if (categories) {
      return categories.map((item, index) => {
        return (
          <div key={index} className='post-card-category-container'>
            <Category category={item} />
          </div>
        )
      })
    }
  }

  return (
    <div className='hv-center'>
      <Card
        scale={true}
      >
        {
          loading ? <Skeleton active /> :
            <div className='post-card-main'>
              <NavLink to={`/post/detail/${postConfig.id}`} style={{ textDecoration: "none" }}>

                <div className='post-card-title'>
                  {postTitle}
                </div>

                <hr className='hr-dashed'/>

                <div className='post-card-content'>
                  <MDRender limit={limit} markdown={markdown} showLimitContent={showLimitContent} />
                </div>

                <hr  className='hr-double'/>
              </NavLink>
              {
                showFooter && (
                  <div className='post-card-footer'>
                    <div className='post-card-tags-block'>
                      {createTags()}
                    </div>

                    <div className='post-card-categories-block'>
                      {createCategories()}
                    </div>
                  </div>
                )
              }

            </div>
        }
      </Card>
    </div>
  )
}