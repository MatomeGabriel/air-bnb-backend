/**
 * APIFeatures Utility
 * Provides filtering, sorting, and pagination for Mongoose queries based on request parameters.
 */
class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  // to filter our results
  // to exclude other things based on what we pass
  // filter() {
  //   const queryObj = { ...this.queryString };
  //   const excludedFields = ['page', 'sort', 'limit', 'fields'];
  //   // remove this excluded fields on our query string

  //   excludedFields.forEach((el) => delete queryObj[el]);

  //   //  Advanced Filtering
  //   // 1B) convert the object into a string, by stringifying it
  //   // replace the gt, gte, lt, lte by appending the $ e.g gte -> $gte
  //   let queryString = JSON.stringify(queryObj);
  //   queryString = queryString.replace(
  //     /\b(gte|gt|lte|lt)\b/g,
  //     (match) => `$${match}`,
  //   );
  //

  //   // over ride our initial query
  //   this.query = this.query.find(JSON.parse(queryString));
  //
  //   return this;
  // }

  // filter() {
  //   const queryObj = { ...this.queryString };
  //   const excludedFields = ['page', 'sort', 'limit', 'fields'];

  //   excludedFields.forEach((field) => delete queryObj[field]);

  //   const mongoFilter = Object.entries(queryObj).reduce((acc, [key, value]) => {
  //     if (value && typeof value === 'object') {
  //       acc[key] = Object.entries(value).reduce((nestedAcc, [op, val]) => {
  //         const mongoOp = ['gte', 'gt', 'lte', 'lt'].includes(op)
  //           ? `$${op}`
  //           : op;
  //         nestedAcc[mongoOp] = isNaN(val) ? val : Number(val);
  //         return nestedAcc;
  //       }, {});
  //     } else {
  //       acc[key] = value;
  //     }
  //     return acc;
  //   }, {});

  //
  //   this.query = this.query.find(mongoFilter);
  //   return this;
  // }

  filter() {
    const queryObj = { ...this.queryString };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    // Remove excluded fields
    excludedFields.forEach((el) => delete queryObj[el]);

    //  Advanced Filtering
    // 1B) convert the object into a string, by stringify it
    // replace the gt, gte, lt, lte by appending the $ e.g gte -> $gte
    let queryString = JSON.stringify(queryObj);
    queryString = queryString.replace(
      /\b(gte|gt|lte|lt)\b/g,
      (match) => `$${match}`,
    );

    this.query = this.query.find(JSON.parse(queryString));

    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');

      this.query = this.query.sort(sortBy);
      // sort('price ratingsAverage)
    } else {
      // default order, where the latest are shown first
      this.query = this.query.sort('-createdAt');
    }
    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }

    return this;
  }
}

module.exports = APIFeatures;
