import mongoose from "mongoose";

const LoanSchema = new mongoose.Schema(
  {
    borrower: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    lender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    loanAmount: {
      type: Number,
      required: true,
    },
    interestRate: {
      type: Number, // You can calculate or specify the interest rate
      required: true,
    },
    loanStatus: {
      type: String,
      enum: ["pending", "approved", "disbursed", "repaid", "rejected"],
      default: "pending",
    },
    applicationDate: {
      type: Date,
      default: Date.now,
    },
    approvalDate: {
      type: Date,
    },
    repaymentTerms: {
      duration: {
        type: Number,
        required: true,
      },
      monthlyInstallment: {
        type: Number,
        required: true,
      },
    },
  },
  { timestamps: true }
);

const Loan = mongoose.model("Loan", LoanSchema);
export default Loan;
