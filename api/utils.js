require("dotenv").config({path: `${process.cwd()}/.env.${process.env.NODE_ENV || "development"}.local`});