## <🎈완성된 페이지!!!>

![AfterMovie](./src/assets/img/AfterMovie.gif)



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

---

### 5.25 밤

movieDetail 페이지의 리뷰에 대한 것들은 완성했다. 이제 리뷰를 남긴 사람의 이름을 추가하는 것이 최우선이고 이후에 가능하다면 좋아요 싫어요 댓글의 개수까지 구현해야겠다.

---

### 5.26

타입스크립트를 쓰면서 object can be undefined 오류를 제일 많이 본 날이다. 그래도 다행이었던 것은 이에 대한 해결 방법을 상당히 빨리 찾았다는 것이다. 바로 자바스크립트의 기능인 옵셔널체이닝을 사용하면 된다. 만약, `movie.account.data`의 값이 있을 수도, undefined 일 수도 있는 상황이라면 우리는 `movie?.account?.data` 이런 식의 코드를 통해 해당 오류를 손쉽게 해결할 수 있다.

이제 프로젝트 마무리까지 사실상 하루의 시간만이 남았다. 진행 속도가 꽤 빠르다고 생각했고, 이 생각 때문에 조금은 느긋하게 작업했던 것 같다. 덕분에 지금은 너무나도 조급하다... 해야 할 일은 많은데 시간이 없다. 원래는 footer, 무한 스크롤, 다크 모드까지 모두 구현하려했는데 아마 footer 정도만 template으로 해결할 수 있지 않을까 싶다.

내일은 간단한 css 수정과 폴더 구조를 바꾸고 빠르게 배포를 시도해봐야겠다. 배포까지만 된다면 정말 그럴듯한 프로젝트가 완성되지 않을까 기대해본다.

---

### 5.27

오늘은 나머지 로그인이 되었을 때만 할 수 있는 기능들에대해 토큰 없이는 접근하지 못하도록 막는 식으로 코드를 구성하였다.

시간이 너무 없어서 원래 하려햇던 많은 기능들을 구현하지 못한 채로 끝내게 되었다... 다크모드, 로딩 시에 보여줄 다른 이미지, 무한 스크롤 등등 많은 기능들을 해보고 싶었는데 매일 미루다가 마지막 이틀동안 급하게 하려다 보니 결국은....ㅎ 항상 이런 식인 것 같다.

---

## 마무리

내가 싸피에 지원하고 들어온 이유는 나와 같은 꿈을 가진 사람들과의 네트워킹과 협업을 통한 프로젝트를 하기 위함에 있었다. 

싸피를 시작하고 5개월이 지났고 내가 기대했던 것보다 훨씬 많이 배웠고 느꼈다. 항상 혼자 공부하고 혼자 간단한 프로젝트를 하면서 힘들었던 것이, 중간에 계속 중단되는 느낌을 많이 느꼈기 때문이었다. 혼자 하게 되면 쉽게 의욕을 잃게 되고 무언가 새로운 것들을 시도하기가 어려운 것 같다. 이런 이유 때문에 타입스크립트로 프로젝트를 한번도 해본 적이 없었음에도 불구하고 내 자신을 강제해보기 위해 타입스크립트를 적용해보자는 목표를 세웠었다.

중간 중간 정말 골 때리는 일들도 많았고 힘들었지만 팀원이 있었기에 내 자신을 다독일 수 있었고 결국에는 타입스크립트로 프로젝트를 끝마칠 수 있었다. 너무 많이 배웠고 너무 많은 것들을 느꼈다. 정말 말도 안되는 자신감이지만 다음 프로젝트도 타입스크립트로 할 수 있을 것만 같은 밑도 끝도 없는 자신감이 있다.

앞으로 있을 6개월 동안 더 많은 프로젝트 경험을 하고 싶다. 이 과정에서 자바스크립트에 대해 더 많이 알고 싶다는 욕심도 많이 생겼다. 예전에는 단순히 자바스크립트를 쓰기만 했다면 요즘에는 자바스크립트 자체에 대해 이해하기 위한 노력을 하고 있고 재미있게 하고 있다.

이 프로젝트를 같이 진행했던 영석이형이 있었기에 정말 잘 끝마칠 수 있었다고 생각한다. 정말 영석이형 같은 페어를 만난 것은 행운 중의 행운이었다. 내가 원하는 데이터의 형식을 말씀드리면 금방 데이터를 정제해서 보내주시고 덕분에 훨씬 더 빠른 속도로 프로젝트를 진행시킬 수 있었다.

서로 어떤 데이터를 사용할지, 그 데이터의 형식은 어떨지, api call은 어떤 식으로 정할지 의논하면서 정말 내가 조금은 개발자가 되었구나... 라는 생각이 들었고 너무 재미있었다. 

가장 아쉬웠었던 점이자 앞으로 프로젝트를 할 때 개선해야할 것은 일정 계획에 대한 부분일 것 같다. 나와 영석이형은 첫 날 만나서 전체적인 일정을 짜고 프로젝트를 시작했다. 그리고 그 일정에 맞추어서 프로젝트를 진행하기는 했다. 여기서 가장 아쉬웠던 점이 전체 일정을 한번에 짜기 보다는 매일 매일 아침에 그 날의 일정을 짰으면 어땠을까라는 것이다. 내가 프론트를 맡고, 영석이형이 백엔드를 맡으면서 서로의 할 일이 어느정도 분리되었고 덕분에 실제 개발을 할 때는 많은 말을 하지 않고 했다. 그러다보니, 어느 순간에 보면 각자 서로 다른 일을 하고 있었다. 나는 영석이형이 해당 url로 요청을 보냈을 때 올 데이터를 정제하고 있는 줄 알고 그에 대한 작업을 하고 있었다면, 영석이형은 내가 또 다른 데이터가 필요한 줄 알고 그에 대한 정제 작업을 하고 있었다. 그러다보니 점점 시간적인 측면에서 지체되었던 것이 없지 않아 있었다.

정말정말 일정을 계획하는 일과, 서로가 커뮤니케이션하는 일은 중요하다. 분업을 하는 이유가 뭔가? 더 높은 생산성을 내기 위해서이다. 하지만, 서로가 커뮤니케이션 하지 못한다면 서로 다른 길을 가게 되고 그렇게 되면 혼자 할 때보다 생산성이 떨어진다. 

다음에 프로젝트를 하게 되면, 팀원의 규모가 어느 정도가 될지는 모르겠지만, 항상 팀원의 옆에 앉는 버릇을 들여야 겠다. 네모난 탁자에 대각선으로 앉았던게 더더욱 커뮤니케이션을 방해하는 것 같은 느낌을 많이 받았었다. 
