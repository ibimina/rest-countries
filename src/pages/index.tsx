import { useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '@/styles/Home.module.css'
import Header from "../components/Header"
import { GetStaticProps } from 'next'


type CountryProps = {
  population: number
  region: string
  name: string
  flags: { svg: string }
  capital: string
}[]

export default function Home({ countries }: { countries: CountryProps }) {
  const handleSearch = (e: React.FormEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value)
    Array.from(document.querySelectorAll('.country-name')).forEach((p) => {
      if (p.textContent?.toLowerCase().includes(inputValue.toLowerCase())) {
        p.parentElement?.parentElement?.classList.remove('hidden')
      } else {
        p.parentElement?.parentElement?.classList.add('hidden')
      }
    })
  }

  const [inputValue, setInputValue] = useState("")

  const handleFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value===""){
      Array.from(document.querySelectorAll('.region-sp')).forEach((p) => {
          p.parentElement?.parentElement?.parentElement?.classList.remove('hidden')
      } )
    }else{
      Array.from(document.querySelectorAll('.region-sp')).forEach((p) => {
        if (p.textContent === e.target.value) {
          p.parentElement?.parentElement?.parentElement?.classList.remove('hidden')
        } else {
          p.parentElement?.parentElement?.parentElement?.classList.add('hidden')
        }
      }
      )
    }
    
  }

  return (
    <>
      <Head>
        <title>Countries of the World</title>
        <meta name="description" content="List of Countries" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className={styles.container}>
        <div className='flex-input'>
          <input type="text" value={inputValue} onChange={handleSearch} placeholder="search for a country" className={styles.input} />
          <select name="filtercountry" id="" onChange={handleFilter} className={styles.select}>
            <option value="">Filter by Region</option>
            <option value="Africa">Africa</option>
            <option value="Americas">America</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="Oceania">Oceania</option>
          </select>
        </div>
        <ul className={styles.lists}>
          {countries.map((country) => (
            <Link key={country.name} href={`/${encodeURIComponent(country.name)}`} className={styles.link}>
              <div className='imgcon'>
                <Image src={country.flags.svg} alt="flag" fill sizes='(max-height:450px)' className='flag' />
              </div>
              <div className={styles.countrydet}>
                <p className={`${styles.countryname} country-name`}>{country.name}</p>
                <p><span className='bold'>Polpulation</span>: <span className='light'>{country.population.toLocaleString()}</span> </p>
                <p className='region'> <span className='bold '>Region</span> :<span className='light region-sp'>{country.region}</span></p>
                {country?.capital && <p className='bold '> Capital: <span className='light'>{country?.capital}</span></p>}
              </div>
            </Link>
          ))}
        </ul>
      </main>

    </>
  )
}
export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch('https://restcountries.com/v2/all')
  const countries: CountryProps[] = await res.json()
  return {
    props: {
      countries,
    },
  }

}