import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";
import { getUser } from "@/lib/getUser";
// ======================
// GET ALL TRANSACTIONS
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
        const transactions =
            await prisma.transaction.findMany({

                where: {

                    companyId:
                        currentUser.companyId,

                },

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
                    companyId:
                        currentUser.companyId,
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