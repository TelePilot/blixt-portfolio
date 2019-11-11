import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import sanityClient from '../../client'
import ClipboardJS from 'clipboard'

const DeetsCont = styled.div`
    display: flex;
    flex-flow: column;
    width: 100%;
    justify-items: center;
    align-items: center;
    position: relative;
`
const Deet = styled.a`
    font-size: 18px;
    text-decoration: underline;
`

const Detail = styled.input`
  opacity: 0; 
  top: -15px;
  position: absolute;
`

const CopiedCont = styled.div`
  width: 150px;
  height: auto;
  background: rgba(255,255,255,0.7);
  text-align: center;
  opacity: 0;
  position: absolute;
  bottom: -50px;
  left: 15px;
  transition:all .4s ease-in-out;
`
const Copied = styled.p`
  color: black;
  font-size: 12px;`

new ClipboardJS('.email')

const Deets = () => {
    const [deets, setDeets] = useState({}
    )
      useEffect(() => {
        const deetsQuery = `*[_type == "about"] {
            instaUrl, emailUrl
        }`
        sanityClient.fetch(deetsQuery).then(deets => {
          deets.forEach(deet => {
            setDeets(deet)
          })
        })
       
        return
      }, [])
 
    return (
       <DeetsCont>
           <Detail id="foo" value={`${deets.emailUrl}`}></Detail>
           <Deet href={`${deets.instaUrl}`}>Insta</Deet>
           <Deet onClick={() => 
            {document.getElementById('copy').style.opacity = 1
            window.setTimeout(() => {
              document.getElementById('copy').style.opacity = 0
            },1500)}} className="email" data-clipboard-target={"#foo"} href={`mailto:${deets.emailUrl}`}>Email</Deet>
           <CopiedCont id="copy">
             <Copied>copied to clipboard!</Copied>
           </CopiedCont>
       </DeetsCont>
    )
}

export default Deets
