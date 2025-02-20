class ApiFeatures {
  constructor(moviefind, reqQuery) {
    this.moviefind = moviefind;
    this.reqQuery = reqQuery;
  }

  filter() {
    this.moviefind = this.moviefind.find(this.reqQuery)
    return this
  }

  sort() {
    if (this.reqQuery.sort) {
      const multiputeQuery = this.reqQuery.sort.split(",").join(" ");
      this.moviefind = this.moviefind.sort(multiputeQuery)
    } else {
      this.moviefind = this.moviefind.sort("createdAt")
    }
    return this
  }
}