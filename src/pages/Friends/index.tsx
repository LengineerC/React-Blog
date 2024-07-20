import {useState, useEffect} from 'react'
import PageTitle from '../../components/PageTitle'
import Card from '../../components/Card'
import axios from 'axios'
import { FriendUrl } from '../../utils/types'
import store from '../../redux/store'
import { saveFriendsUrlData } from '../../redux/actions'

import './index.scss'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'

const bgColors=[
  'linear-gradient(to right,#ffb7b7aa 0%,#ff4c4caa 50%,#ffb7b7aa 100%)',
  'linear-gradient(to right,#bbdcf5aa 0%,#9accf9aa 50%,#bbdcf5aa 100%)',
  'linear-gradient(to right,#f7ff89aa 0%,#f6ff47aa 50%,#f7ff89aa 100%)',
  'linear-gradient(to right,#8aff73aa 0%,#49ff38aa 50%,#8aff73aa 100%)',
  'linear-gradient(to right,#71fffaaa 0%,#38e4ffaa 50%,#71fffaaa 100%)',
  'linear-gradient(to right,#c57affaa 0%,#b436e1aa 50%,#c57affaa 100%)',
]
const darkBgColor:string="linear-gradient(to right,#ffffff55 0%,#c0c0c055 50%,#ffffff55 100%)";

export default function Friends() {
  // const [friendsUrlData,setFriendsUrlData]=useState<FriendUrl[]>([]);
  const friendsUrlData=useAppSelector(state=>state.friendsUrlData);
  // const [isDarkMode,setIsDarkMode]=useState<boolean>(store.getState().darkMode);
  const darkMode=useAppSelector(state=>state.darkMode);
  const dispatch=useAppDispatch();

  useEffect(()=>{
    // const {friendsUrlData}=store.getState();
    
    // const unsubscribe=store.subscribe(()=>{
    //   const {darkMode}=store.getState();
    //   setIsDarkMode(darkMode);
    // });

    if(friendsUrlData.length===0){
      axios.get('/json/friends.json')
      .then((response=>{
        const {data}=response;
        // setFriendsUrlData(data);
        dispatch(saveFriendsUrlData(data));
      }))
      .catch((err)=>{
        console.log("获取友链数据失败",err);
      });
    }
    // else{
    //   setFriendsUrlData(friendsUrlData);
    // }

    // return ()=>{
    //   unsubscribe();
    // }

  },[])

  const createFriendsUrlCards=()=>{
    if(friendsUrlData.length>0){
      return friendsUrlData.map((item,index)=>{
        return(
          <div key={index} className='card-container'>
            <a href={item.url}>
              <Card
              scale={true}
              className='aside-card'
              darkMode={darkMode}
              background={darkMode?darkBgColor:bgColors[1]}
              >
                <div className='friends-card'>
                  <div className={darkMode?'friends-card-img-dark':'friends-card-img'}>
                    <img src={item.avatar}/>
                  </div>

                  <div className='friends-card-content'>
                    <div className={darkMode?'friends-card-content-title-dark':'friends-card-content-title'}>
                      {item.title}
                    </div>

                    <div className={darkMode?'friends-card-content-description-dark':'friends-card-content-description'}>
                      {item.description}
                    </div>
                  </div>
                </div>
              </Card>
            </a>
          </div>
        )
      })
    }
  }

  return (
    <div className='page-main'>
      <div className='page-main-title'>
        <PageTitle title='Friends'/>
      </div>

      <div className='page-main-content'>
        <Card darkMode={darkMode}>
          <div className='friends-main'>
            {createFriendsUrlCards()}
          </div>
        </Card>
      </div>
    </div>
  )
}