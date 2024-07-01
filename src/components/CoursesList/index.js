import {Link} from 'react-router-dom'

import './index.css'

const CoursesList = props => {
  const {courseListItem} = props
  const {id, name, logoUrl} = courseListItem

  return (
    <Link to={`/courses/${id}`} className="Link">
      <li className="course-list-container">
        <img src={logoUrl} alt={name} className="logo" />
        <p className="language-name">{name}</p>
      </li>
    </Link>
  )
}

export default CoursesList
