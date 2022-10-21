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
        
        test("Registers user", () => {
            const app = new ScooterApp;
            const validUser = new User("teddy", "password", 29);
            app.register(validUser)
            expect(app.registeredUsers).toEqual(registeredUsers);
        })
        test("Won't allow duplicate registration", () => {
            const app = new ScooterApp;
            const validUser = new User("teddy", "password", 29);
            app.register(validUser);
            expect(app.register(validUser)).toThrow("already registered!");
        })
        test("Won't allow underage registration", () => {
            const app = new ScooterApp;
            const underageUser = new User("harry", "password", 15);
            expect(app.register(underageUser)).toThrow("too young to register!");
        })
    })

    describe("Logging in a user", () => {

        test("User can log in with correct details", () => {
            const app = new ScooterApp;
            const validUser = new User("teddy", "password", 29);
            app.register(validUser);

            app.login("teddy", "password");
            expect(app.registeredUsers.teddy.loggedIn).toBe(true);
        })

        test("Throws error if username or password not recognised", () => {
            const app = new ScooterApp;
            const validUser = new User("teddy", "password", 29);
            app.register(validUser);

            expect(app.login("teddy", "password2222")).toThrow("Username or password is incorrect.");
        })
    })

    describe("Adding a scooter to a location", () => {
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
            const app = new ScooterApp;
            const scooter = new Scooter("London");
            expect(app.addScooter("Mars", scooter)).toThrow("Not a valid location");
        });
        test("Throws error if location is not real", () => {
            const app = new ScooterApp;
            const scooter = new Scooter("London");
            expect(app.addScooter("Manhattan", "this is not a scooter")).toThrow("Not a valid Scooter object");
        });
    })

    describe("Removing scooter", () => {
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
            expect(app.removeScooter(20000)).toThrow("Cannot find scooter!");
        })
    });

    describe("Renting a scooter", () => {
        test("Logged in user can rent a bike", () => {
            const app = new ScooterApp;
            const scooter = new Scooter("Manhattan");
            app.addScooter("Manhattan", scooter);
            const validUser = new User("teddy", "password", 29);
            app.register(validUser);

            app.login("teddy", "password");
            app.rent("teddy", "Manhattan", "Bronx");
            expect(app.stations.Bronx).toEqual([scooter.serial]);
        })
        test("When user not logged in, throws error", () => {
            const app = new ScooterApp;
            const scooter = new Scooter("Manhattan");
            app.addScooter("Manhattan", scooter);
            const validUser = new User("teddy", "password", 29);
            app.register(validUser);

            expect(app.rent("teddy", "Manhattan", "Bronx")).toThrow("Invalid user");
        })
        test("When no bike available, throws error", () => {
            const app = new ScooterApp;
            const scooter = new Scooter("Manhattan");
            app.addScooter("Manhattan", scooter);
            const validUser = new User("teddy", "password", 29);
            app.register(validUser);

            app.login("teddy", "password");
            scooter.charge = 0;
            scooter.isBroken = true;
            expect(app.rent("teddy", "Manhattan", "Bronx")).toThrow("No scooters available :'(");
        })

        test("When origin not real, throws error", () => {
            const app = new ScooterApp;
            const scooter = new Scooter("Manhattan");
            app.addScooter("Manhattan", scooter);
            const validUser = new User("teddy", "password", 29);
            app.register(validUser);

            app.login("teddy", "password");
            expect(app.rent("teddy", "Mars", "Bronx")).toThrow("Invalid origin or destination!");
        })

        test("When destination not real, throws error", () => {
            const app = new ScooterApp;
            const scooter = new Scooter("Manhattan");
            app.addScooter("Manhattan", scooter);
            const validUser = new User("teddy", "password", 29);
            app.register(validUser);

            app.login("teddy", "password");
            expect(app.rent("teddy", "Mars", "Bronx")).toThrow("Invalid origin or destination!");
        })
    });
});

