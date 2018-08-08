# simpleds.js
A simple framework written in JavaScript ES5 which provides basic data-stuctures.

## Installing
Inside your node project

`npm install git+https://github.com/harshit1810/simpleds.js.git`

## Usage
**in nodejs**

`const simpleds = require('simpleds.js');`

**In browser**, use the file *main.js* inside *dist* folder

`<script src="simpleds.js/dist/main.simpleds.js"></script>`

then, in your code

`const simpleds = simpleds;`

**Note:** The project is a work in progress, currently, only following data structures are available for use :
- ### Singly Linked List
    
    This [singly linked list](https://en.wikipedia.org/wiki/Linked_list) provides many solutions to linked-list related problem statements which are listed at **GeeksforGeeks** (https://www.geeksforgeeks.org/data-structures/linked-list/singly-linked-list/)

    ```
    const List = simpleds.SinglyLinkedList;
    let myList = new List();
    ```

    See documentation for following methods in the file `lib/singly-linked-list/singly-linked-list-methods.js`

    The created instance of `SinglyLinkedList` provides following operations on the list : 
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
    - Get a string representation of the string (toString()).

- ### Circular Linked List

    This [Circular linked list](https://en.wikipedia.org/wiki/Linked_list#Circular_linked_list) provides many solutions to circular linked-list related problem statements which are listed at **GeeksforGeeks** (https://www.geeksforgeeks.org/data-structures/linked-list/#circularLinkedList)

    ```
    const List = simpleds.CircularLinkedList;
    let myList = new List();
    ```

    See documentation for following methods in the file `lib/circular-linked-list/circular-linked-list-methods.js`

    The created instance of `CircularLinkedList` provides following operations on the list : 
    - Check if the list is empty.
    - Calculate the size of the list.
    - Get the last node in the list starting from the node marked as head.
    - Fetch a node from a specified position.
    - Append a node to the list.
    - Remove node from a position.
    - Get a string representation of the string (toString()).

## Test
`npm test`

## Todos
CI needs to be configured properly.

## Contributing
Feel free to submit your pull request. code must follow es5.