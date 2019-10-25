import React from 'react'
import styled from 'styled-components'
import Logo from '../logo/logo.component'

const HeaderContainer = styled.div`
    width: 10%;
    height: 100px;
    display:flex;
    justify-content: flex-end;
    align-items:center;
    position: fixed;
    top: 0;
    right: 0;
    z-index: 99;
`

const Header = () => (
    <HeaderContainer>
        <Logo/>
    </HeaderContainer>
)

export default Header