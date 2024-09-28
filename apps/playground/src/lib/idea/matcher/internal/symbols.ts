const test = await fetch(
  "https://map.naver.com/p/api/search/allSearch?query=%EA%BD%83&type=all&searchCoord=126.53774998725515%3B33.49203521446064&placeSearchOption=clientX=126.958388&clientY=37.476297&display=70&ts=1718628012183&x=126.958388&y=37.476297",
  {
    headers: {
      accept: "application/json, text/plain, */*",
      "accept-language": "ko-KR,ko;q=0.8,en-US;q=0.6,en;q=0.4",
    },
  },
).then((res) => res.json());
