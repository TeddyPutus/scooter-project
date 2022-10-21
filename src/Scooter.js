class Scooter{
  constructor(station){
    if(!station) throw "No Scooter data given";
    else if(typeof station != "string") throw "Scooter station must be string";
    this.station = station;
    this.user = "";
    this.serial = Math.floor(Math.random() * 1000);
    this.charge = Math.floor(Math.random() * 100);
    this.isBroken = false;
    this.docked = true;
  }

  rent(){
    if(this.charge <= 20){
      this.recharge();
      throw "Scooter low on battery, please charge."
    } else if(this.isBroken){
      this.requestRepair();
      throw "Scooter is broken, please send a repair request."
    } else{
      console.log("Enjoy the ride!");
      return "Success";
    }
  }

  dock(station){
    if(!station){
      throw "Docking station required!";
    } else{
      this.docked = true;
      this.user = "";
    }
  }

  async recharge() {
    console.log('Starting charge');
    
    await new Promise(resolve => setTimeout(resolve, 2000)); // wait 2 seconds
    this.charge = 100

    console.log('Charge complete');   
  }

  async requestRepair() {
    console.log('Requesting repair');
    
    await new Promise(resolve => setTimeout(resolve, 2000)); // wait 2 seconds
    this.isBroken = false

    console.log('Repair complete');   
  }
}


module.exports = Scooter
