import React, { useState, useEffect } from 'react';

import * as PIXI from 'pixi.js'; // Pixi.js 라이브러리를 import


function Game() {
  const [gameStarted, setGameStarted] = useState(false);

  let app; // Pixi.js 애플리케이션 인스턴스
  let container; // 컨테이너

  const speed = 1; // 총알 속도
  const intervalTime = 1000; // 총알 생성 간격 (1초)
 const createBullet = () => {
  if (!app || !container) {
    return; // app과 container가 정의되지 않았다면 함수를 종료
  }

  const bulletTexture = PIXI.Texture.from('bullet.png');
  const bulletSprite = new PIXI.Sprite(bulletTexture);

  bulletSprite.x = Math.random() * app.renderer.width;
  bulletSprite.y = -50; // 화면 위에서 출발하도록 설정

  container.addChild(bulletSprite);

  app.ticker.add(() => {
    bulletSprite.y += speed;
    if (bulletSprite.y > app.renderer.height) {
      container.removeChild(bulletSprite);
    }
  });
}

const startGame = () => {
  setGameStarted(true);
  // Pixi.js 애플리케이션 인스턴스 생성
  app = new PIXI.Application({
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: 0x1099bb,
  });

  // 컨테이너 생성 (캐릭터와 맵을 담을 공간)
  container = new PIXI.Container();
    // 캐릭터 스프라이트 생성
    const characterTexture = PIXI.Texture.from('/img/character.png');
    const characterSprite = new PIXI.Sprite(characterTexture);

    // 맵 스프라이트 생성
    const mapTexture = PIXI.Texture.from('map.png');
    const mapSprite = new PIXI.Sprite(mapTexture);

    // 컨테이너에 캐릭터와 맵 스프라이트 추가
    container.addChild(characterSprite);
    container.addChild(mapSprite);

    // 애플리케이션 스테이지에 컨테이너 추가
    app.stage.addChild(container);

    // Pixi.js 애플리케이션을 DOM에 마운트
    document.body.appendChild(app.view);
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  function handleKeyDown(event) {
    switch (event.keyCode) {
      case 37: // 왼쪽 화살표 키 입력 처리 로직 작성 
        break;
      case 38: // 위쪽 화살표 키 입력 처리 로직 작성 
        break;
      case 39: // 오른쪽 화살표 키 입력 처리 로직 작성 
        break;
      case 40: // 아래쪽 화살표 키 입력 처리 로직 작성 
        break;
      default:
        break;
    }
  }

  return (
    <div>
      {!gameStarted && (
        <button onClick={startGame}>게임 시작</button>
      )}
      {/* 게임 캐릭터와 맵을 렌더링하는 부분 추가 */}
    </div>
  );
}

export default Game;
