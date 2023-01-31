import { GetStaticPaths } from 'next';

import Header from "../components/Header";
interface PathProps {
    name: { common: string }
}
type Props= {
    flag: { svg: string }
    name: { common: string, nativeName: { common: string } }
    population: number
    region: string
    subregion: string
    capital: string[]
    tld: string[]
    currencies: { name: string } 
    languages: { name: string }
    borders: string[]
    flags: string 
}
const Details = ({ country  }: { country: Props[] }) => {
    console.log(country)

    return (
        <>
            <Header />
            <h1>hello</h1>
            {country.map((country: Props) => (
            <div key={country.flags}>
                <p>Native Name{country.name.nativeName.common}</p>
                    <p>Population: {country.population}</p>
                    <p>Region: {country.region}</p>
                    <p>Sub Region: {country.subregion}</p>
                    <p>Capital: {country.capital}</p>
                    <p>Top Level Domain: {country.tld}</p>
                    <p>Currencies: {country.currencies.name}</p>
                    <p>Languages: {country.languages.name}</p>
                    <p>Border Countries: <span>{country.borders}</span></p>
            </div>))}
           
            {/* <p>{country.name.common}</p> */}
            {/* <p>{country.name.native}</p>
            <p>{country.population}</p> */}
        </>
    )
}
export default Details
export const getStaticPaths: GetStaticPaths = async () => {

    const res = await fetch('https://restcountries.com/v3.1/all')
    const countries = await res.json()
    const paths = countries.map((country: PathProps) => ({
        params: { country: country.name.common }
    })
    )
    return {
        paths,
        fallback: false
    }
}
export const getStaticProps = async (context: { params: {country:string} }) => {
    const { params } = context
    const res = await fetch(`https://restcountries.com/v3.1/name/${params.country}`)
    const data = await res.json()
    return {
        props: {
        country:  data
        }
    }
}