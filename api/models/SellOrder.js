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
      type: type.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
        isDecimal: {
          msg: 'Must be decimal value'
        },
        min: {
          args: [0],
          msg: 'Price must be greater than 0'
        }
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
        isIn: {
          args: [['active', 'pending', 'sold', 'expired']],
          msg: 'Order status must be active, pending, sold, or expired'
        }
      }
    },
    Server: {
      type: type.ENUM('Isya', 'Pagel', 'Jenira', 'Enid'),
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
        isIn: {
          args: [['Isya', 'Pagel', 'Jenira', 'Enid']],
          msg: 'Server must be Isya, Pagel, Jenira, or Enid'
        }
      }
    },
    Enhancement: {
      type: type.INTEGER,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
        isInt: {
          msg: 'Enhancement must be greater than integer value'
        },
        min: {
          args: [0],
          msg: 'Enhancement must be at least 0'
        },
        max: {
          args: [20],
          msg: 'Enhancement must be at most 20'
        }
      }
    },
    End: {
      type: type.INTEGER,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
        isInt: {
          msg: 'Stat must be integer value'
        },
        min: {
          args: [0],
          msg: 'Stat must be at least 0'
        }
      }
    },
    Dex: {
      type: type.INTEGER,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
        isInt: {
          msg: 'Stat must be integer value'
        },
        min: {
          args: [0],
          msg: 'Stat must be at least 0'
        }
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
        isInt: {
          msg: 'Stat must be integer value'
        },
        min: {
          args: [0],
          msg: 'Stat must be at least 0'
        }
      }
    },
    Spr: {
      type: type.INTEGER,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
        isInt: {
          msg: 'Stat must be integer value'
        },
        min: {
          args: [0],
          msg: 'Stat must be at least 0'
        }
      }
    },
    Hp: {
      type: type.INTEGER,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
        isInt: {
          msg: 'Stat must be integer value'
        },
        min: {
          args: [0],
          msg: 'Stat must be at least 0'
        }
      }
    },
    Sp: {
      type: type.INTEGER,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
        isInt: {
          msg: 'Stat must be integer value'
        },
        min: {
          args: [0],
          msg: 'Stat must be at least 0'
        }
      }
    },
    Dmg: {
      type: type.INTEGER,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
        isInt: {
          msg: 'Stat must be integer value'
        },
        min: {
          args: [0],
          msg: 'Stat must be at least 0'
        }
      }
    },
    Mdmg: {
      type: type.INTEGER,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
        isInt: {
          msg: 'Stat must be integer value'
        },
        min: {
          args: [0],
          msg: 'Stat must be at least 0'
        }
      }
    },
    Def: {
      type: type.INTEGER,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
        isInt: {
          msg: 'Stat must be integer value'
        },
        min: {
          args: [0],
          msg: 'Stat must be at least 0'
        }
      }
    },
    Mdef: {
      type: type.INTEGER,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
        isInt: {
          msg: 'Stat must be integer value'
        },
        min: {
          args: [0],
          msg: 'Stat must be at least 0'
        }
      }
    },
    Aim: {
      type: type.INTEGER,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
        isInt: {
          msg: 'Stat must be integer value'
        },
        min: {
          args: [0],
          msg: 'Stat must be at least 0'
        }
      }
    },
    Eva: {
      type: type.INTEGER,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
        isInt: {
          msg: 'Stat must be integer value'
        },
        min: {
          args: [0],
          msg: 'Stat must be at least 0'
        }
      }
    }
  });
};