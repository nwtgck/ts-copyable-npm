/**
 *
 * K    is type of a key
 * T[K] is type of its value
 */
export type PartialMap<T> = {
    [K in keyof T]?: (prev: T[K]) => T[K];
};

/**
 * Constructable
 *
 * e.g)
 * in case of `class A{}`, `A` is constructable
 *
 */
export type Constructable<T> = new(...args: any[]) => T; // (from: http://blog.yux3.net/entry/2017/02/08/033834)


/**
 * Copyable class
 * inspired by case-class .copy in Scala
 *
 */
export default class Copyable<T>{
    constructor(private _constructor: Constructable<T>){
    }

    /**
     * Return partial change of this object
     *
     * e.g)
     * `new Person("jack", 2).copy({age: 10})` is  `new Person("jack", 10)`
     *
     * @param {Partial<T>} partial
     * @returns {T} partial change
     */
    copy(partial: Partial<T>): T{
        const cloneObj: T = new this._constructor();　// (from: https://stackoverflow.com/a/17383858/2885946)
        return Object.assign(cloneObj, this, partial);
    }


    /**
     * Return partial change of this object by using functions
     *
     * e.g)
     * `new Person("jack", 10).mapCopy({age: prev => prev+1})` is  `new Person("jack", 11)`
     *
     * @param {PartialMap<T>} partial
     * @returns {T}
     */
    mapCopy(partial: PartialMap<T>): T {
        const cloneObj: T = new this._constructor();　// (from: https://stackoverflow.com/a/17383858/2885946)
        for (const key of Object.keys(this)) {
            if (key in partial) {
                cloneObj[key] = (partial as any)[key](this[key]);
            } else {
                cloneObj[key] = this[key];
            }
        }
        return cloneObj;
    }
}