//Тестовое задание набора (04.10.2021) MERN V3

//=== Linux навигация и поиск ===
// Задание
// Напишите набор команд с комментарием их работы которые вы примените для решения следующих задач:

// 1. Выведите список идентификаторов процессов содержащих в названии sh
// pgrep sh

// 2. Объедините все файлы *.txt в один /all.txt
// cat *.txt > all.txt

// 3. Выведите список имен (без пути и расширения) файлов с расширением .jpg в папке images
// ls *.jpg | sed 's/\.jpg//g'

// 4. Напишите bash скрипт который переименует все файлы в папке logs с .txt на <md5 hash> и создайте файл dict в который сохраните связь старого и нового имен.
// P.S: <md5 hash> -- это md5 хеш названия файла.
// #!/bin/bash
// touch dist
// for i in `ls *.txt`; do
// sum=$(echo -n "$i" | md5sum)
// echo "$i" - "${sum%% *}" >> dist
// mv "$i" "${sum%% *}"
// done

// 5. Модифицируйте права доступа и владельца папки images следующим образом: Пользователь 1200 и группа www-data имеют чтение/запись на всю директорию и на файлы внутри директории остальные не имеют доступа к папке и файлам и исполнения файлов.
// crown 1200:www-data /images
// chmod -R 770 /images

// 6. Перезапишите файл access.txt его же текущим содержимым.
// touch file.txt
// cp access.txt file.txt
// cp file.txt access.txt
// rm file.txt

// 7. Выведите список файлов в папке images размер которых более 3 мегабайт и строкой в имени "cat"
// find ./images -name "cat*" -size +3M

// === GIT внесение изменений ===
// Рабочее окружение
// Вы уже работаете на ветке task_4 родительская ветка которой dev.
// Задание
// На ветке dev удаленного репозитория появились новые изменения и ваша задача добавить их в свою ветку перед своими,
// опишите порядок ваших действий.

// Решение
// 1. git checkout dev - переключиться на ветку dev
// 2. git pull - подгрузить изменения
// 3. git checkout task_4 - переключиться на ветку task_4
// 4. git merge dev - добавить изменения в ветку task_4

// === JS логика ===

// 1. Напишите функцию nodeChildCount которая получает на вход объект типа Node
// и возвращает число всех вложенных нодов,
// аргумент deep указывать глубину подсчета если не указан то бесконечно.
// Пример:

// const div = document.createElement('div');
// const p = document.createElement('p');
// const span = document.createElement('span');
// p.appendChild(span);
// div.appendChild(p);

// let nodeChildCount = (elem, count = null) => {
//   if (elem.children.length === 0 || count === 0) return 0;
//   let result = elem.children.length;

//   let arr = Array.from(elem.children);

//   for (let i = 0; i < arr.length; i++) {
//     count === null
//       ? (result += nodeChildCount(arr[i]))
//       : (result += nodeChildCount(arr[i], count - 1));
//   }
//   return result;
// };

// nodeChildCount(div); // 2
// nodeChildCount(div, 1) // 1
// nodeChildCount(div, 2) // 2

//==========
// 2. Напишите функцию генератор chunkArray которая возвращает
// итератор возвращающий части массива указанной длинны.
// Пример:

// function* chunkArray(arr, value) {
//   const array = [];

//   for (let i = 0; i < arr.length; i += value) {
//     array.push(arr.slice(i, i + value));
//   }

//   for (let i = 0; i < array.length; i++) {
//     yield array[i];
//   }
// }

// const iterator = chunkArray([1, 2, 3, 4, 5, 6, 7, 8], 3);
// iterator.next(); // { value: [1,2,3], done: false }
// iterator.next(); // { value: [4,5,6], done: false }
// iterator.next(); // { value: [7,8], done: false }
// iterator.next(); // { value: undefined, done: true }

// 3. Напишите функцию обертку которая на вход принимает массив функций и их параметров, а возвращает массив результатов их выполнения.
// !!!ВНИМАНИЕ!!! Количество аргументов исполняемой функции не ограничено!
// Пример:
// const f1 = (cb) => {cb(1)}
// const f2 = (a, cb) => {cb(a)}
// const f3 = (a, b, cb) => {setTimeout(() => cb([a, b]), 1000)}
// bulkRun(
//   [
//     [f1, []],
//     [f2, [2]]
//     [f3, [3, 4]]
//   ]
// ).then(console.log)
// Output: [1, 2, [3, 4]]

const f1 = (cb) => {
  cb(1);
};
const f2 = (a, cb) => {
  cb(a);
};
const f3 = (a, b, cb) => {
  setTimeout(() => cb([a, b]), 1000);
};

let bulkRun = (funcArr) => {
  let promises = [];

  for (const item of funcArr) {
    let p = new Promise((resolve) => {
      item[0](...item[1], (val) => {
        resolve(val);
      });
    });
    promises.push(p);
  }
  return Promise.all(promises);
};

bulkRun([
  [f1, []],
  [f2, [2]],
  [f3, [3, 4]],
]).then((val) => console.log(val));

//============
// 4. Сделать функцию mapper которая на вход принимает набор правил для преобразования данных.
// Формат правила:
// [<поле которое преобразовуем>, <новое название поля>[, <функция для преобразования значения>]]
// Пример:
// let testData3 = [
//   {
//     name: 'Vasya',
//     email: 'vasya@example.com',
//     age: 20,
//     skills: { php: 0, js: -1, madness: 10, rage: 10 },
//   },
//   {
//     name: 'Dima',
//     email: 'dima@example.com',
//     age: 34,
//     skills: { php: 5, js: 7, madness: 3, rage: 2 },
//   },
//   {
//     name: 'Colya',
//     email: 'colya@example.com',
//     age: 46,
//     skills: { php: 8, js: -2, madness: 1, rage: 4 },
//   },
//   {
//     name: 'Misha',
//     email: 'misha@example.com',
//     age: 16,
//     skills: { php: 6, js: 6, madness: 5, rage: 2 },
//   },
//   {
//     name: 'Ashan',
//     email: 'ashan@example.com',
//     age: 99,
//     skills: { php: 0, js: 10, madness: 10, rage: 1 },
//   },
//   {
//     name: 'Rafshan',
//     email: 'rafshan@example.com',
//     age: 11,
//     skills: { php: 0, js: 0, madness: 0, rage: 10 },
//   },
// ];

// const mapRules = [
//   ['name', 'n', (value) => value.toLowerCase()],
//   ['age', 'a'],
// ];

// let mapper = (rules) => {
//   return function (person) {
//     let obj = {};
//     rules.forEach((rule) => {
//       obj[rule[1]] = person[rule[0]];
//       if (rule[2]) {
//         obj[rule[1]] = rule[2](obj[rule[1]]);
//       }
//     });
//     return obj;
//   };
// };

// console.log(testData3.map(mapper(mapRules)));
// testData3.map(mapper(mapRules));
// [{"n":"vasya","a":20},{"n":"dima","a":34},{"n":"colya","a":46},{"n":"misha","a":16},{"n":"ashan","a":99},{"n":"rafshan","a":11}]

//==========
// 5. Есть функция primitiveMultiply, которая умножает числа,
// но случайным образом может выбрасывать исключения типа: NotificationException, ErrorException.
// Задача написать функцию обертку которая будет повторять вычисление при исключении NotificationException,
// но прекращать работу при исключениях ErrorException
// Пример:
// function NotificationException() {}
// function ErrorException() {}

// function primitiveMultiply(a, b) {
//   const rand = Math.random();
//   if (rand < 0.5) {
//     return a * b;
//   } else if (rand > 0.85) {
//     throw new ErrorException();
//   } else {
//     throw new NotificationException();
//   }
// }

// function reliableMultiply(a, b) {
//   let result;
//   let wrapper = () => {
//     try {
//       result = primitiveMultiply(a, b);
//     } catch (error) {
//       result = error;
//     }
//   };
//   do {
//     wrapper();
//   } while (result instanceof NotificationException);
//   return result;
// }
// console.log('Result', reliableMultiply(8, 8));

//==========
// 6. Дана матрица (двумерный массив), нужно написать функцию, которая будет находить наименьшее значение,
//   после чего все нечетные значения в матрице будет умножать на это число.

// Исходная матрица:
// [
//  [5, 3, 6],
//  [7, 11, 2],
//  [15, 9, 4]
// ]
// Результат выполнения функции:
// [
//  [10, 6, 6],
//  [14, 22, 2],
//  [30, 18, 4]
// ]

// let multMatrix = (array) => {
//   let min = Math.min(...array.flat());
//   console.log(min, array);
//   return array.map((arr) => arr.map((i) => (i % 2 === 0 ? i : i * min)));
// };

// console.log(
//   multMatrix([
//     [5, 3, 6],
//     [7, 11, 2],
//     [15, 9, 4],
//   ]),
// );
