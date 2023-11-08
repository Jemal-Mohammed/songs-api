class APIFeatures{
    constructor(query,queryStr){
        this.query=query,
        this.queryStr=queryStr
    }
    search() {
        const keyword = this.queryStr.keyword;
        if (keyword) {
          this.query = this.query.find({
            $or: [
              {
                type: {
                  $regex: keyword,
                  $options: 'i'
                }
              },
              {
                status: {
                  $regex: keyword,
                  $options: 'i'
                }
              }
            ]
          });
        }
        return this;
      }
      

    // search(keywords) {
    //     if (keywords && keywords.length > 0) {
    //       const keywordFilters = keywords.map(keyword => ({
    //         $or: [
    //           { location: { $regex: keyword, $options: 'i' } },
    //           { type: { $regex: keyword, $options: 'i' } },
    //           // Add more fields to search here as needed
    //         ],
    //       }));
      
    //       this.query = this.query.or(keywordFilters);
    //     }
      
    //     return this;
    //   }
      
    filter(){
        const queryCopy={...this.queryStr};
        // remove fields from the query
        const removeFields=['keyword','limit','page']
        removeFields.forEach(el=>delete queryCopy[el]);

        // Advanced filters
        let queryStr=JSON.stringify(queryCopy);
        queryStr=queryStr.replace(/\b(gt|gte|lt|lte)\b/g,match=>`$${match}`)
        this.query=this.query.find(JSON.parse(queryStr));
        return this;
    }
    pagination(resPerPage){
        const currentPage=Number(this.queryStr.page) || 1;
        const skip=resPerPage*(currentPage-1);
        this.query=this.query.limit(resPerPage).skip(skip);
        return this;
    }
}
export default APIFeatures;