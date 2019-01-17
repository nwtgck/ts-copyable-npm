import * as assert from 'power-assert';

import { Copyable } from '../lib/index';

/**
 * Copyable Person class
 */
class Person extends Copyable<Person>{
    /**
     * Create new person
     * @param {string} name
     * @param {number} age
     */
    constructor(readonly name: string, readonly age: number){
        super(Person);
    }
}

describe('Copyable', () => {
    it('assert test', () => {
        const person1 = new Person("jack", 2);
        const person2 = new Person("jack", 2);
        assert(person1, person2);
    });

    it('.copy() equality', () => {
        const person1 = new Person("jack", 10);
        const person2 = person1.copy({age: 2});
        const expect  = new Person("jack", 2);

        // person1 shouldn't change age
        assert(person1.age, 10);
        // person2 should be expect
        assert(person2, expect);
    });

    it('.mapCopy() equality', () => {
        const person1 = new Person("jack", 10);
        const person2 = person1.mapCopy({age: prev => prev+1});
        const expect  = new Person("jack", 11);

        // person2 should be expect
        assert(person2, expect);
    });

    it('should be compile errors', () => {
        const person1 = new Person("jack", 10);

        // person1.copy({age: "abc"});
        // => compile error (GOOD!)

        // person1.copy({somethingElse: 2});
        // => compile error (GOOD!)


        // person1.mapCopy({age: prev => prev + "abc"});
        // => compile error (GOOD!)

        // person1.mapCopy({somethingElse: 2});
        // => compile error (GOOD!)

    });

});
