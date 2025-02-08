import React from 'react'
import { ILocationsResponse } from 'interface'
import History from 'components/history'

interface ISearchHistoryProps {
  locationsHistory: ILocationsResponse[]
  setLocationsHistory: (data: ILocationsResponse[]) => void
  fetchWeather: (name: string) => void
}

const SearchHistory: React.FC<ISearchHistoryProps> = ({
  locationsHistory,
  setLocationsHistory,
  fetchWeather
}) => {
  // Delete location from history
  const deleteLocation = (id: number) => {
    setLocationsHistory(
      locationsHistory.filter((location) => location.id !== id)
    )
  }

  return (
    <div className="mt-5 flex w-full flex-col rounded-[24px] bg-light-bg-primary/20  pl-[20px] pr-[14px] dark:bg-dark-bg-secondary/30 ">
      <div className="pb-[26px] pt-[22px] text-[14px] md:text-[18px]">
        Search History
      </div>
      {locationsHistory.length === 0 && (
        <div className="text-center text-[14px] text-light-text-primary opacity-50 dark:text-dark-text-primary md:text-[18px]">
          😔 No Search History Found ...
        </div>
      )}

      {/* Iterate over all search history*/}
      <div className="z-20 flex flex-col gap-[18px] pb-5">
        {locationsHistory.map((location, index) => (
          <History
            key={index}
            location={location}
            setLocationsHistory={deleteLocation}
            fetchWeather={fetchWeather}
          />
        ))}
      </div>
    </div>
  )
}

export default SearchHistory
