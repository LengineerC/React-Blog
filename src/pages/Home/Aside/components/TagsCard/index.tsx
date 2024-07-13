import { useEffect, useState } from 'react'
import Card from '../../../../../components/Card'
import store from '../../../../../redux/store'
import Tag from '../../../../../components/Tag';

import "./index.scss"

export default function TagsCard() {
  const [tags,setTags]=useState<string[]>([]);

  const getTagsList=()=>{
    const {tagsList}=store.getState();
    setTags(Object.keys(tagsList));
  }

  useEffect(()=>{
    getTagsList();
    const unsubscribe=store.subscribe(()=>{
      getTagsList();
    })

    return ()=>{
      unsubscribe();
    }
  },[])

  const createTags=()=>{
    if(tags.length>0){
      return tags.map(tag=>{
        return(
          <div className='tag-container' key={tag}>
            <Tag tag={tag}/>
          </div>
        )
      })
    }
  }
  
  return (
    <Card
    className='aside-card' 
    scale={true}
    >
      <div className='tags-card-main'>
        {createTags()}
      </div>
    </Card>
  )
}