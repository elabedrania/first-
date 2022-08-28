const mongoose = require('mongoose');

//2  connection to db
mongoose.connect('mongodb://127.0.0.1:27017/homework')

        .then(
            ()=>{
                console.log('connected to db');
            }
        )


        .catch(
            ()=>{
                console.log('error in connection');
            }
        )

//3 export de mongoose

module.exports = mongoose;