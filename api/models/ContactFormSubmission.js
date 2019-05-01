module.exports = (sequelize, type) => {
  return sequelize.define('ContactFormSubmissions', {
    reasonForMessage: {
      type: type.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
        isIn: {
          args: [['feedback', 'bug', 'question', 'reportUser', 'reportItem']],
          msg: 'Reason for contact must be either feedback, bug, question, or item/user report'
        },
        is: {
          args: /^.[a-zA-Z0-9_]+$/,
          msg: 'Reason for contact should only be alphanumeric'
        }
      }
    },
    email: {
      type: type.STRING,
      allowNull: true,
      validate: {
        isEmail: {
          msg: 'Email must be a valid email'
        }
      }
    },
    message: {
      type: type.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
        len: {
          args: [1, 255],
          msg: 'Message cannot be blank'
        }
      }
    }
  });
};