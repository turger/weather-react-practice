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

  formatDay = timestamp => {
    const datetime = new Date(timestamp*1000)
    const day = datetime.getDate()
    const month = datetime.getMonth()+1
    return `${day}.${month}.`
  }

  formatTime = timestamp => {
    const datetime = new Date(timestamp*1000)
    const hours = datetime.getHours()
    const minutes = ('0' + datetime.getMinutes()).slice(-2)
    return `${hours}:${minutes}`
  }

  renderWeatherItem(forecast) {
    return (
      <div className="Weather_box" key={forecast.dt}>
        <div className="Weather_day">{this.formatDay(forecast.dt)}</div>
        <div className="Weather_time">{this.formatTime(forecast.dt)}</div>
        <div className="Weather_temp">{Math.round(forecast.main.temp)}°</div>
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
          <div className="Weather_day">{this.formatDay(forecasts.list[0].dt)}</div>
          <div className="Weather_time">{this.formatTime(forecasts.list[0].dt)}</div>
          <div className="Weather_temp">{Math.round(forecasts.list[0].main.temp)}°</div>
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
