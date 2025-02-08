import React from "react";

export interface IconAttribute {
  className?: string;
}

export const CloseIcon = ({ className = '' }: IconAttribute) => {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
    </svg>
  )
};

export const SearchIcon = ({ className = '' }: IconAttribute) => {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" /></svg>
  )
};


export const NavigationIcon = ({ className = '' }: IconAttribute) => {
  return (
    <svg className={className} version="1.2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160" width="160" height="160">
      <path d="m131.2 137.6q-0.5 0.1-0.9 0-0.5-0.1-0.9-0.2-0.5-0.2-0.9-0.4-0.4-0.2-0.8-0.4l-44.2-29.2q-0.8-0.5-1.7-0.8-0.9-0.3-1.8-0.3-0.9 0-1.8 0.3-0.9 0.3-1.7 0.8l-44.2 29.2c-1.2 0.7-2.5 1.1-3.9 1-1.4-0.1-2.8-0.7-3.8-1.6-1-1-1.8-2.2-2-3.6-0.3-1.4-0.1-2.8 0.5-4l51.2-102.4c0.5-1.1 1.4-2 2.4-2.6 1-0.6 2.1-0.9 3.3-0.9 1.2 0 2.3 0.3 3.3 0.9 1 0.6 1.9 1.5 2.4 2.6l51.2 102.4q0.5 0.9 0.6 2 0.2 1 0 2.1-0.2 1-0.8 1.9-0.5 0.9-1.3 1.7-0.4 0.3-0.9 0.6-0.5 0.3-1 0.5-0.6 0.2-1.2 0.3-0.5 0.1-1.1 0.1z" />
    </svg>
  )
};