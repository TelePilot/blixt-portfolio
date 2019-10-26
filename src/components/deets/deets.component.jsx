import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import sanityClient from '../../client'

const DeetsCont = styled.div`
    display: flex;
    flex-flow: column;
    width: 100%;
    justify-items: center;
    align-items: center;
`
const Deet = styled.a`
    font-size: 18px;
    text-decoration: underline;

`

const Deets = () => {
    const [deets, setDeets] = useState({}
    )
      useEffect(() => {
        const deetsQuery = `*[_type == "about"] {
            instaUrl, emailUrl
        }`
        sanityClient.fetch(deetsQuery).then(deets => {
            console.log(deets)
          deets.forEach(deet => {
            setDeets(deet)
          })
        })
       
        return
      }, [])
      console.log(deets)
    return (
       <DeetsCont>
           <Deet href={`${deets.instaUrl}`}>Insta</Deet>
           <Deet href={`mailto:${deets.emailUrl}`}>Email</Deet>
       </DeetsCont>
    )
}

export default Deets
