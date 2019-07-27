/**
 * Orm.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    
  mort_id: {
      type: 'number',
      required: true
      },

      mlsid:
      {
        type: 'number',
        required: true,
      },  
      appraisal_value:
      {
        type: 'number',
        required: true,
      } ,
      name:
      {
        type: 'string',
        required: true,
      },
      insured_value:
      {
        type: 'number',
        required: true,
      },
      deductible_value:
      {
        type: 'number',
        required: true,
      }
  },

};

