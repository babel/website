Import the task in your MSBuild script:

```xml
<UsingTask AssemblyFile="packages\React.MSBuild.2.1.0\React.MSBuild.dll" TaskName="TransformBabel" />
```

Use it:

```xml
<TransformBabel SourceDir="$(MSBuildProjectDirectory)" TargetDir="" />
```

This will transform every `.js` and `.jsx` file in the directory, and output a `.generated.js` file alongside it.

See the [guide](http://reactjs.net/guides/msbuild.html) for more information
