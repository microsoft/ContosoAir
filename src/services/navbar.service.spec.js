const NavbarService = require('./navbar.service');

describe('[Unit] That Navbar Service', () => {
    it('returns always three arrays', () => {
        const req = { baseUrl: '/login', user: { name: 'me'}, __: jest.fn(() => '-') };

        const navbarService = new NavbarService();
        const nav = navbarService.getData(req);
        expect(nav).toMatchObject(expect.objectContaining({
            publicMenu: expect.any(Array),
            securedMenu: expect.any(Array),
            onlyPublicMenu: expect.any(Array)
        }));
        expect(nav.publicMenu).toContainEqual(
            expect.objectContaining(
                { text: expect.any(String), url: expect.any(String)}
            )
        );
        expect(nav.securedMenu).toContainEqual(
            expect.objectContaining(
                { text: expect.any(String), url: expect.any(String)}
            )
        );
        expect(nav.onlyPublicMenu).toContainEqual(
            expect.objectContaining(
                { text: expect.any(String), url: expect.any(String)}
            )
        );
        expect(req.__).toHaveBeenCalled();
        const n = nav.publicMenu.length + nav.securedMenu.length + nav.onlyPublicMenu.length;
        expect(req.__).toHaveBeenCalledTimes(n + 1);
    });
    
    it('dont have greeting if not logged in', () => {
        const req = { baseUrl: '/', user: null, __: jest.fn(() => '-') };
        const navbarService = new NavbarService();
        const nav = navbarService.getData(req);
        expect(nav).toMatchObject({ greeting: ''});
        expect(req.__).toHaveBeenCalled();
        const n = nav.publicMenu.length + nav.securedMenu.length + nav.onlyPublicMenu.length;
        expect(req.__).toHaveBeenCalledTimes(n);
    });

    
    it('to have the correct active flag', () => {
        const req = { baseUrl: '/login', user: null, __: jest.fn(() => '-') };
        const navbarService = new NavbarService();
        const nav = navbarService.getData(req);
        
        expect(nav.publicMenu).not.toContainEqual(
            expect.objectContaining( { active: true})
        );

        expect(nav.securedMenu).not.toContainEqual(
            expect.objectContaining( { active: true})
        );

        expect(nav.onlyPublicMenu).toContainEqual(
            expect.objectContaining( { active: true, url: '/login'})
        );
    });
});