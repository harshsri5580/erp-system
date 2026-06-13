import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getUser } from "@/lib/getUser";

import fs from "fs";
import path from "path";

// ======================
// GET ALL DOCUMENTS
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
        const documents =
            await prisma.document.findMany({

                where: {

                    companyId:
                        currentUser.companyId,

                },

                include: {
                    project: true,
                },

                orderBy: {
                    id: "desc",
                },

            });

        return NextResponse.json({

            success: true,

            documents,

        });

    } catch (error) {

        console.log(error);

        return NextResponse.json(
            {

                success: false,

                message:
                    "Failed to fetch documents",

            },
            {

                status: 500,

            }
        );

    }

}

// ======================
// CREATE DOCUMENT
// ======================

export async function POST(
    request
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
        const formData =
            await request.formData();

        const title =
            formData.get(
                "title"
            );

        const category =
            formData.get(
                "category"
            );

        const remarks =
            formData.get(
                "remarks"
            );

        const projectId =
            formData.get(
                "projectId"
            );
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
        const file =
            formData.get(
                "file"
            );

        let fileUrl = "";
        let fileType = "";

        if (file) {

            const bytes =
                await file.arrayBuffer();

            const buffer =
                Buffer.from(
                    bytes
                );

            const fileName =
                `${Date.now()}-${file.name}`;

            const uploadDir =
                path.join(
                    process.cwd(),
                    "public",
                    "erp",
                    "documents"
                );

            if (
                !fs.existsSync(
                    uploadDir
                )
            ) {

                fs.mkdirSync(
                    uploadDir,
                    {
                        recursive: true,
                    }
                );

            }

            const filePath =
                path.join(
                    uploadDir,
                    fileName
                );

            fs.writeFileSync(
                filePath,
                buffer
            );

            fileUrl =
                `/erp/documents/${fileName}`;

            fileType =
                file.type;

        }

        const document =
            await prisma.document.create({

                data: {
                    company: {
                        connect: {
                            id: currentUser.companyId,
                        },
                    },
                    title,

                    category,

                    remarks,

                    fileUrl,

                    fileType,

                    project: projectId
                        ? {
                            connect: {
                                id: parseInt(
                                    projectId
                                ),
                            },
                        }
                        : undefined,

                },

            });

        return NextResponse.json({

            success: true,

            message:
                "Document uploaded successfully",

            document,

        });

    } catch (error) {

        console.log(error);

        return NextResponse.json(
            {

                success: false,

                message:
                    "Failed to upload document",

            },
            {

                status: 500,

            }
        );

    }

}