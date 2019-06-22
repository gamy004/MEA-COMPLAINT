    var Ziggy = {
        namedRoutes: {"login":{"uri":"login","methods":["GET","HEAD"],"domain":null},"logout":{"uri":"logout","methods":["POST"],"domain":null},"register":{"uri":"register","methods":["GET","HEAD"],"domain":null},"password.request":{"uri":"password\/reset","methods":["GET","HEAD"],"domain":null},"password.email":{"uri":"password\/email","methods":["POST"],"domain":null},"password.reset":{"uri":"password\/reset\/{token}","methods":["GET","HEAD"],"domain":null},"password.update":{"uri":"password\/reset","methods":["POST"],"domain":null},"api:auth":{"uri":"api\/auth","methods":["GET","HEAD"],"domain":null},"api:file.download":{"uri":"api\/{hash}\/download","methods":["GET","HEAD"],"domain":null},"api:file.generate-link":{"uri":"api\/file\/{hash}\/generate-link","methods":["GET","HEAD"],"domain":null},"api:file.upload":{"uri":"api\/file\/upload","methods":["POST"],"domain":null},"api:issues.index":{"uri":"api\/issues","methods":["GET","HEAD"],"domain":null},"api:issues.create":{"uri":"api\/issues\/create","methods":["GET","HEAD"],"domain":null},"api:issues.store":{"uri":"api\/issues","methods":["POST"],"domain":null},"api:issues.show":{"uri":"api\/issues\/{issue}","methods":["GET","HEAD"],"domain":null},"api:issues.edit":{"uri":"api\/issues\/{issue}\/edit","methods":["GET","HEAD"],"domain":null},"api:issues.update":{"uri":"api\/issues\/{issue}","methods":["PUT","PATCH"],"domain":null},"api:issues.destroy":{"uri":"api\/issues\/{issue}","methods":["DELETE"],"domain":null},"api:groups.index":{"uri":"api\/groups","methods":["GET","HEAD"],"domain":null},"api:groups.create":{"uri":"api\/groups\/create","methods":["GET","HEAD"],"domain":null},"api:groups.store":{"uri":"api\/groups","methods":["POST"],"domain":null},"api:groups.show":{"uri":"api\/groups\/{group}","methods":["GET","HEAD"],"domain":null},"api:groups.edit":{"uri":"api\/groups\/{group}\/edit","methods":["GET","HEAD"],"domain":null},"api:groups.update":{"uri":"api\/groups\/{group}","methods":["PUT","PATCH"],"domain":null},"api:groups.destroy":{"uri":"api\/groups\/{group}","methods":["DELETE"],"domain":null},"api:issue-categories.index":{"uri":"api\/issue-categories","methods":["GET","HEAD"],"domain":null},"api:issue-categories.create":{"uri":"api\/issue-categories\/create","methods":["GET","HEAD"],"domain":null},"api:issue-categories.store":{"uri":"api\/issue-categories","methods":["POST"],"domain":null},"api:issue-categories.show":{"uri":"api\/issue-categories\/{issue_category}","methods":["GET","HEAD"],"domain":null},"api:issue-categories.edit":{"uri":"api\/issue-categories\/{issue_category}\/edit","methods":["GET","HEAD"],"domain":null},"api:issue-categories.update":{"uri":"api\/issue-categories\/{issue_category}","methods":["PUT","PATCH"],"domain":null},"api:issue-categories.destroy":{"uri":"api\/issue-categories\/{issue_category}","methods":["DELETE"],"domain":null},"magicRoute":{"uri":"{vue_capture?}","methods":["GET","HEAD"],"domain":null}},
        baseUrl: 'http://nginx/',
        baseProtocol: 'http',
        baseDomain: 'nginx',
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
