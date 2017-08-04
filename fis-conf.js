/**
 * Copyright (c) 2014 Baidu, All rights reseved.
 * @fileoverview home FIS配置
 * @author HY | huangyan09@baidu.com
 * @version 1.0 | 2015-01-21 | HY    // I初始版本。
 */

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 基本配置。
fis.config.merge({
  namespace: 'home',
  project: {
    exclude: /(?:\.(tar|rar|psd|jar|pdf)$|\/output)/i,    // 排除某些后缀，svn相关的默认即排除；排除 output 目录。
    fileType: {
      image: 'woff2, otf'
    }
  },
  roadmap: {
    // domain: 'http://cdn.iknow.bdimg.com'    // 静态文件域名。
  },
  settings: {
    spriter: {
      csssprites: {
        layout: 'matrix',    // 按照“矩阵”方式排列图片，可使产出图片体积更小；要求：用于平铺的背景图不可以(MUST NOT)进行 css sprite 处理。
        margin: 5            // 图片间的间距。
      }
    },
    optimizer: {
      'html-compress': {
        level: 'strip_comment'    // 对模板仅去注释，不压缩空白(压缩空白可能引起 class 类名连缀在一起)。
      }
    },
    packager : {
      // autopack : {
      //   'fid' : 'zuoye'    //为自动合并分配的产品线 FID
      // }
    }
  },
  modules: {
    parser: {
      less: 'zuoye-less'    // less 文件使用自定义解析器 zuoye-less 解析。
    }
  },
  pack: {
    'pkg/home.css': [
      '/static/home/**.less'
    ],
    'pkg/home.js': [
      '/static/home/**.js'
    ],
    'pkg/m-home.css': [
      '/static/m-home/**.less'
    ],
    'pkg/m-home.js': [
      '/static/m-home/**.js'
    ]
  },
  deploy: {
    local: {
      to: './output'
    }
  }
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 部署配置。
var deployTargets = {
  // 线上 web00.
  web00: {
    host: 'cp01-homework-web00.cp01'
  },
  ocean1254: {
    host: 'cp01-ocean-1254-1.epc.baidu.com',
    port:8080,
    deploy: [{
      from: '/template',    // 模板
      to: '/home/homework'
    }, {
      from: '/static',      // 静态资源
      to: '/home/homework/webroot'
    }, {
      from: '/config',      // config
      to: '/home/homework/data/smarty'
    }, {
      from: '/plugin',      // plugin
      to: '/home/homework/php/phplib/ext/smarty/baiduplugins',
      subOnly: true
    }]
  },
  // 测试机 real05.
  real05: {
    host: 'cp01-testing-iknow-real05.cp01',
    port: 8888,
    deploy: [{
      from: '/template',    // 模板
      to: '/home/iknow'
    }, {
      from: '/static',      // 静态资源
      to: '/home/iknow/webroot'
    }, {
      from: '/config',      // config
      to: '/home/iknow/template'
    }, {
      from: '/plugin',      // plugin
      to: '/home/iknow/template/plugin',
      subOnly: true
    }]
  },
  // 测试机 tets01
  test01: {
    host: 'test1.afpai.com',
    port: 80,
    deploy: [{
      from: '/template',    // 模板
      to: '/mnt/homework'
    }, {
      from: '/static',      // 静态资源
      to: '/mnt/homework/webroot'
    }, {
      from: '/config',      // config
      to: '/mnt/homework/data/smarty'
    }, {
      from: '/plugin',      // plugin
      to: '/mnt/homework/template/plugin',
      subOnly: true
    }]
  },
  test04: {
    host: 'test4.afpai.com',
    port: 80,
    deploy: [{
      from: '/template',    // 模板
      to: '/home/homework'
    }, {
      from: '/static',      // 静态资源
      to: '/home/homework/webroot'
    }, {
      from: '/config',      // config
      to: '/home/homework/data/smarty'
    }, {
      from: '/plugin',      // plugin
      to: '/home/homework/template',
      subOnly: true
    }]
  }
};

var deployConfig = [{
  from: '/template',    // 模板
  to: '/home/homework'
}, {
  from: '/static',      // 静态资源
  to: '/home/homework/webroot'
}, {
  from: '/config',      // config
  to: '/home/homework/data/smarty'
}, {
  from: '/plugin',      // plugin
  to: '/home/homework/php/phplib/ext/smarty/baiduplugins',
  subOnly: true
}];

fis.util.map(deployTargets, function(serverName, serverConfig){
  var _deployConfig = serverConfig.deploy || [].concat(deployConfig);

  for (var i = 0; i < _deployConfig.length; ++i) {
    fis.util.merge(_deployConfig[i], {
      receiver: 'http://' + serverConfig.host + ':' + (serverConfig.port || '8080') + '/fisreceiver.php',
      exclude: /\/page\/demo\//
    }); 
  }

  fis.config.set('deploy.' + serverName, _deployConfig);
});