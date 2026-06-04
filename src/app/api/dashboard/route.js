import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";

export async function GET() {

  try {

    // ======================
    // BASIC COUNTS
    // ======================

    const totalUsers =
      await prisma.user.count();

    const totalProjects =
      await prisma.project.count();

    const totalAttendance =
      await prisma.attendance.count();

    // ======================
    // PAYMENTS
    // ======================

    const payments =
      await prisma.payment.findMany();

    const completedPayments =
      payments
        .filter(
          (item) =>
            item.status ===
            "Completed"
        )
        .reduce(
          (acc, item) =>
            acc +
            Number(item.amount || 0),
          0
        );

    const pendingPayments =
      payments
        .filter(
          (item) =>
            item.status ===
            "Pending"
        )
        .reduce(
          (acc, item) =>
            acc +
            Number(item.amount || 0),
          0
        );

    // ======================
    // EXPENSES
    // ======================

    const expenses =
      await prisma.expense.findMany();

    const paidExpenses =
      expenses
        .filter(
          (item) =>
            item.status ===
            "Paid"
        )
        .reduce(
          (acc, item) =>
            acc +
            Number(item.amount || 0),
          0
        );

    const pendingExpenses =
      expenses
        .filter(
          (item) =>
            item.status ===
            "Pending"
        )
        .reduce(
          (acc, item) =>
            acc +
            Number(item.amount || 0),
          0
        );

    // ======================
    // NET REVENUE
    // ======================

    const totalRevenue =
      completedPayments -
      paidExpenses;

    // ======================
    // RESPONSE
    // ======================

    return NextResponse.json({

      totalUsers,

      totalProjects,

      totalAttendance,

      totalRevenue,

      pendingPayments,

      pendingExpenses,

    });

  } catch (error) {

    console.log(error);

    return NextResponse.json(
      {
        error:
          "Failed to fetch dashboard data",
      },
      {
        status: 500,
      }
    );
  }
}