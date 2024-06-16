import Card from "../../../components/Card";
import ClockCard from "./components/ClockCard";
import NoticeCard from "./components/NoticeCard";
import TopPostCard from "./components/TopPostCard";

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
        <div className="aside-item-container"> 
            <ClockCard />
        </div>
      </div>
    </aside>
  )
}