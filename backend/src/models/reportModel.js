import mongoose from 'mongoose';

const accountSchema = new mongoose.Schema({
  bankName: String,
  accountNumber: String,
  amountOverdue: Number,
  currentBalance: Number,
  address: String,
  type: String
});

const reportSchema = new mongoose.Schema({
  name: String,
  mobile: String,
  pan: String,
  creditScore: Number,
  summary: {
    totalAccounts: Number,
    activeAccounts: Number,
    closedAccounts: Number,
    currentBalance: Number,
    securedAmount: Number,
    unsecuredAmount: Number,
    enquiriesLast7Days: Number
  },
  accounts: [accountSchema]
}, { timestamps: true });

export default mongoose.model('Report', reportSchema);