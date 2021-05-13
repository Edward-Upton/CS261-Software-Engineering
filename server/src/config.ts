/** Sever port. */
export const PORT = 5000;

/** URI of remote MongoDB database. */
export const DB_URI =
  "mongodb+srv://<username>:<password>@cs261.h465i.mongodb.net/cs261?retryWrites=true&w=majority";
/** Database config. */
export const DB_OPTIONS = {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
