/*********************************************Router v_1.0************************************************************/


export class RouterOutlet extends HTMLElement {
static routes = {} as any;

    protected connectedCallback() {
        RouterOutlet.render();
    }

    protected static render() {
        // Listen on hash change:
        window.addEventListener('hashchange', this.routeMatcher);
        // Listen on page load:
        window.addEventListener('load', this.routeMatcher);
    }


    static route(path: string, templateObj: any) {
        this.routes[path] = {...templateObj};
    }

    protected static routeMatcher() {
        let url = location.hash.slice(1) || '/';
        let route = this.routes[url];
        RouterOutlet.tmpl(route.templateUrl, new route.controller(), route.style);
    }

    protected static tmpl(str: RequestInfo, data: any, style: RequestInfo) {
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'text/html');
        this.httpReq(str, {
            mode: 'no-cors',
            method: 'get',
            headers: myHeaders
        }, 'router-outlet');
        this.httpReq(style, {
            mode: 'no-cors',
            method: 'get',
            headers: myHeaders
        });
      //  RouterOutlet.Loop(data);
    }

    protected static httpReq(url: RequestInfo, methods: RequestInit, bindElem?: string) {
        fetch(url, methods)
            .then((response) => {
                response.text().then((text) => {
                    if (bindElem) {
                        document.getElementsByTagName(bindElem)[0].innerHTML = text;
                    } else {
                        const head = document.getElementsByTagName('head')[0] as HTMLElement;
                        (head.querySelector('style[ng-style]') as Element).setAttribute('ng-style', url.toString());
                        (head.querySelector('style[ng-style]') as Element).innerHTML = text;
                    }
                })
            })
            .catch((err) => {
                console.log(err)
            });
    }

}

(window as any).routes = RouterOutlet.routes;
window.customElements.define("router-outlet", RouterOutlet);

/*********************************************************************************************************/
