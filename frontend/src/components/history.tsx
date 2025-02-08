import React from 'react'
import { ILocationsResponse } from 'interface'
import DeleteIcon from 'assets/icons/deleteIcon.svg?react'
import SearchIcon from 'assets/icons/searchIcon.svg?react'
import axios from 'axios'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

interface IHistoryProps {
  location: ILocationsResponse
  setLocationsHistory: (data: number) => void
  fetchWeather: (name: string) => void
}

const History: React.FC<IHistoryProps> = ({
  location,
  setLocationsHistory,
  fetchWeather
}) => {
  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  }

  const getDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-GB', options)
      .format(new Date(date))
      .replaceAll('/', '-')
      .replace(',', '')
  }

  const deleteSearch = async (id: number) => {
    try {
      await axios.delete(`${BACKEND_URL}/locations/${id}`)
    } catch (err) {
      console.log(err)
    }
  }

  function capitalizeFirstLetter(str: string) {
    if (!str) return str // Handle empty string
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
  }

  return (
    <div className="flex items-center justify-between rounded-[16px] bg-light-bg-primary/40 dark:bg-dark-bg-primary/40 md:h-[60px] ">
      <div className="flex flex-col pb-[9px] pl-2.5 pr-[13px] pt-[13px] text-light-text-primary dark:text-dark-text-primary md:pl-[21px]">
        <div className="flex text-[14px] capitalize md:text-[18px]">
          {capitalizeFirstLetter(location.name)}, {location.country_code}
        </div>
        <div className="flex text-[10px] dark:opacity-50 md:hidden">
          {getDate(location.created_at)}
        </div>
      </div>

      <div className="flex items-center py-[13px]  text-light-text-primary dark:text-dark-text-primary">
        <div className="hidden pr-[10px] text-[18px] dark:opacity-50 md:block">
          {getDate(location.created_at)}
        </div>
        <div
          className="mr-[10px] 
          flex size-[34px] 
            cursor-pointer 
            items-center 
            justify-center rounded-full bg-white
            transition-transform duration-75 active:scale-110 
            dark:border-2 dark:bg-transparent dark:opacity-40"
          onClick={() => {
            fetchWeather(location.name)
          }}
        >
          <SearchIcon className="size-4 fill-current opacity-50 dark:opacity-100 " />
        </div>
        <div
          className="mr-[10px] 
          flex size-[34px] 
            cursor-pointer items-center 
            justify-center rounded-full bg-white
            transition-transform duration-75 active:scale-110 
            dark:border-2 dark:bg-transparent dark:opacity-40"
        >
          <DeleteIcon
            className="size-4 fill-current opacity-50 dark:opacity-100 "
            onClick={() => {
              setLocationsHistory(location.id)
              deleteSearch(location.id)
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default History
