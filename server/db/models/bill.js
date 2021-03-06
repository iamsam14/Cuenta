const mongoose = require('mongoose'),
  User = require('./user'),
  moment = require('moment');

const billSchema = new mongoose.Schema(
  {
    amountDue: { type: Number, required: true },
    party: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    billDate: { type: Date },
    tokenID: {
      type: String,
      required: true
    },
    transactionID: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

billSchema.virtual('users', {
  ref: User,
  localField: '_id',
  foreignField: 'billHistory'
});

billSchema.methods.toJSON = function () {
  const bill = this;
  const billObject = bill.toObject();
  if (billObject.billDate) {
    billObject.billDate = moment(billObject.billDate).format('YYYY-MM-DD');
  }
  return billObject;
};

const Bill = mongoose.model('Bill', billSchema);

module.exports = Bill;
