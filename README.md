

### 5/20

계획 - signup, login, logout 기능 구현

구현 완료 - signup, login, logout 구현 완료

---

### 5/21 

계획 - navbar와 Home 페이지 만들기

navbar는 우여곡절 끝에 만들었지만 Home은 구현하지 못함. typescript를 쓰기 위해 vue 버전을 올렸고(3.0) 때문에 vuex 버전 또한 (4.0) 으로 올렸다.

vue 버전이 3.0으로 바뀐 것 때문에 vuetify와 bootstrap을 쓸 수 없었고, 이것 때문에 carousel을 쉽게 사용할 수 없었다. 

swiper.js를 배워서 구현해 볼까라는 생각도 해봤지만 vue 3.0 + typescript를 적용하면서 이를 배우는 것은 너무 러닝커브가 높았고 이거 때문에 오늘 오후 시간을 전체 다 날려버렸다.

내일 이 부분을 더 깊게 해봐야겠다는 생각이 많이 들었다.

---

### 5.22

계획 - navbar 수정하기, swiper.js를 익혀서 caoursel과 card component 만들기

swiper.js의 가장 큰 장점은 vue3.0에서 사용이 가능하다는 것이다. 현재 타입스크립트 사용으로 인해 vue 3 버전을 사용해야만 하는 나로써는
가뭄에 단비 같은 존재였다. 여러 문서와 영상을 보고 carousel을 구현은 한 상태이다. 하지만, 또 다른 문제에 봉착했는데, axios로 받아온 배열에서
0~10번 까지의 index 만을 잘라서 props로 넘겨서 해당 영화에 대한 포스터만을 carousel로 보여주고자 했다. 하지만, 비동기 방식이다보니 제대로 props로 데이터가 넘어가지 못하는 문제에 봉착하였다. watch를 사용하면 된다는 답변을 받긴 했지만, 현재 watch에 대한 이해가 없는 상황이므로 이를
공부하고 수정할 필요가 있겠다.

---

### 5.23-24

이 이틀 동안은 메인페이지의 디테일적인 부분과 movieDetail 페이지에 시간을 쏟았다. 먼저, watch 메서드를 사용하여 부모 데이터의 값이 변화하였을 때 그 값의 변화를 알아챌 수 있도록 코드를 구성하였다.

또한, 하나의 요소가 다른 요소 위에 배치되어야 할 때, 부모 요소에 `position: relative`를 주고 자식 요소에 `position: absolute`와 적절한 `z-index` 값을 주면 된다는 것을 알게 되었다.

현재 전체적인 구조는 되었으나, 메인 페이지에서 장르별로 데이터를 추가하는 것과 movieDetail에서 review 페이지가 등장하게 하는 것을 아직 만들지 못했다.

movieDetail의 페이지는 그대로 유지하고 아래로의 스크롤 이벤트가 발생했을 때 리뷰 화면을 아래에서 위로 띄우는 형식으로 구성해볼 예정이다.

---

### 5.25

movieDetail에서 스크롤 이벤트가 발생하였을 때 리뷰 화면을 위에 띄우는 형식으로 만들었다. 카드에 대한 css 부분과 사라질 때의 애니메이션만 조금 주면 되겠다. 스크롤 이벤트를 다는게 은근히 시간이 많이 걸렸다. 예측하지 못한 에러들이 계속 나와서 되게 힘들었다... 아직도 곳곳에 보기 싫은 버그들이 조금씩 있는데 일단 시간이 너무 없어서 이것들에 할애할 시간이 없다. 목요일에 가서 리팩토링하면서 좀 신경써서 고쳐봐야겠다.

이렇게 프로젝트를 한번 진행하면 css 실력이 확 느는게 느껴진다. 하지만, 그 잠깐 뿐이다. 복습하지 않으면 또 금방 까먹을거고 다음 프로젝트에서도 다시 처음부터 시작해야된다. html css 까지도 능숙하게 할 수 있는 프론트 개발자가 되기 위해서는 이 부분에 대한 공부도 소홀히 해서는 안되겠다는 생각이 많이 들었다. 

오늘 오후에 간단한 css와 애니메이션들 그리고 링크들을 다 손봐야겠다.

26일(수) -프로필 페이지는 찜한 목록만 보여주는 식으로 하기로 했으니까 찜한 목록들을 보여주는 My List 페이지를 오전에 구현하고 오후에 각 review에 대한 좋아요 싫어요 댓글을 남기는 기능을 마저 구현해야 겠다.

27일(목) - 지금 폴더구조나 변수명이 완전히 개판이다. 이 부분에 대한 수정도 오전 중에 다 마쳐야겠다. 그리고 오후에 배포하는걸 좀 신경써서 해봐야겠다.