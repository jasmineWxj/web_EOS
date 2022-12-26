'use strict';

const Controller = require('egg').Controller;
const StackParser = require('../../utils/stackparser');
const gitUser = require('../../utils/runshell')
const sourceMaps = require('../../utils/souceMap')
const dingPost = require('../../utils/dingdingPost')
const fs = require('fs');
const path = require('path');
const SourceMap = require('source-map');
const { readFileSync } = fs;
const { SourceMapConsumer } = SourceMap;
const ErrorStackParser = require('error-stack-parser');

var regex1 = /\((.+?)\)/;
var regex2 = /\<(.+?)\>/;
class MonitorController extends Controller {
  async index() {
    const { ctx } = this;
    const { info } = ctx.query;
    const json = JSON.parse(Buffer.from(info, 'base64').toString('utf-8'));
    // console.log('fronterror:', json);
    // 转换为源码位置
    // ----
    // const stackParser = new StackParser(path.join(this.config.baseDir, 'uploads'));
    // const stackFrame = stackParser.parseStackTrack(json.stack, json.message);
    // const originStack = await stackParser.getOriginalErrorStack(stackFrame);
    // console.log(json);
    // this.ctx.getLogger('frontendLogger').error(json, originStack);

    // ----------
    // 路径处理
    const sourceMapDir = path.join(this.config.baseDir, 'uploads');
    // 转换传过来的文件名字
    const fullName = path.basename(json.filename);
    // 合并路径
    const sourceMapPath = path.resolve(sourceMapDir, fullName);
    const ispath = fs.existsSync(sourceMapPath + '.map');
    // console.log(sourceMapPath, ispath, '00000');
    if (!ispath) {
      ctx.body = '文件路径不存在';
      return;
    }
    const rawSourceMap = JSON.parse(readFileSync(sourceMapPath + '.map', 'utf8'));
    // SourceMapConsumer.with(rawSourceMap, null, consumer => {
    //   const pos = consumer.originalPositionFor({
    //     line: json.lineno, // 报错的行
    //     column: json.colno, // 报错的列
    //     name: json.message,
    //   });
    //   const usrname = gitUser({
    //     line: pos.line, // 报错的行
    //     column: pos.column,
    //     file: pos.source
    //   })
    //   this.ctx.getLogger('frontendLogger').error(json, pos);
    // });

    const line_colno = await sourceMaps(rawSourceMap,json)
    let usrname = await gitUser({
      line: line_colno.line, // 报错的行
      column: line_colno.column,
      file: line_colno.source
    })

    const commitId = usrname.slice(0, 8); // commit
    const codeUser = usrname.match(regex1)[0] // 代码处理者
    const codeMessage = json.message
    // this.ctx.getLogger('frontendLogger').error(json, line_colno, usrname);
    dingPost(
      usrname,
      line_colno,
      commitId,
      codeUser,
      codeMessage
    ) 
    ctx.body = '';
  }

  async upload() {
    const { ctx } = this;
    const stream = ctx.req;
    const filename = ctx.query.name;
    const dir = path.join(this.config.baseDir, 'uploads');
    console.log(stream, filename, dir);
    // 判断upload目录是否存在
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    const target = path.join(dir, filename);
    const writeStream = fs.createWriteStream(target);
    stream.pipe(writeStream);
  }
}

module.exports = MonitorController;
