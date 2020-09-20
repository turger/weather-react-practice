import React, { Component } from 'react'
import './Weather.css'
import { getForecast } from './requests'

class Weather extends Component {
  constructor(props) {
    super(props)
    this.state = {
      forecasts: null,
    }
  }

  componentDidMount() {
    getForecast().then(forecasts => {
      this.setState({ forecasts })
    })
  }

  renderWeatherItem(forecast) {
    return (
      <div className="Weather_box" key={forecast.dt}>
        <div className="Weather_day">{forecast.dt}</div>
        <div className="Weather_time">{forecast.dt}</div>
        <div className="Weather_temp">{forecast.main.temp}°</div>
        <img src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`} alt="Logo" />
      </div>
    )
  }

  render() {
    if (!this.state.forecasts) return null
    const forecasts = this.state.forecasts
    return (
      <div className="Weather">
        <div className="Weather_selected">
          <div className="Weather_day">{forecasts.list[0].dt}</div>
          <div className="Weather_time">{forecasts.list[0].dt}</div>
          <div className="Weather_temp">{forecasts.list[0].main.temp}°</div>
          <img src='http://openweathermap.org/img/wn/09d.png' alt="Logo" />
        </div>
        <div className="Weather_forecast">
          { forecasts.list.map(forecast => this.renderWeatherItem(forecast)) }
        </div>
     </div>
    )
  }

}

export default Weather
