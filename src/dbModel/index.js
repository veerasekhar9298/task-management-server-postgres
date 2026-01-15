

const initializeDbModels = () => {
    require('./user/schema');
    require('./task/schema');
};

module.exports = initializeDbModels