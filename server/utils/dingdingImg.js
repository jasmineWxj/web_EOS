//
var request = require('request');
var crypto = require('crypto');

var secret = "SEC3d03c0a464075d548ac658f05c48345445078a3602e47b7956b172555be6d318"//签名
var url = "https://oapi.dingtalk.com/robot/send?access_token=2a911f8c23f04db171a9195d076373a2adb22c32c7eac6b7cbd461ddd7c06284"//链接

const dingImgPost = (img, nodeName ) => {
    let datas =
        `EOS前端错误报警
静态资源报错:${nodeName}
报错信息:${img}
处理人: 前端负责人 @ALL`
    var data = {
        "msgtype": "text",
        "text": {
            "content": datas//聊天内容
        },
        "at": {
            "atMobiles": [
                ""//可以为空
            ],
            "isAtAll": false
        }
    }
    var time = Date.now();//当前时间
    var stringToSign = time + "\n" + secret;
    var base = crypto.createHmac('sha256', secret).update(stringToSign).digest('base64');
    var sign = encodeURIComponent(base)//签名
    url = url + `&timestamp=${time}&sign=${sign}`;
    console.log(url)
    request.post(//发送post
        url,
        {
            json: data,
            encoding: "utf-8",
            headers: {
                'Content-Type': 'application/json'
            }
        },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(body)//成功返回
            }
        }
    );
}


module.exports = dingImgPost