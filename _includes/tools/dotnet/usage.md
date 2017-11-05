```csharp
var babel = ReactEnvironment.Current.Babel;
// 转译一个文件
// 如果你也想要 source map, 那么可以使用 `TransformFileWithSourceMap`.
var result = babel.TransformFile("foo.js");
// 转译一段代码
var result = babel.Transform("class Foo { }");

```
