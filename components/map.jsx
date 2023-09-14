import { useEffect, useRef } from 'react';
import * as PIXI from 'pixi.js';

export default function Map() {
  const gameCanvas = useRef(null);

  useEffect(() => {
    // canvas 엘리먼트 생성
    const canvas = document.createElement("canvas");
    gameCanvas.current = canvas;

    if (!gameCanvas.current) return;
    const app = new PIXI.Application({
      width: 800,
      height: 600,
      backgroundColor: 0x1099bb,
      view: gameCanvas.current,
    });

    document.body.appendChild(app.view);

    // Load the character image
    app.loader.add('character', '/img/character.png').load((loader, resources) => {

      // Create a sprite from the loaded texture
      const character = new PIXI.Sprite(resources.character.texture);

      // Position the character at the center of the screen
      character.x = app.screen.width / 2;
      character.y = app.screen.height / 2;

      // Add the character to the stage (game screen)
      app.stage.addChild(character);


    });

    // Key press states 
    let leftPressed = false;
    let rightPressed = false;

    // Add event listeners for keydown and keyup events
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);

    function onKeyDown(event) {
      switch (event.key) {
        case 'ArrowLeft':
          leftPressed = true;
          break;
        case 'ArrowRight':
          rightPressed = true;
          break;
      }
    }

    function onKeyUp(event) {
      switch (event.key) {
        case 'ArrowLeft':
          leftPressed = false;
          break;
        case 'ArrowRight':
          rightPressed = false;
          break;
      }
    }

    // Update the game state (character position)
    app.ticker.add(() => {
      if (leftPressed) character.x -= 5; // Move character to the left
      if (rightPressed) character.x += 5; // Move character to the right
    });

    // ... previous code ...
  }, []);

  return <div ref={gameCanvas} />;

}

