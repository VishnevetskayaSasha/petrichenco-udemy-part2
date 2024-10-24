// гибкая настройка запроса на сервер (не привязываемся к url)
const postData = async (url, data) => { // async -- указывает, что внутри функции будет асинхронный  код
    const result = await fetch(url, { // await -- пара для async  -- скрипт пойдет работать дальше только после выполнения запроса с await
        method: "POST",
        headers:  {
            "Content-type": "application/json"
        },
        body: data
    });
    return await result.json() // возвращаем промис в json формате
}

// гибкая настройка запроса данных с сервер (не привязываемся к url)
const getResource = async (url) => { // async -- указывает, что внутри функции будет асинхронный  код
    const result = await fetch(url); // await -- пара для async  -- скрипт пойдет работать дальше только после выполнения запроса с await  
    // если fetch столкнется с ошибкой HTTP запроса (404, 500, 502...) он не выдаст catch
    // поэтому такие ошибки мы обрабатываем вручную
    if(!result.ok) {
        throw new Error(`Не получается произвести fetch ${url}, status: ${res.status}`); 
    }
    
    return await result.json(); // возвращаем промис в json формате
}

export {postData};
export {getResource}