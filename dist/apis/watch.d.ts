import { Ref } from '../reactivity';
import { ComputedRef } from './computed';
export declare type WatchEffect = (onInvalidate: InvalidateCbRegistrator) => void;
export declare type WatchSource<T = any> = Ref<T> | ComputedRef<T> | (() => T);
export declare type WatchCallback<V = any, OV = any> = (
  value: V,
  oldValue: OV,
  onInvalidate: InvalidateCbRegistrator
) => any;
declare type MapSources<T> = {
  [K in keyof T]: T[K] extends WatchSource<infer V> ? V : never;
};
declare type MapOldSources<T, Immediate> = {
  [K in keyof T]: T[K] extends WatchSource<infer V>
    ? Immediate extends true
      ? V | undefined
      : V
    : never;
};
export interface WatchOptionsBase {
  flush?: FlushMode;
}
declare type InvalidateCbRegistrator = (cb: () => void) => void;
export declare type FlushMode = 'pre' | 'post' | 'sync';
export interface WatchOptions<Immediate = boolean> extends WatchOptionsBase {
  immediate?: Immediate;
  deep?: boolean;
}
export interface VueWatcher {
  lazy: boolean;
  get(): any;
  teardown(): void;
}
export declare type WatchStopHandle = () => void;
export declare function watchEffect(
  effect: WatchEffect,
  options?: WatchOptionsBase
): WatchStopHandle;
export declare function watch<
  T extends Readonly<WatchSource<unknown>[]>,
  Immediate extends Readonly<boolean> = false
>(
  sources: T,
  cb: WatchCallback<MapSources<T>, MapOldSources<T, Immediate>>,
  options?: WatchOptions<Immediate>
): WatchStopHandle;
export declare function watch<T, Immediate extends Readonly<boolean> = false>(
  source: WatchSource<T>,
  cb: WatchCallback<T, Immediate extends true ? T | undefined : T>,
  options?: WatchOptions<Immediate>
): WatchStopHandle;
export declare function watch<T extends object, Immediate extends Readonly<boolean> = false>(
  source: T,
  cb: WatchCallback<T, Immediate extends true ? T | undefined : T>,
  options?: WatchOptions<Immediate>
): WatchStopHandle;
export {};
