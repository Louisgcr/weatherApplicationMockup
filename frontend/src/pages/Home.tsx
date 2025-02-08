import { IPageProps } from 'interface';
import SearchBar from 'components/searchbar';
import WeatherSummary from 'components/weatherSummary';
import SearchHistory from 'components/searchHistory';

function Home({ weather, setWeather, locationsHistory, setLocationsHistory }: IPageProps) {

  return (
    <div className={`relative overflow-auto `} >
      <div className={`h-screen flex w-full`}>
        {weather &&
          <div className='flex flex-col w-mobile  mx-auto pt-5'  >
            <div className='w-full'>
              <SearchBar setWeather={setWeather} />
            </div>
            <div className='flex flex-col w-full h-screen mt-mobile py-5 px-6.5 lg:mt-28 text-light-text-primary dark:text-dark-text-primary bg-light-bg-primary  dark:bg-dark-bg-primary bg-opacity-30 rounded-xl'>
              <WeatherSummary weather={weather} />
              <SearchHistory locationsHistory={locationsHistory} setLocationsHistory={setLocationsHistory} />
            </div>
          </div>
        }
      </div>
    </div>
  )
}

export default Home
