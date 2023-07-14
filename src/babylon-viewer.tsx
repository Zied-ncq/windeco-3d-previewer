 import React, { useEffect, useRef } from 'react';
import {CubeTexture, Engine, Scene, SceneLoader} from '@babylonjs/core';
import '@babylonjs/loaders';
import { WebIO } from '@gltf-transform/core';

interface BabylonCanvasProps {
    width: number;
    height: number;
    previewId: string
}


async function transform(previewId : string): Promise<Uint8Array> {
    const io = new WebIO({credentials: 'include'});
    let document = await io.read(previewId);  // → Document

    return io.writeBinary(document);
}

async function createScene(engine: Engine, previewId: string): Promise<Scene> {
    const scene = new Scene(engine);

    var hdrTexture = CubeTexture.CreateFromPrefilteredData("gltf/environment.dds", scene);

    // Scene loaded callback
    scene.createDefaultEnvironment({skyboxTexture: hdrTexture, createSkybox: true, sizeAuto:true});
    scene.createDefaultCameraOrLight(true, true, true);
    // const camera = scene.activeCamera


    const transformedDocument = await transform(previewId)
    const assetBlob = new Blob([transformedDocument.buffer]);
    const assetUrl = URL.createObjectURL(assetBlob);

    await SceneLoader.AppendAsync(assetUrl, undefined, scene, function (progress) {
        // Loading progress callback
        console.log("Loading: " + progress.loaded + "/" + progress.total);
    }, '.glb');
    return scene;
}

const BabylonViewer: React.FC<BabylonCanvasProps> = ({ width, height, previewId }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (canvasRef.current) {
            const engine = new Engine(canvasRef.current, true);
            engine.hideLoadingUI()
            createScene(engine, previewId).then(scene => {
                engine.runRenderLoop(() => {
                    scene.render();
                });
            });

            return () => {
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
