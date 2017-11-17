import { PortalTiendaAlejandriaPage } from './app.po';

describe('portal-tienda-alejandria App', function() {
  let page: PortalTiendaAlejandriaPage;

  beforeEach(() => {
    page = new PortalTiendaAlejandriaPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
