class QueryNotValid extends Error {

    constructor(message) {
        super(message);
        this.name = 'QueryNotValid';
        this.message = message;
    }

}

module.exports = QueryNotValid;
