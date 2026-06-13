import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";
import { getUser } from "@/lib/getUser";
// ======================
// GET SINGLE PAYMENT
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
        const payment =
            await prisma.payment.findFirst({


                where: {

                    id: parseInt(id),

                    companyId:
                        currentUser.companyId,

                },



            });
        if (!payment) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Payment not found",
                },
                {
                    status: 404,
                }
            );
        }

        const invoice = await prisma.invoice.findUnique({
            where: { id: payment.invoiceId },
        });

        const client = await prisma.client.findUnique({
            where: { id: payment.clientId },
        });

        payment.invoice = invoice;
        payment.client = client;
        if (!payment) {

            return NextResponse.json(
                {

                    success: false,

                    message:
                        "Payment not found",

                },
                {

                    status: 404,

                }
            );
        }

        return NextResponse.json({

            success: true,

            payment,

        });

    } catch (error) {

        console.log(error);

        return NextResponse.json(
            {

                success: false,

                message:
                    "Failed to fetch payment",

            },
            {

                status: 500,

            }
        );
    }
}

// ======================
// UPDATE PAYMENT
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


        const body = await request.json();

        const {
            invoiceId,
            clientId,
            amount,
            paymentMethod,
            paymentDate,
            status,
            notes,
        } = body;

        const existingPayment =
            await prisma.payment.findFirst({

                where: {

                    id: parseInt(id),

                    companyId:
                        currentUser.companyId,

                },

            });

        if (!existingPayment) {

            return NextResponse.json(
                {
                    success: false,
                    message:
                        "Payment not found",
                },
                {
                    status: 404,
                }
            );

        }
        const invoice =
            await prisma.invoice.findFirst({

                where: {

                    id: parseInt(invoiceId),

                    companyId:
                        currentUser.companyId,

                },

            });

        if (!invoice) {

            return NextResponse.json(
                {
                    success: false,
                    message:
                        "Invalid Invoice",
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

        // const body =
        //     await request.json();

        // const {

        //     invoiceId,

        //     clientId,

        //     amount,

        //     paymentMethod,

        //     paymentDate,

        //     status,

        //     notes,

        // } = body;

        const payment =
            await prisma.payment.update({

                where: {

                    id: parseInt(id),

                },

                data: {

                    amount:
                        parseFloat(amount),

                    paymentMethod,

                    paymentDate,

                    status,

                    notes,

                    invoiceId: parseInt(invoiceId),
                    clientId: parseInt(clientId),

                },

                // include: {

                //     invoice: true,

                // },

            });

        // ======================
        // UPDATE INVOICE STATUS
        // ======================

        await prisma.invoice.update({

            where: {

                id: parseInt(invoiceId),

            },

            data: {

                status:
                    status === "Completed"
                        ? "Paid"
                        : "Pending",

            },

        });

        // ======================
        // UPDATE TRANSACTION
        // ======================

        await prisma.transaction.updateMany({

            where: {

                reference: `PAY-${id}`,

            },

            data: {

                title:
                    `Payment - ${invoice.invoiceNumber}`,

                amount:
                    parseFloat(amount),

                date: paymentDate,

                status:
                    status === "Completed"
                        ? "Completed"
                        : "Pending",

            },

        });

        return NextResponse.json({

            success: true,

            message:
                "Payment updated successfully",

            payment,

        });
    } catch (error) {

        console.log(error);

        return NextResponse.json(
            {

                success: false,

                message:
                    "Failed to update payment",

                error: error.message,

            },
            {

                status: 500,

            }
        );
    }
}

// ======================
// DELETE PAYMENT
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




        const existingPayment =
            await prisma.payment.findFirst({

                where: {

                    id: parseInt(id),

                    companyId:
                        currentUser.companyId,

                },

            });

        if (!existingPayment) {

            return NextResponse.json(
                {
                    success: false,
                    message:
                        "Payment not found",
                },
                {
                    status: 404,
                }
            );

        }

        await prisma.payment.delete({

            where: {

                id: parseInt(id),

            },

        });

        return NextResponse.json({

            success: true,

            message:
                "Payment deleted successfully",

        });

    } catch (error) {

        console.log(error);

        return NextResponse.json(
            {

                success: false,

                message:
                    "Failed to delete payment",

            },
            {

                status: 500,

            }
        );
    }
}