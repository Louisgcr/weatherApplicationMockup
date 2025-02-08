import React, { useEffect, useState } from 'react'
import { IWeatherAPIResponse } from 'interface'
import { formatUnixTimestamp } from 'utils'

interface IWeatherSummaryProps {
  weather: IWeatherAPIResponse
}

const WeatherSummary: React.FC<IWeatherSummaryProps> = ({ weather }) => {
  const [data, setData] = useState<string>('')
  const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth)

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Simulate data change (this can come from props, API call, etc.)
  useEffect(() => {
    setData('motion-preset-confetti')
    const timer = setInterval(() => {
      setData('')
    }, 500)
    return () => clearInterval(timer)
  }, [weather])

  const getWeaterIcon = (main: string) => {
    switch (main) {
      case 'Clear':
        return '/sun.png'
      case 'Clouds':
        return '/cloud.png'
      case 'Rain':
        return '/cloud.png'
      case 'Snow':
        return '/cloud.png'
      default:
        return '/sun.png'
    }
  }

  const tailwindBreakpoints = 768

  return (
    <div className={`relative flex w-full ${data}`}>
      <div
        className={`flex flex-col ${
          screenWidth <= tailwindBreakpoints ? 'w-1/2' : 'w-full'
        } `}
      >
        <div className="text-xl">Today&apos;s Weather</div>
        <div className="text-light-text-acent dark:text-dark-text-acent text-5xl font-bold md:text-[81px] ">
          {weather.main.temp.toFixed(0)}&deg;
        </div>
        <div className="text-sm md:text-[18px]">
          H:{weather.main.temp_max.toFixed(0)}&deg; L:
          {weather.main.temp_min.toFixed(0)}&deg;
        </div>
        <div className="text-light-text-secondary dark:text-dark-text-secondary flex w-full justify-between text-sm capitalize md:text-[18px]">
          <div className="font-bold ">
            {weather.name}, {weather.sys.country}
          </div>
          {screenWidth > tailwindBreakpoints && (
            <div className="">{formatUnixTimestamp(weather.dt)}</div>
          )}
          {screenWidth > tailwindBreakpoints && (
            <div className="">Humidity: {weather.main.humidity}%</div>
          )}
          {screenWidth > tailwindBreakpoints && (
            <div className="">{weather.weather[0].main}</div>
          )}
        </div>
      </div>

      {screenWidth <= tailwindBreakpoints && (
        <div className="flex w-1/2 flex-col items-end justify-end ">
          <div className="text-sm">{weather.weather[0].main}</div>
          <div className="text-sm">Humidity: {weather.main.humidity}%</div>
          <div className="text-sm">{formatUnixTimestamp(weather.dt)}</div>
        </div>
      )}

      <img
        className="absolute left-[160px] top-[-88px] size-[157px] md:left-[360px] md:top-[-150px] md:size-[300px] "
        src={getWeaterIcon(weather.weather[0].main)}
        alt="weather icon"
      />
    </div>
  )
}

export default WeatherSummary
