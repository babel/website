在你的 MSBuild 脚本中都任务:

```xml
<UsingTask AssemblyFile="packages\React.MSBuild.2.1.0\React.MSBuild.dll" TaskName="TransformBabel" />
```

使用如下代码:

```xml
<TransformBabel SourceDir="$(MSBuildProjectDirectory)" TargetDir="" />
```

这样操作将会改变文件夹中每一个 `.js` 和 `.jsx` 文件，并同时对应生成一个 `.generated.js` 文件。

查看 [guide](http://reactjs.net/guides/msbuild.html) 获取更多信息。
