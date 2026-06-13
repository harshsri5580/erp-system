import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getUser } from "@/lib/getUser";
// ======================
// GET ALL
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
        const { searchParams } =
            new URL(request.url);

        const projectId =
            searchParams.get(
                "projectId"
            );

        const progressBillings =
            await prisma.progressbilling.findMany({
                where: {

                    companyId:
                        currentUser.companyId,

                    ...(projectId
                        ? {
                            projectId:
                                parseInt(
                                    projectId
                                ),
                        }
                        : {}),

                },

                include: {

                    project: true,

                    // client: true,

                    // milestone: true,

                    // user: true,

                },

                orderBy: {

                    id: "desc",

                },

            });

        return NextResponse.json({

            success: true,

            progressBillings,

        });

    } catch (error) {

        console.log(error);

        return NextResponse.json(
            {
                success: false,
                message:
                    "Failed to fetch progress billings",
            },
            {
                status: 500,
            }
        );

    }

}

// ======================
// CREATE
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

        const totalBilled =
            Number(previousBilled || 0) +
            Number(currentBillAmount || 0);

        const balanceAmount =
            Number(contractAmount || 0) -
            totalBilled;
        if (
            Number(percentageComplete) < 0 ||
            Number(percentageComplete) > 100
        ) {

            return NextResponse.json(
                {
                    success: false,
                    message:
                        "Percentage must be between 0 and 100",
                },
                {
                    status: 400,
                }
            );

        }

        if (
            totalBilled >
            Number(contractAmount || 0)
        ) {

            return NextResponse.json(
                {
                    success: false,
                    message:
                        "Total billed amount cannot exceed contract amount",
                },
                {
                    status: 400,
                }
            );

        }
        if (
            !projectId ||
            !clientId ||
            // !milestoneId ||
            !userId
        ) {

            return NextResponse.json(
                {
                    success: false,
                    message:
                        "Project, Milestone and User are required",
                },
                {
                    status: 400,
                }
            );

        }
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
        if (milestoneId) {

            const milestone =
                await prisma.milestone.findFirst({

                    where: {

                        id: parseInt(milestoneId),

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
        const existingBilling =
            await prisma.progressbilling.findFirst({

                where: {

                    billingNumber,

                    companyId:
                        currentUser.companyId,

                },

            });

        if (existingBilling) {

            return NextResponse.json(
                {
                    success: false,
                    message:
                        "Billing number already exists",
                },
                {
                    status: 400,
                }
            );

        }
        const progressBilling =
            await prisma.progressbilling.create({

                data: {
                    company: {
                        connect: {
                            id: currentUser.companyId,
                        },
                    },
                    billingNumber,

                    billingDate:
                        billingDate
                            ? new Date(
                                billingDate
                            )
                            : new Date(),

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

                    clientId: parseInt(clientId),

                    ...(milestoneId
                        ? { milestoneId: parseInt(milestoneId) }
                        : {}),

                    userId: parseInt(userId),

                },

            });

        return NextResponse.json({

            success: true,

            message:
                "Progress Billing created successfully",

            progressBilling,

        });

    } catch (error) {

        console.log(error);

        return NextResponse.json(
            {

                success: false,

                message:
                    "Failed to create progress billing",

            },
            {

                status: 500,

            }
        );

    }

}