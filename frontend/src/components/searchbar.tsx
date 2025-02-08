import React, { useEffect, useState } from 'react';
import useKeyPress from 'hooks/useKeyPress';
import { IWeatherAPIResponse } from 'interface';
import { SearchIcon } from 'assets/icons/icons';
import ErrorIcon from 'assets/icons/errorIcon.svg?react';
import axios from 'axios';

const OPENWEATHER_API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

interface ISearchBarProps {
  setWeather: (data: IWeatherAPIResponse) => void;
}

const SearchBar = ({ setWeather }: ISearchBarProps) => {
  const [search, setSearch] = useState('');
  const [noCountryFound, setNoCountryFound] = useState(false);

  const enterPressed = useKeyPress('Enter');

  const menuRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setSearch('');
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    }
  }, []);

  useEffect(() => {
    if (enterPressed && search.length > 0) {
      fetchWeather(search)
    }
  }, [enterPressed]);

  useEffect(() => {
    if (noCountryFound) {
      const timer = setTimeout(() => {
        setNoCountryFound(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [noCountryFound])

  const fetchWeather = async (name: string) => {
    try {
      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/find?q=${name}&cnt=1&appid=${OPENWEATHER_API_KEY}`
      );

      if (!weatherResponse.ok) {
        throw new Error("Failed to fetch weather data");
      }

      const res = await weatherResponse.json();

      if (res.count === 0) {
        setNoCountryFound(true);
        setSearch('');
        return;
      }
      const data = res.list[0];
      data.main.temp = data.main.temp / 10;
      data.main.temp_min = data.main.temp_min / 10;
      data.main.temp_max = data.main.temp_max / 10;
      setWeather(data);
      postSearch(name, data.sys.country);

    } catch (err) {
      if (err instanceof Error) {
        console.log(err.message);
      } else {
        console.log("An unknown error occurred");
      }
    }
  }

  const postSearch = async (name: string, country_code: string) => {
    try {
      await axios.post(`${BACKEND_URL}/locations`, { name, country_code });
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div ref={menuRef} className="flex w-full h-10 rounded-lg z-10 ">
      <div className='relative flex  w-full h-full text-sm gap-2.5'>
        {/* Search Bar  input */}
        <div className='flex flex-grow bg-light-bg-primary  dark:bg-dark-bg-primary bg-opacity-20 rounded-lg '>
          <input ref={inputRef}
            type='text'
            className='flex w-full h-full pl-3  text-light-text-primary placeholder:text-light-text-primary dark:text-dark-text-primary dark:placeholder:text-dark-text-primary rounded-lg bg-transparent focus:border-white outline-none'
            placeholder='Search for a location'
            value={search}
            onChange={handleChange}>
          </input>
        </div>

        <div className={` flex items-center justify-center w-10 h-10 cursor-pointer text-white  bg-light-bg-secondary dark:bg-dark-bg-secondary rounded-lg
        ${search.length !== 0 ? "transform active:scale-110 transition-transform duration-75 opacity-100" : " opacity-50"}`}
          onClick={() => { if (search.length > 0) fetchWeather(search) }}>
          <SearchIcon className='fill-current' />
        </div>
        <div className='absolute top-0 left-3 text-xs text-light-text-primary dark:text-dark-text-primary text-opacity-40'>
          Country
        </div>
      </div>


      <div className={`flex absolute top-16 left-1/2 transform -translate-x-1/2 ${noCountryFound ? "opacity-100 h-10" : "opacity-0 h-0 "} duration-200 px-4 py-2 text-red-600 bg-opacity-20 bg-red-200 rounded-lg shadow-lg`}>
        <ErrorIcon className='fill-current '></ErrorIcon>
        <div className='pl-2'>No country or city found</div>
      </div>


    </div>
  );
}

export default SearchBar;