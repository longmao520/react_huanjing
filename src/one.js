import two from "./two"

const x = 3;
console.log(x + two.y);
// 装饰器语法  @testtable 代表的是 立即调用函数 传入的第一个参数应为是 类 
function testtable(target) {
    target.isShow = true // 在类上添加属性
}
// 
@testtable
class Mytest {

}
console.log("装饰器语法", Mytest.isShow);
const delay = new Promise(resolve => console.log("new Promise()"));
function* helloWorldGenerator() {
    yield 'hello';
    yield 'world';
    return 'ending';
}
var hw = helloWorldGenerator();


