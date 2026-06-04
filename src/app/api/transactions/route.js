import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";

// ======================
// GET ALL TRANSACTIONS
// ======================

export async function GET() {

    try {

        const transactions =
            await prisma.transaction.findMany({

                orderBy: {

                    id: "desc",

                },

            });

        return NextResponse.json({

            success: true,

            transactions,

        });

    } catch (error) {

        console.log(error);

        return NextResponse.json(
            {

                success: false,

                message:
                    "Failed to fetch transactions",

            },
            {

                status: 500,

            }
        );
    }
}

// ======================
// CREATE TRANSACTION
// ======================

export async function POST(request) {

    try {

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
            await prisma.transaction.create({

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
                "Transaction created successfully",

            transaction,

        });

    } catch (error) {

        console.log(error);

        return NextResponse.json(
            {

                success: false,

                message:
                    "Failed to create transaction",

                error: error.message,

            },
            {

                status: 500,

            }
        );
    }
}