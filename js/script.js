// "The simple types of JavaScript are numbers, strings, booleans (true / false),
//  null and undefined. All other values are objects"
// - Douglas Crockford

// What is an object?
// A collection of information sorted in key: value pairs

// MDN
// https://developer.mozilla.org/en-US/

// This is an emtpty object - ocjects are created with curly brackets {}
const anObject = {};

// This is an object with information.

const user = {
    firstName: 'MJ',
    lastName: 'Philips',
    age: 150,
    hobbies: 'linear gradients',
};

// To access values in the objects, we can use object notation:

console.log(user.firstName); // MJ

// You can also use bracket notation

console.log(user['age']); // 150

// An object can house a lot of other information as well, and objects can hold functions better knows as "methods"

const dog = {
    name: 'Poons',
    age: 5,
    poop: function () {
        // in order for this method to access the objects other values, we use the "this" keyword.
        const name = this.name;
        // you can also call other methods within the objects with the "this" keyword
        this.communicate('Hnngh');
        console.log(`${name} did a poop. Now, go and pick it up`);
    },
    communicate: function (say) {
        const name = this.name;
        console.log(`${name} says ${say}`);
    },
};

// In order to use a method within an object, you call it with the same way as you access an object value:

dog.poop();
dog.communicate('Throw a ball and watch me chase it!');

// You can also use an object to collect and "name" multiple arrays

const bunchOfArrays = {
    arrayOne: [0, 1, 3, 4, 5, 6, 7, 8, 9],
    arrayTwo: [10, 11, 13, 14, 15, 16, 17, 18, 19],
    arrayThree: [20, 21, 23, 24, 25, 26, 27, 28, 29],
    meaningOfLife: [42],
};

// Read about the Object.keys() method here: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
Object.keys(bunchOfArrays).map((key) => console.log(key)); // arrayOne, arrayTwo, arrayThree, meaning of life

// But what is an array?

// This is a JavaScript array:
const anArray = []; // square brackets

// "An array is a linear allocation of memory in which elements ar accessed by integers that are used to compute offsets.
//  Arrays can be very fast data structures. Unfortunateyly, JavaScript does not have anything like this kind of array."
// - Douglas Crockford

// Some of the good parts about JS arrays are the built in Array methods
// .map();
// .filter();
// .forEach();
// .reduce();

// These do not work on objects:
// anArray.forEach(); // work
// anObject.forEach(); // error

// "Arrays (...) are high-level, list-like objects." - mozilla.org
// Read mora about arrays here: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array?source=post_page-----fca9d895e54a----------------------

typeof anArray === 'object'; // true

// To check if a value is an array, we can use the Array.isArray() method:

console.log(Array.isArray(anArray)); // true

// Arrays are always 0 indexed. So the first item in an array is always 0
// To access items in an array, we use bracket notation with the index number for the item we want

const qwerty = ['q', 'w', 'e', 'r', 't', 'y'];

console.log(qwerty[2]); // "e"

// To access an array inside an object, we can combine dot-notation and bracket notation
// object.array[index]
console.log(bunchOfArrays.arrayOne[1]); // 2

// Then we have JSON (JavaScript Object Notation)
// MDN: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/JSON
// The APIs we use in front-end development usually returns JSON. Some APIs are easy to use and navigate,
// others are might be more complex with a lot of nested data

// This is a nice API to practice diving into arrays in objects in arrays: https://api.spacexdata.com/v3/launches/

fetch('https://api.spacexdata.com/v3/launches/')
    .then((res) => res.json())
    .then((json) => {
        const data = json;
        console.log(data);
        createHtml(data);
    })
    .catch((error) => console.log(error)); // forgot this part in the webinar, but you should always handle your errors!

function createHtml(data) {
    const container = document.querySelector('.api-container');

    // The API sends us an array full of objects. Each object represents a mission:
    // Targeting missions 29 in the array:
    const oneMission = data[28];

    console.log('---------- Mission 29 ----------');
    console.log(oneMission);

    // Targeting the links object in the mission 29 object in the launches (data) array:
    const missionLinks = data[28].links;
    console.log('---------- Mission links ----------');
    console.log(missionLinks);

    // Targeting the flick_images array inside the links object inside the mission object inside the launches (data) array
    const missionImages = data[28].links.flickr_images;
    console.log('---------- Mission images ----------');
    console.log(missionImages);

    // Checking the value of "missionImages" to verify that it is an array
    console.log(Array.isArray(missionImages)); // true

    let html = '';
    missionImages.map((item) => {
        console.log(item);
        html += `<img alt="image from spaceX mission 29" src="${item}" loading="lazy"/>`;
    });

    container.innerHTML = html;
}

// And then there are array-like objects - i.e. a NodeList:
// MDN NodeList: https://developer.mozilla.org/en-US/docs/Web/API/NodeList

// When using the querySelectorAll, we get a NodeList in return:
const nodeList = document.querySelectorAll('.nodelist__p'); // NodeList

console.log(nodeList);

// You can loop through a NodeList with for-loops or a forEach() method:
nodeList.forEach((p, index) => {
    console.log(p.className);
    p.innerHTML += ` is indexed at ${index}`;

    // Adding colors based on index value:
    p.style.backgroundColor = `#${index + 20}${index * 10}${index + 20}`;
    p.style.color = 'white';
});

// Some array methods will not work directly on a NodeList, but we can convert a NodeList to an array:
const arrayNodeList = Array.from(nodeList); // array

console.log(Array.isArray(arrayNodeList));
