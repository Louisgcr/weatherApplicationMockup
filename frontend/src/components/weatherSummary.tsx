import React from 'react';
import { IWeatherAPIResponse } from 'interface';
import { formatUnixTimestamp } from 'utils';

interface IWeatherSummaryProps {
  weather: IWeatherAPIResponse;
}

const WeatherSummary: React.FC<IWeatherSummaryProps> = ({ weather }) => {
  return (
    <div className='relative flex w-full '>
      <div className='flex flex-col w-1/2'>
        <div className='text-xl'>Today's Weather</div>
        <div className='text-5xl font-bold text-light-text-acent dark:text-dark-text-acent'>{weather.main.temp.toFixed(0)}&deg;</div>

        <div className='text-sm'>H:{weather.main.temp_max.toFixed(0)}&deg;  L:{weather.main.temp_min.toFixed(0)}&deg;</div>
        <div className='text-sm font-bold text-light-text-secondary dark:text-dark-text-secondary capitalize'>{weather.name}, {weather.sys.country}</div>
      </div>
      <div className='flex flex-col w-1/2 justify-end items-end '>
        <div className='text-sm'>{weather.weather[0].main}</div>
        <div className='text-sm'>Humidity: {weather.main.humidity}%</div>
        <div className='text-sm'>{formatUnixTimestamp(weather.dt)}</div>
      </div>
      <img className='absolute w-[157px] h-[157px] left-[160px] -top-[88px]' src={`/cloud.png`} alt='weather icon' />
    </div>
  );
};

export default WeatherSummary;