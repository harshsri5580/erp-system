import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";
import { getUser } from "@/lib/getUser";
// ======================
// GET ACCOUNTS DASHBOARD
// ======================

export async function GET(request) {

    try {
        const currentUser =
            getUser(request);

        if (!currentUser) {

            return NextResponse.json(
                {
                    success: false,
                    message: "Unauthorized",
                },
                {
                    status: 401,
                }
            );

        }
        // ======================
        // FETCH DATA
        // ======================

        const invoices =
            await prisma.invoice.findMany({

                where: {

                    companyId:
                        currentUser.companyId,

                },

            });

        const payments =
            await prisma.payment.findMany({

                where: {

                    companyId:
                        currentUser.companyId,

                },

            });
        const expenses =
            await prisma.expense.findMany({

                where: {

                    companyId:
                        currentUser.companyId,

                },

            });

        // ======================
        // TOTAL INVOICES
        // ======================

        const totalInvoices =
            invoices.reduce(
                (acc, item) =>
                    acc +
                    Number(
                        item.totalAmount || 0
                    ),
                0
            );

        // ======================
        // TOTAL PAYMENTS
        // ======================

        const totalPayments =
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
        // ======================
        // TOTAL EXPENSES
        // ======================

        const totalExpenses =
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

        // ======================
        // PENDING PAYMENTS
        // ======================

        const pendingInvoicePayments =
            invoices
                .filter(
                    (item) =>
                        item.status !== "Paid"
                )
                .reduce(
                    (acc, item) =>
                        acc +
                        Number(
                            item.totalAmount || 0
                        ),
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

        const totalPending =
            pendingInvoicePayments +
            pendingPayments +
            pendingExpenses;
        // ======================
        // NET REVENUE
        // ======================

        const totalRevenue =
            totalPayments -
            totalExpenses;

        const completedExpenses =
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

        // ======================
        // RESPONSE
        // ======================

        return NextResponse.json({

            success: true,

            totalInvoices,

            totalPayments,

            totalExpenses,

            totalRevenue,

            pendingInvoicePayments,

            pendingPayments,

            totalPending,

            completedPayments,

            pendingExpenses,

            completedExpenses,

        });

    } catch (error) {

        console.log(error);

        return NextResponse.json(
            {

                success: false,

                message:
                    "Failed to fetch accounts data",

            },
            {

                status: 500,

            }
        );
    }
}