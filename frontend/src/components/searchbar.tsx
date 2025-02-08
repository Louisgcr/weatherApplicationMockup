import React, { useEffect } from 'react'
import useKeyPress from 'hooks/useKeyPress'
import SearchIcon from 'assets/icons/searchIcon.svg?react'
import ErrorIcon from 'assets/icons/errorIcon.svg?react'

interface ISearchBarProps {
  search: string
  setSearch: (search: string) => void
  noCountryFound: boolean
  fetchWeather: (name: string) => void
}

const SearchBar = ({
  search,
  setSearch,
  noCountryFound,
  fetchWeather
}: ISearchBarProps) => {
  const enterPressed = useKeyPress('Enter')
  const menuRef = React.useRef<HTMLDivElement>(null)
  const inputRef = React.useRef<HTMLInputElement>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  // Close search bar when clicked outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setSearch('')
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [setSearch])

  // Search when enter is pressed and if search is not empty
  useEffect(() => {
    if (enterPressed && search.length > 0) {
      fetchWeather(search)
    }
  }, [enterPressed, fetchWeather, search])

  return (
    <div
      ref={menuRef}
      className="z-10 flex h-10 w-full rounded-lg  md:h-[60px] "
    >
      <div className="relative flex size-full gap-2.5 text-sm">
        {/* Search Bar  input */}
        <div className="bg-light-bg-primary/20 dark:bg-dark-bg-primary/20 flex  grow rounded-lg md:rounded-[20px]">
          <input
            ref={inputRef}
            type="text"
            className="text-light-text-primary placeholder:text-light-text-primary dark:text-dark-text-primary dark:placeholder:text-dark-text-primary flex  size-full rounded-lg bg-transparent pl-3 outline-none focus:border-white md:pl-[22px]"
            placeholder="Search for a location"
            value={search}
            onChange={handleChange}
          ></input>
        </div>

        <div
          className={` bg-light-bg-secondary dark:bg-dark-bg-secondary flex h-full w-10 cursor-pointer items-center justify-center  rounded-lg text-white md:w-[60px]
        ${
          search.length !== 0
            ? 'opacity-100 transition-transform duration-75 active:scale-110'
            : ' opacity-50'
        }`}
          onClick={() => {
            if (search.length > 0) fetchWeather(search)
          }}
        >
          <SearchIcon className="fill-current" />
        </div>
        <div className="text-light-text-primary dark:text-dark-text-primary absolute left-3 top-0 text-xs text-opacity-40 md:left-[22px] md:top-[3px]">
          Country
        </div>
      </div>

      <div
        className={`absolute left-1/2 top-16 flex -translate-x-1/2 ${
          noCountryFound ? 'h-10 opacity-100' : 'h-0 opacity-0 '
        } rounded-lg bg-red-200/20 px-4 py-2 text-red-600 shadow-lg duration-200`}
      >
        <ErrorIcon className="fill-current "></ErrorIcon>
        <div className="pl-2">No country or city found</div>
      </div>
    </div>
  )
}

export default SearchBar
