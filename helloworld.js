/**
 * Hello world demo.
 * 
 */
'use strict';

let testPrintVar = function (name = 'zhengjin') {
    console.log(`hello world, ${name}`);
};

let testPath = function () {
    const path = require('path');

    // path.join concatenates all given path segments together 
    // using the platform specific separator as a delimiter, then normalizes the resulting path.
    console.log('path.join:', path.join(__dirname, '../logs'));

    // path.resolve() process the sequence of paths from right to left, 
    // with each subsequent path prepended until an absolute path is constructed.
    console.log('path.resolve:', path.resolve(__dirname, '../logs', '/bar/bae'));
};

let testObject = function testObject() {
    let tmpBoolean = true;

    let testObject = {
        testBoolean1: tmpBoolean ? 'pass' : 'failed',
        testBoolean2: function () {
            let ret = tmpBoolean ? 'pass' : 'failed';
            return ret.toUpperCase();
        }
    }
    console.log('Object boolean1 value:', testObject.testBoolean1);
    console.log('Object boolean2 value:', testObject.testBoolean2());
};

let testFnName = function (fn) {
    console.log('funcion name:', fn.name);
    console.log('funcion name:', arguments[0].name);
};

let fnCaller = function (fn) {
    console.log('hello', fn());
};
let fnCallBack1 = function (text) {
    return text;
};
let testCallBack = function () {
    // must be within the same context
    let fnCallBack2 = function () {
        return nameText;
    };

    const nameText = 'zhengjin';

    // #1, call by anonymous function
    fnCaller(function () {
        return nameText;
    });
    // #2, call by function
    fnCaller(() => fnCallBack1(nameText));
    // #3, call by function variable
    fnCaller(fnCallBack2);
};

let testJsonLoad = function () {
    // auto convert json string (in file) to json object
    let loadJson = require('./package.json');
    console.log('load json:', typeof loadJson);
    console.log('project description:', loadJson.description);
};

let testFnParams = function () {
    let tmpFn = function (firstName, lastName) {
        if (lastName) {
            console.log('hello', firstName, lastName);
            return;
        }
        console.log('hello', firstName);
    }

    tmpFn('henry');
    tmpFn('zheng', 'jin');
};

let testAddFn = function () {
    let tmpObj = {
        name: 'zheng jin',
        title: 'tester'
    }
    tmpObj['toMessage'] = function () {
        console.log(`Message: ${this.name}'s title is ${this.title}`);
    }

    tmpObj.toMessage();
};

let testObjectDestruct = function () {
    // matched by the property name in object
    // example 01, pass as arguments
    let printFullName = function ({
        firstName,
        lastName
    }) {
        console.log(`hello, ${firstName} ${lastName}`);
    };

    let tmpName = {
        national: 'China',
        firstName: 'zheng',
        lastName: 'jin',
        age: 30
    };
    printFullName(tmpName);

    // example 02, as return
    let getUserInfo = function () {
        return {
            national: 'China',
            firstName: 'zheng',
            lastName: 'jin',
            age: 30
        };
    };

    const {
        firstName,
        lastName
    } = getUserInfo();
    console.log('user name: ' + firstName + ' ' + lastName);
};

let testArrayDestruct = function () {
    // match the order in array
    let tmpArr = ['JS', 'Python', 'Java'];
    const [first, second] = tmpArr;
    console.log(`program: ${first}, ${second}`);
};

let testArgsJoin = function () {
    let argsJoin = function (...args) {
        console.log(args.join(' '));
    };
    argsJoin('hello', 'world', 'zheng', 'jin');
};

let testSelfRunFun = function () {
    (function () {
        console.log('self run function without name.');
    })();
    (function selfRun() {
        console.log('self run function with name.');
    })();
};

let testGetTcNameByRegExp1 = function () {
    const tmpStr = `Log 2) [Smoke test] [SE-02-Settings-Domain]: 
    3) [CI Automation] [MP-01-001-Add Multiple Pages]:
    4) Editor-Basic:
    Job succeeded`;
    const reg = /\d\)\s\[.+:/g;

    let m = tmpStr.match(reg);
    for (let tc of m) {
        console.log(tc);
    }
}

let testGetTcNameByRegExp2 = function () {
    const fs = require('fs');
    fs.readFile('./testdata/runlog_1020.log', function (err, data) {
        if (err) {
            console.error(err);
            return;
        }

        const reg = /\d\)\s\[.+:/g;
        let m = data.toString().match(reg);
        for (let tc of m) {
            console.log(tc);
        }
    });
}


if (require.main === module) {
    // testPrintVar();
    // testPrintVar('henry');

    // testPath();
    // testObject();
    // testFnName(testPath);
    // testCallBack();
    // testJsonLoad();
    // testFnParams();
    // testAddFn();

    testObjectDestruct();
    // testArrayDestruct();
    // testArgsJoin();

    // testSelfRunFun();
    // testGetTcNameByRegExp1();
    // testGetTcNameByRegExp2();
}