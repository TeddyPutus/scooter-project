const User = require('./User')
const Scooter = require('./Scooter')

class ScooterApp {
  constructor(){
    this.stations = {
        Manhattan:[],
        Brooklyn: [],
        Queens:[],
        Bronx:[],
        StatenIsland:[]
    }

    this.registeredUsers = {};
    ScooterApp.scooterSessions.push(this); //goes at the end, once instance has been initialised
  }

  register(user){
      if(user.age <= 17){
        throw "too young to register!"
      }else{
        for(let key in this.registeredUsers){
          if(key === user.username) throw "already registered!"
        }
        this.registeredUsers[user.username] = {
          password: user.password,
          age: user.age,
          loggedIn: false,
          accountChange: 0
        }
      }
  }

  login(username, password){
    if(!username, !password){
      throw "Username or password not provided"
    } else{
      for(let key in this.registeredUsers){
        if(key === username){
          if(this.registeredUsers[key]["password"] === password){
            this.registeredUsers[key]["loggedIn"] = true;
            return;
          }
        }
      }
      //if we get out of the loop, then no matching user
      throw "Username or password is incorrect."
    }
  }

  addScooter(location, scooter){
    if(scooter instanceof Scooter === false){
      throw "Not a valid Scooter object";
    }else{
      for(let key in this.stations){
        if(key === location){
          this.stations[key].push(scooter.serial);
          scooter.station = location;
          return;
        }
      }
      throw "Not a valid location";
    }
  }

  removeScooter(scooterToRemove){
    for(let key in this.stations){
      let scooterIndex = this.stations[key].indexOf(scooterToRemove.serial);
      if(scooterIndex >= 0){
        this.stations[key].splice(scooterIndex, 1);
        scooterToRemove.station = "";
        return;
      }
      throw "Cannot find scooter!";
    }
  }

  static scooterSessions = []; //this holds all instances of the ScooterApp class
}

const app = new ScooterApp;
const validUser = new User("teddy", "password", 29);
app.register(validUser);

app.login("teddy", "password");


module.exports = ScooterApp
