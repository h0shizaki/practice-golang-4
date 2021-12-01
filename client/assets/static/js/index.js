import Dashboard from "./views/Dashboard";

const router = async () => {
    const routes = [
        { path: "/", view: Dashboard  },
        { path: "/add", view: () => { console.log("Add player") } },
        { path: "/delete", view: () => { console.log("Delete player") } },
        { path: "/update", view: () => { console.log("Update player") } }
    ];

    const potentialMatches = routes.map(route => {
        return {
            route: route,
            isMatch: location.pathname === route.path
        };
    });

    let match = potentialMatches.find(potentialMatches => potentialMatches.isMatch)

    if (!match) {
        match = {
            route: routes[0],
            isMatch: true
        };
    };

    // const view = new match.route.view() ;

    // document.querySelector('#app').innerHTML = await view.getHtml();

    console.log(match)
};

document.addEventListener("DOMContentLoaded", () => {
    router();
});