import mongoose from "mongoose";
declare global {
  var mongoose: any; // This must be a `var` and not a `let / const`
}

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DBNAME = process.env.MONGODB_DBNAME;

if (!MONGODB_URI && typeof window === "undefined") {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

let cached = global.mongoose;

// mongoose.set("debug", (collectionName, method, query, doc) => {
//   console.log(`${collectionName}.${method}`, JSON.stringify(query), doc);
// });

// adds a `id` virtual to all schemas
// mongoose.set("id", true);
// mongoose.set("toJSON", {
//   virtuals: true,
//   versionKey: false,
//   transform: function (_doc, ret) {
//     delete ret._id;
//   },
// });

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      dbName: MONGODB_DBNAME,
    };
    console.log("MONGODB_URI", MONGODB_URI);

    cached.promise = mongoose.connect(MONGODB_URI!, opts).then((mongoose) => {
      return mongoose;
    });
  }
  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default dbConnect;
