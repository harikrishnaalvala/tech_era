import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import CoursesList from '../CoursesList'

import './index.css'

const apiResponseStatusConstant = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Courses extends Component {
  state = {
    apiResponseStatus: apiResponseStatusConstant.initial,
    techEraList: [],
  }

  componentDidMount() {
    this.getTechEra()
  }

  getTechEra = async () => {
    this.setState({apiResponseStatus: apiResponseStatusConstant.inProgress})

    const techEraApiUrl = 'https://apis.ccbp.in/te/courses'
    const options = {
      method: 'GET',
    }
    const response = await fetch(techEraApiUrl, options)
    const techEraData = await response.json()

    if (response.ok === true) {
      const updateData = techEraData.courses.map(eachTech => ({
        id: eachTech.id,
        logoUrl: eachTech.logo_url,
        name: eachTech.name,
      }))

      this.setState({
        techEraList: updateData,
        apiResponseStatus: apiResponseStatusConstant.success,
      })
    } else {
      this.setState({apiResponseStatus: apiResponseStatusConstant.failure})
    }
  }

  successView = () => {
    const {techEraList} = this.state
    return (
      <>
        <Header />
        <h1 className="courses-heading">Courses</h1>
        <ul className="courses-main-container">
          {techEraList.map(eachTech => (
            <CoursesList courseListItem={eachTech} key={eachTech.id} />
          ))}
        </ul>
      </>
    )
  }

  onClickRetryButton = () => {
    this.getTechEra()
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
    const {apiResponseStatus} = this.state

    switch (apiResponseStatus) {
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
    const {apiResponseStatus} = this.state
    console.log(apiResponseStatus)
    return <div className="app-container">{this.renderGetApiResponse()} </div>
  }
}

export default Courses
