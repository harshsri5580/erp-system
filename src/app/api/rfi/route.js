import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// ======================
// GET ALL RFI
// ======================

export async function GET() {

    try {

        const rfis =
            await prisma.rfi.findMany({

                include: {

                    project: true,

                    user: true,

                },

                orderBy: {

                    id: "desc",

                },

            });

        return NextResponse.json({

            success: true,

            rfis,

        });

    } catch (error) {

        console.log(error);

        return NextResponse.json(
            {

                success: false,

                message:
                    "Failed to fetch RFI",

            },
            {

                status: 500,

            }
        );

    }

}

// ======================
// CREATE RFI
// ======================

export async function POST(request) {

    try {

        const body =
            await request.json();

        const {

            rfiNumber,

            title,

            description,

            priority,

            status,

            dueDate,

            projectId,

            userId,

        } = body;

        const rfi =
            await prisma.rfi.create({

                data: {

                    rfiNumber,

                    title,

                    description,

                    priority,

                    status,

                    dueDate:
                        dueDate
                            ? new Date(dueDate)
                            : null,

                    project: {

                        connect: {

                            id:
                                parseInt(projectId),

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
                "RFI created successfully",

            rfi,

        });

    } catch (error) {

        console.log(error);

        return NextResponse.json(
            {

                success: false,

                message:
                    "Failed to create RFI",

            },
            {

                status: 500,

            }
        );

    }

}