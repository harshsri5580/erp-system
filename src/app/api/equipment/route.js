import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// ======================
// GET ALL EQUIPMENT
// ======================

export async function GET() {

    try {

        const equipments =
            await prisma.equipment.findMany({

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

        const equipment =
            await prisma.equipment.create({

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