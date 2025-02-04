import Loan from "../models/loanModel.js";

// Apply for a loan (borrower)
export const applyForLoan = async (req, res) => {
  const { loanAmount, interestRate, repaymentTerms } = req.body;

  try {
    const borrower = req.user._id; // The logged-in user is the borrower

    // Create a new loan application
    const newLoan = new Loan({
      borrower,
      loanAmount,
      interestRate,
      repaymentTerms,
    });

    await newLoan.save();

    res
      .status(201)
      .json({ message: "Loan application submitted", loan: newLoan });
  } catch (error) {
    console.error("Error applying for loan:", error.message);
    res.status(500).json({ message: "Error applying for loan" });
  }
};

// Approve or Reject loan (lender)
export const approveLoan = async (req, res) => {
  const { loanId } = req.params;
  const { decision } = req.body; // 'approve' or 'reject'

  try {
    const loan = await Loan.findById(loanId);

    if (!loan) {
      return res.status(404).json({ message: "Loan not found" });
    }

    // Check if the user is the lender
    const lender = req.user._id;
    if (loan.lender.toString() !== lender.toString()) {
      return res
        .status(403)
        .json({ message: "You are not authorized to approve this loan" });
    }

    if (decision === "approve") {
      loan.loanStatus = "approved";
      loan.approvalDate = Date.now();
    } else if (decision === "reject") {
      loan.loanStatus = "rejected";
    } else {
      return res.status(400).json({ message: "Invalid decision" });
    }

    await loan.save();

    res.status(200).json({ message: `Loan ${decision}d`, loan });
  } catch (error) {
    console.error("Error approving/rejecting loan:", error.message);
    res.status(500).json({ message: "Error approving/rejecting loan" });
  }
};

// View loans (borrower/lender)
export const viewLoans = async (req, res) => {
  try {
    const user = req.user._id; // Get logged-in user

    // Find loans related to the user (either as borrower or lender)
    const loans = await Loan.find({
      $or: [{ borrower: user }, { lender: user }],
    });

    res.status(200).json(loans);
  } catch (error) {
    console.error("Error fetching loans:", error.message);
    res.status(500).json({ message: "Error fetching loans" });
  }
};

// Repay loan (borrower)
export const repayLoan = async (req, res) => {
  const { loanId } = req.params;

  try {
    const loan = await Loan.findById(loanId);

    if (!loan) {
      return res.status(404).json({ message: "Loan not found" });
    }

    // Check if the user is the borrower
    if (loan.borrower.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "You are not authorized to repay this loan" });
    }

    loan.loanStatus = "repaid";
    await loan.save();

    res.status(200).json({ message: "Loan repaid successfully", loan });
  } catch (error) {
    console.error("Error repaying loan:", error.message);
    res.status(500).json({ message: "Error repaying loan" });
  }
};
