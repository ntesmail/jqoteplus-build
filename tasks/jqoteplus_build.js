/*
 * jqoteplus-build
 * https://github.com/ntesmail/jqoteplus-build
 *
 * Copyright (c) 2014 ntesmail
 * Licensed under the MIT license.
 */

'use strict';

var fs = require('fs');
module.exports = function(grunt) {

    // Please see the Grunt documentation for more information regarding task
    // creation: http://gruntjs.com/creating-tasks

    grunt.registerMultiTask('jqoteplus_build', 'precompile jqoteplus templates', function() {

        // Merge task-specific and/or target-specific options with these defaults.
        var options = this.options({
          // force: false,
          // reporterOutput: null,
        });
        
        var that = this,
            deployPath = options.deployPath,
            root = options.root,
            exclude = options.exclude,
            deployName = options.deployName;
        grunt.log.writeln(deployPath);
        // for(var i in that){
        //     grunt.log.writeln(i + ": " + that[i]);
        // }
        // for(var i in options){
        //     grunt.log.writeln(i + ": " + options[i]);
        // }
        // set encode
        grunt.file.defaultEncoding = 'utf8';
        var jqotec = require('./lib/jqotec');
        var length = 0,
            fileMap = {};
        
        var output = ['(function($){'];
        var filePaths = that.files;
        // grunt.log.writeln('' + filePaths.length);
        grunt.log.writeln(typeof filePaths);
        filePaths.forEach(function(path) {
            var paths = path.src;
            paths.forEach(function(path) {
                var isExclude = false;
                for (var i = 0; i < exclude.length; i++) {
                    if (path.indexOf(exclude[i]) >= 0) {
                        isExclude = true;
                    }
                }
                if (isExclude) {
                    return;
                }
                var result = [];
                var formatPath = path.replace(root + '/', '');
                var fileName = '';
                grunt.log.oklns('deploy: ' + formatPath);
                var pathList = formatPath.split('/');
                formatPath = formatPath.replace('.ftl', '');
                var templateStr = '$.jqotecache["';
                // 组件列表对象.直接
                var lines = fs.readFileSync(path).toString().replace(/<#--(.|[\r\n])*?-->/gi, '').split("\n");
                var start = false;
                var pause = false;
                var matchCount = 0;
                var fileStr = '';
                var ids, id;
                for (var i = 0, l = lines.length, line, temp; i < l; i++) {
                    line = lines[i].trim();
                    // grunt.log.writeln('' + line);
                    if (line.match('<script')) {
                        matchCount++;
                        if (line.match('type="text/x-jqote-template"')) {
                            if (start) {
                                grunt.log.errorlns('template error');
                            } else {
                                ids = line.match('id="[^"]+"');
                                if (ids) {
                                    id = ids[0].replace(/^id="|"$/gi, '')
                                    grunt.log.writeln(id);
                                }
                                start = true;
                                continue;
                            }
                        }
                    }
                    if (line.match('</script>')) {
                        matchCount--;
                        if (matchCount == 0) {
                            // 单个Function结尾，输出function
                            var funcStr = jqotec.jqotec(fileStr);
                            // grunt.log.writeln('' + funcStr);
                            output.push(templateStr + id + '"]=function(i, j, data, fn){' + funcStr + '};');
                            start = false;
                        }
                    }
                    if (start) {
                        fileStr += line;
                    } else {
                        fileStr = '';
                    }
                }
                
            });
        });
        output.push('})(jQuery);');

        fs.writeFileSync('./' + deployPath + '/' + deployName, output.join('\n'));
    });

};