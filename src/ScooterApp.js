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

  rent(username, origin, destination){
    //find user, check if logged in
    if(this.isLoggedIn(username) === false) throw "Invalid user"
    if(this.isLocationReal(origin) === false) throw "Invalid origin or destination!"
    if(this.isLocationReal(destination) === false) throw "Invalid origin or destination!"

    //everything is valid, see if there are scooter at origin
    if(this.stations[origin].length < 1) throw "No scooters available :'("

    //scooters exist, see if any are actually usable
    for(let scooterSerial of this.stations[origin]){
      let scooter = Scooter.findScooterBySerial(scooterSerial);
      if(scooter.charge <= 20){
        console.log("Scooter low on battery, please charge scooter")
        scooter.recharge();
      } else if(scooter.isBroken){
        console.log("Scooter is broken, please send a repair request");
        scooter.requestRepair();
      } else{
        //move scooter to destination
        scooter.rent()
        this.removeScooter(scooter);
        this.addScooter(destination, scooter);
        return;
      }
    }
    throw "No scooters usable :'("
  }

  //helper functions for rent()
  isLoggedIn(username){
    for(let key in this.registeredUsers){
      if(key === username){
        if(this.registeredUsers[key]["loggedIn"]){ //found logged in user
          return true  
        }
      }
    }
    return false
  }

  isLocationReal(location){
    for(let key in this.stations){
      if(key === location){
        //found location
        return true     
      }
    }
    return false
  }

  static scooterSessions = []; //this holds all instances of the ScooterApp class
}

module.exports = ScooterApp
