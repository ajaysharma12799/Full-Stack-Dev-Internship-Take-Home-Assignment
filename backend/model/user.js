const crypto = require('crypto');
const mongoose = require('mongoose');
const { v1: uuidv1 } = require('uuid');

const userSchema = new mongoose.Schema({ 
    userName: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        min: 3,
        max: 20
    },
    encryptedPassword: {
        type: String,
        trim: true,
        min: 5,
        max: 25,
        required: true
    },
    salt: String,
    type: {
        type: Number,
        trim: true,
        required: true
    }
});

userSchema.virtual('password')
.set( function(password) {
    this._password = password;
    this.salt = uuidv1();
    this.encryptedPassword = this.securePassword(password);
} )
.get( function() {
    return this._password;
} );

userSchema.methods = {
    authenciate: function(plainPassword) {
        return this.securePassword(plainPassword) === this.encryptedPassword;
    },
    securePassword: function(plainPassword) {
        if( !plainPassword ) {
            return "";
        }
        try {
            return crypto.createHmac('sha256', this.salt)
            .update(plainPassword)
            .digest('hex');
        }
        catch(error) {
            console.log(`Error Comming From User Model Virtual Method : ${error}`);
            return "";
        }
    }
}

module.exports = mongoose.model('User', userSchema);