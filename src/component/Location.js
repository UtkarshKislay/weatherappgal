
import { useState, useEffect } from "react";

import axios from "axios";

const Location = () => {
  const [city, setCity] = useState("");
  const [temp, setTemp] = useState(0);
  const [valid, setValid] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [refresh, setRefresh] = useState(0);
 

  const handleChange = (e) => {
    const city1 = e.target.value;
    const ncity = city1.charAt(0).toUpperCase() + city1.slice(1);
    setCity(ncity);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (refresh === 0) {
      setRefresh(1);
    } else {
      setRefresh(0);
    }
  };
  // console.log(refresh);
  useEffect(() => {
    const searchTemp = async () => {
    const API_KEY = "123f0910fda31686d68b2d264169329d";
      const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=matric&appid=${API_KEY}`;
      try {
        const res = await axios.get(
          url
        );
        setValid(1);
        const data = res.data.main;
        const tem = data.temp - 273.15;
        setTemp(tem.toFixed(2));
        setHumidity(data.humidity);
      } catch {
        setValid(0);
      }
    };
    searchTemp();
  }, [city, refresh]);

  return (
    <div className={"content"}>
      <div className={"title"}>
        <h1>Weather</h1>
      </div>
      <div className={"tex"}>Use this Site to get you weather!</div>
      <form className={"form"}>
        <input
          value={city}
          onChange={handleChange}
          type="text"
          placeholder="Location"
        />
        <button onClick={handleSubmit} type="submit">
          Search
        </button>
      </form>

      <div className={valid ? "cityShow" : "isHide"}>
        It is currently {temp} degree out. There is {humidity}% humidity.
      </div>
      <div className={!valid ? "cityHide" : "isHide"}>
        Please Enter a Valid City Name
      </div>
    </div>
  );
};

export default Location;
