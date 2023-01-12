
class Users {

    constructor() {
        this.people = [];
    }

    addPerson(id, name, room) {
        let person = { id , name, room};
        this.people.push(person);
        return this.people;
    }

    getPerson(id) {
        let person = this.people.filter( value => 
        value.id === id )[0];
        return person;
    }

    getPeople() {
        return this.people;
    }

    getPeopelByRoom(room) {
        let peopleRoom = this.people.filter( value => 
            value.room === room);
            return peopleRoom;
    
    }

    deletePerson(id) {
       let delPerson = this.getPerson(id);
       this.people = this.people.filter( value =>
            value.id != id );

       return delPerson;
    }

}

module.exports = {
    Users
}