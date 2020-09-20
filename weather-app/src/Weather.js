import React, { Component } from 'react'
import './Weather.css'

class Weather extends Component {
  render() {
    return (
      <div className="Weather">
        <div className="Weather_selected">
          <div className="Weather_day">ma</div>
          <div className="Weather_time">12:00</div>
          <div className="Weather_temp">14°</div>
          <img src='http://openweathermap.org/img/wn/09d.png' alt="Logo" />
        </div>
        <div className="Weather_forecast">
          <div className="Weather_box" key='sää-id2'>
            <div className="Weather_day">ma</div>
            <div className="Weather_time">18:00</div>
            <div className="Weather_temp">14°</div>
            <img src='http://openweathermap.org/img/wn/09d.png' alt="Logo" />
          </div>
          <div className="Weather_box" key='sää-id3'>
            <div className="Weather_day">ma</div>
            <div className="Weather_time">21:00</div>
            <div className="Weather_temp">14°</div>
            <img src='http://openweathermap.org/img/wn/09d.png' alt="Logo" />
          </div>
          <div className="Weather_box" key='sää-id3'>
            <div className="Weather_day">ti</div>
            <div className="Weather_time">08:00</div>
            <div className="Weather_temp">14°</div>
            <img src='http://openweathermap.org/img/wn/09d.png' alt="Logo" />
          </div>
        </div>
     </div>
    )
  }

}

export default Weather
