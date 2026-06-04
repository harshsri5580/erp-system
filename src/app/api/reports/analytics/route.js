import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";



// GET ANALYTICS REPORTS

export async function GET(request) {

  try {
    const { searchParams } =
      new URL(request.url);

    const paymentStatus =
      searchParams.get(
        "paymentStatus"
      );

    const expenseStatus =
      searchParams.get(
        "expenseStatus"
      );

    const projectStatus =
      searchParams.get(
        "projectStatus"
      );
    const projectId =
      searchParams.get(
        "project"
      );

    const clientId =
      searchParams.get(
        "client"
      );

    const vendorId =
      searchParams.get(
        "vendor"
      );
    const fromDate =
      searchParams.get(
        "fromDate"
      );

    const toDate =
      searchParams.get(
        "toDate"
      );

    const totalUsers =
      await prisma.user.count();

    const totalProjects =
      await prisma.project.count();

    const totalAttendance =
      await prisma.attendance.count();

    const totalPayroll =
      await prisma.payroll.count();

    const totalVendors =
      await prisma.vendor.count();

    const totalInventory =
      await prisma.inventory.count();
    const purchaseOrders =
      vendorId
        ? await prisma.purchaseorder.findMany({

          where: {
            vendorId:
              parseInt(
                vendorId
              ),
          },

          select: {
            projectId: true,
          },

        })
        : [];

    const vendorProjectIds =
      purchaseOrders.map(
        (item) =>
          item.projectId
      );
    const payments =
      await prisma.payment.findMany({

        where: {

          ...(paymentStatus && {
            status:
              paymentStatus,
          }),

          ...(fromDate &&
            toDate && {
            date: {
              gte:
                new Date(
                  fromDate
                ),
              lte:
                new Date(
                  toDate
                ),
            },
          }),

        },

      });

    const expenses =
      await prisma.expense.findMany({

        where: {

          ...(expenseStatus && {
            status:
              expenseStatus,
          }),

          ...(fromDate &&
            toDate && {
            date: {
              gte:
                new Date(
                  fromDate
                ),
              lte:
                new Date(
                  toDate
                ),
            },
          }),

        },

      });

    const projects =
      await prisma.project.findMany({

        where: {

          ...(projectStatus && {
            status:
              projectStatus,
          }),

          ...(projectId && {
            id: parseInt(
              projectId
            ),
          }),

          ...(clientId && {
            clientId:
              parseInt(
                clientId
              ),
          }),
          ...(vendorId && {
            id: {
              in:
                vendorProjectIds,
            },
          }),

        },

        include: {
          client: true,
        },

      });

    // ======================
    // FINANCIAL ANALYTICS
    // ======================

    const totalRevenue =
      payments
        .filter(
          (item) =>
            item.status === "Completed"
        )
        .reduce(
          (acc, item) =>
            acc + Number(item.amount || 0),
          0
        );

    const totalExpenses =
      expenses
        .filter(
          (item) =>
            item.status === "Paid"
        )
        .reduce(
          (acc, item) =>
            acc + Number(item.amount || 0),
          0
        );

    const pendingPayments =
      payments
        .filter(
          (item) =>
            item.status === "Pending"
        )
        .reduce(
          (acc, item) =>
            acc + Number(item.amount || 0),
          0
        );

    const pendingExpenses =
      expenses
        .filter(
          (item) =>
            item.status === "Pending"
        )
        .reduce(
          (acc, item) =>
            acc + Number(item.amount || 0),
          0
        );

    const netProfit =
      totalRevenue -
      totalExpenses;

    const runningProjects =
      projects.filter(
        (item) =>
          item.status === "In Progress"
      ).length;

    const completedProjects =
      projects.filter(
        (item) =>
          item.status === "Completed"
      ).length;

    const pendingProjects =
      projects.filter(
        (item) =>
          item.status === "Pending"
      ).length;

    const activeProjects =
      projects.length;

    return NextResponse.json({

      totalUsers,
      totalProjects:
        projects.length,
      totalAttendance,
      totalPayroll,
      totalVendors,
      totalInventory,

      totalRevenue,
      totalExpenses,
      netProfit,

      pendingPayments,
      pendingExpenses,

      activeProjects,
      runningProjects,
      completedProjects,
      pendingProjects,

    });

  } catch (error) {

    console.log(error);

    return NextResponse.json(
      {
        error:
          "Failed to fetch analytics",
      },
      {
        status: 500,
      }
    );
  }
}