const User = require('../src/User')

// User tests here
describe("Testing user creation", () => {
    const newUser = new User("Teddy", "password123", 29);
    describe("User is created with all details correct", () => {
        // test username
        test("Username is correct", () => {
            expect(newUser.username).toBe("Teddy");
        });

        // test password
        test("Password is correct", () => {
            expect(newUser.password).toBe("password123");
        });

        // test age
        test("age is correct", () => {
            expect(newUser.age).toBe(29);
        });
    });
    describe("User throws appropriate errors when information is incorrect", () => {
        const toThrowErrorFn1 = () => {
            const newUser = new User();
        }
        const toThrowErrorFn2 = () => {
            const newUser = new User(1,"password", 29);
        }
        const toThrowErrorFn3 = () => {
            const newUser = new User("Teddy",1, 29);
        }
        const toThrowErrorFn4 = () => {
            const newUser = new User("Teddy","password", "29");
        }

        test("Throws error if no information given", () => {
            expect(toThrowErrorFn1).toThrow("No User data given");
        });
        test("Throws error if name is not a string", () => {
            expect(toThrowErrorFn2).toThrow("User name must be string");
        });
        test("Throws error if password is not a string", () => {
            expect(toThrowErrorFn3).toThrow("User password must be string");
        });
        test("Throws error if age not a number", () => {
            expect(toThrowErrorFn4).toThrow("User age must be a number");
        });
    });
});
