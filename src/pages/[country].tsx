import Image from 'next/image'
import { GetStaticPaths } from 'next';

import Header from "../components/Header";
interface PathProps {
    name: string
}
type Props = {
    name: string
    nativeName: string
    population: number
    region: string
    subregion: string
    capital: string[]
    topLevelDomain: string[]
    currencies: [{ name: string }]
    languages: [{ name: string }]
    borders: string[]
    flag: string
}
const Details = ({ country }: { country: Props[] }) => {

    return (
        <>
            <Header />
            {country.map((country: Props) => (
                <div key={country.nativeName}>
                    <Image src={country.flag} alt="flag" width={100} height={100} />
                    <p>Native Name{country.nativeName}</p>
                    <p>Population: {country.population}</p>
                    <p>Region: {country.region}</p>
                    <p>Sub Region: {country.subregion}</p>
                    <p>Capital: {country.capital}</p>
                    <p>Top Level Domain: {country.topLevelDomain
                    }</p>
                    <p>Currencies: {country.currencies.map((currency) => <>{currency.name}</>)}</p>
                    <p>Languages: {country.languages.map((language) =>
                        <span key={language.name}>{language.name}, </span>

                    )}
                    </p>
                    <p>Border Countries: <span>{country.borders}</span></p>
                </div>))}
        </>
    )
}
export default Details
export const getStaticPaths: GetStaticPaths = async () => {

    const res = await fetch('https://restcountries.com/v2/all')
    const countries = await res.json()
    const paths = countries.map((country: PathProps) => ({
        params: { country: country.name }
    })
    )
    return {
        paths,
        fallback: false
    }
}
export const getStaticProps = async (context: { params: { country: string } }) => {
    const { params } = context
    const res = await fetch(`https://restcountries.com/v2/name/${params.country}`)
    const data = await res.json()
    return {
        props: {
            country: data
        }
    }
}