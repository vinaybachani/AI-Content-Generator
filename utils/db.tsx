import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema'
const sql = neon('postgresql://AI%20Form%20Builder_owner:Js5XYRCZFW1w@ep-weathered-moon-a51yi5lb.us-east-2.aws.neon.tech/AI%20Form%20Builder?sslmode=require');

export const db = drizzle(sql, { schema });