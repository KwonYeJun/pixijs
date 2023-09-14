import Image from 'next/image'
import * as PIXI from 'pixi.js';

export default function Home() {
  const app = new PIXI.Application({
    width: 800, // 원하는 너비
    height: 600, // 원하는 높이
  });

  // 앱을 화면에 추가
  document.body.appendChild(app.view);
  const characterTexture = PIXI.Texture.from('character.png'); // 캐릭터 이미지 로드
  const character = new PIXI.Sprite(characterTexture); // 스프라이트 생성
  character.x = 100; // 초기 X 좌표 설정
  character.y = 100; // 초기 Y 좌표 설정
  app.stage.addChild(character); // 스프라이트를 화면에 추가

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      main.js

    </main>
  )
}
