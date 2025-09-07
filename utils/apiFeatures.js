class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  // to filter our results
  // to exclude other things based on what we pass
  filter() {
    const queryObj = { ...this.queryString };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    // remove this excluded fields on our query string
    excludedFields.forEach((el) => delete queryObj[el]);

    //  Advanced Filtering
    // 1B) convert the object into a string, by stringifying it
    // replace the gt, gte, lt, lte by appending the $ e.g gte -> $gte
    let queryString = JSON.stringify(queryObj);
    queryString = queryString.replace(
      /\b(gte|gt|lte|lt)\b/g,
      (match) => `$${match}`,
    );

    // over ride our initial query
    this.query = this.query.find(JSON.parse(queryString));
    return this;
  }

  paginate() {}
}

module.exports = APIFeatures;
