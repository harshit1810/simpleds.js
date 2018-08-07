# simpleds.js
A simple framework written in JavaScript ES5 which provides basic data-stuctures.

## Installing
`npm install simpleds.js`

## Usage
**in nodejs**

```
const simpleds = require('simpleds.js');
const LinkedList = simpleds.SinglyLinkedList;
let myList = new LinkedList();
myList.append(10);
```
**In browser**
use the file *main.js* inside *dist* folder

`<script src="main.simpleds.js"></script>`

then, in your code

```
const linkedList = simpleds.SinglyLinkedList
let myList = new linkedList();
myList.append(1);
```

Since it is a work in progress, currently, the following are available for use :
- ### Singly Linked List
    
    This [singly linked list](https://en.wikipedia.org/wiki/Linked_list) provides solutions to many linked-list related problem statements some which are listed at **GeeksforGeeks** (https://www.geeksforgeeks.org/data-structures/linked-list/singly-linked-list/)

    The `SinglyLinkedList` provides following operations on the list : 
    - Check if the list is empty.
    - Calculate the size of the list.
    - Get the last node in the list. 
    - Get node from a specific position.
    - Append a node to the list.
    - Remove a node from beginning.
    - Add a node in the beginning.
    - Remove a node from the end of the list.
    - Insert a node at a position.
    - Remove node from a position.
    - Reverse whole or a segment of the list.
    - Detect loop in the list.
    - Introduce a loop in the list.
    - Remove loop from the list.
    - Check if the list is palindrome.
    - Find a node from the end of the list.
    - Check if the list is sorted in ascending / descending order.
    - Sort the list in ascending order.
    - Swap values of any two nodes.
    - Remove duplicates from the list.
    - Rotate the list in counter-clockwise direction by specified number of places.
    - Get a string representation of the string.

    See documentation in the file `singly-linked-list-methods.js`

## Test
`npm test`

## Contributing
Feel free to submit your pull request. code must follow es5.