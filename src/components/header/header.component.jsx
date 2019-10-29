import React from 'react'
import styled from 'styled-components'
import Logo from '../logo/logo.component'
import Deets from '../deets/deets.component'
const HeaderContainer = styled.div`
    width: auto;
    height: auto;
    display:flex;
    justify-content: flex-start;
    align-items:flex-start;
    flex-flow: column;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 99;
`

const Header = () => (
    <HeaderContainer>
        <Logo/>
        <Deets/>
    </HeaderContainer>
)

export default Header