import React from 'react'
import styled from 'styled-components'
import { animateScroll} from 'react-scroll'

const ArrowPoint = styled.svg`
    fill: #d6333e;
    transform: rotate(90deg);
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 100;
    margin: auto;
    padding: 25px;
    cursor: pointer;
    -webkit-filter: drop-shadow( 1px 1px 5px #d6333e);
  filter: drop-shadow( 1px 1px 5px #d6333e);
  
    -webkit-animation: ease-in-out 1s infinite bounce;
    animation: ease-in-out 1s infinite bounce;
   
  @-webkit-keyframes bounce {
    0%, 100% {
      -webkit-transform: translateY(0) rotate(90deg);
    }
    50% {
      -webkit-transform: translateY(-5px) rotate(90deg);
    }
  }
  @keyframes bounce {
    0%, 100% {
      transform: translateY(0) rotate(90deg);
    }
    50% {
      transform: translateY(-5px) rotate(90deg);
    }
  }`

const Arrow = () => {
  const scroll = () => {
    animateScroll.scrollTo(720)
  }
  return(
    <ArrowPoint onClick={scroll} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M8.122 24l-4.122-4 8-8-8-8 4.122-4 11.878 12z"/>
    </ArrowPoint>
)}
export default Arrow