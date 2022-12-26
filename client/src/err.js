
// window.addEventListener("unhandledrejection", function (e) {
//     e.preventDefault();
//     console.log(e);
//     return true;
// });


window.addEventListener('error', args => {
    console.log(
        'error event:', args
    );
    uploadError(args)
    return true;

},true)
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
    const host = 'http://localhost:7001/monitor/error'
    console.log(str);
    new Image().src = `${host}?info=${str}`
}