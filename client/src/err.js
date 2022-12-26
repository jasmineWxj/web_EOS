
// window.addEventListener("unhandledrejection", function (e) {
//     e.preventDefault();
//     console.log(e);
//     return true;
// });


window.addEventListener('error', args => {
    // console.log(
    //     'error event:', args
    // );
    if (args.target.nodeName === 'IMG'){
        imgerr(args.target)
    }else{
        uploadError(args)
    }
    return true;

},true)

// 图片资源报错
function imgerr(args){
    const { src, nodeName } = args
    const info = {
        src,
        nodeName
    }
    const str = window.btoa(JSON.stringify(info))
    const host = 'http://localhost:7001/monitor/img'
    new Image().src = `${host}?info=${str}`
}

function uploadError({
    lineno,
    colno,
    error: {
        stack
    },
    timeStamp,
    message,
    filename
}) {
    // 过滤
    const info = {
        lineno,
        colno,
        stack,
        timeStamp,
        message,
        filename
    }
    // const str = new Buffer(JSON.stringify(info)).toString("base64");
    const str = window.btoa(JSON.stringify(info))
    console.log(str);
    const host = 'http://localhost:7001/monitor/error'
    new Image().src = `${host}?info=${str}`
}