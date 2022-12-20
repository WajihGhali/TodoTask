const APIFeatures = require ('../../utils/apiFeatures');
const commentModel = require("../models/commentModel");

module.exports = class CommentRepo {
    static findOneByObjSelect(obj, select){
        return commentModel.findOne(obj).select(select);
    }

    static findOneByObj(obj){
        return commentModel.findOne(obj);
    }

    static create(payload){
        return commentModel.create(payload);
    }

    static findById(id){
        return commentModel.findById(id);
    }

    static findByIdAndUpdate(id, payload){
        return commentModel.findByIdAndUpdate(id, { $set : payload } , { new :true } );
    }

    static async findByObjPaginate(obj, options, query){
        let deleted = query.deleted == "true" ? true : false;
        
        const features = new APIFeatures(
            deleted ? commentModel.find({...obj, deletedAt: { $ne: null} })
                    : commentModel.find({...obj, deletedAt: null}),
            query
          )
            .filter()
            .sort()
            .limitFields()
            .search(["content"])


            let optionsPaginate = {
                limit: options.limit ? options.limit : null,
                page: options.page ? options.page : null,
              };
              
            const pagination = commentModel.paginate(features.query, optionsPaginate);
            return await pagination;
    }
    
    static async deleteTask(comment) {
        return commentModel.findByIdAndUpdate(comment._id, { $set: { deletedAt: Date.now() } }, { new: true })
          .lean()
          .exec();
      }
}