const fs = require('fs');
const axios = require('axios');

const code = [
  "if",
  "for",
  "while",
  "do",
  "function",
  "method",
  "class",
  "static",
  "switch",
  "case",
  "default",
  "public",
  "static",
  "void",
  "main",
  "int",
  "string",
  "list",
  "push",
  "pop",
  "enqueue",
  "enqueue",
  "this",
  "self",
  "if",
  "for",
  "while",
  "do",
  "function",
  "method",
  "class",
  "static",
  "switch",
  "case",
  "default",
  "public",
  "static",
  "void",
  "main",
  "int",
  "string",
  "list",
  "push",
  "pop",
  "enqueue",
  "enqueue",
  "this",
  "self",
  "if",
  "for",
  "while",
  "do",
  "function",
  "method",
  "class",
  "static",
  "switch",
  "case",
  "default",
  "public",
  "static",
  "void",
  "main",
  "int",
  "string",
  "list",
  "push",
  "pop",
  "enqueue",
  "enqueue",
  "this",
  "self",
  "var",
  "const",
  "let",
  "async",
  "await",
];

const symbols = [
  "(",
  ")",
  "{",
  "}",
  "[",
  "]",
  ">",
  "<",
  "/",
  ":",
  ";",
  "+",
  "-",
  "=",
  "==",
  "===",
  "!",
];

const numbers = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "0",
]

const words = [
  "on",
  "to",
  "by",
  "over",
  "under",
  "the",
  "at",
  "a",
  "that",
  "foo",
  "bar",
  "baz",
  "'s",
  "certain",
  "corpse",
  "beautiful",
  "infect",
  "wine",
  "magnitude",
  "list",
  "height",
  "banish",
  "stuff",
  "hesitate",
  "gesture",
  "diet",
  "engagement",
  "leg",
  "court",
  "myth",
  "cathedral",
  "cellar",
  "kettle",
  "hill",
  "bowel",
  "reproduce",
  "delete",
  "relief",
  "absolute",
  "despair",
  "dismiss",
  "float",
  "rich",
  "concept",
  "pedestrian",
  "oral",
  "pollution",
  "slogan",
  "model",
  "appeal",
  "canvas",
  "sympathetic",
  "just",
  "quarrel",
  "justify",
  "radical",
  "integrated",
  "discuss",
  "texture",
  "labour",
  "mechanism",
  "concession",
  "memory",
  "fisherman",
  "revolution",
  "sweet",
  "introduce",
  "pattern",
  "oldage",
  "perceive"
]


const objects = {};
let id = 1;



code.forEach(item => {
  for (let x = 1; x <= 2; x++) { add(item) }
})

numbers.forEach(item => {
  for (let x = 1; x <= 2; x++) { add(item) }
})

symbols.forEach(item => {
  for (let x = 1; x <= 3; x++) { add(item) }
})

words.forEach(item => {
  add(item);
})

async function add(item) {

  let word = {
    word: item,
    x: undefined,
    y: undefined,
  }

  const response = await axios.post('http://localhost:4000/api/v1/magnets', word);
  console.log(response.data);

  objects[++id] = word;
}

// fs.writeFile('./words.json', Buffer.from(JSON.stringify(objects)), (err, data) => {
//   console.log('done');
// });
