var injectr = require('injectr');
var mockBuildings = require('./mockData/buildings').mock;

describe('The floor Plan Module', function() {
        var mockBuildingStore = jasmine.createSpyObj('buildingStore', ['get']);
        var mockFloorStore = jasmine.createSpyObj('floorStore', ['get']);
        var floorPlan = injectr('../app/floorPlan/floorPlanController.js', {
                        './building/buildingStore': mockBuildingStore,
                        './floor/floorStore': mockFloorStore
        });
        it('returns a list of buildings', function() {
                mockBuildingStore.get.andReturn(mockBuildings);
                var buildings = floorPlan.getBuildings();
                expect(mockBuildingStore.get).toHaveBeenCalled();
                expect(buildings).toEqual(mockBuildings);
        });
        it('returns a building when a name is passed', function() {
                mockBuildingStore.get.andReturn([mockBuildings[0]]);
                var buildings = floorPlan.getBuildings({name: 'T1'});
                expect(mockBuildingStore.get).toHaveBeenCalledWith({name: 'T1'});
                expect(buildings).toBeDefined();
                expect(buildings[0].name).toEqual('T1');
        });
        it('returns a list of floors when a building name is passed', function() {
                mockFloorStore.get.andReturn(mockBuildings[0].floors);
                var floors = floorPlan.getFloors({buildingName: 'T1'});
                expect(mockFloorStore.get).toHaveBeenCalledWith({buildingName: 'T1'});
                expect(floors).toBeDefined();
                expect(floors[0].name).toEqual('N1');
                expect(floors[0]['seating-capacity']).toEqual(10);
        });
        it('returns a floor when a building name and floor name is passed', function() {
                //Expecting get to be called
                //Returning the second floor of the second building
                mockFloorStore.get.andReturn([mockBuildings[1].floors[1]]);

                var floors = floorPlan.getFloors({
                        buildingName: 'T2', 
                        floorName: 'N2'});
                expect(floors).toBeDefined();
                expect(mockFloorStore.get).toHaveBeenCalledWith({
                        buildingName: 'T2', 
                        floorName: 'N2'});
                expect(floors).toBeDefined();
                expect(floors[0].name).toEqual('N2');
                expect(floors[0]['seating-capacity']).toEqual(20);
        });
});
