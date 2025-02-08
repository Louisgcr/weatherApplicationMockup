export interface ILocationsResponse {
  id: number;
  name: string;
  country_code: string;
  created_at: Date;
}

export interface IPageProps {
  weather: IWeatherAPIResponse | null;
  setWeather: (data: IWeatherAPIResponse) => void;
  locationsHistory: ILocationsResponse[];
  setLocationsHistory: (data: ILocationsResponse[]) => void;
}

export interface IWeatherAPIResponse {
  id: number;
  name: string;
  coord: ICoord;
  main: IMain;
  dt: number;
  wind: {
    speed: number;
    deg: number;
  };
  sys: {
    country: string;
  };
  rain: {
    "1h": number;
  } | null;
  snow: {
    "1h": number;
  } | null;
  clouds: {
    all: number;
  };
  weather: IWeather[];

}

export interface ICoord {
  lat: number;
  lon: number;
}
export interface IMain {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  sea_level: number;
  grnd_level: number;
}
export interface IWeather {
  id: number;
  main: string;
  description: string;
  icon: string;
}