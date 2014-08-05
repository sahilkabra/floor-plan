describe('The building store', function() {
        var buildingStore = require('../app/floorPlan/building/buildingStore.js');
        it('returns a list of buildings', function() {
                var buildings = buildingStore.get();
                expect(buildings).toBeDefined();
        });
        describe('passing criteria', function() {
                it('returns a building when name is passed', function() {
                        var buildings = buildingStore.get({'name': 'T1'});
                        expect(buildings).toBeDefined();
                        expect(buildings.length).toEqual(1);
                        expect(buildings[0].name).toEqual('T1');
                });
        });
});
