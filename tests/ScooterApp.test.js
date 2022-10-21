const Scooter = require('../src/Scooter')
const User = require('../src/User')
const ScooterApp = require('../src/ScooterApp');

// ScooterApp tests here
describe("Testing ScooterApp creation", () => {
    const app = new ScooterApp;
    const validUser = new User("teddy", "password", 29);
    const validUserWrongPassword = new User("teddy", "password123", 29);
    const underageUser = new User("harry", "password", 15);
    const registeredUsers = {
        "teddy" : {
            password: "password",
            age: 29,
            loggedIn: false,
            accountChange: 0
        }
    };
    describe("ScooterApp", () => {
        const toThrowErrorFn1 = () => {
            const app = new ScooterApp;
            const validUser = new User("teddy", "password", 29);
            app.register(validUser);
            app.register(validUser);
          }

        const toThrowErrorFn2 = () => {
            const app = new ScooterApp;
            const underageUser = new User("harry", "password", 15);
            app.register(underageUser);
        }
        
        test("Registers user", () => {
            const app = new ScooterApp;
            const validUser = new User("teddy", "password", 29);
            app.register(validUser)
            expect(app.registeredUsers).toEqual(registeredUsers);
        })
        test("Won't allow duplicate registration", () => {
            expect(toThrowErrorFn1).toThrow("already registered!");
        })
        test("Won't allow underage registration", () => {         
            expect(toThrowErrorFn2).toThrow("too young to register!");
        })
    })

    describe("Logging in a user", () => {

        const toThrowErrorFn1 = () => {
            const app = new ScooterApp;
            const validUser = new User("teddy", "password", 29);
            app.register(validUser);
            app.login("teddy", "password2222");
          }
        
          const toThrowErrorFn2 = () => {
            app.login("","");
          }

        test("User can log in with correct details", () => {
            const app = new ScooterApp;
            const validUser = new User("teddy", "password", 29);
            app.register(validUser);

            app.login("teddy", "password");
            expect(app.registeredUsers.teddy.loggedIn).toBe(true);
        })

        test("Throws error if username or password not recognised", () => {
            expect(toThrowErrorFn1).toThrow("Username or password is incorrect.");
        })

        test("Throws error if no username or password provided", () => {
            expect(toThrowErrorFn2).toThrow("Username or password not provided");
        })
    })

    describe("Adding a scooter to a location", () => {
        const toThrowErrorFn1 = () => {
            const app = new ScooterApp;
            const scooter = new Scooter("London");
            app.addScooter("Mars", scooter)
        }

        const toThrowErrorFn2 = () => {
            const app = new ScooterApp;
            const scooter = new Scooter("London");
            app.addScooter("Manhattan", "this is not a scooter");
        }

        test("Scooter can be added to a real location", () => {
            const app = new ScooterApp;
            const scooter = new Scooter("London");
            app.addScooter("Manhattan", scooter);
            expect(app.stations.Manhattan).toEqual([scooter.serial]);
        });
        test("Scooter's location is changed correctly", () => {
            const app = new ScooterApp;
            const scooter = new Scooter("London");
            app.addScooter("Manhattan", scooter);
            expect(scooter.station).toEqual("Manhattan");
        });
        test("Throws error if scooter is not scooter object", () => { 
            expect(toThrowErrorFn1).toThrow("Not a valid location");
        });
        test("Throws error if location is not real", () => {
            expect(toThrowErrorFn2).toThrow("Not a valid Scooter object");
        });
    })

    describe("Removing scooter", () => {
        const toThrowErrorFn1 = () => {
            app.removeScooter(20000);
        }

        test("Scooter can be removed from location", () => {
            const app = new ScooterApp;
            const scooter = new Scooter("Manhattan");
            app.addScooter("Manhattan", scooter);
            app.removeScooter(scooter);
            expect(app.stations.Manhattan).toEqual([]);
        });
        test("Scooter station is empty when removed successfully", () => {
            const app = new ScooterApp;
            const scooter = new Scooter("Manhattan");
            app.addScooter("Manhattan", scooter);
            app.removeScooter(scooter);
            expect(scooter.station).toBe("");
        });
        test("Error thrown when serial number not found", () => {
            expect(toThrowErrorFn1).toThrow("Cannot find scooter!");
        })
    });

    describe("Renting a scooter", () => {
        const toThrowErrorFn1 = () => {
            const app = new ScooterApp;
            const scooter = new Scooter("Manhattan");
            app.addScooter("Manhattan", scooter);
            const validUser = new User("teddy", "password", 29);
            app.register(validUser);
            app.rent("teddy", "Manhattan", "Bronx")
        }

        const toThrowErrorFn2 = () => {
            const app = new ScooterApp;
            const scooter = new Scooter("Manhattan");
            app.addScooter("Manhattan", scooter);
            const validUser = new User("teddy", "password", 29);
            app.register(validUser);

            app.login("teddy", "password");
            app.rent("teddy", "Bronx", "Manhattan")
        }

        const toThrowErrorFn3 = () => {
            const app = new ScooterApp;
            const scooter = new Scooter("Manhattan");
            app.addScooter("Manhattan", scooter);
            const validUser = new User("teddy", "password", 29);
            app.register(validUser);

            app.login("teddy", "password");
            app.rent("teddy", "Mars", "Bronx");
        }

        const toThrowErrorFn4 = () => {
            const app = new ScooterApp;
            const scooter = new Scooter("Manhattan");
            app.addScooter("Manhattan", scooter);
            const validUser = new User("teddy", "password", 29);
            app.register(validUser);

            app.login("teddy", "password");
            app.rent("teddy", "Bronx", "Mars")
        }

        const toThrowErrorFn5 = () => {
            const app = new ScooterApp;
            const scooter = new Scooter("Manhattan");
            scooter.charge = 0;
            app.addScooter("Manhattan", scooter);
            const validUser = new User("teddy", "password", 29);
            app.register(validUser);
            

            app.login("teddy", "password");
            app.rent("teddy", "Manhattan", "Bronx")
        }

        const toThrowErrorFn6 = () => {
            const app = new ScooterApp;
            const scooter = new Scooter("Manhattan");
            scooter.charge = 100;
            scooter.isBroken = true;
            app.addScooter("Manhattan", scooter);
            const validUser = new User("teddy", "password", 29);
            app.register(validUser);
            

            app.login("teddy", "password");
            app.rent("teddy", "Manhattan", "Bronx")
        }

        test("Logged in user can rent a bike", () => {
            const app = new ScooterApp;
            const scooter = new Scooter("Manhattan");
            scooter.charge = 100;
            app.addScooter("Manhattan", scooter);
            const validUser = new User("teddy", "password", 29);
            app.register(validUser);

            app.login("teddy", "password");
            app.rent("teddy", "Manhattan", "Bronx");
            expect(app.stations.Bronx).toEqual([scooter.serial]);
        })
        test("When user not logged in, throws error", () => {
            expect(toThrowErrorFn1).toThrow("Invalid user");
        })
        test("When no bike available, throws error", () => {   
            expect(toThrowErrorFn2).toThrow("No scooters available :'(");
        })

        test("When origin not real, throws error", () => {      
            expect(toThrowErrorFn3).toThrow("Invalid origin or destination!");
        })

        test("When destination not real, throws error", () => {     
            expect(toThrowErrorFn4).toThrow("Invalid origin or destination!");
        })

        test("No scooters have charge, throws error", () => {     
            expect(toThrowErrorFn5).toThrow("No scooters usable :'(");
        })

        test("All scooters broken, throws error", () => {     
            expect(toThrowErrorFn6).toThrow("No scooters usable :'(");
        })
    });
});

