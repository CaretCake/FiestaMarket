module.exports = (sequelize, type) => {
  return sequelize.define('BuyOrders', {
      BuyOrderId: {
        type: type.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        unique: true
      },
      PriceMin: {
        type: type.DECIMAL(18,0),
        allowNull: false
      },
      PriceMax: {
        type: type.DECIMAL(18,0),
        allowNull: false
      },
      OrderStatus: {
        type: type.ENUM('active', 'bought', 'expired'),
        allowNull: false
      },
      Server: {
        type: type.ENUM('Isya', 'Pagel', 'Jenira', 'Enid'),
        allowNull: false
      },
      DesiredEnhancement: {
        type: type.ENUM('+12', '+11', '+10', '+9', 'N/A'),
        allowNull: false
      },
      DesiredEnd: {
        type: type.ENUM('N/A', 'godly', 'high', 'medium'),
        allowNull: false
      },
      DesiredDex: {
        type: type.ENUM('N/A', 'godly', 'high', 'medium'),
        allowNull: false
      },
      DesiredInt: {
        type: type.ENUM('N/A', 'godly', 'high', 'medium'),
        allowNull: false
      },
      DesiredStr: {
        type: type.ENUM('N/A', 'godly', 'high', 'medium'),
        allowNull: false
      },
      DesiredSpr: {
        type: type.ENUM('N/A', 'godly', 'high', 'medium'),
        allowNull: false
      },
      DesiredHp: {
        type: type.ENUM('N/A', 'godly', 'high', 'medium'),
        allowNull: false
      },
      DesiredSp: {
        type: type.ENUM('N/A', 'godly', 'high', 'medium'),
        allowNull: false
      },
      DesiredDmg: {
        type: type.ENUM('N/A', 'godly', 'high', 'medium'),
        allowNull: false
      },
      DesiredMdmg: {
        type: type.ENUM('N/A', 'godly', 'high', 'medium'),
        allowNull: false
      },
      DesiredDef: {
        type: type.ENUM('N/A', 'godly', 'high', 'medium'),
        allowNull: false
      },
      DesiredMdef: {
        type: type.ENUM('N/A', 'godly', 'high', 'medium'),
        allowNull: false
      },
      DesiredAim: {
        type: type.ENUM('N/A', 'godly', 'high', 'medium'),
        allowNull: false
      },
      DesiredEva: {
        type: type.ENUM('N/A', 'godly', 'high', 'medium'),
        allowNull: false
      },
      LastUpdated: {
        type: type.DATE,
        allowNull: false
      }
    })
}