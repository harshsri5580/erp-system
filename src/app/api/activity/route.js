import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getUser } from "@/lib/getUser";

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

        // ======================
        // RECENT USERS
        // ======================

        const recentUsers =
            await prisma.user.findMany({

                where: {
                    companyId:
                        currentUser.companyId,
                },

                take: 500,

                orderBy: {
                    createdAt: "desc",
                },

                include: {
                    role: true,
                },

            });

        // ======================
        // RECENT PROJECTS
        // ======================

        const recentProjects =
            await prisma.project.findMany({

                where: {
                    companyId:
                        currentUser.companyId,
                },

                take: 500,

                orderBy: {
                    createdAt: "desc",
                },

            });

        // ======================
        // RECENT INVOICES
        // ======================

        const recentInvoices =
            await prisma.invoice.findMany({

                where: {
                    companyId:
                        currentUser.companyId,
                },

                take: 500,

                orderBy: {
                    createdAt: "desc",
                },

            });

        // ======================
        // RECENT PAYMENTS
        // ======================

        const recentPayments =
            await prisma.payment.findMany({

                where: {
                    companyId:
                        currentUser.companyId,
                },

                take: 500,

                orderBy: {
                    createdAt: "desc",
                },

            });

        // ======================
        // BUILD ACTIVITY ARRAY
        // ======================

        const activities = [

            ...recentUsers.map(
                (user) => ({
                    title:
                        `${user.name} joined as ${user.role?.name || "User"}`,
                    type: "user",
                    time:
                        user.createdAt,
                })
            ),

            ...recentProjects.map(
                (project) => ({
                    title:
                        `Project Created - ${project.name}`,
                    type: "project",
                    time:
                        project.createdAt,
                })
            ),

            ...recentInvoices.map(
                (invoice) => ({
                    title:
                        `Invoice Created - ${invoice.invoiceNumber}`,
                    type: "invoice",
                    time:
                        invoice.createdAt,
                })
            ),

            ...recentPayments.map(
                (payment) => ({
                    title:
                        `Payment Added - ₹${payment.amount}`,
                    type: "payment",
                    time:
                        payment.createdAt,
                })
            ),

        ]
            .sort(
                (a, b) =>
                    new Date(b.time) -
                    new Date(a.time)
            )
            .slice(0, 500);

        return NextResponse.json({

            success: true,

            activities,

        });

    } catch (error) {

        console.log(error);

        return NextResponse.json(
            {
                success: false,
                message:
                    "Failed to fetch activity log",
            },
            {
                status: 500,
            }
        );

    }

}