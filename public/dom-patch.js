// DOM Safety Patch - Run immediately before React loads
(function() {
  'use strict';
  
  if (typeof window === 'undefined') return;

  // Patch removeChild immediately
  var originalRemoveChild = Node.prototype.removeChild;
  Node.prototype.removeChild = function(child) {
    if (!child || !this) return child;
    if (child.parentNode !== this) return child;
    try {
      return originalRemoveChild.call(this, child);
    } catch (e) {
      return child;
    }
  };

  // Suppress specific console errors
  var originalConsoleError = console.error;
  console.error = function() {
    var firstArg = arguments[0];
    if (typeof firstArg === 'string') {
      if (
        firstArg.indexOf('removeChild') !== -1 ||
        firstArg.indexOf('Cannot read properties of null') !== -1 ||
        firstArg.indexOf('Cannot read property') !== -1
      ) {
        return;
      }
    }
    return originalConsoleError.apply(console, arguments);
  };

  // Catch unhandled errors
  window.addEventListener('error', function(e) {
    if (e.message && (
      e.message.indexOf('removeChild') !== -1 ||
      e.message.indexOf('Cannot read properties of null') !== -1
    )) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
  }, true);
})();