const Sequelize = require('sequelize');
const { STRING, UUID, UUIDV4, DECIMAL } = Sequelize;

const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/product_offerings');


const Product = conn.define('product', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4
  },
  name: {
    type: STRING,
    unique: true
  },
  suggestPrice: {
    type: DECIMAL
  }
});

const Company = conn.define('company', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4
  },
  name: {
    type: STRING,
    unique: true
  }
});

const Offering = conn.define('offering', {
  price: {
    type: DECIMAL
  }
});

Offering.belongsTo(Company);
Offering.belongsTo(Product);


const syncAndSeed = async ()=>{
  await conn.sync({force: true});

  const


}

syncAndSeed();
