function beautifyJSON(jsonText, indentation = 2) {
    return "<pre>" + JSON.stringify(JSON.parse(jsonText), null, indentation) + "</pre>"
}

// handle POST request using fetch API
async function handlePost() {
    let id = document.getElementById('id').value;
    let article_name = document.getElementById('article_name').value;
    let article_body = document.getElementById('article_body').value;
    let date = new Date().toLocaleString();

    let data = {
        id: id,
        article_name: article_name,
        article_body: article_body,
        date: date
    };

    // form application/x-wwww-form-urlencoded
    let urlEncoded = Object.keys(data).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key])).join('&');

    let response = await fetch('https://httpbin.org/post', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-Sent-By': 'javascript'
        },
        body: urlEncoded
    });

    if(response.ok) {
        let responseText = await response.text();
        responseText = beautifyJSON(responseText)
        document.querySelector('output').innerHTML = responseText;
    }
    else {
        alert(`Error : ${response.status}`);
    }
}

async function handleGet() {
    let id = document.getElementById('id').value;
    let article_name = document.getElementById('article_name').value;
    let article_body = document.getElementById('article_body').value;
    let date = new Date().toLocaleString();

    let data = {
        id: id,
        article_name: article_name,
        article_body: article_body,
        date: date
    };

    // form application/x-wwww-form-urlencoded
    let urlEncoded = Object.keys(data).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key])).join('&');

    let response = await fetch(`https://httpbin.org/get?${urlEncoded}`, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-Sent-By': 'javascript'
        }
    });

    if(response.ok) {
        let responseText = await response.text();
        responseText = beautifyJSON(responseText)
        document.querySelector('output').innerHTML = responseText;
    }
    else {
        alert(`Error : ${response.status}`);
    }
}

async function handlePut() {
    let id = document.getElementById('id').value;
    let article_name = document.getElementById('article_name').value;
    let article_body = document.getElementById('article_body').value;
    let date = new Date().toLocaleString();

    let data = {
        id: id,
        article_name: article_name,
        article_body: article_body,
        date: date
    };

    // form application/x-wwww-form-urlencoded
    let urlEncoded = Object.keys(data).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key])).join('&');

    let response = await fetch('https://httpbin.org/put', {
        method: 'PUT',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-Sent-By': 'javascript'
        },
        body: urlEncoded
    });

    if(response.ok) {
        let responseText = await response.text();
        responseText = beautifyJSON(responseText)
        document.querySelector('output').innerHTML = responseText;
    }
    else {
        alert(`Error : ${response.status}`);
    }
}

async function handleDelete() {
    let id = document.getElementById('id').value;
    let date = new Date().toLocaleString();

    let data = {
        id: id,
        date: date
    };

    // form application/x-wwww-form-urlencoded
    let urlEncoded = Object.keys(data).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key])).join('&');

    let response = await fetch(`https://httpbin.org/delete?${urlEncoded}`, {
        method: 'DELETE',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-Sent-By': 'javascript'
        }
    });

    if(response.ok) {
        let responseText = await response.text();
        responseText = beautifyJSON(responseText)
        document.querySelector('output').innerHTML = responseText;
    }
    else {
        alert(`Error : ${response.status}`);
    }
}

export {handlePost, handleGet, handlePut, handleDelete};