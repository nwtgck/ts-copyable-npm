# ts-copyable

A npm package making your class copyable.

This package is inspired by `.copy` in Scala case-class


## How to install

```sh
$ npm install --save ts-copyable
```

## How to use

### before

```ts
class Person{
    constructor(readonly name: string, readonly age: number){
    
    }
}
```


### after

```ts
import Copyable  from 'ts-copyable';

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

p1.mapCopy({age: prev => prev+"abc});
// Compile error (GOOD!)

```