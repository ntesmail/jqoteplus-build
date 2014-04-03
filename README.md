# jqoteplus-build

> precompile jqoteplus templates



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
Default value: `',  '`

用于定义不需要预编译的文件名/路径数组。

#### options.deployPath
Type: `String`
Default value: ``

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
