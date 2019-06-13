    var Ziggy = {
        namedRoutes: {"login":{"uri":"login","methods":["GET","HEAD"],"domain":null},"logout":{"uri":"logout","methods":["POST"],"domain":null},"register":{"uri":"register","methods":["GET","HEAD"],"domain":null},"password.request":{"uri":"password\/reset","methods":["GET","HEAD"],"domain":null},"password.email":{"uri":"password\/email","methods":["POST"],"domain":null},"password.reset":{"uri":"password\/reset\/{token}","methods":["GET","HEAD"],"domain":null},"password.update":{"uri":"password\/reset","methods":["POST"],"domain":null},"api:auth":{"uri":"api\/auth","methods":["GET","HEAD"],"domain":null},"api:issues.index":{"uri":"api\/issues","methods":["GET","HEAD"],"domain":null},"api:issues.create":{"uri":"api\/issues\/create","methods":["GET","HEAD"],"domain":null},"api:issues.store":{"uri":"api\/issues","methods":["POST"],"domain":null},"api:issues.show":{"uri":"api\/issues\/{issue}","methods":["GET","HEAD"],"domain":null},"api:issues.edit":{"uri":"api\/issues\/{issue}\/edit","methods":["GET","HEAD"],"domain":null},"api:issues.update":{"uri":"api\/issues\/{issue}","methods":["PUT","PATCH"],"domain":null},"api:issues.destroy":{"uri":"api\/issues\/{issue}","methods":["DELETE"],"domain":null},"magicRoute":{"uri":"{vue_capture?}","methods":["GET","HEAD"],"domain":null}},
        baseUrl: 'http://localhost/',
        baseProtocol: 'http',
        baseDomain: 'localhost',
        basePort: false,
        defaultParameters: []
    };

    if (typeof window.Ziggy !== 'undefined') {
        for (var name in window.Ziggy.namedRoutes) {
            Ziggy.namedRoutes[name] = window.Ziggy.namedRoutes[name];
        }
    }

    export {
        Ziggy
    }
