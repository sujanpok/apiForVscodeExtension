export function getWelcomeContent() {
	return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to API Tester</title>
    <style>
        body { font-family: Arial, sans-serif; text-align: center; padding: 20px; }
        .logo { width: 100px; height: 100px; margin: 20px auto; }
    </style>
</head>
<body>
    <div class="logo">
        <svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="40" fill="#007acc"/>
            <text x="50" y="55" text-anchor="middle" fill="white" font-size="20">API</text>
        </svg>
    </div>
    <h1>Welcome to API Tester!</h1>
    <p>This extension allows you to test APIs with GET, POST, PUT, DELETE methods and token authentication.</p>
    <p>Click the globe icon in the activity bar to get started.</p>
    <p><small>Created by <a href="https://sujanpokharel.info.np/" target="_blank">Sujan Pokharel</a> | Version 0.1.0</small></p>
</body>
</html>`;
}

export function getWebviewContent() {
	const methodOptions = ['GET', 'POST', 'PUT', 'DELETE'].map(m => 
		`<option value="${m}">${m}</option>`
	).join('');
	return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>API Tester</title>
    <style>
        body { font-family: Arial, sans-serif; padding: 20px; }
        .form-group { margin-bottom: 10px; }
        label { display: block; margin-bottom: 5px; }
        input, select, textarea { width: 100%; padding: 8px; }
        button { padding: 10px 20px; background: #007acc; color: white; border: none; cursor: pointer; }
        button:hover { background: #005aa3; }
        #response { margin-top: 20px; }
        .response-section { margin-bottom: 15px; }
        .response-section h3 { margin: 0 0 5px 0; color: #007acc; }
        .response-content { background: #ffffff; padding: 10px; border: 1px solid #ccc; white-space: pre-wrap; font-family: 'Courier New', monospace; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
    </style>
</head>
<body>
    <h1>API Tester</h1>
    <p><small>Created by <a href="https://sujanpokharel.info.np/" target="_blank">Sujan Pokharel</a> | Version 0.1.0</small></p>
    <div class="form-group">
        <label for="method">Method:</label>
        <select id="method">
            ${methodOptions}
        </select>
    </div>
    <div class="form-group">
        <label for="url">URL:</label>
        <input type="text" id="url" placeholder="https://api.example.com/endpoint">
    </div>
    <div class="form-group">
        <label for="token">Authorization Token:</label>
        <input type="text" id="token" placeholder="Bearer token or API key">
    </div>
    <div class="form-group">
        <label for="body">Request Body (for POST/PUT):</label>
        <textarea id="body" rows="5" placeholder="JSON body"></textarea>
    </div>
    <button onclick="sendRequest()">Send Request</button>
    <div id="response"></div>

    <script>
        async function sendRequest() {
            const method = document.getElementById('method').value;
            const url = document.getElementById('url').value;
            const token = document.getElementById('token').value;
            const body = document.getElementById('body').value;

            if (!url) {
                alert('Please enter a URL');
                return;
            }

            const headers = {};
            if (token) {
                headers['Authorization'] = token.startsWith('Bearer ') ? token : 'Bearer ' + token;
            }
            if (body && (method === 'POST' || method === 'PUT')) {
                headers['Content-Type'] = 'application/json';
            }

            try {
                const response = await fetch(url, {
                    method: method,
                    headers: headers,
                    body: body && (method === 'POST' || method === 'PUT') ? body : undefined
                });
                const responseText = await response.text();
                const responseHeaders = {};
                response.headers.forEach((value, key) => {
                    responseHeaders[key] = value;
                });

                let formattedBody = responseText;
                try {
                    const jsonBody = JSON.parse(responseText);
                    formattedBody = JSON.stringify(jsonBody, null, 2);
                } catch (e) {
                    // Not JSON, keep as is
                }

                document.getElementById('response').innerHTML = 
                    '<div class="response-section"><h3>Status</h3><div class="response-content">' + response.status + ' ' + response.statusText + '</div></div>' +
                    '<div class="response-section"><h3>Headers</h3><div class="response-content">' + JSON.stringify(responseHeaders, null, 2) + '</div></div>' +
                    '<div class="response-section"><h3>Body</h3><div class="response-content">' + formattedBody + '</div></div>';
            } catch (error) {
                document.getElementById('response').innerHTML = '<div class="response-section"><h3>Error</h3><div class="response-content">' + error.message + '</div></div>';
            }
        }
    </script>
</body>
</html>`;
}