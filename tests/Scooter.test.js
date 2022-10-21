const Scooter = require('../src/Scooter')
const User = require('../src/User')


//Method tests
describe('scooter methods', () => {
  // tests here!
  describe("Testing Scooter creation", () => { 
    describe("Scooter created correctly, values are within bounds", () => {
        const newScooter = new Scooter("Ipswich");
        test("Scooter station is correct", () => {
          expect(newScooter.station).toBe("Ipswich");
        });
        test("Scooter serial is between 1 and 1000", () => {
          expect(newScooter.serial).toBeGreaterThanOrEqual(1);
          expect(newScooter.serial).toBeLessThanOrEqual(1000);
        });
        test("Scooter charge is between 1 and 100", () => {
          expect(newScooter.charge).toBeGreaterThanOrEqual(1);
          expect(newScooter.charge).toBeLessThanOrEqual(100);
        });
        test("Scooter isBroken is false", () => {
          expect(newScooter.isBroken).toBe(false);
        });
        test("Scooter docked", () => {
          expect(newScooter.docked).toBe(true);
        });
    });
    describe("Scooter throws error if not given correct arguments", () => {
        const toThrowErrorFn1 = () => {
          const newScooter = new Scooter();
        }
        const toThrowErrorFn2 = () => {
          const newScooter = new Scooter(3);
        }

        test("Throws error if no information given", () => {
            expect(toThrowErrorFn1).toThrow("No Scooter data given");
        });
        test("Throws error if station is not a string", () => {
            expect(toThrowErrorFn2).toThrow("Scooter station must be string");
        });
    })
  });
});

  describe("Testing rent() function", () => {
    //rent method
    const newScooter = new Scooter("Ipswich");
    newScooter.charge = 100;
    test("Scooter rent returns Success", () => {
      expect(newScooter.rent()).toBe("Success");
    });

    const toThrowErrorFn1 = () => {
      const newScooter = new Scooter("Ipswich");
      newScooter.charge = 19;
      newScooter.rent();
    }
    const toThrowErrorFn2 = () => {
      const newScooter = new Scooter("Ipswich");
      newScooter.isBroken = true;
      newScooter.rent();
    }
    test("Throws charge error when charge below 20", () => {
      expect(toThrowErrorFn1).toThrow("Scooter low on battery, please charge.");
    });
    test("Throws broken error if isBroken is true", () => {
        expect(toThrowErrorFn2).toThrow("Scooter is broken, please send a repair request.");
    });
})

//dock method
describe("Testing dock() method", () => {
    const newScooter = new Scooter("Ipswich");
    newScooter.docked = false;

    const toThrowErrorFn1 = () => {
      const newScooter = new Scooter("Ipswich");
      newScooter.dock();
    }

    test("Calling docked sets docked property to true", () => {
      newScooter.dock("London")
      expect(newScooter.docked).toBe(true);
    });
    test("Throws error when no station given", () => {
      expect(toThrowErrorFn1).toThrow("Docking station required!");
    });
});

//requestRepair method
describe("Test requestRepair() method", () => {
  test("requestRepair sets isBroken to false", async () => {
    const scooter = new Scooter("London");
    scooter.isBroken = true;
    await scooter.requestRepair(); // we need to wait for the charge!
    expect(scooter.isBroken).toBe(false);
  });
});

//charge method
describe("Test charge() method", () => {
  test("Charge recharges to 100", async () => {
    const scooter = new Scooter("London");
    await scooter.recharge(); // we need to wait for the charge!
    expect(scooter.charge).toBe(100);
  });
})