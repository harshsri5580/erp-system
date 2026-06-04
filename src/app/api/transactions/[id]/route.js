import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";

// ======================
// GET SINGLE TRANSACTION
// ======================

export async function GET(
    request,
    context
) {

    try {
        const { id } =
            await context.params;
        const transaction =
            await prisma.transaction.findUnique({

                where: {

                    id: parseInt(id),

                },

            });

        if (!transaction) {

            return NextResponse.json(
                {

                    success: false,

                    message:
                        "Transaction not found",

                },
                {

                    status: 404,

                }
            );
        }

        return NextResponse.json({

            success: true,

            transaction,

        });

    } catch (error) {

        console.log(error);

        return NextResponse.json(
            {

                success: false,

                message:
                    "Failed to fetch transaction",

            },
            {

                status: 500,

            }
        );
    }
}

// ======================
// UPDATE TRANSACTION
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

        const {

            title,

            type,

            amount,

            reference,

            date,

            status,

        } = body;

        const transaction =
            await prisma.transaction.update({

                where: {

                    id: parseInt(id),

                },

                data: {

                    title,

                    type,

                    amount:
                        parseFloat(amount),

                    reference,

                    date,

                    status,

                },

            });

        return NextResponse.json({

            success: true,

            message:
                "Transaction updated successfully",

            transaction,

        });

    } catch (error) {

        console.log(error);

        return NextResponse.json(
            {

                success: false,

                message:
                    "Failed to update transaction",

                error: error.message,

            },
            {

                status: 500,

            }
        );
    }
}

// ======================
// DELETE TRANSACTION
// ======================

export async function DELETE(
    request,
    context
) {

    try {
        const { id } =
            await context.params;
        await prisma.transaction.delete({

            where: {

                id: parseInt(id),

            },

        });

        return NextResponse.json({

            success: true,

            message:
                "Transaction deleted successfully",

        });

    } catch (error) {

        console.log(error);

        return NextResponse.json(
            {

                success: false,

                message:
                    "Failed to delete transaction",

            },
            {

                status: 500,

            }
        );
    }
}