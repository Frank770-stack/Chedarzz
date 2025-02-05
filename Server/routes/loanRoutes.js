import express from "express";
import {
  applyForLoan,
  approveLoan,
  viewLoans,
  repayLoan,
} from "../controllers/loanController.js";
import upload from "../middleware/uploadMiddleware.js";
import { protectRoute } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/apply",
  protectRoute,
  upload.fields([
    { name: "idFront", maxCount: 1 },
    { name: "idBack", maxCount: 1 },
    { name: "kraCertificate", maxCount: 1 },
  ]),
  applyForLoan
);

router.put("/approve/:loanId", protectRoute, approveLoan);
router.get("/", protectRoute, viewLoans);
router.put("/repay/:loanId", protectRoute, repayLoan);

export default router;
