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
          isDecimal: {
            msg: 'Must be decimal value'
          },
          min: {
            args: 0,
            msg: 'Min price must be greater than 0'
          }
        }
      },
      PriceMax: {
        type: type.DECIMAL(18,0),
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
          isDecimal: {
            msg: 'Must be decimal value'
          },
          min: {
            args: 0,
            msg: 'Max price must be greater than 0'
          },
          isGreaterThanOtherField(value) {
            if (parseFloat(value) <= parseFloat(this.PriceMin)) {
              throw new Error('Max price must be greater than min price');
            }
          }
        }
      },
      OrderStatus: {
        type: type.ENUM('active', 'bought', 'expired'),
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
          isIn: {
            args: [['active', 'bought', 'expired']],
            msg: 'Order status must be active, bought, or expired'
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
      DesiredEnhancement: {
        type: type.ENUM('N/A', '+12', '+11', '+10', '+9'),
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
          isIn: {
            args: [['N/A', '+12', '+11', '+10', '+9']],
            msg: 'Desired enhancement must be N/A or +9-12'
          }
        }
      },
      DesiredEnd: {
        type: type.ENUM('N/A', 'godly', 'high', 'medium'),
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
          isIn: {
            args: [['N/A', 'godly', 'high', 'medium']],
            msg: 'Desired stat must be N/A, godly, high, or medium'
          }
        }
      },
      DesiredDex: {
        type: type.ENUM('N/A', 'godly', 'high', 'medium'),
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
          isIn: {
            args: [['N/A', 'godly', 'high', 'medium']],
            msg: 'Desired stat must be N/A, godly, high, or medium'
          }
        }
      },
      DesiredInt: {
        type: type.ENUM('N/A', 'godly', 'high', 'medium'),
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
          isIn: {
            args: [['N/A', 'godly', 'high', 'medium']],
            msg: 'Desired stat must be N/A, godly, high, or medium'
          }
        }
      },
      DesiredStr: {
        type: type.ENUM('N/A', 'godly', 'high', 'medium'),
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
          isIn: {
            args: [['N/A', 'godly', 'high', 'medium']],
            msg: 'Desired stat must be N/A, godly, high, or medium'
          }
        }
      },
      DesiredSpr: {
        type: type.ENUM('N/A', 'godly', 'high', 'medium'),
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
          isIn: {
            args: [['N/A', 'godly', 'high', 'medium']],
            msg: 'Desired stat must be N/A, godly, high, or medium'
          }
        }
      },
      DesiredHp: {
        type: type.ENUM('N/A', 'godly', 'high', 'medium'),
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
          isIn: {
            args: [['N/A', 'godly', 'high', 'medium']],
            msg: 'Desired stat must be N/A, godly, high, or medium'
          }
        }
      },
      DesiredSp: {
        type: type.ENUM('N/A', 'godly', 'high', 'medium'),
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
          isIn: {
            args: [['N/A', 'godly', 'high', 'medium']],
            msg: 'Desired stat must be N/A, godly, high, or medium'
          }
        }
      },
      DesiredDmg: {
        type: type.ENUM('N/A', 'godly', 'high', 'medium'),
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
          isIn: {
            args: [['N/A', 'godly', 'high', 'medium']],
            msg: 'Desired stat must be N/A, godly, high, or medium'
          }
        }
      },
      DesiredMdmg: {
        type: type.ENUM('N/A', 'godly', 'high', 'medium'),
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
          isIn: {
            args: [['N/A', 'godly', 'high', 'medium']],
            msg: 'Desired stat must be N/A, godly, high, or medium'
          }
        }
      },
      DesiredDef: {
        type: type.ENUM('N/A', 'godly', 'high', 'medium'),
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
          isIn: {
            args: [['N/A', 'godly', 'high', 'medium']],
            msg: 'Desired stat must be N/A, godly, high, or medium'
          }
        }
      },
      DesiredMdef: {
        type: type.ENUM('N/A', 'godly', 'high', 'medium'),
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
          isIn: {
            args: [['N/A', 'godly', 'high', 'medium']],
            msg: 'Desired stat must be N/A, godly, high, or medium'
          }
        }
      },
      DesiredAim: {
        type: type.ENUM('N/A', 'godly', 'high', 'medium'),
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
          isIn: {
            args: [['N/A', 'godly', 'high', 'medium']],
            msg: 'Desired stat must be N/A, godly, high, or medium'
          }
        }
      },
      DesiredEva: {
        type: type.ENUM('N/A', 'godly', 'high', 'medium'),
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
          isIn: {
            args: [['N/A', 'godly', 'high', 'medium']],
            msg: 'Desired stat must be N/A, godly, high, or medium'
          }
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