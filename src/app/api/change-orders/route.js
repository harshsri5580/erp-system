import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// ======================
// GET ALL CHANGE ORDERS
// ======================

export async function GET() {

    try {

        const changeOrders =
            await prisma.changeorder.findMany({

                include: {

                    project: true,

                    client: true,

                    user: true,

                },

                orderBy: {

                    id: "desc",

                },

            });

        return NextResponse.json({

            success: true,

            changeOrders,

        });

    } catch (error) {

        console.log(error);

        return NextResponse.json(
            {

                success: false,

                message:
                    "Failed to fetch change orders",

            },
            {

                status: 500,

            }
        );

    }

}

// ======================
// CREATE CHANGE ORDER
// ======================

export async function POST(request) {

    try {

        const body =
            await request.json();

        const {

            coNumber,

            title,

            description,

            reason,

            oldAmount,

            newAmount,

            status,

            approvedDate,

            projectId,

            clientId,

            userId,

        } = body;

        const differenceAmount =
            Number(newAmount || 0) -
            Number(oldAmount || 0);

        const changeOrder =
            await prisma.changeorder.create({

                data: {

                    coNumber,

                    title,

                    description,

                    reason,

                    oldAmount:
                        parseFloat(
                            oldAmount || 0
                        ),

                    newAmount:
                        parseFloat(
                            newAmount || 0
                        ),

                    differenceAmount,

                    status,

                    approvedDate:
                        approvedDate
                            ? new Date(
                                approvedDate
                            )
                            : null,

                    project: {

                        connect: {

                            id:
                                parseInt(projectId),

                        },

                    },

                    client: {

                        connect: {

                            id:
                                parseInt(clientId),

                        },

                    },

                    user: {

                        connect: {

                            id:
                                parseInt(userId),

                        },

                    },

                },

            });

        return NextResponse.json({

            success: true,

            message:
                "Change Order created successfully",

            changeOrder,

        });

    } catch (error) {

        console.log(error);

        return NextResponse.json(
            {

                success: false,

                message:
                    "Failed to create change order",

            },
            {

                status: 500,

            }
        );

    }

}