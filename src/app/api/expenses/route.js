import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";

// ======================
// GET ALL EXPENSES
// ======================

export async function GET() {

    try {

        const expenses =
            await prisma.expense.findMany({

                orderBy: {

                    id: "desc",

                },

            });

        return NextResponse.json({

            success: true,

            expenses,

        });

    } catch (error) {

        console.log(error);

        return NextResponse.json(
            {

                success: false,

                message:
                    "Failed to fetch expenses",

            },
            {

                status: 500,

            }
        );
    }
}

// ======================
// CREATE EXPENSE
// ======================

export async function POST(request) {

    try {

        const body =
            await request.json();

        const {

            title,

            category,

            amount,

            date,

            status,

            notes,

        } = body;

        // ======================
        // CREATE EXPENSE
        // ======================

        const expense =
            await prisma.expense.create({

                data: {

                    title,

                    category,

                    amount:
                        parseFloat(amount),

                    date,

                    status,

                    notes,

                },

            });

        // ======================
        // CREATE TRANSACTION
        // ======================

        await prisma.transaction.create({

            data: {

                title: `Expense - ${title}`,

                type: "Debit",

                amount: parseFloat(amount),

                reference: `EXP-${expense.id}`,

                date,

                status:
                    status === "Paid"
                        ? "Completed"
                        : "Pending",

            },

        });

        return NextResponse.json({

            success: true,

            message:
                "Expense created successfully",

            expense,

        });

    } catch (error) {

        console.log(error);

        return NextResponse.json(
            {

                success: false,

                message:
                    "Failed to create expense",

                error: error.message,

            },
            {

                status: 500,

            }
        );
    }
}