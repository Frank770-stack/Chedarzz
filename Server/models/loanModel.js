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
    applicationDate: {
      type: Date,
      default: Date.now,
    },
    approvalDate: {
      type: Date,
    },
    idFront: {
      type: String, // URL to the uploaded file
      required: true,
    },
    idBack: {
      type: String,
      required: true,
    },
    kraCertificate: {
      type: String, //Url to the uploaded file
      required: true,
    },
    adminApproved: {
      type: Boolean,
      default: false, // False until admin approves documents
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
      loanStatus: {
        type: String,
        enum: ["pending", "approved", "disbursed", "repaid", "rejected"],
        default: "pending",
      },
    },
  },
  { timestamps: true }
);

const Loan = mongoose.model("Loan", LoanSchema);
export default Loan;
