import React, { useEffect, useState } from "react";
import bgimg from "../assets/images/sunny.jpg";
import bgimg2 from "../assets/images/snow.jpg";

const SearchApp = () => {
  const [city, setCity] = useState(null, { temp: 25 });
  const [search, setSearch] = useState("kolkata"); 
  

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=6685511a38faa24717b7e22a8fcacfeb&units=metric`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const resjson = await response.json();
        setCity(resjson.main);
        console.log(resjson);
      } catch (error) {
        console.error("Fetch error: ", error);
        setCity(null);
      }
    };
    fetchApi();
  }, [search]);
  return (
    <div
      className="flex h-screen w-full items-center justify-center bg-cover bg-no-repeat "
      style={{ backgroundImage: `url(${city && city.temp > 20 ? bgimg : bgimg2})` }}
    >
      <div className="">
      <div className="box rounded-xl bg-gray-100 bg-opacity-0 shadow-lg backdrop-blur-md px-8">
        <div>
          <div className="inputData flex justify-center pt-9">
            <input
              type="search"
              placeholder="Search"
              className="inputField pb-3 bg-slate-700 text-center rounded-full	border-radius: 9999px; pt-4 "
              
              onChange={(event) => {
                setSearch(event.target.value);
              }}
            />
          </div>
        </div>
        {!city ? (
          <p className="text-center pt-7">No Data Found</p>
        ) : (
            <div className="  flex justify-center ">
          <div className="info">

            <h2 className="location pt-12">
              <i className="fa-solid fa-cloud-bolt"></i>
              <div className="text-3xl pb-12">
                {search}
              </div>
            </h2>
            <h1 className="temp">{city.temp}°C</h1>
            <h3 className="tempin_max text-lime-500">Min: {city.temp_min}°C</h3>
            <h3 className="tempin_max text-rose-700">Max: {city.temp_max}°C</h3>
          </div>
            </div>
        )}
        <div className="circle mt-36 bg-opacity-0 shadow-lg backdrop-blur-md">
          <div className="wave"></div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default SearchApp;
