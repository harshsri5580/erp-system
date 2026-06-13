import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";
import { getUser } from "@/lib/getUser";
// ======================
// GET SINGLE EXPENSE
// ======================

export async function GET(
    request,
    context
) {

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
        const { id } =
            await context.params;

        const expense =
            await prisma.expense.findFirst({

                where: {

                    id: parseInt(id),

                    companyId:
                        currentUser.companyId,

                },

            });

        if (!expense) {

            return NextResponse.json(
                {

                    success: false,

                    message:
                        "Expense not found",

                },
                {

                    status: 404,

                }
            );
        }

        return NextResponse.json({

            success: true,

            expense,

        });

    } catch (error) {

        console.log(error);

        return NextResponse.json(
            {

                success: false,

                message:
                    "Failed to fetch expense",

            },
            {

                status: 500,

            }
        );
    }
}

// ======================
// UPDATE EXPENSE
// ======================

export async function PUT(
    request,
    context
) {

    try {
        const { id } =
            await context.params;

        const body =
            await request.json();
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

        const existingExpense =
            await prisma.expense.findFirst({

                where: {

                    id: parseInt(id),

                    companyId:
                        currentUser.companyId,

                },

            });

        if (!existingExpense) {

            return NextResponse.json(
                {
                    success: false,
                    message:
                        "Expense not found",
                },
                {
                    status: 404,
                }
            );

        }

        const {

            title,

            category,

            amount,

            date,

            status,

            notes,

        } = body;

        const expense =
            await prisma.expense.update({

                where: {

                    id: parseInt(id),

                },

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
        // UPDATE TRANSACTION
        // ======================

        await prisma.transaction.updateMany({

            where: {

                reference: `EXP-${id}`,

            },

            data: {

                title: `Expense - ${title}`,

                amount:
                    parseFloat(amount),

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
                "Expense updated successfully",

            expense,

        });

    } catch (error) {

        console.log(error);

        return NextResponse.json(
            {

                success: false,

                message:
                    "Failed to update expense",

                error: error.message,

            },
            {

                status: 500,

            }
        );
    }
}

// ======================
// DELETE EXPENSE
// ======================

export async function DELETE(
    request,
    context
) {

    try {
        const { id } =
            await context.params;
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

        const existingExpense =
            await prisma.expense.findFirst({

                where: {

                    id: parseInt(id),

                    companyId:
                        currentUser.companyId,

                },

            });

        if (!existingExpense) {

            return NextResponse.json(
                {
                    success: false,
                    message:
                        "Expense not found",
                },
                {
                    status: 404,
                }
            );

        }
        await prisma.expense.delete({

            where: {

                id: parseInt(id),

            },

        });

        return NextResponse.json({

            success: true,

            message:
                "Expense deleted successfully",

        });

    } catch (error) {

        console.log(error);

        return NextResponse.json(
            {

                success: false,

                message:
                    "Failed to delete expense",

            },
            {

                status: 500,

            }
        );
    }
}