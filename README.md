GoogleAppsScript.Helpers

When you modify the getPost()
you have to rePublish to have new change

from Node.js, you can post to GAS like this

```
/**
 * Just a proxy to post to GAS, because GAS does not support CORS. I cannot post directly from browser to GAS
 @param execUrl "https://script.google.com/macros/s/AKfycbxdMlk9WU8444XJbydjOlGIf4E0de7JXG2zhcbrrrTySn0Oet/exec",
 */
async function postDataToGAS(execUrl, data) {
    let res = await axios({
        method: "POST",
        url: execUrl,
        contentType: 'application/json; charset=UTF-8',
        dataType: 'json',
        data
    });

    return res;
}
```
