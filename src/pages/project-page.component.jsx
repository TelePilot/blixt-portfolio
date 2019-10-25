import React, {useState, useEffect} from 'react'
import sanityClient from '../client'
import styled from 'styled-components'
import imageUrlBuilder from "@sanity/image-url"
import Arrow from '../components/arrow/arrow.component'

const builder = imageUrlBuilder(sanityClient)
function urlFor(source) {
  return builder.image(source)
}

const HeaderContainer = styled.div`
    width: 100%;
    height: 720px;
    position: relative;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column;
    
    `
const HeaderImage = styled.img`
    width: 100%;
    height: auto;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -2;
    
`
const Overlay = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    background: rgba(0,0,0,0.6);
    z-index: -1;
    `

const Title = styled.h1`
`
const ClientName = styled.h2`
`
const Section = styled.div`
    width: 100%;
    height: 720px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    position: relative;
    
    `

const Thumbnail = styled.img`
    width: 50%;
    height: auto
   `

const DescContainer = styled.div`
    width: 50%;
    height: auto;
    text-align: left;  
`

const Desc = styled.p`
    width: 100%;
    height: auto;
    padding: 0 15%;
    margin: 0;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;`

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
        const fetchData = async () => {
            
            sanityClient.fetch(projectQuery).then(project => {
              project.forEach(project => {
                setProject(project)
              })
              
            })
        }
        fetchData()
        return
      }, [match.params.projectId])
      console.log(project.headerImage)
    return (
        <div>
              <Arrow />
             <a href={project.websiteLink}>
           <HeaderContainer>
             
              <HeaderImage alt="header Thumbnail for the project" src={urlFor(project.headerImage).url()}/>
              <Overlay />
             
              <Title>
                  {project.title}
              </Title>
              <ClientName>
                  {project.client}
              </ClientName>
              
             
           </HeaderContainer>
           </a>
           <Section>
           
               <Thumbnail alt="Thumbnail image for the project" src={urlFor(project.thumbnail).url()} />
               <DescContainer>
                <Desc>
                    {project.description}
                    <WebsiteLink href={project.websiteLink}>
                        {project.websiteLink}
                    </WebsiteLink>
                </Desc>
               </DescContainer>
              
           </Section>
           <Section>
           
                <DescContainer>
                    <Desc>
                        {project.description2}
                        <WebsiteLink href={project.websiteLink}>
                        {project.websiteLink}
                        </WebsiteLink>
                    </Desc>
                </DescContainer>
               <Thumbnail alt="Thumbnail image for the project" src={urlFor(project.thumbnail2).url()} />
         
           </Section>
           <VideoContainer>
                   <Iframe  src={project.youtubeLink} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen />
               </VideoContainer>
        </div>
    )
}

export default ProjectPage