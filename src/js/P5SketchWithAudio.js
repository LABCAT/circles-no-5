import React, { useRef, useEffect } from "react";
import "./helpers/Globals";
import "p5/lib/addons/p5.sound";
import * as p5 from "p5";
import { Midi } from '@tonejs/midi'
import PlayIcon from './functions/PlayIcon.js';
import AnimatedCircle from './classes/AnimatedCircle.js';

import audio from "../audio/circles-no-5.ogg";
import midi from "../audio/circles-no-5.mid";

const P5SketchWithAudio = () => {
    const sketchRef = useRef();

    const Sketch = p => {

        p.canvas = null;

        p.canvasWidth = window.innerWidth;

        p.canvasHeight = window.innerHeight;

        p.audioLoaded = false;

        p.player = null;

        p.PPQ = 3840 * 4;

        p.tempo = 86;

        p.barAsSeconds = 60 / p.tempo * 4;

        p.loadMidi = () => {
            Midi.fromUrl(midi).then(
                function(result) {
                    console.log(result);
                    const noteSet1 = result.tracks[6].notes; // Synth 3 - FullerStrings
                    const noteSet2 = result.tracks[1].notes; // Redrum - Dub Kit 01
                    p.scheduleCueSet(noteSet1, 'executeCueSet1');
                    p.scheduleCueSet(noteSet2, 'executeCueSet2', true);
                    p.audioLoaded = true;
                    document.getElementById("loader").classList.add("loading--complete");
                    document.getElementById("play-icon").classList.remove("fade-out");
                }
            );
            
        }

        p.preload = () => {
            p.song = p.loadSound(audio, p.loadMidi);
            p.song.onended(p.logCredits);
        }

        p.scheduleCueSet = (noteSet, callbackName, poly = false)  => {
            let lastTicks = -1,
                currentCue = 1;
            for (let i = 0; i < noteSet.length; i++) {
                const note = noteSet[i],
                    { ticks, time } = note;
                if(ticks !== lastTicks || poly){
                    note.currentCue = currentCue;
                    p.song.addCue(time, p[callbackName], note);
                    lastTicks = ticks;
                    currentCue++;
                }
            }
        } 

        p.bgHue = 0;

        p.packedCirclesSet = [];

        p.setup = () => {
            p.canvas = p.createCanvas(p.canvasWidth, p.canvasHeight);
            p.colorMode(p.HSB);
            p.bgHue = p.random(0, 360);
            p.background(p.bgHue, 100, 100, 0.2);

            while(p.packedCirclesSet.length < 300) {
                let radius = p.random(p.width / 6, p.width / 3) / 2; 
                if(p.packedCirclesSet.length >= 5) {
                    radius = p.random(p.width / 64, p.width / 32) / 2
                }
                const circle = {
                    x: p.random(0, p.width),
                    y: p.random(0, p.height),
                    r: radius
                }
                
                let overlapping = false;
                for (let i = 0; i < p.packedCirclesSet.length; i++) {
                    const existingCircle = p.packedCirclesSet[i];
                    const distance = p.dist(circle.x, circle.y, existingCircle.x, existingCircle.y);
                    if (distance < circle.r + existingCircle.r) {
                        overlapping = true;
                        break;
                    }
                }
                if(!overlapping) {
                    p.packedCirclesSet.push(circle);
                }
            }
        }

        p.draw = () => {
            if(p.audioLoaded && p.song.isPlaying()){
                // p.background(p.bgHue, 100, 100);
                for (let i = 0; i < p.mainCircleSet.length; i++) {
                    const circle = p.mainCircleSet[i];
                    circle.draw();
                }
            }
        }

        p.mainCircleSet = [];
        p.bigCircleIndex = 0;
        p.xPos = 0;
        p.yPos = 0;
        p.hue = 0;
        p.hueDirection = 0;
        p.size = 0;
        p.sizeReducer = 0;

        p.executeCueSet1 = (note) => {
            const { duration, currentCue } = note;
            
            if(currentCue % 16 == 1 && currentCue < 81){
                const circle = p.packedCirclesSet[p.bigCircleIndex];
                p.hue = p.random(0, 360);
                p.hueDirection = Math.random() < 0.5 ? 'up' : 'down';
                p.xPos = circle.x;
                p.yPos = circle.y;
                p.size = circle.r * 2;
                p.sizeReducer = p.size / 8;
                p.bigCircleIndex++;
            }

            if(currentCue < 81) {
                const size = duration > 1 ? p.size : p.size / 16;
                p.mainCircleSet.push(
                    new AnimatedCircle(p, p.xPos, p.yPos, p.hue, size, p.barAsSeconds / 2)
                );
                if(duration > 1){
                    p.size = p.size - p.sizeReducer;
                    if(p.hueDirection === 'up') {
                        p.hue = p.hue + 15 < 360 ? p.hue + 15 : p.hue + 15 - 360;
                    }
                    else {
                        p.hue = p.hue - 15 > 0 ? p.hue - 15 : p.hue - 15 + 360;
                    }
                }
            }
            else {
                p.mainCircleSet.push(
                    new AnimatedCircle(p, p.width / 2, p.height / 2, p.hue, p.width * 2, p.barAsSeconds / 2, 0.002)
                );
            }
            
        }

        p.smallCircleIndex = 5;

        p.executeCueSet2 = (note) => {
            const { duration, currentCue, midi } = note;
            let addCircle = false,
                hue = 0,
                saturation = 0,
                brightness = 0, 
                alpha = 1;
            
            switch (midi) {
                case 36:
                    addCircle = true;
                    brightness = 100;
                    break;
                case 37:
                    addCircle = true;
                    break;
                case 44:
                    addCircle = true;
                    hue = p.random(0, 360);
                    saturation = 50;
                    brightness = 50;
                    alpha = 0.5;
                    break;
                default:
                    addCircle = false;
                    break;
            }
            if(addCircle){
                const circle = p.packedCirclesSet[p.smallCircleIndex], 
                    { x, y, r } = circle, 
                    size = r * 2;
                p.fill(hue, saturation, brightness, alpha);
                p.ellipse(x, y, size, size);
                if(midi == 44) {
                    p.fill(hue + 30, saturation, brightness, alpha);
                    p.ellipse(x, y, size / 2, size / 2);
                    p.fill(hue + 60, saturation, brightness, alpha);
                    p.ellipse(x, y, size / 4, size / 4);
                }
                
                p.smallCircleIndex++
            }
        }

        p.mousePressed = () => {
            if(p.audioLoaded){
                if (p.song.isPlaying()) {
                    p.song.pause();
                } else {
                    if (parseInt(p.song.currentTime()) >= parseInt(p.song.buffer.duration)) {
                        p.reset();
                    }
                    document.getElementById("play-icon").classList.add("fade-out");
                    p.canvas.addClass("fade-in");
                    p.song.play();
                }
            }
        }

        p.creditsLogged = false;

        p.logCredits = () => {
            if (
                !p.creditsLogged &&
                parseInt(p.song.currentTime()) >= parseInt(p.song.buffer.duration)
            ) {
                p.creditsLogged = true;
                    console.log(
                    "Music By: http://labcat.nz/",
                    "\n",
                    "Animation By: https://github.com/LABCAT/"
                );
                p.song.stop();
            }
        };

        p.reset = () => {

        }

        p.updateCanvasDimensions = () => {
            p.canvasWidth = window.innerWidth;
            p.canvasHeight = window.innerHeight;
            p.canvas = p.resizeCanvas(p.canvasWidth, p.canvasHeight);
        }

        if (window.attachEvent) {
            window.attachEvent(
                'onresize',
                function () {
                    p.updateCanvasDimensions();
                }
            );
        }
        else if (window.addEventListener) {
            window.addEventListener(
                'resize',
                function () {
                    p.updateCanvasDimensions();
                },
                true
            );
        }
        else {
            //The browser does not support Javascript event binding
        }
    };

    useEffect(() => {
        new p5(Sketch, sketchRef.current);
    }, []);

    return (
        <div ref={sketchRef}>
            <PlayIcon />
        </div>
    );
};

export default P5SketchWithAudio;
