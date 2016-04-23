module.exports = function(mongoose) {
    return mongoose.model(
        'User',
        {
            username: String,
            password: String
        }
    );
}
