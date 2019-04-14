module.exports = (sequelize, type) => {
  return sequelize.define('SellOrders', {
    SellOrderId: {
      type: type.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      unique: true
    },
    Price: {
      type: type.DECIMAL(18, 0),
      allowNull: false
    },
    OpenToOffers: {
      type: type.BOOLEAN,
      allowNull: false,
    },
    SaleStatus: {
      type: type.ENUM('active', 'pending', 'sold', 'expired'),
      allowNull: false
    },
    Server: {
      type: type.ENUM('Isya', 'Pagel', 'Jenira', 'Enid'),
      allowNull: false
    },
    Enhancement: {
      type: type.INTEGER,
      allowNull: false
    },
    End: {
      type: type.INTEGER,
      allowNull: false
    },
    Dex: {
      type: type.INTEGER,
      allowNull: false
    },
    Int: {
      type: type.INTEGER,
      allowNull: false
    },
    Str: {
      type: type.INTEGER,
      allowNull: false
    },
    Spr: {
      type: type.INTEGER,
      allowNull: false
    },
    Hp: {
      type: type.INTEGER,
      allowNull: false
    },
    Sp: {
      type: type.INTEGER,
      allowNull: false
    },
    Dmg: {
      type: type.INTEGER,
      allowNull: false
    },
    Mdmg: {
      type: type.INTEGER,
      allowNull: false
    },
    Def: {
      type: type.INTEGER,
      allowNull: false
    },
    Mdef: {
      type: type.INTEGER,
      allowNull: false
    },
    Aim: {
      type: type.INTEGER,
      allowNull: false
    },
    Eva: {
      type: type.INTEGER,
      allowNull: false
    },
    LastUpdated: {
      type: type.DATE,
      allowNull: false
    }
  })
}