import * as THREE from 'three'
import styled from 'styled-components'

import React, { useEffect, useRef, useMemo} from 'react'

import { Canvas, useThree, useFrame, extend } from 'react-three-fiber'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader'
import { AdditiveBlendingShader, VolumetricLightShader } from './shaders'

const CanvasContainer = styled.div`
position: absolute
  width: 100%
  top: 0;
  left: 0;
  height: 100%;
  @media screen and (max-width: 1000px) {
    width: 100%;
  }
`
extend({ EffectComposer, RenderPass, ShaderPass, OrbitControls  })
const DEFAULT_LAYER = 0
const OCCLUSION_LAYER = 1


function Sphere({ layer = DEFAULT_LAYER }) {
  const ref = useRef()
  const Material = useMemo(() => `mesh${layer === DEFAULT_LAYER ? 'Physical' : 'Basic'}Material`, [layer])
  const color = useMemo(() => (layer === DEFAULT_LAYER ? '#ff00ff' : '#070707'), [layer])
  useFrame(({ clock }) => {
    const r = 15
    let theta = -5
    const dTheta = 2 * Math.PI / 1000
    theta += clock.getElapsedTime() + dTheta 
    ref.current.position.y = r * Math.sin(theta / 4) 
    ref.current.position.x = (r * Math.cos(theta / 4))
    ref.current.rotation.x += 0.005
    ref.current.rotation.y += 0.005
    ref.current.rotation.z += 0.005
  })
  return (
    <mesh ref={ref} position={[0, 5, 1]} layers={layer} receiveShadow castShadow>
      <sphereBufferGeometry attach="geometry" args={[4, 32, 12]} />
      <Material attach="material"  color={color} roughness={1} clearcoat={1} clearcoatRoughness={0.2} />
    </mesh>
  )
}
function Box({ layer = DEFAULT_LAYER }) {
  const ref = useRef()
  const Material = useMemo(() => `mesh${layer === DEFAULT_LAYER ? 'Physical' : 'Basic'}Material`, [layer])
  const color = useMemo(() => (layer === DEFAULT_LAYER ? '#ff00ff' : '#070707'), [layer])
  useFrame(({ clock }) => {
    ref.current.rotation.x -= 0.005
    ref.current.rotation.y += 0.005
    ref.current.rotation.z += 0.005
  })
  return (
    <mesh ref={ref} position={[0, 0, 2]} layers={layer} receiveShadow castShadow>
      <boxBufferGeometry attach="geometry" args={[10, 10, 10]} />
      <Material attach="material" wireframe={true} color={color} roughness={1} clearcoat={1} clearcoatRoughness={0.2} />
    </mesh>
  )
}

function Effects() {
  const { gl, scene, camera, size } = useThree()
  camera.position.z = 25
  const occlusionRenderTarget = useMemo(() => new THREE.WebGLRenderTarget(), [])
  const occlusionComposer = useRef()
  const composer = useRef()
  const light = useRef()

  useEffect(() => {
    occlusionComposer.current.setSize(size.width, size.height)
    composer.current.setSize(size.width, size.height)
    return
  }, [size])
  
  
  useFrame(() => {
    light.current.rotation.z += 0.001
    camera.layers.set(OCCLUSION_LAYER)
    occlusionComposer.current.render()
    camera.layers.set(DEFAULT_LAYER)
    composer.current.render()
    return
  }, 1)

  return (
    <>
      <mesh ref={light} layers={OCCLUSION_LAYER}>
        <boxBufferGeometry  attach="geometry" args={[2, 50, 2]} />
        <meshBasicMaterial attach="material" color="#00ff00" />
      </mesh>
      <effectComposer ref={occlusionComposer} args={[gl, occlusionRenderTarget]} renderToScreen={false}>
        <renderPass attachArray="passes" args={[scene, camera]} />
        <shaderPass attachArray="passes" args={[VolumetricLightShader]} needsSwap={false} />
      </effectComposer>
      <effectComposer ref={composer} args={[gl]}>
        <renderPass attachArray="passes" args={[scene, camera]} />
        <shaderPass attachArray="passes" args={[AdditiveBlendingShader]} uniforms-tAdd-value={occlusionRenderTarget.texture} />
        <shaderPass attachArray="passes" args={[FXAAShader]} uniforms-resolution-value={[1 / size.width, 1 / size.height]} renderToScreen />
      </effectComposer>
    </>
  )
}


function ThreeComponent() {
  return (
    <CanvasContainer>
      <Canvas shadowMap>
        <ambientLight />
        <pointLight />
        <spotLight castShadow intensity={4} angle={Math.PI / 10} position={[10, 10, 10]} shadow-mapSize-width={2048} shadow-mapSize-height={2048} />
        <Sphere />
        <Sphere layer={OCCLUSION_LAYER} />
        <Box />
        <Box layer={OCCLUSION_LAYER} />
        <Effects />
        
      </Canvas>
    </CanvasContainer>
   
  )
}

export default ThreeComponent