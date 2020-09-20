export const API_KEY = process.env.REACT_APP_KEY

export const getForecast = () => new Promise(resolve => {
  fetch(`https://api.openweathermap.org/data/2.5/forecast?id=658225&APPID=${API_KEY}&units=metric&lang=fi`)
    .then(res => {
      if (res.status !== 200) throw new Error(res.status)
      return res.json()
    })
    .then(res => {
      resolve(res)
    })
    .catch(err => {
      console.warn(err)
    })
})
