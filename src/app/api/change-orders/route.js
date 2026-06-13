import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getUser } from "@/lib/getUser";
// ======================
// GET ALL CHANGE ORDERS
// ======================

export async function GET(request) {

    try {
        const currentUser = getUser(request);

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
        const changeOrders =
            await prisma.changeorder.findMany({

                where: {
                    companyId:
                        currentUser.companyId,
                },
                include: {

                    project: true,

                    // client: true,

                    // user: true,

                },

                orderBy: {

                    id: "desc",

                },

            });

        const formattedChangeOrders = await Promise.all(
            changeOrders.map(async (item) => ({
                ...item,
                client: await prisma.client.findUnique({
                    where: { id: item.clientId },
                }),
            }))
        );

        return NextResponse.json({
            success: true,
            changeOrders: formattedChangeOrders,
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
        const currentUser = getUser(request);

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
        const project =
            await prisma.project.findFirst({

                where: {

                    id: parseInt(projectId),

                    companyId:
                        currentUser.companyId,

                },

            });

        if (!project) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Invalid Project",
                },
                {
                    status: 404,
                }
            );
        }
        const client =
            await prisma.client.findFirst({

                where: {

                    id: parseInt(clientId),

                    companyId:
                        currentUser.companyId,

                },

            });

        if (!client) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Invalid Client",
                },
                {
                    status: 404,
                }
            );
        }
        const user =
            await prisma.user.findFirst({

                where: {

                    id: parseInt(userId),

                    companyId:
                        currentUser.companyId,

                },

            });

        if (!user) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Invalid User",
                },
                {
                    status: 404,
                }
            );
        }
        const differenceAmount =
            Number(newAmount || 0) -
            Number(oldAmount || 0);

        const changeOrder =
            await prisma.changeorder.create({

                data: {
                    company: {
                        connect: {
                            id: currentUser.companyId,
                        },
                    },
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

                    clientId: parseInt(clientId),
                    userId: parseInt(userId),

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