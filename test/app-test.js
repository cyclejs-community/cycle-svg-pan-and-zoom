/* globals describe, it */
const assert = require('assert');
const App = require('../src/app');

describe('App', function () {
  it('exists', function () {
    assert.equal(typeof App, 'function');
  });
});
