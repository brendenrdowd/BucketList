var mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    ListSchema = new Schema({
        title: String,
        desc: String,
        _user:[{type:Schema.Types.ObjectId, ref:"User"}],
        creator: Object,
        status: Boolean
    },{timestamps:true, usePushEach:true})
mongoose.model('List', ListSchema);