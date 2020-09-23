const csv = require('csv-parser');
const fs = require('fs');

const Customer = require('../../models/Customer');

const createCustomer = async (customer) => {
  try {
    const newCustomer = new Customer(customer);
    await newCustomer.save();
  } catch (error) {
    console.log(error);
  }
};

const readFile = () => {
  fs.createReadStream('./public/documents/customers.csv')
    .pipe(csv())
    .on('data', async (row) => {
      console.log(row);
      await createCustomer(row);
    })
    .on('end', () => {
      console.log('CSV file successfully processed');
    });
};

module.exports = readFile;
