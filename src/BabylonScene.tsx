import React, { useEffect, useRef } from 'react';
import * as BABYLON from 'babylonjs';
import "@babylonjs/loaders/glTF";


async function createScene(engine: BABYLON.Engine) {
    const scene = new BABYLON.Scene(engine);

    // Scene loaded callback
    scene.createDefaultEnvironment();

    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    // var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
    // light.intensity = 0.7;

    scene.createDefaultCameraOrLight(true, true, true);
    // const camera = scene.activeCamera


    // const ww = transform()
    // const assetBlob = new Blob([assetArrayBuffer]);
    // const assetUrl = URL.createObjectURL(assetBlob);

    BABYLON.SceneLoader.Append("gltf/", "model.gltf", scene, function () {

        // Optionally, you can manipulate the loaded scene here

    }, function (progress) {
        // Loading progress callback
        console.log("Loading: " + progress.loaded + "/" + progress.total);
    });

    return scene;
}


const BabylonScene: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (canvasRef.current) {
            const engine = new BABYLON.Engine(canvasRef.current, true);
            createScene(engine).then( (scene)=>{
                engine.runRenderLoop(() => {
                    scene.render();
                });
            });

            // Add your Babylon.js scene setup code here


            return () => {
                // engine.dispose();
            };
        }
    }, []);

    return <canvas id="renderCanvas" ref={canvasRef} />;
};

export default BabylonScene;