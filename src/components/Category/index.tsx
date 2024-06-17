import { NavLink } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBookmark } from "@fortawesome/free-solid-svg-icons"

import "./index.scss"

type Props = {
    category:string,
}

export default function Category({category}: Props) {
  return (
    <div className='category-main'>
      <NavLink to={`/categories/${category}`} style={{ textDecoration: "none" }}>
        <div className='category-container'>
          <FontAwesomeIcon icon={faBookmark}/>
          <span style={{marginLeft:"5px"}}>{category}</span>
        </div>
      </NavLink>
    </div>
  )
}