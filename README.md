# Spinning-3D-Globe-THREE.js

https://user-images.githubusercontent.com/89874146/159142811-333d8235-3bf3-4902-a42b-e0ae27cd3363.mov

## Summary 
This is a simple project showcasing different styles of 3D animation and design. This is a THREE.js WebGL class to represent data visualization layers on a globe using a spherical projection. The globe rotates, the cloud layers rotate, and the camera persepctive rotates asynchronously between one another. The rendered effect gives a real-life feel as if you were viewing the Earth from space. THREE.js proves to be an excellent tool to devlelop ambitious UI-enhancing animations. 

## Quick Start

1. Clone this repository on your system
2. Open Terminal or Command Prompt on root directory of this project and type `npm init`
3. Then `npm install express`
4. Next `npm install three@0.127.0` to install version 127
5. In your package.json file, add this to "scripts": `"start": "node server.js"`
6. Finally, run `npm start`
7. The project will open in your browser and you will be able to view 

## Build Explanation

To actually be able to display anything with THREE.js, we need three things: scene, camera and renderer, so that we can render the scene with the camera. For the camera, we are using a built in constructor function called `PerspectiveCamera()`. This projection mode is designed to mimic the way the human eye sees and is the most common projection mode used for rendering a 3D scene. Before we create the camera, we must first define the variables we will use to pass in as the parameters. See below:
```
Constructor
PerspectiveCamera( fov : Number, aspect : Number, near : Number, far : Number )
fov — Camera frustum vertical field of view.
aspect — Camera frustum aspect ratio.
near — Camera frustum near plane.
far — Camera frustum far plane.

Together these define the camera's viewing frustum.
```
Now we can create the camera, here's the example from my code. I'm also setting a position value for the camera's z axis:
```
camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 2;
scene.add(camera);
```
Next up is the renderer. This is where the magic happens. In addition to the WebGLRenderer we use here, three.js comes with a few others, often used as fallbacks for users with older browsers or for those who don't have WebGL support.

In addition to creating the renderer instance, we also need to set the size at which we want it to render our app. It's a good idea to use the width and height of the area we want to fill with our app - in this case, the width and height of the browser window. For performance intensive apps, you can also give setSize smaller values, like window.innerWidth/2 and window.innerHeight/2, which will make the app render at quarter size. We add the renderer element to our HTML document. This is a `<canvas>` element the renderer uses to display the scene to us.

Here's how I set up my renderer:
```
renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.autoClear = false;
renderer.setClearColor(0x000000, 0.0)
```
Next we can start to build our globe. 
To create the sphere of our globe, we use another class constructor called `SphereGeometry()` which will give the globe a radius, a width and a height. Here's the reference:
```
SphereGeometry(radius : Float, widthSegments : Integer, heightSegments : Integer, phiStart : Float, phiLength : Float, thetaStart : Float, thetaLength : Float)
radius — sphere radius. Default is 1.
widthSegments — number of horizontal segments. Minimum value is 3, and the default is 32.
heightSegments — number of vertical segments. Minimum value is 2, and the default is 16.
phiStart — specify horizontal starting angle. Default is 0.
phiLength — specify horizontal sweep angle size. Default is Math.PI * 2.
thetaStart — specify vertical starting angle. Default is 0.
thetaLength — specify vertical sweep angle size. Default is Math.PI.

The geometry is created by sweeping and calculating vertexes around the Y axis (horizontal sweep) and the Z axis (vertical sweep).
```
In addition to geometry, we need a material to color the sphere. THREE.js comes with several materials but I used `MeshPhongMaterial()` due to its reflective and realistic shading properties. It gives the persepctive as if earth is facing a light source. By utilizing this material we can set different images as the properties of the class. This is how I added the map of earth and the clouds. I also used other built in properties like `.bumpMap` to create textures that offer percieved depth in relation to the light source, ultimately causing the globe to no longer look like a flat image. Check out how I built my earth and clouds from the code below:
```
const earthGeometry = new THREE.SphereGeometry(0.6, 32, 32);
const earthMaterial = new THREE.MeshPhongMaterial({
    roughness: 1,
    metalness: 0,
    map: THREE.ImageUtils.loadTexture('textureImages/earthmap1k.jpg'),
    bumpMap: THREE.ImageUtils.loadTexture('textureImages/earthbump.jpg'),
    bumpScale: 0.1
});

const earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
scene.add(earthMesh);

const cloudGeometry = new THREE.SphereGeometry(0.61, 32, 32);
const cloudMaterial = new THREE.MeshPhongMaterial({
    map: THREE.ImageUtils.loadTexture('textureImages/earthCloud.png'),
    transparent: true
});

const cloudMesh = new THREE.Mesh(cloudGeometry, cloudMaterial);
scene.add(cloudMesh);
```
Lastly, to give the globe its rotation effect, I'm actually rotating the images used in the Mesh rather than the sphere itself. I created an animation loop, played around with some different values for each Mesh, then rendered to the `canvas`. Here's how I did it:
```
const animate = () => {
    requestAnimationFrame(animate);
    earthMesh.rotation.y -= 0.002;
    cloudMesh.rotation.y -= 0.001;
    starMesh.rotation.y -= 0.0005;
    render();
}
const render = () => {
    renderer.render(scene, camera);
}

animate();
```
From here you should have a spinning, textured globe! You're free to play around with it, adjust the settings, add some stars, do whatever. The documentation for THREE.js is incredibly written and easy to follow. Anything else you may want to add should follow this same design principle unless stated otherwise in the documentation.

## Screenshots
![earth-screenshot](https://user-images.githubusercontent.com/89874146/159142846-f5d3ee57-df01-4669-bbe1-e55817a83a5d.png)
https://user-images.githubusercontent.com/89874146/159142849-cf025c81-43b4-45ed-976e-09edcb965b76.mov

## Documentation Link
- https://threejs.org/docs/#manual/en/introduction/Installation
- https://threejs.org/docs/index.html?q=sphere#api/en/geometries/SphereGeometry

