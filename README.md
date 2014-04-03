# jqoteplus-build

> precompile jqoteplus templates

前端模板可以让我们很简单的组建一系列复杂的html结构。在项目的累计中，会发现我们所用的模板越来越多，使用模板的第一步就是让通过模板解析工具将模板解析成function再执行，为了节省浏览器的编译时间，所以我们可以将这一步提前做了。所以有了jqoteplus-build的诞生。

## Getting Started
This plugin requires Grunt `~0.4.4`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install jqoteplus-build --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('jqoteplus-build');
```

## The "jqoteplus_build" task

### Overview
In your project's Gruntfile, add a section named `jqoteplus_build` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  jqoteplus_build: {
    build: {
        src: [],
        options: {
            exclude: [],
            deployPath: '',
            deployName: ''
        }
    }
  },
});
```
### src
Type: `Array`
Default value: ``

定义需要预编译的文件数组

### Options

#### options.exclude
Type: `Array`
Default value: `none`

用于定义不需要预编译的文件名/路径数组。

#### options.deployPath
Type: `String`
Default value: `none`

编译后的文件路径

#### options.deployName
Type: `String`
Default value: `templatefunc.js`

编译后的文件名字

### Usage Examples
定义`test/jqote` 下面的所有ftl后缀文件都需要编译。exclude说明包含`test/jqote/read`的文件路径或者文件名字不需要编译，`deployPath`和`deployName`组合起来就是最后编译结果路径。
```js
grunt.initConfig({
  jqoteplus_build: {
    build: {
        src: ['test/jqote/**/*.ftl'],
        options: {
            exclude: ['test/jqote/read'],
            deployPath: 'test/build/',
            deployName: 'template.js'
        }
    }
  },
});
```

## Release History
###0.1.2 release
