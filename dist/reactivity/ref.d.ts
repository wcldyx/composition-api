import { Data } from '../component';
import { ComputedRef } from '../apis/computed';
declare const _refBrand: unique symbol;
export interface Ref<T = any> {
  readonly [_refBrand]: true;
  value: T;
}
export declare type ToRefs<T = any> = {
  [K in keyof T]: Ref<T[K]>;
};
export declare type CollectionTypes = IterableCollections | WeakCollections;
declare type IterableCollections = Map<any, any> | Set<any>;
declare type WeakCollections = WeakMap<any, any> | WeakSet<any>;
declare type BaseTypes = string | number | boolean | Node | Window;
export declare type UnwrapRef<T> = T extends ComputedRef<infer V>
  ? UnwrapRefSimple<V>
  : T extends Ref<infer V>
  ? UnwrapRefSimple<V>
  : UnwrapRefSimple<T>;
declare type UnwrapRefSimple<T> = T extends Function | CollectionTypes | BaseTypes | Ref
  ? T
  : T extends Array<any>
  ? T
  : T extends object
  ? UnwrappedObject<T>
  : T;
declare type SymbolExtract<T> = (T extends {
  [Symbol.asyncIterator]: infer V;
}
  ? {
      [Symbol.asyncIterator]: V;
    }
  : {}) &
  (T extends {
    [Symbol.hasInstance]: infer V;
  }
    ? {
        [Symbol.hasInstance]: V;
      }
    : {}) &
  (T extends {
    [Symbol.isConcatSpreadable]: infer V;
  }
    ? {
        [Symbol.isConcatSpreadable]: V;
      }
    : {}) &
  (T extends {
    [Symbol.iterator]: infer V;
  }
    ? {
        [Symbol.iterator]: V;
      }
    : {}) &
  (T extends {
    [Symbol.match]: infer V;
  }
    ? {
        [Symbol.match]: V;
      }
    : {}) &
  (T extends {
    [Symbol.replace]: infer V;
  }
    ? {
        [Symbol.replace]: V;
      }
    : {}) &
  (T extends {
    [Symbol.search]: infer V;
  }
    ? {
        [Symbol.search]: V;
      }
    : {}) &
  (T extends {
    [Symbol.species]: infer V;
  }
    ? {
        [Symbol.species]: V;
      }
    : {}) &
  (T extends {
    [Symbol.split]: infer V;
  }
    ? {
        [Symbol.split]: V;
      }
    : {}) &
  (T extends {
    [Symbol.toPrimitive]: infer V;
  }
    ? {
        [Symbol.toPrimitive]: V;
      }
    : {}) &
  (T extends {
    [Symbol.toStringTag]: infer V;
  }
    ? {
        [Symbol.toStringTag]: V;
      }
    : {}) &
  (T extends {
    [Symbol.unscopables]: infer V;
  }
    ? {
        [Symbol.unscopables]: V;
      }
    : {});
declare type UnwrappedObject<T> = {
  [P in keyof T]: UnwrapRef<T[P]>;
} &
  SymbolExtract<T>;
interface RefOption<T> {
  get(): T;
  set?(x: T): void;
}
declare class RefImpl<T> implements Ref<T> {
  readonly [_refBrand]: true;
  value: T;
  constructor({ get, set }: RefOption<T>);
}
export declare function createRef<T>(options: RefOption<T>): RefImpl<T>;
export declare function ref<T extends object>(raw: T): T extends Ref ? T : Ref<UnwrapRef<T>>;
export declare function ref<T>(raw: T): Ref<UnwrapRef<T>>;
export declare function ref<T = any>(): Ref<T | undefined>;
export declare function isRef<T>(value: any): value is Ref<T>;
export declare function unref<T>(ref: T): T extends Ref<infer V> ? V : T;
export declare function toRefs<T extends Data = Data>(obj: T): ToRefs<T>;
export declare function toRef<T extends object, K extends keyof T>(object: T, key: K): Ref<T[K]>;
export declare function shallowRef<T>(value: T): T extends Ref ? T : Ref<T>;
export declare function shallowRef<T = any>(): Ref<T | undefined>;
export declare function triggerRef(value: any): void;
export {};
