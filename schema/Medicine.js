const {Schema,model} = require('mongoose');

const schema = new Schema (
    {
        m_name:{
            type:String
        },
        m_qty:{
            type:Number,
        },
        m_price:{
            type:Number
        },
    }
)

module.export = model('Medicine',schema);