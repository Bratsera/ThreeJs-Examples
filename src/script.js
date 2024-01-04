import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'
import { TGALoader } from 'three/addons/loaders/TGALoader.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { MTLLoader } from 'three/addons/loaders/MTLLoader.js';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
/**
 * Base
 */
// Debug
const gui = new GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()


/**
 * Materials
 */
const tgaLoader = new TGALoader();
const bloodyWoodColor = tgaLoader.load('./textures/Blood/Bloody_Wood_basecolor.tga')
const bloodyWoodAO = tgaLoader.load('./textures/Blood/Bloody_Wood_AO.tga')
const bloodyWoodHeight = tgaLoader.load('./textures/Blood/Bloody_Wood_Height.tga')
const bloodyWoodNormal = tgaLoader.load('./textures/Blood/Bloody_Wood_normal.tga')
const bloodyWoodMetallic = tgaLoader.load('./textures/Blood/Bloody_Wood_metallic.tga')
const bloodyWoodRoughness = tgaLoader.load('./textures/Blood/Bloody_Wood_roughness.tga')

const WoodColor = tgaLoader.load('./textures/roof/Bloody_Wood_basecolor.tga')
const WoodAO = tgaLoader.load('./textures/roof/Bloody_Wood_AO.tga')
const WoodHeight = tgaLoader.load('./textures/roof/Bloody_Wood_Height.tga')
const WoodNormal = tgaLoader.load('./textures/roof/Bloody_Wood_normal.tga')
const WoodMetallic = tgaLoader.load('./textures/roof/Bloody_Wood_metallic.tga')
const WoodRoughness = tgaLoader.load('./textures/roof/Bloody_Wood_roughness.tga')
// instantiate a loader
const objectLoader = new OBJLoader()
const mtlLoader = new MTLLoader()
let mixer = null


let ghost  = new THREE.Object3D()
let ghost2 = new  THREE.Object3D()
let ghost3  = new  THREE.Object3D()

//let ghostMat
// mtlLoader.load('characters/Halloween Ghost.mtl', (mat)=>{
//     ghostMat = mat
//     objectLoader.setMaterials(ghostMat)
//     objectLoader.load('characters/Halloween Ghost.obj', (object) => {
//         ghost = object
//         ghost.position.set(6,0,6)
//         ghost.scale.set(0.7,0.7,0.7)
//        ghost.material.transparent = true
//       ghost.material.opacity = 0.4
//         ghost.material.color = new THREE.Color('#8b0000')
//        scene.add(ghost)
       
        
    
//     })
    
// })

const fbxLoader = new FBXLoader()
fbxLoader.load(
    'characters/Halloween Ghost.fbx',
    (object) => {
        object.scale.set(.01, .01, .01)
        ghost = object
        ghost2 =object.clone() 
        ghost3 =object.clone() 
        ghost.visible = false
        ghost2.visible = false
        ghost3.visible = false
       
        // object.children[0].material.transparent = true
        // object.children[0].material.opacity = 0.8
         ghost.children[0].material.color = fogBlood.color
        // ghost2.children[0].material.color = ghostLight2.color
        // ghost3.children[0].material.color = ghostLight3.color
        console.log(ghost,ghost2,ghost3)
       scene.add(ghost,ghost2,ghost3)
    }
)
/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const doorColor = textureLoader.load('./textures/door/color.jpg')
const doorAlpha = textureLoader.load('./textures/door/alpha.jpg')
const doorAmbientOc = textureLoader.load('./textures/door/ambientOcclusion.jpg')
const doorHeight = textureLoader.load('./textures/door/height.jpg')
const doorNormal = textureLoader.load('./textures/door/normal.jpg')
const doorRoughness = textureLoader.load('./textures/door/roughness.jpg')

const grassAmbientOc = textureLoader.load('./textures/grass/ambientOcclusion.jpg')
const grassColor = textureLoader.load('./textures/grass/color.jpg')
const grassNormal = textureLoader.load('./textures/grass/normal.jpg')
const grassRoughness = textureLoader.load('./textures/grass/roughness.jpg')
grassAmbientOc.repeat.set(8, 8)
grassColor.repeat.set(8, 8)
grassNormal.repeat.set(8, 8)
grassRoughness.repeat.set(8, 8)
grassAmbientOc.wrapS = THREE.RepeatWrapping
grassColor.wrapS = THREE.RepeatWrapping
grassNormal.wrapS = THREE.RepeatWrapping
grassRoughness.wrapS = THREE.RepeatWrapping
grassAmbientOc.wrapT = THREE.RepeatWrapping
grassColor.wrapT = THREE.RepeatWrapping
grassNormal.wrapT = THREE.RepeatWrapping
grassRoughness.wrapT = THREE.RepeatWrapping


const bricksAmbientOc = textureLoader.load('./textures/bricks/ambientOcclusion.jpg')
const bricksColor = textureLoader.load('./textures/bricks/color.jpg')
const bricksNormal = textureLoader.load('./textures/bricks/normal.jpg')
const bricksRoughness = textureLoader.load('./textures/bricks/roughness.jpg')

const windowColor = textureLoader.load('./textures/window/Window_001_basecolor.jpg')
const windowAO = textureLoader.load('./textures/window/Window_001_ambientOcclusion.jpg')
const windowHeight = textureLoader.load('./textures/window/Window_001_height.png')
const windowNormal = textureLoader.load('./textures/window/Window_001_normal.jpg')
const windowMetallic = textureLoader.load('./textures/window/Window_001_metallic.jpg')
const windowRoughness = textureLoader.load('./textures/window/Window_001_roughness.jpg')
const windowAlpha = textureLoader.load('./textures/window/Window_001_opacity.jpg')
const windowBloodColor = textureLoader.load('./textures/window/bloodwindow.jpg')
const windowHands = textureLoader.load('./textures/window/hands.jpg')
const windowFace = textureLoader.load('./textures/window/face.jpg')


/**
 * House
 */
const house = new THREE.Group();
const houseMesh = new THREE.Mesh(
    new THREE.BoxGeometry(10, 4, 10),
    new THREE.MeshStandardMaterial({
        aoMap: bricksAmbientOc,
        aoMapIntensity: 0.7,
        map: bricksColor,
        normalMap: bricksNormal,
        roughnessMap: bricksRoughness,
        metalness: 0.3
    })
)
houseMesh.position.y = 2
houseMesh.colorSpace = THREE.SRGBColorSpace
houseMesh.castShadow = true
// Roof
const roofNormalMat = new THREE.MeshStandardMaterial({ color: '#b35f45' })
const roofMesh = new THREE.Mesh(
    new THREE.ConeGeometry(8, 2.2, 4, 4),
    roofNormalMat
)
roofMesh.position.y = 5.1
roofMesh.rotation.y = Math.PI / 4
gui.add(roofMesh.scale, "x").min(0).max(20).step(0.1).name("scaleX")
gui.add(roofMesh.scale, "z").min(0).max(20).step(0.1).name("scaleZ")


// Door

const doorDefaultMat = new THREE.MeshStandardMaterial({
    map: doorColor,
    transparent: true,
    alphaMap: doorAlpha,
    aoMap: doorAmbientOc,
    aoMapIntensity: 0.7,
    normalMap: doorNormal,
    roughnessMap: doorRoughness,
    displacementMap: doorHeight,
    displacementScale: 0.5

})

const bloodWoodMat = new THREE.MeshStandardMaterial({
    map: bloodyWoodColor,
    transparent: true,
    aoMap: bloodyWoodAO,
    aoMapIntensity: 0.7,
    normalMap: bloodyWoodNormal,
    roughnessMap: bloodyWoodRoughness,
    metalnessMap: bloodyWoodMetallic

})
const monsterMat = new THREE.MeshStandardMaterial({
    map: windowFace
})
const doorMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(2.45, 2.45),
    doorDefaultMat
)

doorMesh.position.x = 5.01
doorMesh.position.y = 1.1
doorMesh.rotation.y = Math.PI / 2
doorMesh.colorSpace = THREE.SRGBColorSpace




//Window
const windowFrameMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(2, 2),
    new THREE.MeshStandardMaterial({
        map: windowColor,
        transparent: true,
        alphaMap: windowAlpha,
        aoMap: windowAO,
        aoMapIntensity: 0.7,
        normalMap: windowNormal,
        roughnessMap: windowRoughness,
        displacementMap: windowHeight,
        displacementScale: 0.5,
        metalnessMap: windowMetallic

    })
)
const windowFrameMesh2 = new THREE.Mesh(
    new THREE.PlaneGeometry(2, 2),
    new THREE.MeshStandardMaterial({
        map: windowColor,
        transparent: true,
        alphaMap: windowAlpha,
        aoMap: windowAO,
        aoMapIntensity: 0.7,
        normalMap: windowNormal,
        roughnessMap: windowRoughness,
        displacementMap: windowHeight,
        displacementScale: 0.5,
        metalnessMap: windowMetallic

    })
)

const windowFrameMesh3 = new THREE.Mesh(
    new THREE.PlaneGeometry(2, 2),
    new THREE.MeshStandardMaterial({
        map: windowColor,
        transparent: true,
        alphaMap: windowAlpha,
        aoMap: windowAO,
        aoMapIntensity: 0.7,
        normalMap: windowNormal,
        roughnessMap: windowRoughness,
        displacementMap: windowHeight,
        displacementScale: 0.5,
        metalnessMap: windowMetallic

    })
)
windowFrameMesh.position.z = 5.02
windowFrameMesh.position.y = 2
windowFrameMesh.colorSpace = THREE.SRGBColorSpace

windowFrameMesh2.position.z = -5.02
windowFrameMesh2.position.y = 2
windowFrameMesh2.colorSpace = THREE.SRGBColorSpace
windowFrameMesh2.rotation.y = Math.PI

windowFrameMesh3.position.x = -5.02
windowFrameMesh3.position.z = 0
windowFrameMesh3.position.y = 2
windowFrameMesh3.colorSpace = THREE.SRGBColorSpace
windowFrameMesh3.rotation.y = -Math.PI /2

const glassMatBlack = new THREE.MeshStandardMaterial({
    color: 'black',
})
const glassMatHands = new THREE.MeshStandardMaterial({
    map: windowHands
})
const glassBloodMat = new THREE.MeshStandardMaterial({
    map: windowBloodColor,
    metalness: 0.9,
    roughness: 0

})


const windowGlassMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(1.8, 1),
    glassMatBlack
)

const windowGlassMesh2 = new THREE.Mesh(
    new THREE.PlaneGeometry(1.8, 1),
    glassMatBlack
)
const windowGlassMesh3 = new THREE.Mesh(
    new THREE.PlaneGeometry(1.8, 1),
    glassMatBlack
)


windowGlassMesh.position.z = 5.01
windowGlassMesh.position.y = 2
windowGlassMesh.position.x = 0
windowGlassMesh.colorSpace = THREE.SRGBColorSpace

windowGlassMesh2.position.z = -5.01
windowGlassMesh2.position.y = 2
windowGlassMesh2.rotation.y = Math.PI
windowGlassMesh2.position.x = 0
windowGlassMesh2.colorSpace = THREE.SRGBColorSpace

windowGlassMesh3.position.x = -5.01
windowGlassMesh3.position.y = 2
windowGlassMesh3.rotation.y = -Math.PI / 2
windowGlassMesh3.colorSpace = THREE.SRGBColorSpace

// Floor
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(60, 60),
    new THREE.MeshStandardMaterial({
        map: grassColor,
        roughness: grassRoughness,
        normalMap: grassNormal,
        aoMap: grassAmbientOc,
        aoMapIntensity: 0.7
    })
)
floor.rotation.x = - Math.PI * 0.5
floor.position.y = 0
floor.colorSpace = THREE.SRGBColorSpace
floor.receiveShadow = true



// Bushes
const bushmaterial = new THREE.MeshStandardMaterial({ color: 'green' });
const bushGeometry = new THREE.SphereGeometry(0.7, 15, 15)
const bush1 = new THREE.Mesh(bushGeometry, bushmaterial)
const bush2 = new THREE.Mesh(bushGeometry, bushmaterial)
const bush3 = new THREE.Mesh(bushGeometry, bushmaterial)
const bush4 = new THREE.Mesh(bushGeometry, bushmaterial)

bush1.position.set(5.4, 0.5, 1.5)
bush1.scale.z = 0.8
bush1.scale.x = 0.6
bush1.castShadow = true
bush2.position.set(5.35, 0.36, 2.3)
bush2.scale.z = 0.5
bush2.scale.x = 0.4
bush2.scale.y = 0.6
bush2.castShadow = true
bush3.position.set(5.35, 0.36, -1.2)
bush3.scale.z = 0.5
bush3.scale.x = 0.4
bush3.scale.y = 0.7
bush3.castShadow = true
bush4.position.set(5.3, 0.22, -1.75)
bush4.scale.z = 0.4
bush4.scale.x = 0.4
bush4.scale.y = 0.4
bush4.castShadow = true
house.add(houseMesh, roofMesh, doorMesh, bush1, bush2, bush3, bush4, windowFrameMesh, windowFrameMesh2, windowFrameMesh3,windowGlassMesh,windowGlassMesh2, windowGlassMesh3)
scene.add(floor, house)


/**
 * Gravestones
 * 
 */

const graveGeometry = new THREE.BoxGeometry(0.25, 0.8, 0.5)
const graveMat = new THREE.MeshStandardMaterial({ color: 'grey' })

for (let i = 0; i < 100; i++) {
    const grave = new THREE.Mesh(
        graveGeometry,
        graveMat
    )

    let graveAngle = Math.random() * 2 * Math.PI
    grave.position.x = Math.cos(graveAngle) * (8 + Math.random() * 14)
    grave.position.z = Math.sin(graveAngle) * (8 + Math.random() * 14)
    grave.position.y = 0.33
    grave.rotation.x = Math.PI * ((Math.random() - 0.5) * 0.1)
    grave.castShadow = true
    scene.add(grave)
}


/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight('#ffffff', 0.05)
gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001)
scene.add(ambientLight)

// Directional light
const moonLight = new THREE.DirectionalLight('#ffffff', 0.4)
moonLight.position.set(10, 17, - 15)

moonLight.castShadow = true
const targetObject = new THREE.Object3D();
targetObject.position.set(0, 4, 0)
gui.add(moonLight, 'intensity').min(0).max(1).step(0.001)
gui.add(moonLight.position, 'x').min(- 5).max(5).step(0.001)
gui.add(moonLight.position, 'y').min(- 5).max(5).step(0.001)
gui.add(moonLight.position, 'z').min(- 5).max(5).step(0.001)
moonLight.shadow.mapSize.width = 256
moonLight.shadow.mapSize.height = 256
moonLight.shadow.camera.top = 15
moonLight.shadow.camera.right = 20
moonLight.shadow.camera.bottom = -15
moonLight.shadow.camera.left = -20
moonLight.shadow.camera.far = 45
moonLight.shadow.camera.near = 6
//const moonShadowHelper = new THREE.CameraHelper(moonLight.shadow.camera)
scene.add(moonLight, targetObject)
moonLight.target = targetObject


// HouseLights
const houselight1 = new THREE.Group()
const houselight2 = new THREE.Group()
const houselight3 = new THREE.Group()
const houselight4 = new THREE.Group()
const lampMat = new THREE.MeshStandardMaterial({
    color: '#FFE5B4',
    metalness: 0.3,
    roughness: 0
})

// Light 1
const lampHolder = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.5, 15, 15, false), lampMat)
lampHolder.position.set(5.18, 3.7, 0)
lampHolder.rotation.z = Math.PI / 2

const lampTop = new THREE.Mesh(new THREE.CircleGeometry(0.1, 20), lampMat)
lampTop.position.set(5.353, 3.701, 0)
lampTop.rotation.x = 1.58
lampTop.rotation.y = 0.63
lampTop.material.side = THREE.DoubleSide

const lampFrame = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.25, 0.5, 20, 20, true), lampMat)
lampFrame.position.set(5.5, 3.5, 0)
lampFrame.rotation.z = Math.PI / 5
lampFrame.material.side = THREE.DoubleSide
lampFrame.castShadow = true

const housePointLight = new THREE.PointLight('yellow', 1, 0.5, 1)
housePointLight.position.set(5.6, 3.45, 0)

const houseSpotLight = new THREE.SpotLight('yellow', 3, 15, Math.PI / 3, 0.3, 0.1)
houseSpotLight.target = new THREE.Object3D()
houseSpotLight.target.position.set(7, 0, 0)
houseSpotLight.position.set(5.5, 3.6, 0)
houseSpotLight.castShadow = true
houseSpotLight.shadow.mapSize.width = 256
houseSpotLight.shadow.mapSize.height = 256
houseSpotLight.shadow.camera.far = 15





houselight1.add(houseSpotLight, lampFrame, lampHolder, lampTop, housePointLight)
house.add(houselight1)

// Light 2
houselight2.copy(houselight1)
houselight2.rotation.y = Math.PI * 1.5
const houseSpotLight2 = houselight2.children[0];
const housePointLight2 = houselight2.children[4]
houseSpotLight2.target = new THREE.Object3D()
houseSpotLight2.target.position.set(0, 0, 7)

// Light 3
houselight3.copy(houselight1)
houselight3.rotation.y = Math.PI * 3
const houseSpotLight3 = houselight3.children[0];
const housePointLight3 = houselight3.children[4]
houseSpotLight3.target = new THREE.Object3D()
houseSpotLight3.target.position.set(-7, 0, 0)

// Light 4
houselight4.copy(houselight1)
houselight4.rotation.y = -Math.PI * 1.5
const houseSpotLight4 = houselight4.children[0];
const housePointLight4 = houselight4.children[4]
houseSpotLight4.target = new THREE.Object3D()
houseSpotLight4.target.position.set(0, 0, -7)

house.add(houselight1, houselight2, houselight3, houselight4, houseSpotLight4.target, houseSpotLight3.target, houseSpotLight2.target)


const houseLightFolder = gui.addFolder('HouseLight')
houseLightFolder.add(houseSpotLight, 'intensity').min(0).max(5).step(0.1)
houseLightFolder.add(houseSpotLight, 'distance').min(0).max(8).step(0.1)
houseLightFolder.add(houseSpotLight, 'decay').min(0).max(8).step(0.1)
houseLightFolder.add(houseSpotLight, 'angle').min(0).max(8).step(0.1)
houseLightFolder.add(houselight2.position, 'x').min(- 5).max(10).step(0.001)
houseLightFolder.add(houselight2.position, 'y').min(- 5).max(10).step(0.001)
houseLightFolder.add(houselight2.position, 'z').min(- 5).max(10).step(0.001)
houseLightFolder.add(houselight2.rotation, 'x').min(0).max(5).step(0.1)
houseLightFolder.add(houselight2.rotation, 'y').min(0).max(5).step(0.1)
houseLightFolder.add(houselight2.rotation, 'z').min(0).max(5).step(0.1)
const x = new THREE.SpotLightHelper(houseSpotLight)


// Ghosts
const ghostLight1 = new THREE.PointLight('#ff00ff', 6, 4)
ghostLight1.position.x
const ghostLight2 = new THREE.PointLight('#00ffff', 6, 4)
ghostLight2.position.y = 1.5
const ghostLight3 = new THREE.PointLight('#ffff00', 6, 4)
ghostLight1.visible = false
ghostLight2.visible = false
ghostLight3.visible = false

function updateGhostPos(elapsedTime) {
    [ghostLight1, ghostLight2, ghostLight3].forEach(ghost => {
        if (ghost.position.x > 5 && Math.abs(ghost.position.z) < 6)
            ghost.visible = !housePointLight.visible
        else if (ghost.position.z > 5 && Math.abs(ghost.position.x) < 6)
            ghost.visible = !housePointLight2.visible
        else if (ghost.position.x < -5 && Math.abs(ghost.position.z) < 6)
            ghost.visible = !housePointLight3.visible
        else if (ghost.position.z < -5 && Math.abs(ghost.position.x) < 6)
            ghost.visible = !housePointLight4.visible
        else
            ghost.visible = true
    })

    if (ghostLight1.visible) {
        const ghost1Angle = (elapsedTime - 3) / 4
        ghostLight1.position.x = Math.cos(ghost1Angle) * (13 + Math.sin(elapsedTime * 1) * 3)
        ghostLight1.position.z = Math.sin(ghost1Angle) * (13 + Math.sin(elapsedTime * 1) * 3)
        ghostLight1.position.y = Math.abs(Math.sin(elapsedTime * 2) * 1.5 + Math.sin(elapsedTime * 4))
        if(ghost && isSilentHillMode){
            ghost.position.set(
                ghostLight1.position.x,
                0,
                ghostLight1.position.z
            )
            ghostLight1.intensity =15;
            ghostLight1.distance =10
            
        }
    }

    if (ghostLight2.visible) {
        const ghost2Angle = (elapsedTime - 6) / 6
        ghostLight2.position.x = Math.cos(ghost2Angle) * (16 + Math.sin(elapsedTime * 1) * 5)
        ghostLight2.position.z = Math.sin(ghost2Angle) * (16 + Math.sin(elapsedTime * 1) * 3)
        //ghostLight2.position.y = Math.abs(Math.sin(elapsedTime * 0.5)) 
        if(ghost2 && isSilentHillMode){
            ghost2.position.set(
                ghostLight2.position.x,
                0,
                ghostLight2.position.z
            )
            ghostLight2.intensity =15;
            ghostLight2.distance =10
            
        }
    }
    if (ghostLight3.visible) {
        const ghost3Angle = elapsedTime / 3
        ghostLight3.position.x = Math.cos(ghost3Angle) * (14 + Math.sin(elapsedTime * 1.5) * 3)
        ghostLight3.position.z = Math.sin(ghost3Angle) * (13 + Math.sin(elapsedTime * 1) * 5)
        ghostLight3.position.y = Math.abs(Math.sin(elapsedTime * 2) * 1.5 + Math.sin(elapsedTime * 4))
        if(ghost3 && isSilentHillMode){
            ghost3.position.set(
                ghostLight3.position.x,
                0,
                ghostLight3.position.z
            )
            ghostLight3.intensity =15;
            ghostLight3.distance =10
            
        }
    }


}
scene.add(ghostLight1, ghostLight2, ghostLight3)


/**
 * Fog
 */

const fogNormal = new THREE.Fog('#262837', 4, 50)
const fogBlood = new THREE.Fog('#8b0000', 0, 40)
scene.fog = fogNormal


/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    if (text) {
        //text.position.set((-camera.position.x + 2) *camera.aspect *2.6 ,(camera.position.y), -10 ); // top left
    }
    camera.updateProjectionMatrix()


    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 4
camera.position.y = 2
camera.position.z = 5
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setClearColor(fogNormal.color)
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap

//colorTexture.generateMipmaps = false
//colorTexture.minFilter = THREE.NearestFilter

/**
 * Animate
 */
const clock = new THREE.Clock()
let lightOffTimer1 = (Math.random() + 0.5) * 6
let lightOnTimer1;
let lightOffTimer2 = (Math.random() + 0.5) * 3
let lightOnTimer2;
let lightOffTimer3 = (Math.random() + 0.5) * 4
let lightOnTimer3;
let lightOffTimer4 = (Math.random() + 0.5) * 2
let lightOnTimer4;
let isSilentHillMode = false;
let silentHillTimer = 30
/**
 * Fonts
 */

let loadedFont
let text
let textGeometry
const textMaterial = new THREE.MeshBasicMaterial({ color: '#8a0303' })
const fontLoader = new FontLoader()
fontLoader.load(
    '/fonts/Bloody_Normal.json',
    (font) => {
        loadedFont = font
        textGeometry = new TextGeometry(
            silentHillTimer.toString(),
            {
                font: loadedFont,
                size: 1,
                height: 0.2,
                curveSegments: 15,
                bevelEnabled: true,
                bevelThickness: 0.03,
                bevelSize: 0.02,
                bevelOffset: 0,
                bevelSegments: 5
            }
        )

        textGeometry.center()
        text = new THREE.Mesh(textGeometry, textMaterial)
        text.position.set(0, 7.5, 0)
        text.rotation.y = Math.PI / 2

        scene.add(text)
    }
)

const tick = () => {
    if(mixer)
    {
        mixer.update(clock.getDelta())
    }
    const elapsedTime = clock.getElapsedTime()
    updateLampLights(elapsedTime);

    if (isSilentHillMode) {
        doorMesh.position.x = Math.sin(elapsedTime / 3) * 3
        console.log(ghost,ghost2,ghost3)
        let list = new Array(ghost, ghost2, ghost3)
        list.forEach(ghost => {
            if (ghost.position.x > 5 && Math.abs(ghost.position.z) < 6)
                ghost.visible = !housePointLight.visible
            else if (ghost.position.z > 5 && Math.abs(ghost.position.x) < 6)
                ghost.visible = !housePointLight2.visible
            else if (ghost.position.x < -5 && Math.abs(ghost.position.z) < 6)
                ghost.visible = !housePointLight3.visible
            else if (ghost.position.z < -5 && Math.abs(ghost.position.x) < 6)
                ghost.visible = !housePointLight4.visible
            else
                ghost.visible = true
        })
    }
    updateGhostPos(elapsedTime)
    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}


function updateLampLights(elapsedTime) {
    if (lightOffTimer1 && elapsedTime > lightOffTimer1) {
        houseSpotLight.visible = false;
        housePointLight.visible = false;
        lightOffTimer1 = null;
        lightOnTimer1 = elapsedTime + (Math.random() + 0.2) * 4;
    }
    if (lightOffTimer2 && elapsedTime > lightOffTimer2) {
        houseSpotLight2.visible = false;
        housePointLight2.visible = false;
        lightOffTimer2 = null;
        lightOnTimer2 = elapsedTime + (Math.random() + 0.2) * 1;
    }

    if (lightOffTimer3 && elapsedTime > lightOffTimer3) {

        houseSpotLight3.visible = false;
        housePointLight3.visible = false;
        lightOffTimer3 = null;
        lightOnTimer3 = elapsedTime + (Math.random() + 0.2) * 2;
    }
    if (lightOffTimer4 && elapsedTime > lightOffTimer4) {
        houseSpotLight4.visible = false;
        housePointLight4.visible = false;
        lightOffTimer4 = null;
        lightOnTimer4 = elapsedTime + (Math.random() + 0.2) * 5;
    }
    if (lightOnTimer1 && elapsedTime > lightOnTimer1) {
        houseSpotLight.visible = true;
        housePointLight.visible = true;
        lightOffTimer1 = elapsedTime + (Math.random() + 0.5) * 6;
        lightOnTimer1 = null;
    }
    if (lightOnTimer2 && elapsedTime > lightOnTimer2) {
        houseSpotLight2.visible = true;
        housePointLight2.visible = true;
        lightOffTimer2 = elapsedTime + (Math.random() + 0.5) * 3;
        lightOnTimer2 = null;
    }
    if (lightOnTimer3 && elapsedTime > lightOnTimer3) {
        houseSpotLight3.visible = true;
        housePointLight3.visible = true;
        lightOffTimer3 = elapsedTime + (Math.random() + 0.5) * 4;
        lightOnTimer3 = null;
    }
    if (lightOnTimer4 && elapsedTime > lightOnTimer4) {
        houseSpotLight4.visible = true;
        housePointLight4.visible = true;
        lightOffTimer4 = elapsedTime + (Math.random() + 0.5) * 2;
        lightOnTimer4 = null;
    }
}

function silentHillMode() {
    isSilentHillMode = true
    scene.fog = fogBlood
    renderer.setClearColor(fogBlood.color)
    windowFrameMesh.material.map = windowBloodColor
    windowGlassMesh.material = glassBloodMat
    doorMesh.material.map = bloodyWoodColor
    doorMesh.position.set(0, 1.1, -5.01)
    doorMesh.rotation.y = Math.PI
    roofMesh.material = bloodWoodMat
    textMaterial.color = new THREE.Color('Black')
    windowGlassMesh3.position.set(5.01, 1.1, 0)
    windowFrameMesh3.position.set(5.02, 1.1, 0)
    windowGlassMesh3.material = monsterMat
    windowGlassMesh2.material = glassMatHands
}

function normalMode() {
    isSilentHillMode = false;
    scene.fog = fogNormal
    renderer.setClearColor(fogNormal.color)
    windowFrameMesh.material.map = windowColor
    windowGlassMesh.material = glassMatBlack
    doorMesh.material.map = doorColor
    doorMesh.position.set(5.01, 1.1, 0)
    doorMesh.rotation.y = Math.PI / 2
    roofMesh.material = roofNormalMat
    textMaterial.color = new THREE.Color('#8a0303')
    ghost.visible = false
    ghost2.visible = false
    ghost3.visible = false 
    windowGlassMesh3.position.set(0, 1.1, -5.01)
    windowFrameMesh3.position.set(0, 1.1, -5.02)
    windowGlassMesh3.material = glassMatBlack
    windowGlassMesh2.material = glassMatBlack

}
//Image by <a href="https://www.freepik.com/free-vector/hand-drawn-blood-handprint-background_65135373.htm#query=texture%20bloody&position=23&from_view=search&track=ais&uuid=85042561-c4e4-498f-9e8e-9e407f040c78">Freepik</a>
tick()
setInterval(() => {
    silentHillTimer -= 1
    if (silentHillTimer == 0) {
        if (isSilentHillMode)
            normalMode()
        else
            silentHillMode()
        silentHillTimer = 30
    }
    text.geometry.dispose()
    textGeometry = new TextGeometry(
        silentHillTimer.toString(),
        {
            font: loadedFont,
            size: 1,
            height: 0.2,
            curveSegments: 15,
            bevelEnabled: true,
            bevelThickness: 0.03,
            bevelSize: 0.02,
            bevelOffset: 0,
            bevelSegments: 5
        }
    )

    textGeometry.center()
    text.geometry = textGeometry
}, 1000)
//<a href="https://www.freepik.com/free-vector/red-ink-splatter-vector_1177184.htm#query=texture%20bloody&position=14&from_view=search&track=ais&uuid=c203ed78-0e49-48e9-afad-fb87f329b6b8">Image by starline</a> on Freepik

//Cam start pos ändern
// Blinken von facewindow ind lightupdate 
//Foto von <a href="https://unsplash.com/de/@nseylubangi?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Nsey Benajah</a> auf <a href="https://unsplash.com/de/fotos/mannergesicht-mit-weissem-schal-5_gku5Usbzk?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
//Image by <a href="https://www.freepik.com/free-photo/terrifying-hands-silhouettes-studio_60407002.htm#query=horror%20ghost&position=32&from_view=search&track=ais&uuid=b5417ba4-cd92-4a85-866e-2018adcf1fcf">Freepik</a>