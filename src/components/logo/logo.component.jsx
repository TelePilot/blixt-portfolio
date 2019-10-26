import React, {useState, useEffect} from 'react'
import sanityClient from '../../client'
import styled from 'styled-components'
import imageUrlBuilder from "@sanity/image-url"
import { Link } from 'react-router-dom'

const builder = imageUrlBuilder(sanityClient)
function urlFor(source) {
  return builder.image(source)
}

const LogoImage = styled.img`
width: 50px;
margin: 25px 25px 10px 25px;
`

const Logo = () => {
    const [logo, setLogo] = useState({ 
        logo: '' 
      })
      useEffect(() => {
        const logoQuery = `*[_type == "logo"]`
        sanityClient.fetch(logoQuery).then(logo => {
    
          logo.forEach(logo => {
            setLogo(logo)
          })
        })
       
        return
      }, [])
    return (
       <Link to="/"> <LogoImage alt="blixt logo" src={urlFor(logo.logo).url()} /></Link>  
    )
}

export default Logo