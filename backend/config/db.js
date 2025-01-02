const mongoUrl = process.env.MONGO_URI;

const client = new MongoClient(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
