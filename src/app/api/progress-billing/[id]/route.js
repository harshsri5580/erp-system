import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getUser } from "@/lib/getUser";
// ======================
// GET SINGLE
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

        const progressBilling =
            await prisma.progressbilling.findFirst({

                where: {

                    id:
                        parseInt(id),

                    companyId:
                        currentUser.companyId,

                },

                include: {

                    project: true,

                    // client: true,

                    // milestone: true,

                    // user: true,

                },

            });

        return NextResponse.json({

            success: true,

            progressBilling,

        });

    } catch (error) {

        console.log(error);

        return NextResponse.json(
            {

                success: false,

                message:
                    "Failed to fetch progress billing",

            },
            {

                status: 500,

            }
        );

    }

}

// ======================
// UPDATE
// ======================

export async function PUT(
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
        const existingProgressBilling =
            await prisma.progressbilling.findFirst({

                where: {

                    id:
                        parseInt(id),

                    companyId:
                        currentUser.companyId,

                },

            });

        if (!existingProgressBilling) {

            return NextResponse.json(
                {
                    success: false,
                    message:
                        "Progress Billing not found",
                },
                {
                    status: 404,
                }
            );

        }
        const body =
            await request.json();

        const {

            billingNumber,

            billingDate,

            contractAmount,

            previousBilled,

            currentBillAmount,

            percentageComplete,

            remarks,

            status,

            projectId,

            clientId,

            milestoneId,

            userId,

        } = body;
        const project =
            await prisma.project.findFirst({

                where: {

                    id:
                        parseInt(projectId),

                    companyId:
                        currentUser.companyId,

                },

            });

        if (!project) {

            return NextResponse.json(
                {
                    success: false,
                    message:
                        "Invalid Project",
                },
                {
                    status: 404,
                }
            );

        }

        const client =
            await prisma.client.findFirst({

                where: {

                    id:
                        parseInt(clientId),

                    companyId:
                        currentUser.companyId,

                },

            });

        if (!client) {

            return NextResponse.json(
                {
                    success: false,
                    message:
                        "Invalid Client",
                },
                {
                    status: 404,
                }
            );

        }

        const milestone =
            await prisma.milestone.findFirst({

                where: {

                    id:
                        parseInt(milestoneId),

                    companyId:
                        currentUser.companyId,

                },

            });

        if (!milestone) {

            return NextResponse.json(
                {
                    success: false,
                    message:
                        "Invalid Milestone",
                },
                {
                    status: 404,
                }
            );

        }

        const user =
            await prisma.user.findFirst({

                where: {

                    id:
                        parseInt(userId),

                    companyId:
                        currentUser.companyId,

                },

            });

        if (!user) {

            return NextResponse.json(
                {
                    success: false,
                    message:
                        "Invalid User",
                },
                {
                    status: 404,
                }
            );

        }
        const totalBilled =
            Number(previousBilled || 0) +
            Number(currentBillAmount || 0);

        const balanceAmount =
            Number(contractAmount || 0) -
            totalBilled;

        const progressBilling =
            await prisma.progressbilling.update({

                where: {

                    id:
                        parseInt(id),

                },

                data: {

                    billingNumber,

                    billingDate:
                        billingDate
                            ? new Date(
                                billingDate
                            )
                            : null,

                    contractAmount:
                        parseFloat(
                            contractAmount || 0
                        ),

                    previousBilled:
                        parseFloat(
                            previousBilled || 0
                        ),

                    currentBillAmount:
                        parseFloat(
                            currentBillAmount || 0
                        ),

                    totalBilled,

                    balanceAmount,

                    percentageComplete:
                        parseFloat(
                            percentageComplete || 0
                        ),

                    remarks,

                    status,

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

                    milestone: {

                        connect: {

                            id:
                                parseInt(milestoneId),

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
                "Progress Billing updated successfully",

            progressBilling,

        });

    } catch (error) {

        console.log(error);

        return NextResponse.json(
            {

                success: false,

                message:
                    "Failed to update progress billing",

            },
            {

                status: 500,

            }
        );

    }

}

// ======================
// DELETE
// ======================

export async function DELETE(
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
        const existingProgressBilling =
            await prisma.progressbilling.findFirst({

                where: {

                    id:
                        parseInt(id),

                    companyId:
                        currentUser.companyId,

                },

            });

        if (!existingProgressBilling) {

            return NextResponse.json(
                {
                    success: false,
                    message:
                        "Progress Billing not found",
                },
                {
                    status: 404,
                }
            );

        }
        await prisma.progressbilling.delete({

            where: {

                id:
                    parseInt(id),

            },

        });

        return NextResponse.json({

            success: true,

            message:
                "Progress Billing deleted successfully",

        });

    } catch (error) {

        console.log(error);

        return NextResponse.json(
            {

                success: false,

                message:
                    "Failed to delete progress billing",

            },
            {

                status: 500,

            }
        );

    }

}