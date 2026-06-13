import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getUser } from "@/lib/getUser";
// ======================
// GET ALL RFI
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
        const rfis =
            await prisma.rfi.findMany({

                where: {

                    companyId:
                        currentUser.companyId,

                },

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

            rfiNumber,

            title,

            description,

            priority,

            status,

            dueDate,

            projectId,

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
        const rfi =
            await prisma.rfi.create({

                data: {
                    company: {
                        connect: {
                            id: currentUser.companyId,
                        },
                    },
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
                            id: parseInt(userId),
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