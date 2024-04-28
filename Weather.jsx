import React, { useState } from 'react';
import './weather.css';

const api = {
    key: "df4ac846ca94906b9f62896663b801bd",
    base: "https://api.openweathermap.org/data/2.5"
};

const Weather = () => {
    const [query, setQuery] = useState('');
    const [weather, setWeather] = useState({ });

    const search = evt => {
        if (evt.key === "Enter") {
            fetch(`${api.base}/weather?q=${query}&appid=${api.key}`)
                .then(res => res.json())
                .then(result => {
                    setWeather(result);
                    setQuery('');
                    console.log(result);
                });
        }
    };

    const dateBuilder = (d) => {
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        let day = days[d.getDay()];
        let date = d.getDate();
        let month = months[d.getMonth()];
        let year = d.getFullYear();

        return `${day} ${date} ${month} ${year}`;
    };
    const kelvinToCelsius = (temp) => {
        return (temp - 273.15).toFixed(1);
    };


    
        return (
            <div className={(typeof weather.main !== "undefined") ? ((weather.main.temp > 16) ? 'app warm' : 'app') : 'app'}>
                <main>
                    <div className='search-box'>
                        <input
                            type='text'
                            className='search-bar'
                            placeholder='Search...'
                            value={query}
                            onChange={e => setQuery(e.target.value)}
                            onKeyPress={search}
                        />
                    </div>
                    
                    {weather && weather.sys && (
                        <div className='location-box'>
                            <div className='loc'>
                                {weather.name}, {weather.sys.country}
                                <div className='date'>
                                    {dateBuilder(new Date())}
                                </div>
                            </div>
                        </div>
                    )}
        
                    {weather && weather.main && (
                        <div className='weather-box'>
                            <div className='temp'>
                                {kelvinToCelsius(weather.main.temp)}°C
                            </div>
                        </div>
                    )}
        
                    {weather && weather.main && (
                        <div className='weather'>
                            {weather.weather[0].main}
                        </div>
                    )}
                </main>
            </div>
    )
    
                    };      

    export default Weather;