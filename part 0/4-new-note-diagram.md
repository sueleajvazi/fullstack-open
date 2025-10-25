sequenceDiagram
    participant browser
    participant server

   
        Note right of browser: User clicked on the submit button and callback funtion was executed
            browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/new_note
            activate server 
            server->>browser:  302 Status Code
            Note left of server: Server indicates that the client has to do a redirection at /notes


browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate server
    server-->>browser: HTML document
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: the css file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server-->>browser: the JavaScript file
    deactivate server

    Note right of browser: The browser starts executing the JavaScript code that fetches the JSON from the server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: [{ "content": "HTML is easy", "date": "2023-1-1" }, ... ]
    deactivate server
