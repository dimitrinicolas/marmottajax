describe("Basic - ", function() {
  var marmottajax;

      beforeEach(function() {
            jasmine.Ajax.install();
      });
    afterEach(function() {
        jasmine.Ajax.uninstall();
    });

it("Basic GET", function()
{
    var doneFn = jasmine.createSpy("success");
    
    window.marmottajax({url: 'http://klb-meshera.ru/'}).then(doneFn)

    
    expect(jasmine.Ajax.requests.mostRecent().url).toBe('http://klb-meshera.ru/');
    expect(doneFn).not.toHaveBeenCalled();
    // expect(doneFn).toHaveBeenCalled();
    
    jasmine.Ajax.requests.mostRecent().response({
             "status":       200,
             "contentType":  'text/plain',
             "responseText": 'awesome response'
    });
    expect(doneFn).toHaveBeenCalledWith('awesome response');
});

});
