/**
 * InventoryController.js 
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {
    getAll: function(req, res) {
        console.log('1 in getAll Inventory')

        Inventory.getAll()
            .spread(function(models) {
                console.log('2 in getAll Inventory', models)

                res.json({data:models});
            })
            .fail(function(err) {
                // An error occured
            });
    }
};
