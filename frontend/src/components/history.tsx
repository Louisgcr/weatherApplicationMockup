import React from 'react';
import { ILocationsResponse } from 'interface';
import DeleteIcon from 'assets/icons/deleteIcon.svg?react';
import { SearchIcon } from 'assets/icons/icons';

interface IHistoryProps {
  location: ILocationsResponse;
}

const History: React.FC<IHistoryProps> = ({ location }) => {
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit", month: "2-digit", year: "numeric",
    hour: "2-digit", minute: "2-digit", hour12: true
  };

  const getDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-GB", options).format(new Date(date)).replaceAll('/', '-').replace(',', '');
  }

  return (
    <div className='flex justify-between items-center bg-light-bg-primary dark:bg-dark-bg-primary bg-opacity-20 rounded-[16px] '>
      <div className='flex flex-col text-light-text-primary dark:text-dark-text-primary pl-2.5 pr-[13px] pt-[13px] pb-[9px]'>
        <div className='flex text-[14px] capitalize'>{location.name}, {location.country_code}</div>
        <div className='flex text-[10px] dark:opacity-50'>{getDate(location.created_at)}</div>
      </div>

      <div className='flex text-light-text-primary  dark:text-dark-text-primary  py-[13px]'>
        <div className='rounded-full bg-white w-[34px] h-[34px] flex items-center justify-center mr-[10px]'>
          <SearchIcon className='fill-current w-4 h-4 opacity-50 dark:opacity-40 cursor-pointer' />
        </div>
        <div className='rounded-full bg-white w-[34px] h-[34px] flex items-center justify-center mr-[10px]'>
          <DeleteIcon className='fill-current w-4 h-4 opacity-50 dark:opacity-40 cursor-pointer' />
        </div>
      </div>
    </div>
  );
};

export default History;