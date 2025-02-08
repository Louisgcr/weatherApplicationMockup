import React from 'react';
import { ILocationsResponse } from 'interface';
import History from 'components/history';

interface ISearchHistoryProps {
  locationsHistory: ILocationsResponse[];
  setLocationsHistory: (data: ILocationsResponse[]) => void;
}

const SearchHistory: React.FC<ISearchHistoryProps> = ({ locationsHistory, setLocationsHistory }) => {
  return (
    <div className='flex flex-col w-full pl-[20px] pr-[14px] mt-5 bg-light-bg-secondary dark:bg-dark-bg-secondary rounded-[24px] bg-opacity-30'>
      <div className='text-[14px] pt-[22px] pb-[26px]'>Search History</div>
      {locationsHistory.length === 0 &&
        <div className='text-light-text-primary dark:text-dark-text-primary text-[14px] text-center opacity-50'>
          😔 No Search History Found ...
        </div>
      }
      <div className='flex flex-col gap-[18px] pb-5'>
        {locationsHistory.map((location, index) => (
          <History key={index} location={location} />
        ))}
      </div>
    </div>
  );
};

export default SearchHistory;