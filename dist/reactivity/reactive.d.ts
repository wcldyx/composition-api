import { AnyObject } from '../types/basic';
import { UnwrapRef } from './ref';
export declare function isRaw(obj: any): boolean;
export declare function isReactive(obj: any): boolean;
/**
 * Auto unwrapping when access property
 */
export declare function defineAccessControl(target: AnyObject, key: any, val?: any): void;
export declare function shallowReactive<T extends object = any>(obj: T): T;
export declare function markReactive(target: any, shallow?: boolean): void;
/**
 * Make obj reactivity
 */
export declare function reactive<T extends object>(obj: T): UnwrapRef<T>;
/**
 * Make sure obj can't be a reactive
 */
export declare function markRaw<T extends object>(obj: T): T;
export declare function toRaw<T>(observed: T): T;
