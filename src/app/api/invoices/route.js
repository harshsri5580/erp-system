import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";
import { getUser } from "@/lib/getUser";
// ======================
// GET ALL INVOICES
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
        const invoices =
            await prisma.invoice.findMany({

                where: {
                    companyId:
                        currentUser.companyId,
                },

                include: {

                    client: true,

                    project: true,

                },

                orderBy: {

                    id: "desc",

                },

            });

        return NextResponse.json({

            success: true,

            invoices,

        });

    } catch (error) {

        console.log(error);

        return NextResponse.json(
            {

                success: false,

                message:
                    "Failed to fetch invoices",

            },
            {

                status: 500,

            }
        );
    }
}

// ======================
// CREATE INVOICE
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

            amount,

            gst,

            totalAmount,

            status,

            issueDate,

            dueDate,

            notes,

            clientId,

            projectId,

        } = body;


        if (
            parseFloat(totalAmount) <= 0
        ) {

            return NextResponse.json(
                {
                    success: false,
                    message:
                        "Invalid invoice amount",
                },
                {
                    status: 400,
                }
            );

        }

        if (
            new Date(dueDate) <
            new Date(issueDate)
        ) {

            return NextResponse.json(
                {
                    success: false,
                    message:
                        "Due date cannot be earlier than issue date",
                },
                {
                    status: 400,
                }
            );

        }

        // CHECK EXISTING INVOICE
        // ======================
        // GENERATE INVOICE NUMBER
        // ======================

        const settings =
            await prisma.settings.findFirst({

                where: {
                    companyId:
                        currentUser.companyId,
                },

            });

        const prefix =
            settings?.invoicePrefix || "INV";

        const invoiceNumber =
            `${prefix}-${Date.now()}`;

        const existingInvoice =
            await prisma.invoice.findUnique({


                where: {

                    invoiceNumber,

                },

            });

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
                    message:
                        "Invalid Client",
                },
                {
                    status: 404,
                }
            );

        }
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
                    message:
                        "Invalid Project",
                },
                {
                    status: 404,
                }
            );

        }
        if (existingInvoice) {

            return NextResponse.json(
                {

                    success: false,

                    message:
                        "Invoice number already exists",

                },
                {

                    status: 400,

                }
            );
        }

        // CREATE INVOICE

        const invoice =
            await prisma.invoice.create({

                data: {

                    invoiceNumber,

                    company: {
                        connect: {
                            id: currentUser.companyId,
                        },
                    },
                    amount:
                        parseFloat(amount),

                    gst: gst
                        ? parseFloat(gst)
                        : 0,

                    totalAmount:
                        parseFloat(totalAmount),

                    status,

                    issueDate,

                    dueDate,

                    notes,

                    clientId: parseInt(clientId),

                    project: {

                        connect: {

                            id: parseInt(projectId),

                        },

                    },

                },

            });

        return NextResponse.json({

            success: true,

            message:
                "Invoice created successfully",

            invoice,

        });

    } catch (error) {

        console.log(error);

        return NextResponse.json(
            {

                success: false,

                message:
                    "Failed to create invoice",

                error: error.message,

            },
            {

                status: 500,

            }
        );
    }
}