#!/bin/bash
MOD_NAME="home"
TAR="$MOD_NAME.tar.gz"

# add path
export PATH=/home/fis/npm/bin:$PATH
#show fis-plus version
fisp --version --no-color

#通过fis-plus release 命令进行模块编译 开启optimize、md5、打包功能，同时需开启-u 独立缓存编译方式，产出到同目录下output中
fisp release -cuompDd output
#进入output目录
cd output
#删除产出的test目录
rm -rf test

#整理目录结构
mkdir -p ./webroot/static ./data/smarty ./php/phplib/ext/smarty/baiduplugins
cp -r ./static ./webroot
mv ./config ./data/smarty

rm -rf ./static
rm -rf ./plugin
rm -rf ./server-conf

#将output目录进行打包
tar zcf $TAR ./*
mv $TAR ../

cd ..
rm -rf output

mkdir output

mv $TAR output/

echo "build end"