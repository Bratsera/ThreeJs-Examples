import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'
import { TGALoader } from 'three/addons/loaders/TGALoader.js'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import Stats from 'stats.js'

const stats = new Stats()
stats.showPanel(0) // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild(stats.dom)
/**
 * Base
 */
// Debug
const gui = new GUI()
const debugObject = {
    silentHillMode: () => {
            if (isSilentHillMode)
                normalMode()
            else
                silentHillMode()
            silentHillTimer = 30
    }
}
gui.hide()
gui.add(debugObject, 'silentHillMode').name('Start/Stop Silent Hill Mode')
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Info dialog

const infoDialog = document.querySelector('.info')
infoDialog.addEventListener('click', event => {
    if (event.target === event.currentTarget) {
        event.currentTarget.close()
        clock.start()
        clock.elapsedTime = previousTime
        tick();
    }
})
infoDialog.showModal()

document.addEventListener('keydown', ($event) => {
    if ($event.key == " ") {
        if (infoDialog.open) {
            infoDialog.close()

            clock.start()
            clock.elapsedTime = previousTime
            tick();
        }
        else {
            infoDialog.showModal()
            previousTime = clock.elapsedTime
            clock.stop()
        }
    }
})

// Display mode
const violenceCbx = document.getElementById('violence-cbx')
violenceCbx.addEventListener('change', ($event) =>{
    if(violenceCbx.checked){
        if (isSilentHillMode){
            normalMode()
            renderer.render(scene, camera)
        }
        text.visible = false
        //gui.hide()
    }
    else{
        text.visible = true
        // gui.show()
    }
})

/**
 * Materials
 */
const tgaLoader = new TGALoader()

const bloodyWoodColor = tgaLoader.load('./textures/Blood/Bloody_Wood_basecolor.tga')
bloodyWoodColor.generateMipmaps = false
bloodyWoodColor.minFilter = THREE.NearestFilter
const bloodyWoodAO = tgaLoader.load('./textures/Blood/Bloody_Wood_AO.tga')
bloodyWoodAO.generateMipmaps = false
bloodyWoodAO.minFilter = THREE.NearestFilter
//const bloodyWoodHeight = tgaLoader.load('./textures/Blood/Bloody_Wood_Height.tga')

const bloodyWoodNormal = tgaLoader.load('./textures/Blood/Bloody_Wood_normal.tga')

const bloodyWoodMetallic = tgaLoader.load('./textures/Blood/Bloody_Wood_metallic.tga')
bloodyWoodMetallic.generateMipmaps = false
bloodyWoodMetallic.minFilter = THREE.NearestFilter
const bloodyWoodRoughness = tgaLoader.load('./textures/Blood/Bloody_Wood_roughness.tga')
bloodyWoodRoughness.generateMipmaps = false
bloodyWoodRoughness.minFilter = THREE.NearestFilter

let ghost = new THREE.Object3D()
let ghost2 = new THREE.Object3D()
let ghost3 = new THREE.Object3D()

const fbxLoader = new FBXLoader()
fbxLoader.load(
    'characters/Halloween Ghost.fbx',
    (object) => {
        object.scale.set(.01, .01, .01)
        ghost = object
        ghost2 = object.clone()
        ghost3 = object.clone()
        ghost.visible = false
        ghost2.visible = false
        ghost3.visible = false
        ghost.children[0].material.color = fogBlood.color
        scene.add(ghost, ghost2, ghost3)
    }
)
/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const doorColor = textureLoader.load('./textures/door/color.jpg')
doorColor.generateMipmaps = false
doorColor.minFilter = THREE.NearestFilter
const doorAlpha = textureLoader.load('./textures/door/alpha.jpg')
doorAlpha.generateMipmaps = false
doorAlpha.minFilter = THREE.NearestFilter
const doorAmbientOc = textureLoader.load('./textures/door/ambientOcclusion.jpg')
doorAmbientOc.generateMipmaps = false
doorAmbientOc.minFilter = THREE.NearestFilter
//const doorHeight = textureLoader.load('./textures/door/height.jpg')
//doorHeight.generateMipmaps = false
//doorHeight.minFilter = THREE.NearestFilter
const doorNormal = textureLoader.load('./textures/door/normal.jpg')
const doorRoughness = textureLoader.load('./textures/door/roughness.jpg')
doorRoughness.generateMipmaps = false
doorRoughness.minFilter = THREE.NearestFilter

const grassAmbientOc = textureLoader.load('./textures/grass/ambientOcclusion.jpg')
grassAmbientOc.generateMipmaps = false
grassAmbientOc.minFilter = THREE.NearestFilter
const grassColor = textureLoader.load('./textures/grass/color.jpg')
grassColor.generateMipmaps = false
grassColor.minFilter = THREE.NearestFilter
const grassNormal = textureLoader.load('./textures/grass/normal.jpg')
const grassRoughness = textureLoader.load('./textures/grass/roughness.jpg')
grassRoughness.generateMipmaps = false
grassRoughness.minFilter = THREE.NearestFilter

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
bricksAmbientOc.generateMipmaps = false
bricksAmbientOc.minFilter = THREE.NearestFilter
const bricksColor = textureLoader.load('./textures/bricks/color.jpg')
bricksColor.generateMipmaps = false
bricksColor.minFilter = THREE.NearestFilter
const bricksNormal = textureLoader.load('./textures/bricks/normal.jpg')
const bricksRoughness = textureLoader.load('./textures/bricks/roughness.jpg')
bricksRoughness.generateMipmaps = false
bricksRoughness.minFilter = THREE.NearestFilter

const windowColor = textureLoader.load('./textures/window/Window_001_basecolor.jpg')
windowColor.generateMipmaps = false
windowColor.minFilter = THREE.NearestFilter
const windowAO = textureLoader.load('./textures/window/Window_001_ambientOcclusion.jpg')
windowAO.generateMipmaps = false
windowAO.minFilter = THREE.NearestFilter
// const windowHeight = textureLoader.load('./textures/window/Window_001_height.png')
// windowHeight.generateMipmaps = false
// windowHeight.minFilter = THREE.NearestFilter
const windowNormal = textureLoader.load('./textures/window/Window_001_normal.jpg')

const windowMetallic = textureLoader.load('./textures/window/Window_001_metallic.jpg')
windowMetallic.generateMipmaps = false
windowMetallic.minFilter = THREE.NearestFilter
const windowRoughness = textureLoader.load('./textures/window/Window_001_roughness.jpg')
windowRoughness.generateMipmaps = false
windowRoughness.minFilter = THREE.NearestFilter
const windowAlpha = textureLoader.load('./textures/window/Window_001_opacity.jpg')
windowAlpha.generateMipmaps = false
windowAlpha.minFilter = THREE.NearestFilter
const windowBloodColor = textureLoader.load('./textures/window/bloodwindow.jpg')
windowBloodColor.generateMipmaps = false
windowBloodColor.minFilter = THREE.NearestFilter
const windowHands = textureLoader.load('./textures/window/hands.jpg')
windowHands.generateMipmaps = false
windowHands.minFilter = THREE.NearestFilter
const windowFace = textureLoader.load('./textures/window/face.jpg')
windowFace.generateMipmaps = false
windowFace.minFilter = THREE.NearestFilter


/**
 * House
 */
const house = new THREE.Group()
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
    //displacementMap: doorHeight,
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
        //displacementMap: windowHeight,
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
        //displacementMap: windowHeight,
        displacementScale: 0.5,
        metalnessMap: windowMetallic

    })
)

const windowFrameMesh3 = new THREE.Mesh(
    new THREE.PlaneGeometry(2, 2),
    new THREE.MeshStandardMaterial({
        map: windowBloodColor,
        transparent: true,
        alphaMap: windowAlpha,
        aoMap: windowAO,
        aoMapIntensity: 0.7,
        normalMap: windowNormal,
        roughnessMap: windowRoughness,
        //displacementMap: windowHeight,
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

windowFrameMesh3.position.x = 5.02
windowFrameMesh3.position.z = 0
windowFrameMesh3.position.y = 2
windowFrameMesh3.colorSpace = THREE.SRGBColorSpace
windowFrameMesh3.rotation.y = Math.PI / 2
windowFrameMesh3.visible = false

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
    monsterMat
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

windowGlassMesh3.position.x = 5.01
windowGlassMesh3.position.y = 2
windowGlassMesh3.rotation.y = Math.PI / 2
windowGlassMesh3.colorSpace = THREE.SRGBColorSpace
windowGlassMesh3.visible = false

// Floor
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(90, 90),
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
const bushmaterial = new THREE.MeshStandardMaterial({ color: 'green' })
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
house.add(houseMesh, roofMesh, doorMesh, bush1, bush2, bush3, bush4, windowFrameMesh, windowFrameMesh2, windowFrameMesh3, windowGlassMesh, windowGlassMesh2, windowGlassMesh3)
scene.add(floor, house)


/**
 * Gravestones
 * 
 */

const graveGeometry = new THREE.BoxGeometry(0.25, 0.8, 0.5)
const graveMat = new THREE.MeshStandardMaterial({ color: 'grey' })
const grave = new THREE.Mesh(
    graveGeometry,
    graveMat
)
for (let i = 0; i < 100; i++) {
    let copy = grave.clone()

    let graveAngle = Math.random() * 2 * Math.PI
    copy.position.x = Math.cos(graveAngle) * (8 + Math.random() * 14)
    copy.position.z = Math.sin(graveAngle) * (8 + Math.random() * 14)
    copy.position.y = 0.33
    copy.rotation.x = Math.PI * ((Math.random() - 0.5) * 0.1)
    copy.castShadow = true
    scene.add(copy)
}


/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight('#ffffff', 0.05)
// gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001)
scene.add(ambientLight)

// Directional light
const moonLight = new THREE.DirectionalLight('#ffffff', 0.4)
moonLight.position.set(10, 17, - 15)

moonLight.castShadow = true
const targetObject = new THREE.Object3D()
targetObject.position.set(0, 4, 0)
// gui.add(moonLight, 'intensity').min(0).max(1).step(0.001)
// gui.add(moonLight.position, 'x').min(- 5).max(5).step(0.001)
// gui.add(moonLight.position, 'y').min(- 5).max(5).step(0.001)
// gui.add(moonLight.position, 'z').min(- 5).max(5).step(0.001)
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

//const housePointLight = new THREE.PointLight('yellow', 1, 0.5, 1)
//housePointLight.position.set(5.6, 3.45, 0)

const houseSpotLight = new THREE.SpotLight('yellow', 3, 15, Math.PI / 3, 0.3, 0.1)
houseSpotLight.target = new THREE.Object3D()
houseSpotLight.target.position.set(7, 0, 0)
houseSpotLight.position.set(5.5, 3.6, 0)
houseSpotLight.castShadow = true
houseSpotLight.shadow.mapSize.width = 256
houseSpotLight.shadow.mapSize.height = 256
houseSpotLight.shadow.camera.far = 15

//Light 1
houselight1.add(houseSpotLight, lampFrame, lampHolder, lampTop)
house.add(houselight1)

// Light 2
houselight2.copy(houselight1)
houselight2.rotation.y = Math.PI * 1.5
const houseSpotLight2 = houselight2.children[0]
// const housePointLight2 = houselight2.children[4]
houseSpotLight2.target = new THREE.Object3D()
houseSpotLight2.target.position.set(0, 0, 7)

// Light 3
houselight3.copy(houselight1)
houselight3.rotation.y = Math.PI * 3
const houseSpotLight3 = houselight3.children[0]
// const housePointLight3 = houselight3.children[4]
houseSpotLight3.target = new THREE.Object3D()
houseSpotLight3.target.position.set(-7, 0, 0)

// Light 4
houselight4.copy(houselight1)
houselight4.rotation.y = -Math.PI * 1.5
const houseSpotLight4 = houselight4.children[0]
// const housePointLight4 = houselight4.children[4]
houseSpotLight4.target = new THREE.Object3D()
houseSpotLight4.target.position.set(0, 0, -7)
house.add(houselight1, houselight2, houselight3, houselight4, houseSpotLight4.target, houseSpotLight3.target, houseSpotLight2.target, houseSpotLight.target)


// const houseLightFolder = gui.addFolder('HouseLight')
// houseLightFolder.add(houseSpotLight, 'intensity').min(0).max(5).step(0.1)
// houseLightFolder.add(houseSpotLight, 'distance').min(0).max(8).step(0.1)
// houseLightFolder.add(houseSpotLight, 'decay').min(0).max(8).step(0.1)
// houseLightFolder.add(houseSpotLight, 'angle').min(0).max(8).step(0.1)
// houseLightFolder.add(houselight2.position, 'x').min(- 5).max(10).step(0.001)
// houseLightFolder.add(houselight2.position, 'y').min(- 5).max(10).step(0.001)
// houseLightFolder.add(houselight2.position, 'z').min(- 5).max(10).step(0.001)
// houseLightFolder.add(houselight2.rotation, 'x').min(0).max(5).step(0.1)
// houseLightFolder.add(houselight2.rotation, 'y').min(0).max(5).step(0.1)
// houseLightFolder.add(houselight2.rotation, 'z').min(0).max(5).step(0.1)

// Ghosts
const ghostLight1 = new THREE.PointLight('#ff00ff', 15, 6)
ghostLight1.position.x
const ghostLight2 = new THREE.PointLight('#00ffff', 15, 6)
ghostLight2.position.y = 0.3
const ghostLight3 = new THREE.PointLight('#ffff00', 15, 6)

function updateGhostPos(elapsedTime) {

    [ghostLight1, ghostLight2, ghostLight3].forEach(ghost => {
        if (!isSilentHillMode) {
            if (ghost.position.x > 5 && Math.abs(ghost.position.z) < 6)
                ghost.intensity = houseSpotLight.intensity > 0 ? 0 : 15
            else if (ghost.position.z > 5 && Math.abs(ghost.position.x) < 6)
                ghost.intensity = houseSpotLight2.intensity > 0 ? 0 : 15
            else if (ghost.position.x < -5 && Math.abs(ghost.position.z) < 6)
                ghost.intensity = houseSpotLight3.intensity > 0 ? 0 : 15
            else if (ghost.position.z < -5 && Math.abs(ghost.position.x) < 6)
                ghost.intensity = houseSpotLight4.intensity > 0 ? 0 : 15
            else
                ghost.intensity = 15
        }
    })

    if (ghostLight1.intensity > 0) {
        const ghost1Angle = (elapsedTime - 3) / 4
        ghostLight1.position.x = Math.cos(ghost1Angle) * (13 + Math.sin(elapsedTime * 1) * 3)
        ghostLight1.position.z = Math.sin(ghost1Angle) * (13 + Math.sin(elapsedTime * 1) * 3)
        ghostLight1.position.y = Math.abs(Math.sin(elapsedTime * 2) * 1.5 + Math.sin(elapsedTime * 4))
        if (ghost && isSilentHillMode) {
            ghost.position.set(
                ghostLight1.position.x,
                0,
                ghostLight1.position.z
            )
            ghostLight1.position.y += 0.5

        }
    }

    if (ghostLight2.visible) {
        const ghost2Angle = (elapsedTime - 6) / 6
        ghostLight2.position.x = Math.cos(ghost2Angle) * (16 + Math.sin(elapsedTime * 1) * 5)
        ghostLight2.position.z = Math.sin(ghost2Angle) * (16 + Math.sin(elapsedTime * 1) * 3)
        //ghostLight2.position.y = Math.abs(Math.sin(elapsedTime * 0.5)) 
        if (ghost2 && isSilentHillMode) {
            ghost2.position.set(
                ghostLight2.position.x,
                0,
                ghostLight2.position.z
            )
        }
    }
    if (ghostLight3.visible) {
        const ghost3Angle = elapsedTime / 3
        ghostLight3.position.x = Math.cos(ghost3Angle) * (14 + Math.sin(elapsedTime * 1.5) * 3)
        ghostLight3.position.z = Math.sin(ghost3Angle) * (13 + Math.sin(elapsedTime * 1) * 5)
        ghostLight3.position.y = Math.abs(Math.sin(elapsedTime * 2) * 1.5 + Math.sin(elapsedTime * 4))
        if (ghost3 && isSilentHillMode) {
            ghost3.position.set(
                ghostLight3.position.x,
                0,
                ghostLight3.position.z
            )
            ghostLight3.position.y += 0.5
        }
    }
}

scene.add(ghostLight1, ghostLight2, ghostLight3)

/**
 * Fog
 */
const fogNormal = new THREE.Fog('#262837', 4, 50)
const fogBlood = new THREE.Fog('#8b0000', -10, 60)
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
    camera.updateProjectionMatrix()


    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, fogNormal.far)
camera.position.x = 25
camera.position.y = 10
camera.position.z = 0
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.maxPolarAngle = Math.PI / 2 - 0.01
controls.maxDistance = 30
controls.minDistance = 10
controls.enablePan = false

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
renderer.shadowMap.autoUpdate = false

/**
 * Animate
 */
const clock = new THREE.Clock()
let previousTime = 0;
let isSilentHillMode = false
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
    './fonts/Bloody_Normal.json',
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
renderer.render(scene, camera)
const tick = () => {
    stats.begin()

    if (!infoDialog.open) {
        const elapsedTime = clock.getElapsedTime()

        if (isSilentHillMode) {
            if (!doorMesh.visible) {
                doorMesh.position.z = Math.sin(elapsedTime / 3) * 3
            }
            // Alternatively hide ghosts if light is on
            // let list = new Array(ghost, ghost2, ghost3)
            // list.forEach(ghost => {
            //     if (ghost.position.x > 5 && Math.abs(ghost.position.z) < 6)
            //         ghost.visible = houseSpotLight.visible
            //     else if (ghost.position.z > 5 && Math.abs(ghost.position.x) < 6)
            //         ghost.visible = houseSpotLight2.visible
            //     else if (ghost.position.x < -5 && Math.abs(ghost.position.z) < 6)
            //         ghost.visible = houseSpotLight3.visible
            //     else if (ghost.position.z < -5 && Math.abs(ghost.position.x) < 6)
            //         ghost.visible = houseSpotLight4.visible
            //     else
            //         ghost.visible = true
            // })
        }
        updateGhostPos(elapsedTime)
        // Update controls
        controls.update()

        // Render
        renderer.render(scene, camera)

        // Call tick again on the next frame
        window.requestAnimationFrame(tick)
    }
    stats.end()
}
const ToggleLight = (lightObject, offTimer, onTimer, offAction = null, onAction = null) => {
    setTimeout(() => {
            lightObject.intensity= 0
            renderer.shadowMap.needsUpdate = true
             if (isSilentHillMode && offAction) {
                offAction()
             }
             setTimeout(() => {
                    lightObject.intensity= 3
                    renderer.shadowMap.needsUpdate = true
                     if (isSilentHillMode && onAction) {
                        onAction()
                     }
                     ToggleLight(lightObject, offTimer, onTimer, offAction, onAction)
             }, onTimer)
     }, offTimer )
}

ToggleLight(
    houseSpotLight, 
    (Math.random() + 1) * 3000,
    (Math.random() + 0.4) * 3000,
    () => {
        windowGlassMesh3.material = glassMatBlack
        windowFrameMesh3.material.map = windowColor
    },
    () =>{
        windowGlassMesh3.material = monsterMat
        windowFrameMesh3.material.map = windowBloodColor
    })
ToggleLight(
    houseSpotLight2, 
    (Math.random() + 0.5) * 2000,
    (Math.random() + 0.2) * 2000,
    () => {
        windowGlassMesh.material = glassMatBlack
        windowFrameMesh.material.map = windowColor
    },
    () =>{
        windowGlassMesh.material = glassMatHands
        windowFrameMesh.material.map = windowBloodColor
    })
ToggleLight(
    houseSpotLight3, 
    (Math.random() + 0.5) * 3000,
    (Math.random() + 0.2) * 3000,
    () => {
        doorMesh.visible = false
    },
    () =>{
        doorMesh.visible = true
    })
ToggleLight(
    houseSpotLight4, 
    (Math.random() + 0.5) * 4000,
    (Math.random() + 0.4) * 5000)

    
function silentHillMode() {
    isSilentHillMode = true
    scene.fog = fogBlood
    renderer.setClearColor(fogBlood.color)
    windowFrameMesh2.material.map = windowBloodColor
    windowGlassMesh2.material = glassBloodMat
    doorMesh.material.map = bloodyWoodColor
    doorMesh.position.set(-5.01, 1.1, 0)
    doorMesh.rotation.y = -Math.PI / 2
    roofMesh.material = bloodWoodMat
    textMaterial.color = new THREE.Color('Black')
    windowGlassMesh3.visible = true
    windowFrameMesh3.visible = true
    ghost.visible = true
    ghost2.visible = true
    ghost3.visible = true
    ghostLight1.visible = true
    ghostLight2.visible = true
    ghostLight3.visible = true
    ghostLight1.color = fogBlood.color
    ghostLight2.color = fogBlood.color
    ghostLight3.color = fogBlood.color
    ghostLight1.intensity = 25
    ghostLight1.distance = 20
    ghostLight2.intensity = 25
    ghostLight2.distance = 20
    ghostLight3.intensity = 25
    ghostLight3.distance = 20
    ghostLight2.position.y = 1
}

function normalMode() {
    isSilentHillMode = false
    scene.fog = fogNormal
    renderer.setClearColor(fogNormal.color)
    windowFrameMesh2.material.map = windowColor
    windowGlassMesh2.material = glassMatBlack
    doorMesh.material.map = doorColor
    doorMesh.position.set(5.01, 1.1, 0)
    doorMesh.rotation.y = Math.PI / 2
    doorMesh.visible = true
    roofMesh.material = roofNormalMat
    textMaterial.color = new THREE.Color('#8a0303')
    ghost.visible = false
    ghost2.visible = false
    ghost3.visible = false
    windowGlassMesh.material = glassMatBlack
    windowFrameMesh.material.map = windowColor
    windowGlassMesh3.visible = false
    windowFrameMesh3.visible = false
    ghostLight1.color = new THREE.Color('#ff00ff')
    ghostLight2.color = new THREE.Color('#00ffff')
    ghostLight3.color = new THREE.Color('#ffff00')
    ghostLight2.position.y = 0.3
}
tick()
setInterval(() => {
    if (!violenceCbx.checked && !infoDialog.open) {
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
    }
}, 1000)
