/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./utils/schema.tsx",
    dialect: 'postgresql',
    dbCredentials: {
        url: 'postgresql://AI%20Form%20Builder_owner:Js5XYRCZFW1w@ep-weathered-moon-a51yi5lb.us-east-2.aws.neon.tech/AI%20Form%20Builder?sslmode=require',
    }
};