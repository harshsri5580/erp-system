import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";

// ======================
// GET ALL INVOICES
// ======================

export async function GET() {

    try {

        const invoices =
            await prisma.invoice.findMany({

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

        // CHECK EXISTING INVOICE
        // ======================
        // GENERATE INVOICE NUMBER
        // ======================

        const settings =
            await prisma.settings.findFirst();

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

                    client: {

                        connect: {

                            id: parseInt(clientId),

                        },

                    },

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