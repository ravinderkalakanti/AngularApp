import { Angular2MapPage } from './app.po';

describe('angular2-map App', () => {
  let page: Angular2MapPage;

  beforeEach(() => {
    page = new Angular2MapPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
