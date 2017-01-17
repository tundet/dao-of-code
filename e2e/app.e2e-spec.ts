import { DaoOfCodePage } from './app.po';

describe('dao-of-code App', function() {
  let page: DaoOfCodePage;

  beforeEach(() => {
    page = new DaoOfCodePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
