import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// ======================
// GET ALL
// ======================

export async function GET(request) {

    try {

        const { searchParams } =
            new URL(request.url);

        const projectId =
            searchParams.get(
                "projectId"
            );

        const progressBillings =
            await prisma.progressbilling.findMany({

                where:
                    projectId
                        ? {
                            projectId:
                                parseInt(
                                    projectId
                                ),
                        }
                        : {},

                include: {

                    project: true,

                    client: true,

                    milestone: true,

                    user: true,

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
            !projectId ||
            !clientId ||
            !milestoneId ||
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
        const progressBilling =
            await prisma.progressbilling.create({

                data: {

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