module.exports = (sequelize, type) => {
  return sequelize.define('SellOrders', {
    SellOrderId: {
      type: type.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
      validate: {
        notNull: true,
        notEmpty: true,
        isInt: true
      }
    },
    Price: {
      type: type.DECIMAL(18, 0),
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
        isDecimal: true
      }
    },
    OpenToOffers: {
      type: type.BOOLEAN,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true
      }
    },
    SaleStatus: {
      type: type.ENUM('active', 'pending', 'sold', 'expired'),
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
        isIn: [['active', 'pending', 'sold', 'expired']]
      }
    },
    Server: {
      type: type.ENUM('Isya', 'Pagel', 'Jenira', 'Enid'),
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
        isIn: [['Isya', 'Pagel', 'Jenira', 'Enid']]
      }
    },
    Enhancement: {
      type: type.INTEGER,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
        isInt: true
      }
    },
    End: {
      type: type.INTEGER,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
        isInt: true
      }
    },
    Dex: {
      type: type.INTEGER,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
        isInt: true
      }
    },
    Int: {
      type: type.INTEGER,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
        isInt: true
      }
    },
    Str: {
      type: type.INTEGER,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
        isInt: true
      }
    },
    Spr: {
      type: type.INTEGER,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
        isInt: true
      }
    },
    Hp: {
      type: type.INTEGER,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
        isInt: true
      }
    },
    Sp: {
      type: type.INTEGER,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
        isInt: true
      }
    },
    Dmg: {
      type: type.INTEGER,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
        isInt: true
      }
    },
    Mdmg: {
      type: type.INTEGER,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
        isInt: true
      }
    },
    Def: {
      type: type.INTEGER,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
        isInt: true
      }
    },
    Mdef: {
      type: type.INTEGER,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
        isInt: true
      }
    },
    Aim: {
      type: type.INTEGER,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
        isInt: true
      }
    },
    Eva: {
      type: type.INTEGER,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
        isInt: true
      }
    },
    LastUpdated: {
      type: type.DATE,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
        isDate: true
      }
    }
  })
}