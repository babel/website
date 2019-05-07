```csharp
var babel = ReactEnvironment.Current.Babel;
// Transpiles a file
// You can instead use `TransformFileWithSourceMap` if you want a source map too.
var result = babel.TransformFile("foo.js");
// Transpiles a piece of code
var result = babel.Transform("class Foo { }");

```
