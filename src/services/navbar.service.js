const publicMenu = [
    { url: '/book', text: 'NavbarMenu.Book' }
];

const securedMenu = [
    { url: '/booked', text: 'NavbarMenu.Booked'}
];

const onlyPublicMenu = [
    { url: '/login', text: 'NavbarMenu.Login'}
];

class NavbarService {
    getData(req) {
        const { baseUrl, user } = req;
        const greeting = user ? req.__('NavbarMenu.Greeting', user.name) : '';
        const mapMenus = m => Object.assign({}, m, {
            active: m.url == baseUrl,
            text: req.__(m.text)
        });
        return {
            greeting,
            publicMenu: publicMenu.map(mapMenus),
            securedMenu: securedMenu.map(mapMenus),
            onlyPublicMenu: onlyPublicMenu.map(mapMenus)
        };
    }
}

module.exports = NavbarService;
