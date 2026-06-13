import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getUser } from "@/lib/getUser";
// ======================
// GET ALL EQUIPMENT
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
        const equipments =
            await prisma.equipment.findMany({

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

            equipments,

        });

    } catch (error) {

        console.log(error);

        return NextResponse.json(
            {
                success: false,
                message:
                    "Failed to fetch equipment",
            },
            {
                status: 500,
            }
        );

    }

}

// ======================
// CREATE EQUIPMENT
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

            equipmentCode,

            equipmentName,

            category,

            brand,

            modelNo,

            serialNumber,

            projectId,

            userId,

            location,

            purchaseDate,

            purchaseCost,

            currentValue,

            totalUsageHours,

            lastMaintenanceDate,

            nextMaintenanceDate,

            maintenanceCost,

            maintenanceRemarks,

            status,

            remarks,

        } = body;

        if (
            !equipmentCode ||
            !equipmentName
        ) {

            return NextResponse.json(
                {
                    success: false,
                    message:
                        "Equipment Code and Name are required",
                },
                {
                    status: 400,
                }
            );

        }

        const existingEquipment =
            await prisma.equipment.findUnique({

                where: {

                    equipmentCode,

                },

            });

        if (
            existingEquipment
        ) {

            return NextResponse.json(
                {
                    success: false,
                    message:
                        "Equipment Code already exists",
                },
                {
                    status: 400,
                }
            );

        }

        if (projectId) {

            const project =
                await prisma.project.findFirst({

                    where: {

                        id: parseInt(
                            projectId
                        ),

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

        }

        if (userId) {

            const user =
                await prisma.user.findFirst({

                    where: {

                        id: parseInt(
                            userId
                        ),

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

        }

        const equipment =
            await prisma.equipment.create({

                data: {
                    company: {
                        connect: {
                            id: currentUser.companyId,
                        },
                    },
                    equipmentCode,

                    equipmentName,

                    category,

                    brand,

                    modelNo,

                    serialNumber,

                    location,

                    purchaseDate:
                        purchaseDate
                            ? new Date(
                                purchaseDate
                            )
                            : null,

                    purchaseCost:
                        purchaseCost
                            ? parseFloat(
                                purchaseCost
                            )
                            : null,

                    currentValue:
                        currentValue
                            ? parseFloat(
                                currentValue
                            )
                            : null,

                    totalUsageHours:
                        totalUsageHours
                            ? parseFloat(
                                totalUsageHours
                            )
                            : 0,

                    lastMaintenanceDate:
                        lastMaintenanceDate
                            ? new Date(
                                lastMaintenanceDate
                            )
                            : null,

                    nextMaintenanceDate:
                        nextMaintenanceDate
                            ? new Date(
                                nextMaintenanceDate
                            )
                            : null,

                    maintenanceCost:
                        maintenanceCost
                            ? parseFloat(
                                maintenanceCost
                            )
                            : 0,

                    maintenanceRemarks,

                    status,

                    remarks,

                    ...(projectId
                        ? {
                            project: {
                                connect: {
                                    id:
                                        parseInt(
                                            projectId
                                        ),
                                },
                            },
                        }
                        : {}),

                    ...(userId
                        ? {
                            user: {
                                connect: {
                                    id:
                                        parseInt(
                                            userId
                                        ),
                                },
                            },
                        }
                        : {}),

                },

            });

        return NextResponse.json({

            success: true,

            message:
                "Equipment created successfully",

            equipment,

        });

    } catch (error) {

        console.log(error);

        return NextResponse.json(
            {
                success: false,
                message:
                    "Failed to create equipment",
            },
            {
                status: 500,
            }
        );

    }

}