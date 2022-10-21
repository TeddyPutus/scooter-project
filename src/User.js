class User {
  constructor(username, password, age){
    if(!username && !password && !age) throw "No User data given"
    if(typeof username != "string") throw "User name must be string"
    if(typeof password != "string") throw "User password must be string"
    if(typeof age != "number") throw "User age must be a number"

    this.username = username;
    this.password = password;
    this.age = age;
  }
}

module.exports = User
