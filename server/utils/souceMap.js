const SourceMap = require('source-map');
const { SourceMapConsumer } = SourceMap;

const sourceMaps = ( rawSourceMap, json ) => new Promise((reslove, reject) => {
        SourceMapConsumer.with(rawSourceMap, null, consumer => {
            const pos = consumer.originalPositionFor({
                line: json.lineno, // 报错的行
                column: json.colno, // 报错的列
                name: json.message,
            });
            reslove(pos)
        });
})

module.exports = sourceMaps