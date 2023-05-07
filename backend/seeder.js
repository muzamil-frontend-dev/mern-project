import dotenv from "dotenv";
import connectDb from "./config/db.js";
import products from "./data/products.js";
import Product from "./models/product.js";
import users from "./data/users.js";
import User from "./models/user.js";
import Order from "./models/order.js";

dotenv.config();

const importData = async () => {
  try {
    connectDb();
    await User.deleteMany();
    await Product.deleteMany();

    const [adminUser] = await User.insertMany(users);

    const updatedProducts = products.map((p) => {
      return {
        ...p,
        user: adminUser._id,
      };
    });

    await Product.insertMany(updatedProducts);
    console.log(`✅✅✅ Data imported successfully.`);
    process.exit(0);
  } catch (error) {
    console.log(`❌❌❌ Unable to import data : ${error.message} `.bgRed);
    process.exit(1);
  }
};

const deleteData = async () => {
  try {
    connectDb();
    await User.deleteMany();
    await Product.deleteMany();
    await Order.deleteMany();
    console.log(`✅✅✅ Data deleted Successfully.`);
    process.exit(0);
  } catch (error) {
    console.log(`❌❌❌ Unable to delete data: ${error.message}`.bgRed);
    process.exit(1);
  }
};

if (process.argv[2] == "-d") {
  deleteData();
} else {
  importData();
}
