import React, { Component } from 'react'
import './Weather.css'
import { getForecast } from './requests'

class Weather extends Component {
  constructor(props) {
    super(props)
    this.state = {
      forecasts: null,
      focusedForecastDt: null
    }
  }

  async componentDidMount() {
    // Haetaan data ensimmäisellä mountilla
    await this.getForecast()
    // Asetetaan aluksi oletuksena valituksi sääksi listan ensimmäinen sää,
    // tunnistetaan se dt eli datetimen avulla joten tallennetaan se
    this.setState(prevState => ({focusedForecastDt: prevState.forecasts.list[0].dt}))
    // Asetetaan intervalli tunnin välein hakemaan päivitetty data
    // 1 tunti on 60*60*1000 = 3600000 millisekuntia
    setInterval(async () => {
      await this.getForecast()
    } , 60*60*1000)

  }

  async getForecast() {
    await getForecast().then(forecasts => {
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

  changeFocusedForecast = forecast => {
    this.setState({focusedForecastDt: forecast.dt})
  }

  renderWeatherItem(forecast) {
    return (
      <div className="Weather_box" key={forecast.dt} onClick={() => this.changeFocusedForecast(forecast)}>
        <div className="Weather_day">{this.formatDay(forecast.dt)}</div>
        <div className="Weather_time">{this.formatTime(forecast.dt)}</div>
        <div className="Weather_temp">{Math.round(forecast.main.temp)}°</div>
        <img src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`} alt="Logo" />
      </div>
    )
  }

  render() {
    const {forecasts, focusedForecastDt} = this.state
    if (!forecasts || !focusedForecastDt) return null
    const selectedForecast = forecasts.list.find(f => f.dt === focusedForecastDt)
    return (
      <div className="Weather">
        <div className="Weather_city">
          {forecasts.city.name}
        </div>
        <div className="Weather_sunrise">
          Aurinko nousee klo {this.formatTime(forecasts.city.sunrise)}
        </div>
        <div className="Weather_sunset">
          Aurinko laskee klo {this.formatTime(forecasts.city.sunset)}
        </div>
        <div className="Weather_selected">
          <div className="Weather_day">{this.formatDay(selectedForecast.dt)}</div>
          <div className="Weather_time">{this.formatTime(selectedForecast.dt)}</div>
          <div className="Weather_temp">{Math.round(selectedForecast.main.temp)}°</div>
          <div className="Weather_desc">{selectedForecast.weather[0].description}</div>
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
