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

        const equipment =
            await prisma.equipment.findFirst({

                where: {

                    id:
                        parseInt(id),

                    companyId:
                        currentUser.companyId,

                },

                include: {

                    project: true,

                    user: true,

                },

            });

        return NextResponse.json({

            success: true,

            equipment,

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
// UPDATE
// ======================

export async function PUT(
    request,
    context
) {

    try {

        const { id } =
            await context.params;

        const body =
            await request.json();

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

        const existingEquipment =
            await prisma.equipment.findFirst({

                where: {

                    id:
                        parseInt(id),

                    companyId:
                        currentUser.companyId,

                },

            });

        if (!existingEquipment) {

            return NextResponse.json(
                {
                    success: false,
                    message:
                        "Equipment not found",
                },
                {
                    status: 404,
                }
            );

        }

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

        if (projectId) {

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

        }

        if (userId) {

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

        }



        const equipment =
            await prisma.equipment.update({

                where: {

                    id:
                        parseInt(id),

                },

                data: {

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

                    projectId:
                        projectId
                            ? parseInt(
                                projectId
                            )
                            : null,

                    userId:
                        userId
                            ? parseInt(
                                userId
                            )
                            : null,

                },

            });

        return NextResponse.json({

            success: true,

            message:
                "Equipment updated successfully",

            equipment,

        });

    } catch (error) {

        console.log(error);

        return NextResponse.json(
            {
                success: false,
                message:
                    "Failed to update equipment",
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

        const { id } =
            await context.params;
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

        const existingEquipment =
            await prisma.equipment.findFirst({

                where: {

                    id:
                        parseInt(id),

                    companyId:
                        currentUser.companyId,

                },

            });

        if (!existingEquipment) {

            return NextResponse.json(
                {
                    success: false,
                    message:
                        "Equipment not found",
                },
                {
                    status: 404,
                }
            );

        }
        await prisma.equipment.delete({

            where: {

                id:
                    parseInt(id),

            },

        });

        return NextResponse.json({

            success: true,

            message:
                "Equipment deleted successfully",

        });

    } catch (error) {

        console.log(error);

        return NextResponse.json(
            {
                success: false,
                message:
                    "Failed to delete equipment",
            },
            {
                status: 500,
            }
        );

    }

}