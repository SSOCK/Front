'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    kakao: any;
  }
}

export default function Map() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src =
      '//dapi.kakao.com/v2/maps/sdk.js?appkey=6b50b85d250f7fdb532f1214d93a5437&autoload=false';
    script.async = false;
    document.head.appendChild(script);

    //이거 카카오api 불러오는게 느려서 next _document 이런곳에서 스크립트로 불러오는 방식이 안먹힘
    //그래서 직접 돔조작해서 넣어줌

    const onLoadKakaoAPI = () => {
      //로드되어야 window 객체에서 kakao 접근가능
      window.kakao.maps.load(() => {
        //맨아래 return해준 div#map 객체 선택해서 연동?? 한다고 생각하면 될듯
        const container = document.getElementById('map');
        const options = {
          center: new window.kakao.maps.LatLng(33.450701, 126.570667), //초기위치
          level: 3, //이건 확대레벨
        };

        const map = new window.kakao.maps.Map(container, options); //맵 생성
        const mapDom = map.a as Document; //이건 이벤트 다루기위해서 map뜯어보고 a라는 객체 찾음

        //이건 라인그리는 방법
        //라인 패스 설정 실제로는 api로 여러개 받아와서 여러개 그리야함
        const linePath1 = [
          new window.kakao.maps.LatLng(33.452344169439975, 126.56878163224233), //시작점
          new window.kakao.maps.LatLng(33.452739313807456, 126.5709308145358), //중간점 여러개 가능
          new window.kakao.maps.LatLng(33.45178067090639, 126.5726886938753), //끝점
        ];

        const line = new window.kakao.maps.Polyline({
          //라인객체 생성
          path: linePath1, //위에서 만든거
          strokeWeight: 10, //두께
          strokeColor: '#FFAE00',
          strokeOpacity: 0.7,
          strokeStyle: 'solid',
          clickable: true,
        });

        line.setMap(map); //맵에 적용

        //라인에 이벤트 추가하기 카카오 api에서는 line에 이벤트는 따로 없어서 직접 구현해야할듯??
        const paths = mapDom.querySelectorAll('path');

        paths.forEach((a) => {
          a.addEventListener('mouseover', () => {
            //올릴때 두껍게
            a.style.strokeWidth = '20';
          });
          a.addEventListener('mouseout', () => {
            //초기화
            a.style.strokeWidth = '10';
          });
        });

        //이건 그냥 피그마에서 지도 회색이길래 지도 흑백으로 바꾸는거

        //초기에 불러왔을때 한번 적용
        const mapImg = mapDom.querySelectorAll('img');
        mapImg.forEach((img) => {
          img.classList.add('grayscale');
        });

        //여기는 카카오 api에서 제공하는 이벤트리스너 bounds_changed (지도 확대축소, 중심 이동 등);
        //사용해서 img다시 받아올때 다시 흑백 입히는거
        window.kakao.maps.event.addListener(map, 'bounds_changed', () => {
          const mapImg = mapDom.querySelectorAll('img');
          mapImg.forEach((img) => {
            img.classList.add('grayscale');
          });
        });
      });
    };

    //여기 스크립트에 load이벤트 달아서 스크립트 불러와지면위에 코드 실행되도록함
    script.addEventListener('load', onLoadKakaoAPI);
  }, []);
  return <div id="map" style={{ width: '100%', height: '100%' }}></div>;
}
