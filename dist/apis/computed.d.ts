import { Ref } from '../reactivity';
interface Option<T> {
  get: () => T;
  set: (value: T) => void;
}
export interface ComputedRef<T = any> extends WritableComputedRef<T> {
  readonly value: T;
}
export interface WritableComputedRef<T> extends Ref<T> {}
export declare function computed<T>(getter: Option<T>['get']): ComputedRef<T>;
export declare function computed<T>(options: Option<T>): WritableComputedRef<T>;
export {};
