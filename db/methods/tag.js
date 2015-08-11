var _ = require('lodash');
var db = require('../db');

var common = require('./common');

var Tag = require('../models/tag');

/**
 * Creates a new Tag
 * @param  {Object} fields  Fields to set on Tag
 * @return {Promise.<Tag>}
 */
var create = function(fields) {
  return Tag.save(fields);
};

/**
 * Update a Tag
 * @param  {Integer} [id]     Id of the Tag to update, can be omitted if there is an id key in fields
 * @param  {Object} fields    Fields to update
 * @return {Promise.<User>}
 */
var update = function(id, fields) {
  if (typeof id === 'object') {
    fields = id;
    id = fields.id;
  }

  return Tag.read(id).then(function(tag) {
    return Tag.save(_.extend(tag, fields), {'id': id});
  });
};

/**
 * Removes fields that shouldn't be public
 * @param {Tag}
 * @return {Tag} Tag with private fields removed
 */
var clean = common.clean_generator(Tag);


module.exports = {
  'create': create,
  'update': update,
  'clean': clean
};