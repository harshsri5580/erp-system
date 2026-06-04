import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";

// ======================
// GET ACCOUNTS DASHBOARD
// ======================

export async function GET() {

    try {

        // ======================
        // FETCH DATA
        // ======================

        const invoices =
            await prisma.invoice.findMany();

        const payments =
            await prisma.payment.findMany();

        const expenses =
            await prisma.expense.findMany();

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