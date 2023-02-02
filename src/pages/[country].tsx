import Image from 'next/image';
import ErrorPage from 'next/error';
import { GetStaticPaths } from 'next';
import Header from "../components/Header";
import { useRouter } from 'next/router';
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
    const route = useRouter()
    const goBack = () => {
        route.push("/")
    }
    if(!route.isFallback && !country?.length || country === undefined){
    return <ErrorPage statusCode={404} />
    }
    return (
        <>
            <Header />
            <div className="detContainer">
                <button onClick={goBack} className='back'><span aria-label='back'></span> Back</button>
                {country !== undefined &&
                    country.map((country: Props) => (
                        <div key={country.nativeName} className='detaill'>
                            <div className='imgcon d-flag'>
                                <Image src={country.flag} alt="flag" fill />
                            </div>
                            <div className='fl'>
                                <div className='flex-de'>
                                    <div className='top-mar'>
                                        <p className='bold name'>{country.name}</p>
                                        <p className='bold para-btm'>Native Name: <span className='light'>{country.nativeName}</span></p>
                                        <p className='bold para-btm'>Polpulation: <span className='light'>{country.population}</span> </p>
                                        <p className='bold para-btm'> Region :<span className='light'>{country.region}</span></p>
                                        <p className='bold para-btm'> Sub Region: {country.subregion}</p>
                                        <p className='bold para-btm'> Capital: <span className='light'>{country.capital}</span></p>
                                    </div>
                                    <div className='top-mar'>
                                        <p className='bold para-btm'>Top Level Domain: <span className="light">{country.topLevelDomain}</span> </p>
                                        <p className='bold para-btm'>Currencies: {country.currencies.map((currency) => <span className='light' key={currency.name}>{currency.name}</span>)}</p>
                                        <p className='bold para-btm'>Languages: {country.languages.map((language) =>
                                            <span key={language.name} className='lang light'>{language.name}, </span>
                                        )}
                                        </p>
                                    </div>
                                </div>
                                <div className='bold'> <span className='para-btm blk'>Border Countries:</span>  <div className='border-con'>{country.borders.map((border) => <span className='light border' key={border}>{border}</span>)} </div> </div>
                            </div>
                        </div>))
                }
               
              </div>
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