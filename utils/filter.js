class apiFilters{
    constructor(query,queryStr){
        this.query=query;
        this.queryStr = queryStr;
    }
    filter(){
        const queryCopy = {...this.queryStr};
        //Removing fields from the query
        const removeFields = ['sort','fields','q'];
        removeFields.forEach(el => delete queryCopy[el]);
        console.log(queryCopy);
        

        //Advance filter using : lt,lte,gt,gte
        let queryStr = JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g ,match=>`$${match}`);
        this.query=this.query.find(JSON.parse(queryStr));
        // this.query=this.query.find(this.queryStr);
        return this;
    }
    sort(){
        if(this.queryStr.sort){
            const sortBy = this.queryStr.sort.split(',').join(' ');
            console.log(sortBy);
            this.query = this.query.sort(sortBy);
        }
        else{
            this.query = this.query.sort('-postingDate');
        }
        return this;
    }

    limitFields(){
        if(this.queryStr.fields){
            const fields = this.queryStr.fields.split(',').join(' ');
            // console.log(sortBy);
            this.query = this.query.select(fields);
        }
        else{
            this.query = this.query.select('-__v');
        }
        return this;
    }

    searchByQuery(){
        if(this.queryStr.q){
            const qu = this.queryStr.q.split('-').join(' ');
            // console.log(qu);
            this.query = this.query.find({$text:{$search: "\""+ qu +"\""}});
        }
        return this;
    }
}

module.exports=apiFilters;