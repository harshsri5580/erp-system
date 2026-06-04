import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

import fs from "fs";
import path from "path";

// ======================
// GET ALL DOCUMENTS
// ======================

export async function GET() {

    try {

        const documents =
            await prisma.document.findMany({

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