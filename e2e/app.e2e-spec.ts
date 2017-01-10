import { NgFontResizePage } from './app.po';

describe('ng-font-resize App', function() {
  let page: NgFontResizePage;

  beforeEach(() => {
    page = new NgFontResizePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
