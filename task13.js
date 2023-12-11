// Задача на классы и наследование: создайте базовый класс Shape (фигура), который имеет методы для расчета площади и периметра. 
// Затем создайте подклассы, представляющие различные фигуры, такие как прямоугольник, круг и треугольник. 
// Реализуйте методы расчета площади и периметра для каждой фигуры.

//создадим класс Shape 
class Shape {
    constructor() {
        this.type = 'Shape';
    }
    countSquare() {
        throw new Error("Вы должны посчитать площадь"); 
    }
    countPerimetr() {
        throw new Error("Вы должны посчитать периметр"); 
    }
}

//создадим класс Rectangle, который наследуется от Shape
class Rectangle extends Shape {
    constructor(a,b) {
//с помощью super внутри конструктора у Rectangle вызываем родительский конструктор Shape
        super();
//указываем на значения, которые нужны нам при расчёте
        this.a = a;
        this.b = b;
    }
    //по формулам периметра и площади прямоугольника считаем и возвращаем то что потребуется
    countSquare() {
        return this.a * this.b;
    }

    countPerimetr() {
        return (this.a + this.b) * 2;
    }
}
//создадим класс Сircle, который наследуется от Shape
class Circle extends Shape {
    //с помощью super внутри конструктора у Сircle вызываем родительский конструктор Shape
    constructor(b) {
        super();
        //указываем на значения, которые нужны нам при расчёте
        this.r = b;
    }
    countSquare() {
//для того чтобы посчитать площадь круга требутся число Пи, которое мы можем вызвать с помощью метода Math.PI 
        return Math.PI * this.r * this.r;
    }

    countPerimetr() {
        return 2 * Math.PI * this.r;
    }
}
//создадим класс Triangle, который наследуется от Shape
class Triangle extends Shape {
        //с помощью super внутри конструктора у Triangle вызываем родительский конструктор Shape
    constructor(a, b, c, height) {
        super();
        //указываем на значения, которые нужны нам при расчёте
        this.a = a;
        this.b = b;
        this.c = c;
        this.h = height;
    }
    countSquare() {
        return 1/2 * this.a * this.h;
    }

    countPerimetr() {
        return this.a + this.b + this.c;
    }
}

// для вызова каждого класса по отдельности, создадим их экземпляры с помощью new..., куда передадим данные для расчёта
const rectangle = new Rectangle(2,8);
const circle = new Circle(3);
const triangle = new Triangle(1,6,2,5);
console.log(rectangle.countSquare());
console.log(rectangle.countPerimetr());
console.log(circle.countSquare());
console.log(circle.countPerimetr());
console.log(triangle.countSquare());
console.log(triangle.countPerimetr());
