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
margin: 25px;
box-shadow: 1px 1px 5px #d6333e, 0 0 25px #b41e28, 0 0 5px #8a0912;`

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