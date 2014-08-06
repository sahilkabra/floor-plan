var injectr = require('injectr');
var mockBuildings = require('./mockData/buildings').mock;
var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');
chai.use(require('sinon-chai'));

describe('The floor Plan Module', function() {
        var mockStore = {get: function() { } };
        var getSpy;
        var floorPlan = injectr('../app/floorPlan/floorPlanController.js', {
                        './building/buildingStore': mockStore,
                        './floor/floorStore': mockStore
        });
        beforeEach(function() {
                getSpy = sinon.stub(mockStore, 'get');
        });
        afterEach(function() {
                getSpy.restore();
        });
        it('returns a list of buildings', function() {
                getSpy.returns(mockBuildings);

                var buildings = floorPlan.getBuildings();

                expect(getSpy).to.have.been.called;
                expect(buildings).to.be.defined;
                expect(buildings).to.equal(mockBuildings);
        });
        it('returns a building when a name is passed', function() {
                getSpy.returns([mockBuildings[0]]);

                var buildings = floorPlan.getBuildings({name: 'T1'});

                expect(getSpy).to.have.been.calledWith({name: 'T1'});
                expect(buildings).to.be.defined;
                expect(buildings[0].name).to.equal('T1');
        });
        it('returns a list of floors when a building name is passed', function() {
                getSpy.returns(mockBuildings[0].floors);

                var floors = floorPlan.getFloors({buildingName: 'T1'});

                expect(getSpy).to.have.been.calledWith({buildingName: 'T1'});

                expect(floors).to.be.defined;
                expect(floors[0].name).to.equal('N1');
                expect(floors[0]['seating-capacity']).to.equal(10);
        });
        it('returns a floor when a building name and floor name is passed', function() {
                //Expecting get to be called
                //Returning the second floor of the second building
                getSpy.returns([mockBuildings[1].floors[1]])

                var floors = floorPlan.getFloors({
                        buildingName: 'T2', 
                        floorName: 'N2'});
                expect(floors).to.be.defined;
                expect(getSpy).to.have.been.calledWith({
                        buildingName: 'T2', 
                        floorName: 'N2'});
                expect(floors).to.be.defined;
                expect(floors[0].name).to.equal('N2');
                expect(floors[0]['seating-capacity']).to.equal(20);
        });
});
