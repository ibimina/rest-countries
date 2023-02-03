import Image from 'next/image';
import Head from 'next/head'
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
const Details: React.FC<{ nation: Props[] }> = ({ nation }) => {
    const route = useRouter()
    const goBack = () => {
        route.push("/")
    }
    return (
        <>
            <Head>
                <title>Countries of the World</title>
                <meta name="description" content="Details of a country" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <div className="detContainer">
                <button onClick={goBack} className='back'><span aria-label='back'></span> Back</button>
                {nation.map((country: Props) => (
                    <div key={country.nativeName} className='detaill'>
                        <div className='imgcon d-flag'>
                            <Image src={country.flag} alt="flag" fill />
                        </div>
                        <div className='fl'>
                            <div className='flex-de'>
                                <div className='top-mar'>
                                    <p className='bold name'>{country.name}</p>
                                    <p className='bold para-btm'>Native Name: <span className='light'>{country.nativeName}</span></p>
                                    <p className='bold para-btm'>Polpulation: <span className='light'>{country.population.toLocaleString()}</span> </p>
                                    <p className='bold para-btm'> Region :<span className='light'>{country.region}</span></p>
                                    <p className='bold para-btm'> Sub Region: {country.subregion}</p>
                                    {country?.capital && <p className='bold para-btm'> Capital: <span className='light'>{country?.capital}</span></p>}
                                  
                                </div>
                                <div className='top-mar'>
                                    <p className='bold para-btm'>Top Level Domain: <span className="light">{country.topLevelDomain}</span> </p>
                                    {country?.currencies && <p className='bold para-btm'>Currencies: {country?.currencies?.map((currency) => <span className='light' key={currency.name}>{currency.name}</span>)}</p>
                                   }
                                    <p className='bold para-btm'>Languages: {country?.languages?.map((language) =>
                                        <span key={language.name} className='lang light'>{language.name}, </span>
                                    )}
                                    </p>
                                </div>
                            </div>
                            {country?.borders && 
                            <div className='bold'> 
                                <span className='para-btm blk'>Border Countries:</span> 
                                <div className='border-con'>{country?.borders.map((border) => 
                                <span className='light border' key={border}>{border}</span>)} 
                                </div>
                            </div>
                            }           
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
            nation: data
        }
    }
}