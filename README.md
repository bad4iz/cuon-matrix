# Библиотека матричных преобразований: cuon-matrix 
With which you can create transformation matrices similar to how it is done in OpenGL.   
С помощью которой вы сможете создавать матрицы преобразований подобно тому, как это делается в OpenGL.  

![](https://img.shields.io/npm/v/cuon-matrix.svg)
![](https://img.shields.io/npm/dt/cuon-matrix.svg)

![](https://img.shields.io/github/commit-activity/m/bad4iz/cuon-matrix.svg)
![](https://img.shields.io/github/last-commit/bad4iz/cuon-matrix.svg)

[![Wallaby.js](https://img.shields.io/badge/wallaby.js-configured-green.svg)](https://wallabyjs.com)
[![Wallaby.js](https://img.shields.io/badge/wallaby.js-powered-blue.svg)](https://wallabyjs.com/oss/)

[npm cuon-matrix](https://www.npmjs.com/package/cuon-matrix)


> ## Сохраним наследие.
>!["Cuon alpinus"](https://github.com/bad4iz/cuon-matrix/blob/main/cuon_alpinus.jpg?raw=true "Cuon alpinus")  
> В поддержку Красного волка (*Cuon alpinus*) внесённого в красную книгу.  
> В Сибири местные жители называют его «улан шоно» (красный волк) и «чикалка».




> !!! пишем документацию по мере проекта

## Vector3 - _Трехмерный вектор (вектор из трех элементов)._
Дефолтное значение.
```js
const vector3 = new Vector3();

vector3 //? Vector3 { elements: Float32Array { [Iterator]  0: 0, 1: 0, 2: 0 } }
vector3.elements.length //? 3
```
Задаем через конструктор начальное значение.
```js
const vector3 = new Vector3([0, 50, 0.5]);

vector3.elements //? Float32Array { [Iterator]  0: 0, 1: 50, 2: 0.5 }
```
Нормализация
```js
const vector3 = new Vector3([0, 50, 0.5]);

vector3.elements //? Float32Array { [Iterator]  0: 0, 1: 50, 2: 0.5 }

vector3.normalize()
vector3.elements //? Float32Array { [Iterator]  0: 0, 1: 0.9999499917030334, 2: 0.009999499656260014 }

```

## cuon-matrix
С помощью которой вы сможете создавать матрицы преобразований подобно тому, как это делается в OpenGL.

В программах на JavaScript тригонометрические функции доступны как методы объекта Math.
Аналогично функции создания матриц преобразований доступны как методы объекта Matrix4,
который определяется в cuon-matrix. Matrix4 – это новый объект и, как следует из его
имени, реализует операции с матрицами 4×4. Эти матрицы представлены типизированными массивами Float32Array.


