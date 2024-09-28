가장 어이없는 부분은

```ts

// 강제 element 렌더링 trick
// eslint-disable-next-line @typescript-eslint/no-unused-expressions
root.current?.offsetHeight

```
이 부분에 있다. 기존에는 타이밍 이슈인지 제대로 transition 애니메이션이 먹지 않던 것이, 저 코드를 한줄 써주면 다시 렌더링을 잡는건지... 잘 된다.