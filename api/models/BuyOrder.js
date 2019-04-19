module.exports = (sequelize, type) => {
  return sequelize.define('BuyOrders', {
      BuyOrderId: {
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
      PriceMin: {
        type: type.DECIMAL(18,0),
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
          isDecimal: true
        }
      },
      PriceMax: {
        type: type.DECIMAL(18,0),
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
          isDecimal: true
        }
      },
      OrderStatus: {
        type: type.ENUM('active', 'bought', 'expired'),
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
          isIn: [['active', 'bought', 'expired']]
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
      DesiredEnhancement: {
        type: type.ENUM('N/A', '+12', '+11', '+10', '+9'),
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
          isIn: [['N/A', '+12', '+11', '+10', '+9']]
        }
      },
      DesiredEnd: {
        type: type.ENUM('N/A', 'godly', 'high', 'medium'),
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
          isIn: [['N/A', 'godly', 'high', 'medium']]
        }
      },
      DesiredDex: {
        type: type.ENUM('N/A', 'godly', 'high', 'medium'),
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
          isIn: [['N/A', 'godly', 'high', 'medium']]
        }
      },
      DesiredInt: {
        type: type.ENUM('N/A', 'godly', 'high', 'medium'),
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
          isIn: [['N/A', 'godly', 'high', 'medium']]
        }
      },
      DesiredStr: {
        type: type.ENUM('N/A', 'godly', 'high', 'medium'),
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
          isIn: [['N/A', 'godly', 'high', 'medium']]
        }
      },
      DesiredSpr: {
        type: type.ENUM('N/A', 'godly', 'high', 'medium'),
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
          isIn: [['N/A', 'godly', 'high', 'medium']]
        }
      },
      DesiredHp: {
        type: type.ENUM('N/A', 'godly', 'high', 'medium'),
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
          isIn: [['N/A', 'godly', 'high', 'medium']]
        }
      },
      DesiredSp: {
        type: type.ENUM('N/A', 'godly', 'high', 'medium'),
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
          isIn: [['N/A', 'godly', 'high', 'medium']]
        }
      },
      DesiredDmg: {
        type: type.ENUM('N/A', 'godly', 'high', 'medium'),
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
          isIn: [['N/A', 'godly', 'high', 'medium']]
        }
      },
      DesiredMdmg: {
        type: type.ENUM('N/A', 'godly', 'high', 'medium'),
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
          isIn: [['N/A', 'godly', 'high', 'medium']]
        }
      },
      DesiredDef: {
        type: type.ENUM('N/A', 'godly', 'high', 'medium'),
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
          isIn: [['N/A', 'godly', 'high', 'medium']]
        }
      },
      DesiredMdef: {
        type: type.ENUM('N/A', 'godly', 'high', 'medium'),
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
          isIn: [['N/A', 'godly', 'high', 'medium']]
        }
      },
      DesiredAim: {
        type: type.ENUM('N/A', 'godly', 'high', 'medium'),
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
          isIn: [['N/A', 'godly', 'high', 'medium']]
        }
      },
      DesiredEva: {
        type: type.ENUM('N/A', 'godly', 'high', 'medium'),
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
          isIn: [['N/A', 'godly', 'high', 'medium']]
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