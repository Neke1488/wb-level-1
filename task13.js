// Задача на классы и наследование: создайте базовый класс Shape (фигура), который имеет методы для расчета площади и периметра. 
// Затем создайте подклассы, представляющие различные фигуры, такие как прямоугольник, круг и треугольник. 
// Реализуйте методы расчета площади и периметра для каждой фигуры.

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

class Rectangle extends Shape {
    constructor(a,b) {
        super();
        this.a = a;
        this.b = b;
    }
    countSquare() {
        return this.a * this.b;
    }

    countPerimetr() {
        return (this.a + this.b) * 2;
    }
}

class Circle extends Shape {
    constructor(b) {
        super();
        this.r = b;
    }
    countSquare() {
        return Math.PI * this.r * this.r;
    }

    countPerimetr() {
        return 2 * Math.PI * this.r;
    }
}

class Triangle extends Shape {
    constructor(a, b, c, height) {
        super();
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

const rectangle = new Rectangle(2,8);
const circle = new Circle(3)
const triangle = new Triangle(1,6,2,5)
console.log(rectangle.countSquare());
console.log(rectangle.countPerimetr());
console.log(circle.countSquare());
console.log(circle.countPerimetr());
console.log(triangle.countSquare());
console.log(triangle.countPerimetr());
