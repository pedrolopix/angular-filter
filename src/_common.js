/*jshint globalstrict:true*/
'use strict';

var isDefined = angular.isDefined,
    isUndefined = angular.isUndefined,
    isFunction = angular.isFunction,
    isString = angular.isString,
    isNumber = angular.isNumber,
    isObject = angular.isObject,
    isArray = angular.isArray,
    forEach = angular.forEach,
    extend = angular.extend,
    copy = angular.copy,
    equals = angular.equals;


/**
 * get an object and return array of values
 * @param object
 * @returns {Array}
 */
function toArray(object) {
  return isArray(object) ? object :
    Object.keys(object).map(function(key) {
      return object[key];
    });
}

/**
 *
 * @param value
 * @returns {boolean}
 */
function isNull(value) {
    return value === null;
}

/**
 * return if object contains partial object
 * @param partial{object}
 * @param object{object}
 * @returns {boolean}
 */
function objectContains(partial, object) {
  var keys = Object.keys(partial);

  return keys.map(function(el) {
    return !(!object[el] || (object[el] != partial[el]));
  }).indexOf(false) == -1;

}

/**
 * search for approximate pattern in string
 * @param word
 * @param pattern
 * @returns {*}
 */
function hasApproxPattern(word, pattern) {
  if(pattern === '')
    return word;

  var index = word.indexOf(pattern.charAt(0));

  if(index === -1)
    return false;

  return hasApproxPattern(word.substr(index+1), pattern.substr(1))
}

/**
 * return the first n element of an array,
 * if expression provided, is returns as long the expression return truthy
 * @param array
 * @param n {number}
 * @param expression {$parse}
 * @return array or single object
 */
function getFirstMatches(array, n, expression) {
  var result,
    count = ~~result;

  result =  array.filter(function(elm) {
    var rest = isDefined(expression) ? (count < n && expression(elm)) : count < n;
    count = rest ? count+1 : count;

    return rest;
  });

  return (count < 2) ? result[0] : result;
}
/**
 * Polyfill to ECMA6 String.prototype.contains
 */
if (!String.prototype.contains) {
  String.prototype.contains = function() {
    return String.prototype.indexOf.apply(this, arguments) !== -1;
  };
}