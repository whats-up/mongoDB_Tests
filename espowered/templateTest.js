var assert, hogeFunc, _anderScore;
assert = require('power-assert');
_anderScore = require('underscore');
hogeFunc = require('../js/template').hoge;
describe('template Test', function () {
    describe('hoges', function () {
    });
    return it('hoge', function () {
        var text;
        text = hogeFunc();
        assert(assert._expr(assert._capt(assert._capt(text, 'arguments/0/left') === 'hage', 'arguments/0'), {
            content: 'assert(text === \'hage\')',
            filepath: 'test/templateTest.js',
            line: 14
        }));
        assert.equal(assert._expr(assert._capt(text, 'arguments/0'), {
            content: 'assert.equal(text, \'hage\')',
            filepath: 'test/templateTest.js',
            line: 15
        }), 'hage');
        assert.notEqual(assert._expr(assert._capt(text, 'arguments/0'), {
            content: 'assert.notEqual(text, \'hoge\')',
            filepath: 'test/templateTest.js',
            line: 16
        }), 'hoge');
        assert.deepEqual(assert._expr(assert._capt(text, 'arguments/0'), {
            content: 'assert.deepEqual(text, \'hage\')',
            filepath: 'test/templateTest.js',
            line: 17
        }), 'hage');
        assert.notDeepEqual(assert._expr(assert._capt(text, 'arguments/0'), {
            content: 'assert.notDeepEqual(text, \'hoge\')',
            filepath: 'test/templateTest.js',
            line: 18
        }), 'hoge');
        assert.throws(function () {
            throw new Error('boke');
        });
        assert.doesNotThrow(function () {
            return true;
        });
        return assert.ok(assert._expr(assert._capt(assert._capt(text, 'arguments/0/callee/object').match('ha..'), 'arguments/0'), {
            content: 'assert.ok(text.match(\'ha..\'))',
            filepath: 'test/templateTest.js',
            line: 25
        }));
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvdGVtcGxhdGVUZXN0LmpzIl0sIm5hbWVzIjpbImFzc2VydCIsImhvZ2VGdW5jIiwiX2FuZGVyU2NvcmUiLCJyZXF1aXJlIiwiaG9nZSIsImRlc2NyaWJlIiwiaXQiLCJ0ZXh0IiwiX2V4cHIiLCJfY2FwdCIsImNvbnRlbnQiLCJmaWxlcGF0aCIsImxpbmUiLCJlcXVhbCIsIm5vdEVxdWFsIiwiZGVlcEVxdWFsIiwibm90RGVlcEVxdWFsIiwidGhyb3dzIiwiRXJyb3IiLCJkb2VzTm90VGhyb3ciLCJvayIsIm1hdGNoIl0sIm1hcHBpbmdzIjoiQUFBQSxJQUFJQSxNQUFKLEVBQVlDLFFBQVosRUFBc0JDLFdBQXRCO0FBRUFGLE1BQUEsR0FBU0csT0FBQSxDQUFRLGNBQVIsQ0FBVCxDQUZBO0FBSUFELFdBQUEsR0FBY0MsT0FBQSxDQUFRLFlBQVIsQ0FBZCxDQUpBO0FBTUFGLFFBQUEsR0FBV0UsT0FBQSxDQUFRLGdCQUFSLEVBQTBCQyxJQUFyQyxDQU5BO0FBUUFDLFFBQUEsQ0FBUyxlQUFULEVBQTBCLFlBQVc7QUFBQSxJQUNuQ0EsUUFBQSxDQUFTLE9BQVQsRUFBa0IsWUFBVztBQUFBLEtBQTdCLEVBRG1DO0FBQUEsSUFFbkMsT0FBT0MsRUFBQSxDQUFHLE1BQUgsRUFBVyxZQUFXO0FBQUEsUUFDM0IsSUFBSUMsSUFBSixDQUQyQjtBQUFBLFFBRTNCQSxJQUFBLEdBQU9OLFFBQUEsRUFBUCxDQUYyQjtBQUFBLFFBRzNCRCxNQUFBLENBQU9BLE1BQUEsQ0FBQVEsS0FBQSxDQUFBUixNQUFBLENBQUFTLEtBQUEsQ0FBQVQsTUFBQSxDQUFBUyxLQUFBLENBQUFGLElBQUEsMEJBQVMsTUFBVDtBQUFBLFlBQUFHLE9BQUE7QUFBQSxZQUFBQyxRQUFBO0FBQUEsWUFBQUMsSUFBQTtBQUFBLFVBQVAsRUFIMkI7QUFBQSxRQUkzQlosTUFBQSxDQUFPYSxLQUFQLENBQWFiLE1BQUEsQ0FBQVEsS0FBQSxDQUFBUixNQUFBLENBQUFTLEtBQUEsQ0FBQUYsSUFBQTtBQUFBLFlBQUFHLE9BQUE7QUFBQSxZQUFBQyxRQUFBO0FBQUEsWUFBQUMsSUFBQTtBQUFBLFVBQWIsRUFBbUIsTUFBbkIsRUFKMkI7QUFBQSxRQUszQlosTUFBQSxDQUFPYyxRQUFQLENBQWdCZCxNQUFBLENBQUFRLEtBQUEsQ0FBQVIsTUFBQSxDQUFBUyxLQUFBLENBQUFGLElBQUE7QUFBQSxZQUFBRyxPQUFBO0FBQUEsWUFBQUMsUUFBQTtBQUFBLFlBQUFDLElBQUE7QUFBQSxVQUFoQixFQUFzQixNQUF0QixFQUwyQjtBQUFBLFFBTTNCWixNQUFBLENBQU9lLFNBQVAsQ0FBaUJmLE1BQUEsQ0FBQVEsS0FBQSxDQUFBUixNQUFBLENBQUFTLEtBQUEsQ0FBQUYsSUFBQTtBQUFBLFlBQUFHLE9BQUE7QUFBQSxZQUFBQyxRQUFBO0FBQUEsWUFBQUMsSUFBQTtBQUFBLFVBQWpCLEVBQXVCLE1BQXZCLEVBTjJCO0FBQUEsUUFPM0JaLE1BQUEsQ0FBT2dCLFlBQVAsQ0FBb0JoQixNQUFBLENBQUFRLEtBQUEsQ0FBQVIsTUFBQSxDQUFBUyxLQUFBLENBQUFGLElBQUE7QUFBQSxZQUFBRyxPQUFBO0FBQUEsWUFBQUMsUUFBQTtBQUFBLFlBQUFDLElBQUE7QUFBQSxVQUFwQixFQUEwQixNQUExQixFQVAyQjtBQUFBLFFBUTNCWixNQUFBLENBQU9pQixNQUFQLENBQWMsWUFBVztBQUFBLFlBQ3ZCLE1BQU0sSUFBSUMsS0FBSixDQUFVLE1BQVYsQ0FBTixDQUR1QjtBQUFBLFNBQXpCLEVBUjJCO0FBQUEsUUFXM0JsQixNQUFBLENBQU9tQixZQUFQLENBQW9CLFlBQVc7QUFBQSxZQUM3QixPQUFPLElBQVAsQ0FENkI7QUFBQSxTQUEvQixFQVgyQjtBQUFBLFFBYzNCLE9BQU9uQixNQUFBLENBQU9vQixFQUFQLENBQVVwQixNQUFBLENBQUFRLEtBQUEsQ0FBQVIsTUFBQSxDQUFBUyxLQUFBLENBQUFULE1BQUEsQ0FBQVMsS0FBQSxDQUFBRixJQUFBLCtCQUFLYyxLQUFMLENBQVcsTUFBWDtBQUFBLFlBQUFYLE9BQUE7QUFBQSxZQUFBQyxRQUFBO0FBQUEsWUFBQUMsSUFBQTtBQUFBLFVBQVYsQ0FBUCxDQWQyQjtBQUFBLEtBQXRCLENBQVAsQ0FGbUM7QUFBQSxDQUFyQyIsInNvdXJjZXNDb250ZW50IjpbInZhciBhc3NlcnQsIGhvZ2VGdW5jLCBfYW5kZXJTY29yZTtcblxuYXNzZXJ0ID0gcmVxdWlyZSgncG93ZXItYXNzZXJ0Jyk7XG5cbl9hbmRlclNjb3JlID0gcmVxdWlyZSgndW5kZXJzY29yZScpO1xuXG5ob2dlRnVuYyA9IHJlcXVpcmUoXCIuLi9qcy90ZW1wbGF0ZVwiKS5ob2dlO1xuXG5kZXNjcmliZShcInRlbXBsYXRlIFRlc3RcIiwgZnVuY3Rpb24oKSB7XG4gIGRlc2NyaWJlKFwiaG9nZXNcIiwgZnVuY3Rpb24oKSB7fSk7XG4gIHJldHVybiBpdCgnaG9nZScsIGZ1bmN0aW9uKCkge1xuICAgIHZhciB0ZXh0O1xuICAgIHRleHQgPSBob2dlRnVuYygpO1xuICAgIGFzc2VydCh0ZXh0ID09PSAnaGFnZScpO1xuICAgIGFzc2VydC5lcXVhbCh0ZXh0LCAnaGFnZScpO1xuICAgIGFzc2VydC5ub3RFcXVhbCh0ZXh0LCAnaG9nZScpO1xuICAgIGFzc2VydC5kZWVwRXF1YWwodGV4dCwgJ2hhZ2UnKTtcbiAgICBhc3NlcnQubm90RGVlcEVxdWFsKHRleHQsICdob2dlJyk7XG4gICAgYXNzZXJ0LnRocm93cyhmdW5jdGlvbigpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcImJva2VcIik7XG4gICAgfSk7XG4gICAgYXNzZXJ0LmRvZXNOb3RUaHJvdyhmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0pO1xuICAgIHJldHVybiBhc3NlcnQub2sodGV4dC5tYXRjaCgnaGEuLicpKTtcbiAgfSk7XG59KTtcbiJdfQ==
