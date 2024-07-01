import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'

import './index.css'

const apiResponseStatusConstant = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class CourseItemDetails extends Component {
  state = {
    courseDetails: [],
    apiStatus: apiResponseStatusConstant.initial,
  }

  componentDidMount() {
    this.getCourseDetails()
  }

  getCourseDetails = async () => {
    this.setState({apiStatus: apiResponseStatusConstant.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params

    const courseDetailsApiUrl = `https://apis.ccbp.in/te/courses/${id}`
    const options = {
      method: 'GET',
    }

    const response = await fetch(courseDetailsApiUrl, options)

    if (response.ok === true) {
      const courseDetailsData = await response.json()

      const updateData = {
        id: courseDetailsData.course_details.id,
        name: courseDetailsData.course_details.name,
        imageUrl: courseDetailsData.course_details.image_url,
        description: courseDetailsData.course_details.description,
      }

      this.setState({
        courseDetails: updateData,
        apiStatus: apiResponseStatusConstant.success,
      })
    } else {
      this.setState({apiStatus: apiResponseStatusConstant.failure})
    }
  }

  successView = () => {
    const {courseDetails} = this.state
    return (
      <div className="course-item-details-container">
        <div className="course-item-details">
          <img
            src={courseDetails.imageUrl}
            alt={courseDetails.name}
            className="course-icon"
          />
          <div className="course-details">
            <h1 className="course-name">{courseDetails.name}</h1>
            <p className="course-description">{courseDetails.description}</p>
          </div>
        </div>
      </div>
    )
  }

  onClickRetryButton = () => {
    this.getCourseDetails()
  }

  failureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
        className="failure-view-image"
      />
      <h1 className="error-msg">Oops! Something Went Wrong</h1>
      <p className="error-desc">
        We cannot seem to find the page you are looking for
      </p>
      <button
        className="retry-button"
        type="button"
        onClick={this.onClickRetryButton}
      >
        Retry
      </button>
    </div>
  )

  inProgressView = () => (
    <div data-testid="loader" className="loading-view-container">
      <Loader type="ThreeDots" color="rgb(0, 68, 255)" height="50" width="50" />
    </div>
  )

  renderGetApiResponse = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiResponseStatusConstant.success:
        return this.successView()

      case apiResponseStatusConstant.failure:
        return this.failureView()

      case apiResponseStatusConstant.inProgress:
        return this.inProgressView()

      default:
        return null
    }
  }

  render() {
    return (
      <div className="course-item-details-main-container">
        <Header />
        {this.renderGetApiResponse()}
      </div>
    )
  }
}

export default CourseItemDetails
