import "./styles.css";
import '../../global.css'
import { useState } from 'react'

//4- custom hook
import { useFetch } from "../../hooks/useFetch";
import { Loading } from "../Loading/Loading";

const urlBase = "https://react-api-countries-rho.vercel.app/countries";

export function Countries() {
  const [/*countries*/, /*setCountries*/] = useState([]);

  //4- custom hook
  const { data: myCountries, httpConfig, loading, error } = useFetch(urlBase)

  const [name, setName] = useState(''); 
  const [population, setPopulation] = useState('');
  const [flag, setFlag] = useState('');

  //1- retrieving data
  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const response = await fetch(urlBase);
  //       const data = await response.json()
  //       setCountries(data)
  //     } catch (error) {
  //       console.error("ERROR", error);
  //     }
  //   }
  //   fetchData()
  // }, []);

  //2- Add countries
  const handleSubmit = async (e) => {
    e.preventDefault()

    const country = {
      name, 
      population,
      flag
    }
    
    // const response = await fetch(urlBase, {
    //   method: "POST", 
    //   headers: {
    //     "Content-Type": "application/json"
    //   }, 
    //   body: JSON.stringify(country)
    // }) 

    // if(!response.ok) {
    //   console.error("Failed to add country");
    //   return; 
    // }

    // //3- Loading Dynamic
    // const addedProduct = await response.json()

    // setCountries((prevProducts) => [...prevProducts, addedProduct])

    // 5 - Refactoring the Post 
    httpConfig(country, "POST")

    //Reset states of input
    setName("")
    setPopulation("")
    setFlag("")
  }

  return (
    <section>
      <header className="header-container">
        <h1>Countries of the World! &#x1F30E;</h1>
        <div className="add-country">
          <form
            autoComplete="off"
            onSubmit={handleSubmit}
            className="form-container"
          >
            <div>
              <label>
                Name:
                <input
                  className="input-text"
                  type="text"
                  value={name}
                  name="name"
                  onChange={(e) => setName(e.target.value)}
                />
              </label>
            </div>
            <div>
              <label>
                Population:
                <input
                  className="input-text"
                  type="text"
                  value={population}
                  name="population"
                  onChange={(e) => setPopulation(e.target.value)}
                />
              </label>
            </div>
            <div>
              <label>
                Flag:
                <input
                  className="input-text"
                  type="text"
                  value={flag}
                  name="flag"
                  onChange={(e) => setFlag(e.target.value)}
                />
              </label>
            </div>
            <div>
              {/* 7- state of loading in post */}
              {loading && (
                <input
                  className="button"
                  type="submit"
                  disabled
                  value="Please wait"
                />
              )}
              {!loading && (
                <input className="button" type="submit" value="Create" />
              )}
            </div>
          </form>
        </div>
      </header>

      <div className="container-card">
        {/* // 6 - Loading */}
        {loading && <Loading />}
        {error && (
          <div className="container-error">
            <h3>{error}</h3>
          </div>
        )}
        {!error && (
          <ul className="grid-container">
            {myCountries &&
              myCountries.map((country) => (
                <li key={country.id} className="grid-item">
                  <h3>{country.name} </h3>
                  <p>Population - {country.population} million </p>
                  <img src={country.flag} alt="" />
                </li>
              ))}
          </ul>
        )}
      </div>
    </section>
  );
}