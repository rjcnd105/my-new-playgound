import { pipe } from "@effect/data/Function";
import * as Either from "@effect/data/Either";
import * as Effect from "@effect/io/Effect";
import * as Layer from "@effect/io/Layer";
import * as Context from "@effect/data/Context";

/*
* Effect<R, E, A>
* ====================
* 
* 대략적으로 Effect는 다음과 같이 생각할 수 있습니다.
* (r: R) => Promise<Either<E, A>> | Either<E, A>

* R: 요구 사항
* E: 실패시 데이터 타입 (Either<E, A> 에서의 E)
* A: 성공시 데이터 타입 (Either<E, A> 에서의 A)
* 
* 
* */
export const succeed = Effect.succeed(7); 
// Effect.Effect<never, never, number>;

export const fail = Effect.fail(3);
// Effect.Effect<never, number, never>;

/*
* sync, failSync
* 
* sync: lazy succeed
* failSync: lazy fail
* 
* Effect가 실행될때 빌드됩니다.
* 아래의 new Date()는 실행 시점의 시간을 반환합니다.
* */
export const sync = Effect.sync(() => new Date());
// Effect.Effect<never, never, Date>;

export const failSync = Effect.failSync(() => new Date());
// Effect.Effect<never, Date, never>;

// suspend
// 위의 sync, failSync를 분기태울 수 있음.
export const suspend =
  Effect.suspend(() =>
    Math.random() > 0.5
      ? Effect.succeed(new Date())
      : Effect.fail("<.5" as const),
  );
// Effect.Effect<never, '<.5', Date>;


/*
* flatMap
* Either 형태를 Effect 형태로 바꿉니다.
* Effect.flatMap(() => Either.right(1)) -> Effect.succeed(1)
* Effect.flatMap(() => Either.left(2)) -> Effect.fail(2)
* */

function eitherFromRandom(random: number): Either.Either<"fail", number> {
  return random > 0.5 ? Either.right(random) : Either.left("fail" as const);
}

export const flakyEffect = pipe(
  Effect.sync(() => Math.random()), // Effect.Effect<never, never, number>
  Effect.flatMap(eitherFromRandom), // Effect.Effect<never, 'fail', number>
);

// Effect에서 제공하는 random 함수 사용
export const flakyEffectAbsolved = pipe(
  Effect.random(), // Effect.Effect<never, never, Random>
  Effect.flatMap(random => random.next()), // Effect.Effect<never, never, number>
  Effect.flatMap(eitherFromRandom), // Effect.Effect<never, 'fail', number>
);

// 위에서의 작업들은 전부 과정에 대한 워크플로우고 실제 실행은 아래처럼 한다
Effect.runPromise(flakyEffectAbsolved); // executes flakyEffectAbsolved  


// 위에처럼 Either나 Option을 사용한 다음에 Effect로 lift하면 Either, Option을 사용하는 코드와
// Effect와의 로직을 통합할 수 있습니다.

// 바로 Effect로 만드는 경우에는 좀 더 어플리케이션 레이어에서의 종속성을 필요로 할때 하는 것이 좋습니다.

// 아래 코드들은 바로 Effect로 생성하는 예
function flakyEffectFromRandom(random: number) {
  return Effect.cond(
    () => random > 0.5,
    () => random,
    () => "fail" as const,
  );
}

export const flakyEffectNative = pipe(
  Effect.random(), // Effect.Effect<never, never, Random>
  Effect.flatMap(random => random.next()), // Effect.Effect<never, never, number>
  Effect.flatMap(flakyEffectFromRandom), // Effect.Effect<never, 'fail', number>
);

 
/*
* R - 의존성(Dependency)
* ====================
* Context - Dependency Injection
* 위에서의 예제들은 전부 종속성(R)이 없는 Effect입니다.
* 
* 의존성 주입 기능을 제공하기 위해 Effect는 Context라는 데이터 구조를 사용합니다.
* context는 태그를 해당 구현(Service 라고 함)에 매핑하는 테이블입니다.
* 
* Map<Tag, Service> 같은 형태를 생각하면 됩니다.
* 
* Tag는 Effect의 subtype이기 때문에 이를 통해 map, flatMap을 사용하여 서비스에 도달할 수 있다.
* 
* Effect.map(CustomRandom, (service) => ...)
* 이렇게 하면 코드에서 CustomRandom에 대한 종속성이 도입됩니다.
* 이는 요구 사항 채널(R)이 CustomRandom 유형이 되는 Effect<R, E, A> 데이터 유형에 반영됩니다.
* */

export interface CustomRandom {
  readonly next: () => number;
}

// tag 생성
// tag 생성시 키를 지정할 수 있는데, 그러면 해당 키를 통해 전역에 동일 인스턴스를 바라보게 된다.
export const CustomRandomTag = Context.Tag<CustomRandom>();

export const serviceExample = pipe(
  // Tag가 Effect의 subtype이라 Effect처럼 사용할 수 있다.
  CustomRandomTag, // Context.Tag<CustomRandom, CustomRandom>
  Effect.map(random => random.next()), // Effect.Effect<CustomRandom, never, number>
  Effect.flatMap(flakyEffectFromRandom), // Effect.Effect<CustomRandom, 'fail', number>
);

// 아까 실행했던 runPromise는 종속성을 제공하지 않기 때문에 코드 에러가 발생합니다.
// Effect.runPromise(serviceExample) 


/*
* provideService, provideContext, provideLayer
* ===========================================
* 
* 위의 종속성 주입을 통해 
* */


// provideService
// 단일 서비스에 의존하는 효과에 유용
export const provideServiceExample = pipe(
  serviceExample,
  Effect.provideService(CustomRandomTag, { next: Math.random }),
);

// provideContext 
// 여러 서비스에 의존하는 효과에 유용

// a. 먼저 context 생성
const context = pipe(
  Context.empty(),
  Context.add(CustomRandomTag, { next: Math.random }),
  // Context.add(FooTag)({ foo: 'foo' })
);

// b. 해당 context 종속성을 주입
export const provideContextExample = pipe(
  serviceExample, // Effect.Effect<CustomRandom, 'fail', number>
  Effect.provideContext(context), // Effect.Effect<never, 'fail', number>
);



// Layer로 제공
// 복잡한 종속성 트리가 있는 실제 시스템에 유용함 (추후 더 알아봄)

// a. Layer 생성
export const CustomRandomServiceLive = () => ({
  next: Math.random,
});

// b. Layer 주입
export const liveProgram = pipe(
  serviceExample,
  Effect.provideLayer(
    Layer.succeed(CustomRandomTag, CustomRandomServiceLive()),
  ),
);




// 이러한 구조는
// 추후 테스트나 mocking시에 유리합니다.
export const CustomRandomServiceTest = () => ({
  next: () => 0.3,
});

export const testProgram = pipe(
  serviceExample,
  Effect.provideService(CustomRandomTag, CustomRandomServiceTest()),
);