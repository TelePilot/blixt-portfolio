import React from 'react'
import styled from 'styled-components'

// import ThreeComponent from '../components/three-component/three.component'
import HeaderText from '../components/header-text/header-text.component'
import ProjectGrid from '../components/project-grid/project-grid.component'
import Arrow from '../components/arrow/arrow.component'

const FirstSection = styled.div`

    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-flow: row;
    `


const SecondSection = styled.div`
    width: 100%;
    height: auto;
`
// const Three = styled(ThreeComponent)`
// width: 100vw;
// height: 100%;`

const MainPage = () => {
    return (
        <div>
            <FirstSection>
                {/* <Three /> */}
               
                <HeaderText />
                <Arrow />
            </FirstSection>
            <SecondSection>
                <ProjectGrid/>
            </SecondSection>    
        </div>
      
    )
}

export default MainPage