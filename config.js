var environments = {
    development: {
        MONGODB_URI: "mongodb://localhost/development",
        REDIS_URI: "redis://localhost/",
        HTTP_PORT: 3000
    },
    testing: {
        MONGODB_URI: "mongodb://localhost/testing",
        REDIS_URI: "redis://localhost/",
        HTTP_PORT: 3000
    },
    production: {
        MONGODB_URI: "mongodb://localhost/production",
        REDIS_URI: "redis://localhost/",
        HTTP_PORT: 3000
    }
};

var express = {
    views: 'views',
    view_engine: 'jade'
};

module.exports = {
    environments: environments,
    express: express,
    get_environment: function(env) {
        return environments[env]
    },
    current_environments: function() {
        var env = process.env.APP_ENV || 'development';
        return environments[env];
    }
};
