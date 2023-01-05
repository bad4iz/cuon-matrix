# Matrix Transformation Library: cuon-matrix
With which you can create transformation matrices similar to how it is done in OpenGL.

# Библиотека матричных преобразований: cuon-matrix
С помощью которой вы сможете создавать матрицы преобразований подобно тому, как это делается в OpenGL.  

![](https://img.shields.io/npm/v/cuon-matrix.svg)
![](https://img.shields.io/npm/dt/cuon-matrix.svg)

![](https://img.shields.io/github/commit-activity/m/bad4iz/cuon-matrix.svg)
![](https://img.shields.io/github/last-commit/bad4iz/cuon-matrix.svg)

[![Wallaby.js](https://img.shields.io/badge/wallaby.js-configured-green.svg)](https://wallabyjs.com)
[![Wallaby.js](https://img.shields.io/badge/wallaby.js-powered-blue.svg)](https://wallabyjs.com/oss/)

[npm cuon-matrix](https://www.npmjs.com/package/cuon-matrix)


> ## Let's preserve the legacy for our descendants.
> ## Сохраним наше наследие для наших потомков.
> 
>!["Cuon alpinus"](https://github.com/bad4iz/cuon-matrix/blob/main/cuon_alpinus.jpg?raw=true "Cuon alpinus")  
> In support of the Red Wolf (*Cuon alpinus*) listed in the Red Book.  
> In Siberia, locals call him "ulan shono" (red wolf) and "chikalka".
>
> В поддержку Красного волка (*Cuon alpinus*) внесённого в красную книгу.  
> В Сибири местные жители называют его «улан шоно» (красный волк) и «чикалка».


# cuon-matrix
With which you can create transformation matrices similar to how it is done in OpenGL.   
С помощью которой вы сможете создавать матрицы преобразований подобно тому, как это делается в OpenGL.

In JavaScript programs, trigonometric functions are available as methods of the Math object.
Similarly, the transformation matrix creation functions are available as methods of the Matrix4 object,
which is defined in cuon-matrix. Matrix4 is a new object and, as its
name implies, implements operations with 4×4 matrices. These matrices are represented by typed Float32Array arrays.   
В программах на JavaScript тригонометрические функции доступны как методы объекта Math.
Аналогично функции создания матриц преобразований доступны как методы объекта Matrix4,
который определяется в cuon-matrix. Matrix4 – это новый объект и, как следует из его
имени, реализует операции с матрицами 4×4. Эти матрицы представлены типизированными массивами Float32Array.


> !!! пишем документацию по мере проекта

## Vector3 - _Трехмерный вектор (вектор из трех элементов)._
### Дефолтное значение.
```js
import {Vector3} from 'cuon-matrix';

const vector3 = new Vector3();

vector3 //? Vector3 { elements: Float32Array { [Iterator]  0: 0, 1: 0, 2: 0 } }
vector3.elements.length //? 3
```
### Задаем через конструктор начальное значение.
```js
import {Vector3} from 'cuon-matrix';

const vector3 = new Vector3([0, 50, 0.5]);
vector3.elements //? Float32Array { [Iterator]  0: 0, 1: 50, 2: 0.5 }
```
### Нормализация
```js
import {Vector3} from 'cuon-matrix';

const vector3 = new Vector3([0, 50, 0.5]);
vector3.elements //? Float32Array { [Iterator]  0: 0, 1: 50, 2: 0.5 }

vector3.normalize()
vector3.elements //? Float32Array { [Iterator]  0: 0, 1: 0.9999499917030334, 2: 0.009999499656260014 }

```
## Vector4 - _Четырехмерный Вектор (вектор из четырех элементов)._
### Дефолтное значение.
```js
import {Vector4} from 'cuon-matrix';

const vector4 = new Vector4();

vector4 //? Vector4 { elements: Float32Array { [Iterator]  0: 0, 1: 0, 2: 0, 3: 0 } }
vector4.elements.length //? 4
```
### Задаем через конструктор начальное значение.
```js
import {Vector4} from 'cuon-matrix';

const vector4 = new Vector4([0, 50, 0.5, 1]);
vector4.elements //? Float32Array { [Iterator]  0: 0, 1: 50, 2: 0.5, 3: 1 }
```




