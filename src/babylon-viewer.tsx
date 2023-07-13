import React, { useEffect, useRef } from 'react';
import {Engine, HemisphericLight, Scene, SceneLoader, Vector3} from '@babylonjs/core';
import '@babylonjs/loaders';

interface BabylonCanvasProps {
    width: number;
    height: number;
}


function createScene(engine: Engine): Scene {
    const scene = new Scene(engine);

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

    SceneLoader.Append("gltf/", "model.gltf", scene, function () {

        // Optionally, you can manipulate the loaded scene here

    }, function (progress) {
        // Loading progress callback
        console.log("Loading: " + progress.loaded + "/" + progress.total);
    });

    return scene;
}

const BabylonViewer: React.FC<BabylonCanvasProps> = ({ width, height }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (canvasRef.current) {
            const engine = new Engine(canvasRef.current, true);
            const scene = createScene(engine);

            var light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);
            light.intensity = 0.7;

            scene.createDefaultCameraOrLight(true, true, true);


            engine.runRenderLoop(() => {
                scene.render();
            });

            return () => {
                scene.dispose();
                engine.dispose();
            };
        }
    }, []);

    return (
        <div>
            <canvas ref={canvasRef} width={width} height={height}></canvas>
        </div>
    );
};

export default BabylonViewer;
