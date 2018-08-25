# ts-copyable
[![npm version](https://badge.fury.io/js/ts-copyable.svg)](https://badge.fury.io/js/ts-copyable) [![Build Status](https://travis-ci.org/nwtgck/ts-copyable-npm.svg?branch=master)](https://travis-ci.org/nwtgck/ts-copyable-npm) [![Greenkeeper badge](https://badges.greenkeeper.io/nwtgck/ts-copyable-npm.svg)](https://greenkeeper.io/)

Type-safe .copy() for TypeScript inspired by Scala case-class


## How to install

```sh
$ npm install --save ts-copyable
```

## How to use

### Before

```ts
class Person{
    constructor(readonly name: string, readonly age: number){
    
    }
}
```


### After


```ts
import Copyable  from 'ts-copyable';
```

```ts
class Person extends Copyable<Person>{
    constructor(readonly name: string, readonly age: number){
        super(Person);
    }
}
```

Then your `Person` class is copyable!


```ts
const p1 = new Person("jack", 10);

p1.copy({age: 2});
// => Person("jack", 2)

p1.mapCopy({age: prev => prev+1});
// => Person("jack", 11) 
```

## How about type-safety?

```ts
const p1 = new Person("jack", 10);

p1.copy({age: "abc"});
// Compile error (GOOD!)

p1.copy({somethingElse: 99});
// Compile error (GOOD!)

p1.mapCopy({age: prev => prev+"abc"});
// Compile error (GOOD!)

```
