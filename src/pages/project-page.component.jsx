import React, {useState, useEffect} from 'react'
import sanityClient from '../client'
import styled from 'styled-components'
import imageUrlBuilder from "@sanity/image-url"
import Arrow from '../components/arrow/arrow.component'

const builder = imageUrlBuilder(sanityClient)
function urlFor(source) {
  return builder.image(source)
}


const HeaderImage = styled.div`
    width: 100%;
    height: 100vh;
    z-index: 1;
    display: flex;
    justify-content: center;
    flex-flow: column;
    align-items: center;
    background-position: center; 
    background-repeat: no-repeat;
    background-size: cover; 
    
`
const Overlay = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    background: rgba(0,0,0,0.6);
    z-index: 0;
    `

const Title = styled.h1`
    position: relative;
    z-index: 2;
`
const ClientName = styled.h2`
position: relative;
z-index: 2;
`
const Section = styled.div`
    width: 100%;
    height: 720px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    position: relative;
    
    `

const Thumbnail = styled.div`
    width: 50%;
    height: 100%;
    background-position: center; 
    background-repeat: no-repeat;
    background-size: cover; 
    @media only screen and (max-width: 1000px) {
        width: 100%;
        height: 50%;
     }
   `

const DescContainer = styled.div`
    width: 100%;
    height: 100%;
    text-align: left;  
    display: flex;
    justify-content: center;
    align-items: center;
    @media only screen and (max-width: 1000px) {
        flex-flow: column-reverse;
    }
`
const DescContainer2 = styled.div`
    width: 100%;
    height: 100%;
    text-align: left;  
    display: flex;
    justify-content: center;
    align-items: center;
    @media only screen and (max-width: 1000px) {
        flex-flow: column;
    }
`
const DescTextCont = styled.div`
    width: 50%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    @media only screen and (max-width: 1000px) {
        width: 100%;
        height: 50%;
     }
`
const Desc = styled.p`
    
    font-size: 16px;
    line-height: 1.3;
    padding: 0 15%;
    margin: 0;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    @media only screen and (max-width: 1000px) {
        padding: 0 25%;
        text-align: center;
     }
    `

const VideoContainer = styled.div`
    width: 100%;
    height: 720px
    background: black;
    `

const Iframe = styled.iframe`
    width: 100%;
    height: 100%;
`    
const WebsiteLink = styled.a`
`

  

const ProjectPage = ({ match }) => {
    
    const [project, setProject] = useState([])
    
    useEffect(() => {
        const projectQuery = `*[_type == "project" && title == "${match.params.projectId}"]`
     
            
            sanityClient.fetch(projectQuery).then(project => {
              project.forEach(project => {
                setProject(project)
              })
              
            })
        
        return
      }, [match.params.projectId])
    return (
        <div>
              <Arrow />
             <a href={project.websiteLink}>
        
             
              <HeaderImage style={{backgroundImage:`url(${urlFor(project.headerImage).url()})` }}>
              <Title>
                  {project.title}
              </Title>
              <ClientName>
                  {project.client}
              </ClientName>
              <Overlay />
              </HeaderImage>
           </a>
           <Section>
           
             
               <DescContainer>
               <Thumbnail alt="Thumbnail image for the project" style={{backgroundImage: `url(${project.thumbnail})`}} />
               <DescTextCont>
                <Desc>
                        {project.description}
                        <WebsiteLink href={project.websiteLink}>
                            {project.websiteLink}
                        </WebsiteLink>
                    </Desc>
               </DescTextCont>
               
               </DescContainer>
              
           </Section>
           <Section>
           
                <DescContainer2>
                    <DescTextCont>
                    <Desc>
                        {project.description2}
                        <WebsiteLink href={project.websiteLink}>
                        {project.websiteLink}
                        </WebsiteLink>
                    </Desc>
                    </DescTextCont>
                   
                    <Thumbnail alt="Thumbnail image for the project" style={{backgroundImage: `url(${urlFor(project.thumbnail2).url()})`}} />
                </DescContainer2>
              
         
           </Section>
           <VideoContainer>
                   <Iframe  src={project.youtubeLink} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen />
               </VideoContainer>
        </div>
    )
}

export default ProjectPage