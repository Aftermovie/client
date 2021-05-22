---

## 5/20

계획 - signup, login, logout 기능 구현

구현 완료 - signup, login, logout 구현 완료
---

5/21 

계획 - navbar와 Home 페이지 만들기

navbar는 우여곡절 끝에 만들었지만 Home은 구현하지 못함. typescript를 쓰기 위해 vue 버전을 올렸고(3.0) 때문에 vuex 버전 또한 (4.0) 으로 올렸다.

vue 버전이 3.0으로 바뀐 것 때문에 vuetify와 bootstrap을 쓸 수 없었고, 이것 때문에 carousel을 쉽게 사용할 수 없었다. 

swiper.js를 배워서 구현해 볼까라는 생각도 해봤지만 vue 3.0 + typescript를 적용하면서 이를 배우는 것은 너무 러닝커브가 높았고 이거 때문에 오늘 오후 시간을 전체 다 날려버렸다.

내일 이 부분을 더 깊게 해봐야겠다는 생각이 많이 들었다.
---
5.22

계획 - navbar 수정하기, swiper.js를 익혀서 caoursel과 card component 만들기

swiper.js의 가장 큰 장점은 vue3.0에서 사용이 가능하다는 것이다. 현재 타입스크립트 사용으로 인해 vue 3 버전을 사용해야만 하는 나로써는
가뭄에 단비 같은 존재였다. 여러 문서와 영상을 보고 carousel을 구현은 한 상태이다. 하지만, 또 다른 문제에 봉착했는데, axios로 받아온 배열에서
0~10번 까지의 index 만을 잘라서 props로 넘겨서 해당 영화에 대한 포스터만을 carousel로 보여주고자 했다. 하지만, 비동기 방식이다보니 제대로 props로 데이터가 넘어가지 못하는 문제에 봉착하였다. watch를 사용하면 된다는 답변을 받긴 했지만, 현재 watch에 대한 이해가 없는 상황이므로 이를
공부하고 수정할 필요가 있겠다.