---
layout: main
title: Why you should not be using async/await
description: async/await should help you write cleaner code, but does it?
tags: ['post', 'tc39', 'javascript', 'node.js']
date: 2023-02-03
image: 
---

# {{ title }}

Yet another rant against `JavaScript`'s new stuff.

I have been a JavaScript developer for almost 15 years, and I have led engineering teams on both
front-end and back-end projects for a little over 3 years. During this time I made some decisions
on my code that were at first only dependent on what I wanted, then dependent on what was best
for my peers and finally what was best for the developers I was leading and those to come after.

`async/await` has been one of those topics where every developer wants to migrate to the new syntax, and has many great arguments,
but I was not convinced that the shift would be beneficial on the long term.

## The async/await promise & appeal

At first glance `async/await` seems like a great option for JavaScript developers.
After all, at first we only had callbacks for asynchronous code execution,
and most devs had a hard time understanding how async worked, and even worse -- 
we had `callback hell`.

The transition to promises as I remember was amazing. At first I did not like the change
but the new syntax made it simpler to chain async code without going into callback hell
(although with some exceptions). And better still, it allowed us to create readable and maintainable
async functions.

Using `async/await` now looks like magic, since we don't need to pass functions as parameters and
we can juste code line by line, just slap an `await` and boom, you get your result after the async
code has finished its task. But why was `async/await` added to JS since we already migrated to Promises
and they were so well implanted in the ecosystem?

According to the [`async/await` proposal](https://github.com/tc39/proposal-async-await) it was first-of-all
introduced to simplify the language -- to reduce boilerplate code. This allows (in theory) JS developers to
write code only for what they need it to do, and not whatever that code needs to function. 

Async/await is also meant to simplify the access to JavaScript. Since most developers don't learn async programming
at first, it is easier to transition to an async language that "writes" like if it was synchronous (ie: executed line by line).

## What async/await actually solves

### The spec example

The example given to us by the proposal intro is as follows:
- We have a function that chains different animations on an element
- We are using promises
- Code is hard to understand

Their result looks like this:

```js
function chainAnimationsPromise(elem, animations) {
    let ret = null;
    let p = Promise.resolve(); // current promise

    for(const anim of animations) {
        p = p.then(function(val) {
            ret = val;
            return anim(elem);
        });
    }

    return p.catch(function(e) {
        /* ignore and keep going */
    }).then(function() {
        return ret;
    });
}
```

Then, migrating to `async/await`
- Boilerplate code is gone
- Code can be read "synchronously"

```js
async function chainAnimationsAsync(elem, animations) {
    let ret = null;
    try {
        for(const anim of animations) {
            ret = await anim(elem);
        }
    } catch(e) { /* ignore and keep going */ }
    return ret;
}
```

We cannot argue that the code does seem simpler to read!

But is this an actual use-case? Yes, we often have async-chaining algorithms for different reasons:
- you need to make API requests that depend on each other
- you need to read files recursively
- etc...

But I believe their example is misleading, since it wants us to believe that using async/await will simplify these use-cases 
by removing boilerplate code and allowing us to write it synchronously just slapping an `async` and `await` on it.

In reality this code could be written in different ways, for example as a recursive function:
```js
function chainAnimationsRecursive(element, animations, currentIndex=0, lastResult=null) {
	const anim = animations[currentIndex];
	if(!anim) {
		// We are done and we kept the result like before
		return Promise.resolve(lastResult);
	}

	return anim(element).then((result) => {
		return chainAnimationsRecursive(element, animations, currentIndex + 1, result);
	}).catch(e => {
		// ignore and keep going
		return chainAnimationsRecursive(element, animations, currentIndex + 1, lastResult);
	});
}
```

The way I see it, besides the small code duplication this code is way easier to read than the first one, and does not introduce `for await` looops. It does
have some boilerplate code, since we are checking the animation index and if it exists, but it does not introduce hard-to-understand movements.

### Actual problems `async/await` solves

#### Error catching

Imagine a basic scenario where you need to get a user auth and then some info depending on that user. However
you can only get that info if the user is a part of the current organization.

SO far we've got these functions
```js
function getUser() {
	return asyncApiCall('/user');
}

function getUserInfo(user) {
	if(!isPartOfCurrentOrg(user)) {
		throw new Error('User is not a part of current org');
	}

	return asyncApiCall('/user-info', user);
}
```

Using these functions with promises would look like this:
```js
// we got the user before somehow
function getUserName(user) {
	getUserInfo(user).then(userInfo => {
		return userInfo.name;
	}).catch(e => {
		console.error('Could not get user info');
	});
}
```
I'm guessing you can see the problem here. If the user is not a part of current org we've got an uncaught exception. We have 2 solutions:
- 1/ change `throw new Error` on `getUserInfo` to `return Promise.reject(new Error`
- 2/ add a `try/catch` on top of our promise chain

Using async/await allows us to prevent this since the try/catch block on trop will catch the error (because the function was wrapped in `async`).

#### Variable access

Let's imagine now we want to log the user id (`user.id`) and the user name (`userInfo.name`) somewhere. Using promises this can become difficult if we are chaining them:
```js
getUser().then(user => {
	return getUserInfo(user);
}).then(userInfo => {
	// How do we get user.id ??
	console.log(userInfo.name);
});
```

You can imagine the solutions:
- the first `then` can return a `Promise.all` including the user
- we can add a `user` variable on top of the first call to affect the user result and have it ready later
- we can split this in two functions creating a closure with user once we get userInfo

Using `async/await` this becomes trivial
```js
const user = await getUser();
const userInfo = await getUserInfo(user);
console.log(user.id, userInfo.name);
```


## When `async/await` goes wrong

The biggest problem with this new syntax is that junior developers slap it everywhere, 
not sure if it is needed or not (couple that with TypeScript and VSCode and you've got async/await carnival).

In my experience `async/await` prevents junior developers from properly learning how asynchronous code actually works and executes, and
most importantly, how to optimize it.

Methods like `Promise.all` and its siblings are completely forgotten and you end up with unoptimized code and sometimes useless syntax.

### Chaining `async/await`s and forgotten promises

I cannot tell you how many times I've seen stuff like this in existing code:
```js
const obj1 = await getObj1();
const obj2 = await getObj2();
const obj3 = await getObj3();

doSomething(obj1, obj2, obj3);
```

This code is unoptimized because the developer took the easy route of just slapping `await`, _because it writes/reads like synchronous code_ and thus
seems right, especially if you're not familiar with async code. This snippet will indeed behave like synchronous code, getting one object after the other
while none of them are interdependent. I can imagine you already see the small optimization using `Promise.all`.

`Promise.race` and `Promise.any` are also often self-implemented with bogus and hard to read code because the entire `Promise` family is unkown to junior developers.


### Useless/forgotten `async/await`

I've also seen existing code and reviewed new code with what I call "forgotten" `async/await`s. In reality I cannot say
if they have been forgotten or freely slapped, but I prefer to tell myself that they have been forgotten.

This creates code that looks like this:
```js
async function soSomething() {
	await somethingAsync();
}
```

or:
```js
async function soSomething() {
	return await somethingAsync();
}
```

In the first snippet we are awaiting some result "for nothing".I admit there are some cases where you _might_ want to await for something
without using a result, but they are rare since they mean you need to wait but you don't care if the result is OK or if the code threw an error.

In most cases this just means that a developer decided that since the code was somehow asynchronous an `async/await` was necessary, or even worse
their IDE/text editor (probably VSCode + TS) warned them that this code is async so they added this to remove said warning (don't get me started on junior devs + TS).

The second snippet is just a small overzealous usage of await, since it is not necessary because the `somethingAsync` function is already returns a Promise, so there is no
need to wrap everything in an `async/await`. Even if we had `await`ed something before there would be no need to slap `await` after the `return` statement. There is even an
[ESLint rule](https://eslint.org/docs/latest/rules/no-return-await#rule-details) against this.

### await loops

Remember our first example?
As it happens, since most junior developers haven't yet gotten the chance to fully grasp asynchronous code, it seems natural to use `await` in a for loop.

This creates a habit and most often than not becomes the same problem than with await chaining. Many promises that could be done in parallel become sequencial
breaking the possible optimizations. Again, there is an [ESLint Rule](https://eslint.org/docs/latest/rules/no-await-in-loop#examples) made explicitly for this purpose.

This can also create a misunderstanding, making it so the habit of using await creeps its way into mapping and iteration functions (that in turn do not _actually await_).

### await.then

I don't know how to explain this one, but I have seen it with my own eyes:

```js
async function myAsyncFunc() {
	return await someAysncThing().then(result => {
		doSomethingWithTheResult(result);
	});
}
```

So yeah, stick to one or the other please.

---

As a team leader or CTO, you can probably understand that this means slower code since it means more debugging before opening Pull Requests, and more code reviews since
the solutions will probably default to "hacking over async/await" instead of falling back to promises. Moreover it probably also means more difficulties for your developers to
understand what's wrong with their code.

I often use `async/await`s in my unit tests, since often I need to use previous async results for assertations and readability, but in my main codebases I only default to Promises.

