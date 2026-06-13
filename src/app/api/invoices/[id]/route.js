import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";
import { getUser } from "@/lib/getUser";
// ======================
// GET SINGLE INVOICE
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

        const invoice =
            await prisma.invoice.findFirst({

                where: {

                    id: parseInt(id),

                    companyId:
                        currentUser.companyId,

                },

                include: {

                    client: true,

                    project: true,

                },

            });

        if (!invoice) {

            return NextResponse.json(
                {

                    success: false,

                    message:
                        "Invoice not found",

                },
                {

                    status: 404,

                }
            );
        }

        return NextResponse.json({

            success: true,

            invoice,

        });

    } catch (error) {

        console.log(error);

        return NextResponse.json(
            {

                success: false,

                message:
                    "Failed to fetch invoice",

            },
            {

                status: 500,

            }
        );
    }
}

// ======================
// UPDATE INVOICE
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

        const body =
            await request.json();
        const invoiceExists =
            await prisma.invoice.findFirst({

                where: {

                    id: parseInt(id),

                    companyId:
                        currentUser.companyId,

                },

            });

        if (!invoiceExists) {

            return NextResponse.json(
                {
                    success: false,
                    message:
                        "Invoice not found",
                },
                {
                    status: 404,
                }
            );

        }



        const {

            invoiceNumber,

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
        // CHECK EXISTING INVOICE

        const existingInvoice =
            await prisma.invoice.findFirst({

                where: {

                    invoiceNumber,

                    NOT: {

                        id: parseInt(id),

                    },

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

        // UPDATE INVOICE

        const invoice =
            await prisma.invoice.update({

                where: {

                    id: parseInt(id),

                },

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
                "Invoice updated successfully",

            invoice,

        });

    } catch (error) {

        console.log(error);

        return NextResponse.json(
            {

                success: false,

                message:
                    "Failed to update invoice",

                error: error.message,

            },
            {

                status: 500,

            }
        );
    }
}

// ======================
// DELETE INVOICE
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
        const invoiceExists =
            await prisma.invoice.findFirst({

                where: {

                    id: parseInt(id),

                    companyId:
                        currentUser.companyId,

                },

            });

        if (!invoiceExists) {

            return NextResponse.json(
                {
                    success: false,
                    message:
                        "Invoice not found",
                },
                {
                    status: 404,
                }
            );

        }
        await prisma.invoice.delete({

            where: {

                id: parseInt(id),

            },

        });

        return NextResponse.json({

            success: true,

            message:
                "Invoice deleted successfully",

        });

    } catch (error) {

        console.log(error);

        return NextResponse.json(
            {

                success: false,

                message:
                    "Failed to delete invoice",

            },
            {

                status: 500,

            }
        );
    }
}