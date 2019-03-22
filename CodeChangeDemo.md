
OPEN src/services/airports.service.js

OLD

 getAll(){

        return this._airports.filter(a => a.code).map(avoidEmptyCity);

NEW

Locate the getAll function and replace the existing code with the code below. This will sort the airports by the city.

    getAll(){
            return this._airports.filter(a => a.code).map(avoidEmptyCity).sort((a, b) => (a.city > b.city) ? 1 : -1);
        }
