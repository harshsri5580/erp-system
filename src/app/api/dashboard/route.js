import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";
import { getUser } from "@/lib/getUser";

export async function GET(request) {

  try {
    const currentUser =
      getUser(request);

    if (!currentUser) {

      return NextResponse.json(
        {
          error: "Unauthorized",
        },
        {
          status: 401,
        }
      );

    }
    // ======================
    // BASIC COUNTS
    // ======================

    const totalUsers =
      await prisma.user.count({

        where: {
          companyId:
            currentUser.companyId,
        },

      });

    const totalProjects =
      await prisma.project.count({

        where: {
          companyId:
            currentUser.companyId,
        },

      });

    const totalAttendance =
      await prisma.attendance.count({
        where: {
          companyId:
            currentUser.companyId,
        },
      });

    // ======================
    // PAYMENTS
    // ======================

    const payments =
      await prisma.payment.findMany({

        where: {
          companyId:
            currentUser.companyId,
        },

      });
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
      await prisma.expense.findMany({

        where: {
          companyId:
            currentUser.companyId,
        },

      });

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
    // RECENT ACTIVITY
    // ======================

    const recentUsers =
      await prisma.user.findMany({

        where: {
          companyId:
            currentUser.companyId,
        },
        take: 5,
        orderBy: {
          createdAt: "desc",
        },
        include: {
          role: true,
        },
      });
    const recentProjects =
      await prisma.project.findMany({

        where: {
          companyId:
            currentUser.companyId,
        },
        take: 5,
        orderBy: {
          createdAt: "desc",
        },
      });

    const recentInvoices =
      await prisma.invoice.findMany({

        where: {
          companyId:
            currentUser.companyId,
        },
        take: 5,
        orderBy: {
          createdAt: "desc",
        },
      });

    const recentPayments =
      await prisma.payment.findMany({

        where: {
          companyId:
            currentUser.companyId,
        },
        take: 5,
        orderBy: {
          createdAt: "desc",
        },
      });
    const recentActivity = [

      ...recentUsers.map((user) => ({
        title:
          `${user.name} joined as ${user.role.name}`,
        time: user.createdAt,
      })),

      ...recentProjects.map((project) => ({
        title:
          `Project Created - ${project.name}`,
        time: project.createdAt,
      })),

      ...recentInvoices.map((invoice) => ({
        title:
          `Invoice Created - ${invoice.invoiceNumber}`,
        time: invoice.createdAt,
      })),

      ...recentPayments.map((payment) => ({
        title:
          `Payment Added - ₹${payment.amount}`,
        time: payment.createdAt,
      })),

    ].sort(
      (a, b) =>
        new Date(b.time) -
        new Date(a.time)
    ).slice(0, 6);

    const settings =
      await prisma.settings.findFirst({

        where: {
          companyId:
            currentUser.companyId,
        },

      });
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

      recentActivity,

      companyName:
        settings?.companyName || "",

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

