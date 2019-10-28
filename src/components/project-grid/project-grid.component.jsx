import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import sanityClient from '../../client'
import imageUrlBuilder from "@sanity/image-url"
import { Link } from 'react-router-dom'


const builder = imageUrlBuilder(sanityClient)
function urlFor(source) {
  return builder.image(source)
}

const ProjectsContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    text-align: center;
    flex-flow: column;
   
    height: auto;
    min-height: 100vh;
    `

const GridContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    color: black;
    width: 100%;

    @media only screen and (max-width: 1000px) {
        grid-template-columns: 1fr 1fr;
    }
    @media only screen and (max-width: 700px) {
        grid-template-columns: 1fr ;
    }`

const ProjectContainer = styled(Link)`
    
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column;
    // border: 2px solid rgb(0,255,0);
    text-decoration: none;
    color: white;
    position: relative;

    
@keyframes firstAnimate {
    0% {
    transform:scaleX(0);
    transform-origin: left;
    }
    50%
    {
      transform:scaleX(1);
    transform-origin: left;
    }
    50.1%
    {
      transform:scaleX(1);
    transform-origin: right;
      
    }
    
    100%
    {
      transform:scaleX(0);
    transform-origin: right;
      
    }
  } 
  @keyframes secondAnimate {
    0% {
        transform:scaleY(1);
        transform-origin: bottom;
        
        }
        50%
        {
            transform:scaleY(0);
            transform-origin: bottom;
        }
        50.1%
        {
            transform:scaleY(0);
            transform-origin: top;
          
        }
        
        100%
        {
          transform:scaleY(1);
        transform-origin: top;
          
        }
  } 
  @keyframes thirdAnimate {
    0% {
        transform:scaleX(0);
        transform-origin: right;
        }
        50%
        {
          transform:scaleX(1);
        transform-origin: right;
        }
        50.1%
        {
          transform:scaleX(1);
        transform-origin: left;
          
        }
        
        100%
        {
          transform:scaleX(0);
        transform-origin: left;
          
        }
  } 
  @keyframes fourthAnimate {
    0% {
        transform:scaleY(1);
        transform-origin: top;
        
        }
        50%
        {
            transform:scaleY(0);
            transform-origin: top;
        }
        50.1%
        {
            transform:scaleY(0);
            transform-origin: bottom;
          
        }
        
        100%
        {
          transform:scaleY(1);
        transform-origin: bottom;
          
        }
  } 
    }
    span {
        opacity: 0;
        box-shadow:
        inset 0 0 50px #00ff00,
        inset 20px 0 80px #f0f,
        inset -20px 0 80px #0f0,
        inset 20px 0 300px #0f0,
        inset -20px 0 300px #0ff,
        0 0 100px #fff,
        -20px 0 80px #f0f,
        20px 0 80px #0ff;
        position: absolute;
        transition: opacity .2s ease-in-out;
        z-index: 5;
        &:nth-child(1),&:nth-child(3) {
            width: 100%;
            height: 5px;
            transform: scaleX(0)
    
        }
        &:nth-child(1) {
            animation: firstAnimate 4s linear infinite;
            top: 0;
            left: 0;
         
           
        }
        &:nth-child(3) {
            bottom: 0;
            left: 0;
            animation: thirdAnimate 4s linear infinite;
        }
        &:nth-child(2),&:nth-child(4) {
            width: 5px;
            transform: scaleY(0);
            height: 100%;
     
        }
        &:nth-child(2){
            top: 0;
            right: 0;
            transform-origin: top;
            animation: secondAnimate 4s linear infinite;
        }
        &:nth-child(4) {
            bottom: 0;
            left: 0;
            transform: scaleY(0);
            transform-origin:bottom;
            animation: fourthAnimate 4s linear infinite;
        }
        
    }
    &:hover {
        span {
            opacity:1;
        }
        
    }
    
`

const ProjectImg = styled.img`
    width:100%;
    height: auto;
  
    `
const ProjectTitleContainer = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    left: 0;
    opacity: 0;
    transition: all .3s ease-in-out;
    &:hover {
        opacity: 1;
        background: rgba(0,0,255,0.6)
    }
`
const ProjectTitle = styled.h2`
margin: 15px 0;
z-index: 5;
text-align: center;
    `

const ProjectGrid = () => {
    const [projectArray, setProject] = useState([])

    useEffect(() => {
        const projectQuery = `*[_type == "project"] {
            title, thumbnail, client
        }`
        sanityClient.fetch(projectQuery).then(project => {
            const projectsArray = []
          project.forEach(project => {
            projectsArray.push(project)          
          })
          setProject(projectsArray)
        })
        return 
      }, [])
      
    return (
        <ProjectsContainer>
         
          
            <GridContainer>
                {projectArray.map((project, id) => {
                return(
                    <ProjectContainer to={`/project/${project.title}`} key={id}>
                         <span></span>
                         <span></span>
                         <span></span>
                         <span></span>
                         <ProjectTitleContainer>
                            <ProjectTitle>{project.title}</ProjectTitle>
                         </ProjectTitleContainer>
                           
                           
                            <ProjectImg  alt="project thumbnail" src={project.thumbnail} />    
                        
                    </ProjectContainer>
                ) 
                })}
            </GridContainer>
        </ProjectsContainer>
       
    )
}

export default ProjectGrid