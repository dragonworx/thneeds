const SQL = require('sequelize');

module.exports = {
  force: false,
  tables: {
    "thneed": {
      columns: {
        id: {
          type: SQL.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        title: {
          type: SQL.TEXT
        },
        notes: {
          type: SQL.TEXT
        },
        dateEntered: {
          type: SQL.DATE
        },
        amount: {
          type: SQL.DECIMAL(10, 2),
          defaultValue: 0,
          validate: {
            isDecimal: true
          }
        },
        userId: {
          type: SQL.INTEGER
        },
        purchased: {
          type: SQL.DATEONLY,
          defaultValue: null,
          allowNull: true
        },
        label: {
          type: SQL.TEXT,
          defaultValue: 'default'
        }
      },
      options: {
        schema: 'thneeds'
      }
    },
    "settings": {
      columns: {
        budgetAmount: {
          type: SQL.DECIMAL(10, 2),
          defaultValue: 300,
          validate: {
            isDecimal: true
          }
        },
        budgetFrequency: {
          type: SQL.TEXT,
          defaultValue: 'weekly'
        },
        accountDescription: {
          type: SQL.TEXT
        },
        accountAmount: {
          type: SQL.DECIMAL(10, 2),
          defaultValue: 0,
          validate: {
            isDecimal: true
          }
        },
        sortOrder: {
          type: SQL.JSON
        }
      },
      options: {
        schema: 'thneeds'
      }
    },
    "user": {
      columns: {
        id: {
          type: SQL.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        name: {
          type: SQL.TEXT
        },
        password: {
          type: SQL.TEXT
        },
        isAdmin: {
          type: SQL.BOOLEAN,
          defaultValue: false
        }
      },
      options: {
        schema: 'thneeds'
      }
    }
  }
};