module.exports = function(sequelize,Datatypes){
    const watchListItem = sequelize.define("WatchListItem",{
        api_id: {
            type: Datatypes.STRING,
            allowNull: false
        },
        isWatched: {
            type: Datatypes.BOOLEAN,
            allowNull:false,
            default: false
        },
        foreignKey: {
            allowNull:false,

        }

    })
    return watchListItem
}