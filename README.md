# JS variable Watcher 과제 수행

## Execution step

Node version with v8.xx (tested in v8.0.0)

### 1.  `npm i`

- 실행에 필요한 노드 모듈 설치 필요
- es6 변환을 위한 babel 모듈 및 strict 컴파일 방지를 위한 babel 플러그인 설치

### 2.  `npm run start`

- 스크립트 컴파일 후 실행
- 차례대로 array, object, string, number에 대한 테스트를 수행
- array는 최초 [1,2,3] 으로 주어진다.
- -  push method를 이용하여 4번째 값으로 4를 넣는다
- -  첫번째 항목인 1을 0으로 값 변경
- -  4번째 항목인 4를 pop method를 이용해서 제거

- object는 최초 {a: 1} 로 주어진다
- - b라는 프로퍼티를 추가하고 값을 2로 준다
- - a 프로퍼티의 값을 0으로 변경한다.
- - a 프로퍼티를 delete를 이용하여 제거한다.

- string은 `a` 라는 스트링으로 주어진다.
- - `a` 를 `b`로 변경한다.

- number는 `1` 이라는 변수값으로 주어진다.
- - `1` 을 `2`로 변경한다.

위의 동작을 차례로 진행하며, 변경에 따른 콜백이 불려짐을 콘솔을 통해 확인한다.


## 구현 방향

- 기본적으로 [Proxy](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Proxy) 를 이용한 구현
- - Proxy 핸들러를 등록하고, 핸들러 내에서 넘겨받은 콜백 함수를 호출하는 식으로 구현


  
- Proxy가 되지 않는 브라우저에서의 실행이나 number string의 경우에는 Object.defineProperty를 이용
- - getter, setter를 재정의 하여 구현함
- - getter: 해당 object/ value를 클론떠서 내부에 보관하고, 해당 variable 에 접근 시 클론된 값을 받아온다,
- - setter: 해당 object/ value에 set 시도 시, 기존 값, 변경될 값 을 기존에 등록한 handler를 통해 알려준 후에 값을 변경한다.
- - number, string 의 경우 해당 변수를 포함한 scope 내의 this에 접근하여 처리하는 방향
- - this가 undefined로 되어있어서 대신 global 로 써서 처리
- - 실제 브라우저 환경에서는 this로 받아서 처리하도록 하면 될 것 같음.
- - string 이나 number의 경우 함수로 값을 넘기지 못하기에, 해당 부분에서 바로 watcher를 구현함.


