class ApiFeature {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  filter() {
    let sortQuery = JSON.stringify(this.queryStr)
    sortQuery = sortQuery.replace(/(gt|gte|lt|lte)/g, (match) => `$${match}`)
    sortQuery = JSON.parse(sortQuery)


    const { sort, field, limit, page, ...filters } = sortQuery

    this.query = this.query.find(filters)
    return this
  }

  sort() {
    if (this.queryStr.sort) {
      const merge = this.queryStr.sort.split(",").join(" ")
      this.query = this.query.sort(merge)
    }
    return this
  }


  field() {
    if (this.queryStr.field) {
      const merge = this.queryStr.field.split(",").join(" ")
      this.query = this.query.select(merge)
    }
    return this
  }

  page() {

    const pageNum = this.queryStr.page * 1
    const limitNum = this.queryStr.limit * 1

    const skip = (pageNum - 1) * limitNum;
    this.query.skip(skip).limit(limitNum)
    return this
  }
}


export default ApiFeature