import './App.css';
import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web';
import lottieFille from './lottie.json'; // 애니메이션 파일 경로


function App() {
  const animationContainer = useRef(null);

  useEffect(() => {
    const anim = lottie.loadAnimation({
      container: animationContainer.current,
      animationData: lottieFille, // 애니메이션 데이터
      loop: true, // 반복 여부
      autoplay: true, // 자동 재생 여부
    });

    return () => {
      anim.destroy(); // 컴포넌트가 언마운트될 때 애니메이션 정리
    };
  }, []);

  return (
    <div
      ref={animationContainer}
      style={{ width: '100%', height: '100%' }}
    ></div>
  );
}

export default App;
