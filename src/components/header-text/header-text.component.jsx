import React from 'react'
import styled from 'styled-components'

const AboutContainer = styled.div`
    width: 100%;
    height: 100%;
    text-align: center;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
   
    @media only screen and (max-width: 1000px) {
        width: 100%; 
     }
`

const AboutHeader = styled.h1`
    font-size: 13vw;
    letter-spacing: -5px;
     margin: 0 15px;
`
const FrontLetter = styled.span`
    position: relative;
    z-index: 2;
    `
const BackLetter = styled.span`
    position: relative;
    z-index: -1;`


const HeaderText = () => {

    return (
        <AboutContainer>
            <AboutHeader>
                <BackLetter>T</BackLetter>
                <FrontLetter>E</FrontLetter>
                <BackLetter>O</BackLetter>
            </AboutHeader>
            <AboutHeader>
            <FrontLetter>B</FrontLetter>
                <BackLetter>L</BackLetter>
                <FrontLetter>I</FrontLetter>
                <BackLetter>X</BackLetter>
                <FrontLetter>T</FrontLetter>
            </AboutHeader>
        </AboutContainer>
    )
}

export default HeaderText