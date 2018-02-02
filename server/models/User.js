var mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    UserSchema = new Schema({
        name: String,
        _list: [{type: Schema.Types.ObjectId, ref: "List"}]
    },{usePushEach:true})
mongoose.model('User', UserSchema);