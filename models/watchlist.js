module.exports = function(sequelize, DataTypes) {
  const WatchListItem = sequelize.define("WatchListItem", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    api_id: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    is_watched: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      default: false
    }
  });

  WatchListItem.associate = function(models) {
    // We're saying that a WatchListItem should belong to an User
    // A WatchListItem can't be created without an User due to the foreign key constraint
    WatchListItem.belongsTo(models.User, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });
  };

  return WatchListItem;
};
