import { Sequelize } from "sequelize";

const sequelize = new Sequelize(process.env.PG_DATABASE, process.env.PG_USER, process.env.PG_PASSWORD, {
    host: process.env.PG_HOST,
    dialect: "postgres",
    logging: false, 
});

const connect_DB = async () => {
    try {
        await sequelize.authenticate();
        console.log("PostgreSQL connection successful.");
    } catch (error) {
        console.error("PostgreSQL connection failed:", error);
        process.exit(1);
    }
};



export { sequelize, connect_DB };
