import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getUser } from "@/lib/getUser";
// ======================
// GET SETTINGS
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
        const settings =
            await prisma.settings.findFirst({

                where: {

                    companyId:
                        currentUser.companyId,

                },

            });

        return NextResponse.json({
            success: true,
            settings,
        });

    } catch (error) {

        console.log(error);

        return NextResponse.json(
            {
                success: false,
                message:
                    "Failed to fetch settings",
            },
            { status: 500 }
        );
    }
}

// ======================
// CREATE / UPDATE SETTINGS
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

            companyName,
            companyEmail,
            companyPhone,
            companyAddress,
            companyLogo,

            gstNumber,
            gstPercent,
            panNumber,

            currency,
            currencySymbol,

            invoicePrefix,
            poPrefix,
            grnPrefix,

            smtpHost,
            smtpPort,
            smtpUser,
            smtpPassword,
            smtpSecure,

            timezone,

        } = body;

        // Check Existing Settings

        const existingSettings =
            await prisma.settings.findFirst({

                where: {

                    companyId:
                        currentUser.companyId,

                },

            });

        let settings;

        // ======================
        // UPDATE
        // ======================

        if (existingSettings) {

            settings =
                await prisma.settings.update({

                    where: {
                        id:
                            existingSettings.id,
                    },

                    data: {
                        companyName,
                        companyEmail,
                        companyPhone,
                        companyAddress,
                        companyLogo,

                        gstNumber,

                        gstPercent:
                            gstPercent
                                ? parseFloat(
                                    gstPercent
                                )
                                : null,

                        panNumber,

                        currency,
                        currencySymbol,

                        invoicePrefix,
                        poPrefix,
                        grnPrefix,

                        smtpHost,

                        smtpPort:
                            smtpPort
                                ? parseInt(
                                    smtpPort
                                )
                                : null,

                        smtpUser,
                        smtpPassword,

                        smtpSecure:
                            smtpSecure || false,

                        timezone,
                    },
                });

            return NextResponse.json({
                success: true,
                message:
                    "Settings updated successfully",
                settings,
            });
        }

        // ======================
        // CREATE
        // ======================

        settings =
            await prisma.settings.create({

                data: {


                    companyId:
                        currentUser.companyId,

                    companyName,
                    companyEmail,
                    companyPhone,
                    companyAddress,
                    companyLogo,

                    gstNumber,

                    gstPercent:
                        gstPercent
                            ? parseFloat(
                                gstPercent
                            )
                            : null,

                    panNumber,

                    currency:
                        currency || "INR",

                    currencySymbol:
                        currencySymbol || "₹",

                    invoicePrefix:
                        invoicePrefix || "INV",

                    poPrefix:
                        poPrefix || "PO",

                    grnPrefix:
                        grnPrefix || "GRN",

                    smtpHost,

                    smtpPort:
                        smtpPort
                            ? parseInt(
                                smtpPort
                            )
                            : null,

                    smtpUser,
                    smtpPassword,

                    smtpSecure:
                        smtpSecure || false,

                    timezone:
                        timezone ||
                        "Asia/Kolkata",
                },
            });

        return NextResponse.json({
            success: true,
            message:
                "Settings saved successfully",
            settings,
        });

    } catch (error) {

        console.log(error);

        return NextResponse.json(
            {
                success: false,
                message:
                    "Failed to save settings",
            },
            { status: 500 }
        );
    }
}