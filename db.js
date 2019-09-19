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
  id:{
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4
  },
  price: {
    type: DECIMAL
  }
});

Offering.belongsTo(Company);
Offering.belongsTo(Product);

const mapPromise = (items, model)=>{
  return Promise.all(items.map(item => model.create(item)));
}

const syncAndSeed = async ()=>{
  await conn.sync({force: true});

  const products = [
    {name: 'tacos', suggestedPrice: 4 },
    {name: 'burritos', suggestedPrice: 8 },
    {name: 'tres leches', suggestedPrice: 3.5 }
  ]

  const [tacos, burritos, tresLeches ] =  await mapPromise(products, Product);

  const companies = [
    {name: 'Albertos' },
    {name: 'Chipotle' },
    {name: 'Taco Bell' }
  ]

  const [ albertos, chipotle, tacoBell ]  = await mapPromise(companies, Company);

  const offerings = [
    {price: 2, companyId: tacoBell.id, productId: tacos.id },
    {price: 8.5, companyId: chipotle.id, productId: burritos.id},
    {price: 3, companyId: albertos.id, productId: tresLeches.id }
  ]
  await mapPromise(offerings, Offering);
}

module.exports = {
  syncAndSeed,
  models: {
    Product,
    Company,
    Offering
  }
};

