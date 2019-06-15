    var Ziggy = {
        namedRoutes: {"debugbar.openhandler":{"uri":"_debugbar\/open","methods":["GET","HEAD"],"domain":null},"debugbar.clockwork":{"uri":"_debugbar\/clockwork\/{id}","methods":["GET","HEAD"],"domain":null},"debugbar.telescope":{"uri":"_debugbar\/telescope\/{id}","methods":["GET","HEAD"],"domain":null},"debugbar.assets.css":{"uri":"_debugbar\/assets\/stylesheets","methods":["GET","HEAD"],"domain":null},"debugbar.assets.js":{"uri":"_debugbar\/assets\/javascript","methods":["GET","HEAD"],"domain":null},"debugbar.cache.delete":{"uri":"_debugbar\/cache\/{key}\/{tags?}","methods":["DELETE"],"domain":null},"login":{"uri":"login","methods":["GET","HEAD"],"domain":null},"logout":{"uri":"logout","methods":["POST"],"domain":null},"register":{"uri":"register","methods":["GET","HEAD"],"domain":null},"password.request":{"uri":"password\/reset","methods":["GET","HEAD"],"domain":null},"password.email":{"uri":"password\/email","methods":["POST"],"domain":null},"password.reset":{"uri":"password\/reset\/{token}","methods":["GET","HEAD"],"domain":null},"password.update":{"uri":"password\/reset","methods":["POST"],"domain":null},"api:auth":{"uri":"api\/auth","methods":["GET","HEAD"],"domain":null},"api:issues.index":{"uri":"api\/issues","methods":["GET","HEAD"],"domain":null},"api:issues.create":{"uri":"api\/issues\/create","methods":["GET","HEAD"],"domain":null},"api:issues.store":{"uri":"api\/issues","methods":["POST"],"domain":null},"api:issues.show":{"uri":"api\/issues\/{issue}","methods":["GET","HEAD"],"domain":null},"api:issues.edit":{"uri":"api\/issues\/{issue}\/edit","methods":["GET","HEAD"],"domain":null},"api:issues.update":{"uri":"api\/issues\/{issue}","methods":["PUT","PATCH"],"domain":null},"api:issues.destroy":{"uri":"api\/issues\/{issue}","methods":["DELETE"],"domain":null},"magicRoute":{"uri":"{vue_capture?}","methods":["GET","HEAD"],"domain":null}},
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
