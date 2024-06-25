import ClockCard from "./components/ClockCard";
import NoticeCard from "./components/NoticeCard";
import PostsInfoCard from "./components/PostsInfoCard";
import TagsCard from "./components/TagsCard";
import TopPostCard from "./components/TopPostCard";
import { SHOW_CLOCK_CARD } from "../../../utils/constants";

import './index.scss';

export default function Aside() {
  return (
    <aside>
      <div className="aside-item-container">
        <NoticeCard />
      </div>

      <div className="aside-item-container">
        <TopPostCard />
      </div>

      <div className="sticky-block">
        {
          SHOW_CLOCK_CARD && 
          <div className="aside-item-container"> 
              <ClockCard />
          </div>
        }

        <div className="aside-item-container"> 
          <PostsInfoCard />
        </div>

        <div className="aside-item-container"> 
          <TagsCard />
        </div>

      </div>
    </aside>
  )
}