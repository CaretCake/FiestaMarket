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
        type: type.ENUM('godly', 'high', 'medium', 'N/A'),
        allowNull: false
      },
      DesiredDex: {
        type: type.ENUM('godly', 'high', 'medium', 'N/A'),
        allowNull: false
      },
      DesiredInt: {
        type: type.ENUM('godly', 'high', 'medium', 'N/A'),
        allowNull: false
      },
      DesiredStr: {
        type: type.ENUM('godly', 'high', 'medium', 'N/A'),
        allowNull: false
      },
      DesiredSpr: {
        type: type.ENUM('godly', 'high', 'medium', 'N/A'),
        allowNull: false
      },
      DesiredHp: {
        type: type.ENUM('godly', 'high', 'medium', 'N/A'),
        allowNull: false
      },
      DesiredSp: {
        type: type.ENUM('godly', 'high', 'medium', 'N/A'),
        allowNull: false
      },
      DesiredDmg: {
        type: type.ENUM('godly', 'high', 'medium', 'N/A'),
        allowNull: false
      },
      DesiredMdmg: {
        type: type.ENUM('godly', 'high', 'medium', 'N/A'),
        allowNull: false
      },
      DesiredDef: {
        type: type.ENUM('godly', 'high', 'medium', 'N/A'),
        allowNull: false
      },
      DesiredMdef: {
        type: type.ENUM('godly', 'high', 'medium', 'N/A'),
        allowNull: false
      },
      DesiredAim: {
        type: type.ENUM('godly', 'high', 'medium', 'N/A'),
        allowNull: false
      },
      DesiredEva: {
        type: type.ENUM('godly', 'high', 'medium', 'N/A'),
        allowNull: false
      },
      LastUpdated: {
        type: type.DATE,
        allowNull: false
      }
    })
}