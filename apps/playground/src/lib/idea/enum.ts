export const enum constDice {
  ONE,
  TWO,
  THREE,
  FOUR,
  FIVE,
  SIX,
}

export const enum constColor {
  RED,
  BLUE,
  GREEN,
  YELLOW,
  PURPLE,
  BLACK,
}
export enum Dice {
  ONE = 1,
  TWO,
  THREE,
  FOUR,
  FIVE,
  SIX,
}
export const DiceO = {
  ONE: 1,
  TWO: 2,
  THREE: 3,
  FOUR: 4,
  FIVE: 5,
  SIX: 6,
} as const;

Object.keys(DiceO); /*?*/

export enum Color {
  RED = 1,
  BLUE,
  GREEN,
  YELLOW,
  PURPLE,
  BLACK,
}

Color; /*?*/

// iterable 하지 않음.
// javascript에 enum이란 자료형이 없기에 타입스크립트로 억지로 만드느라...
// Enum임에도 불구하고 iterable 하지 않음.
// [...Color] /*?*/
// 타입 추론은 string으로 되고(string literal로 인식을 못함..) 최대 length도 알 수 없으니 오리무중..
const aa = Dice[1]; /*?*/ // ONE
const bb = Dice[8]; /*?*/ // undefined

export const enum Fruit {
  BANANA = "BANANA",
  APPLE = "APPLE",
}

export enum Flavor {
  VANILLA,
  STRAWBERRY,
  CHOCOLATE,
}

constDice.FIVE; /*?*/

// 타입스크립트에서 경고해줌.
// dice.ONE === color.RED; /*?*/

type ONE = constDice.ONE;
type RED = constColor.RED;
type APPLE = Fruit.APPLE; /*?*/

// 오... 타입에서는 확실히 분리가 됌
type ONEextendsRED = ONE extends RED ? true : false; /*?*/ // false
type ONEextends1 = ONE extends 1 ? true : false; /*?*/ // true
type ONEextendsNumber = ONE extends number ? true : false; /*?*/ // true

function isBiggerDiceNum(diceNum1: Dice, diceNum2: Dice) {
  return diceNum1 > diceNum2;
}
function isBiggerConstDiceNum(diceNum1: constDice, diceNum2: constDice) {
  return diceNum1 > diceNum2;
}
function isBiggerFruit(fruit1: Fruit, fruit2: Fruit) {
  return fruit1 > fruit2;
}
isBiggerDiceNum(Dice.ONE, Dice.TWO); /*?*/
// isBiggerDiceNum(Color.ONE, Color.TWO); /*?*/
isBiggerConstDiceNum(constDice.ONE, constDice.TWO); /*?*/ // false
isBiggerConstDiceNum(constDice.THREE, constDice.TWO); /*?*/ // true

// type error
// Dice Enum을 받기로 해서 똑같이 값이 number인 Color를 넣어도 타입 에러가 남.
// isBiggerDiceNum(Color.RED, Color.GREEN); /*?*/ // false

// APPLE이 BANANA보다 뒤에 순서상 뒤에 있음에도 불구하고 false로 나오는 것을 보면
// ENUM 선언에 순서로 열거 크기를 정하지 않음.
isBiggerFruit(Fruit.APPLE, Fruit.BANANA); /*?*/ // false

// 열거형임에도 불구하고 순서를 알 수 없다는게 아쉽다.
// 결국 기존의 Primitive 값을 사용함으로써 생기는 한계점.

Flavor; /*?*/

[...constDice]; /*?*/

function fff(c: constDice) {
  [...c];
}
