import { IPageProps } from 'interface'
import SearchBar from 'components/searchbar'
import WeatherSummary from 'components/weatherSummary'
import SearchHistory from 'components/searchHistory'
import axios from 'axios'
import { useEffect, useState } from 'react'

const OPENWEATHER_API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

function Home({
  weather,
  setWeather,
  locationsHistory,
  setLocationsHistory
}: IPageProps) {
  const [search, setSearch] = useState('')
  const [noCountryFound, setNoCountryFound] = useState(false)

  // Remove the error message after 2 seconds if no country is found
  useEffect(() => {
    if (noCountryFound) {
      const timer = setTimeout(() => {
        setNoCountryFound(false)
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [noCountryFound])

  // Fetch weather data from the OpenWeather API
  const fetchWeather = async (name: string) => {
    try {
      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/find?q=${name}&cnt=1&appid=${OPENWEATHER_API_KEY}`
      )

      if (!weatherResponse.ok) {
        throw new Error('Failed to fetch weather data')
      }

      //Wait for the response from the API
      const res = await weatherResponse.json()

      if (res.count === 0) {
        setNoCountryFound(true)
        setSearch('')
        return
      }
      // Output of temp is different from using `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}&units=metric`
      const data = res.list[0]
      data.main.temp = data.main.temp / 10
      data.main.temp_min = data.main.temp_min / 10
      data.main.temp_max = data.main.temp_max / 10
      setWeather(data)
      setSearch('')
      postSearch(name, data.sys.country)
    } catch (err) {
      if (err instanceof Error) {
        console.log(err.message)
      } else {
        console.log('An unknown error occurred')
      }
    }
  }

  // Post search location to the backend
  const postSearch = async (name: string, country_code: string) => {
    try {
      await axios.post(`${BACKEND_URL}/locations`, { name, country_code })
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className={`relative overflow-auto `}>
      <div className={`flex min-h-screen w-full `}>
        {weather && (
          <div className="mx-auto flex w-mobile flex-col pt-5 md:w-desktop">
            <div className="w-full">
              <SearchBar
                search={search}
                setSearch={setSearch}
                noCountryFound={noCountryFound}
                fetchWeather={fetchWeather}
              />
            </div>
            <div className="mt-[139px] flex h-screen w-full flex-1 flex-col rounded-xl bg-light-bg-primary/30 px-6.5 py-5 text-light-text-primary  dark:bg-dark-bg-primary/30 dark:text-dark-text-primary md:mt-[112px]">
              <WeatherSummary weather={weather} />
              <SearchHistory
                locationsHistory={locationsHistory}
                setLocationsHistory={setLocationsHistory}
                fetchWeather={fetchWeather}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Home
