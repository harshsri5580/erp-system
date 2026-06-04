import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

import fs from "fs";
import path from "path";

// ======================
// GET SINGLE DOCUMENT
// ======================

export async function GET(
    request,
    context
) {

    try {

        const { id } =
            await context.params;

        const document =
            await prisma.document.findUnique({

                where: {
                    id: parseInt(id),
                },

                include: {
                    project: true,
                },

            });

        if (!document) {

            return NextResponse.json(
                {

                    success: false,

                    message:
                        "Document not found",

                },
                {

                    status: 404,

                }
            );

        }

        return NextResponse.json({

            success: true,

            document,

        });

    } catch (error) {

        console.log(error);

        return NextResponse.json(
            {

                success: false,

                message:
                    "Failed to fetch document",

            },
            {

                status: 500,

            }
        );

    }

}

// ======================
// UPDATE DOCUMENT
// ======================

export async function PUT(
    request,
    context
) {

    try {

        const { id } =
            await context.params;

        const oldDocument =
            await prisma.document.findUnique({

                where: {
                    id: parseInt(id),
                },

            });

        if (!oldDocument) {

            return NextResponse.json(
                {

                    success: false,

                    message:
                        "Document not found",

                },
                {

                    status: 404,

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

        const file =
            formData.get(
                "file"
            );

        let fileUrl =
            oldDocument.fileUrl;

        let fileType =
            oldDocument.fileType;

        // ======================
        // REPLACE FILE
        // ======================

        if (
            file &&
            file.name
        ) {

            if (
                oldDocument.fileUrl
            ) {

                const oldPath =
                    path.join(
                        process.cwd(),
                        "public",
                        oldDocument.fileUrl
                    );

                if (
                    fs.existsSync(
                        oldPath
                    )
                ) {

                    fs.unlinkSync(
                        oldPath
                    );

                }

            }

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
            await prisma.document.update({

                where: {
                    id: parseInt(id),
                },

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
                "Document updated successfully",

            document,

        });

    } catch (error) {

        console.log(error);

        return NextResponse.json(
            {

                success: false,

                message:
                    "Failed to update document",

            },
            {

                status: 500,

            }
        );

    }

}

// ======================
// DELETE DOCUMENT
// ======================

export async function DELETE(
    request,
    context
) {

    try {

        const { id } =
            await context.params;

        const document =
            await prisma.document.findUnique({

                where: {
                    id: parseInt(id),
                },

            });

        if (!document) {

            return NextResponse.json(
                {

                    success: false,

                    message:
                        "Document not found",

                },
                {

                    status: 404,

                }
            );

        }

        // ======================
        // DELETE FILE
        // ======================

        if (
            document.fileUrl
        ) {

            const filePath =
                path.join(
                    process.cwd(),
                    "public",
                    document.fileUrl
                );

            if (
                fs.existsSync(
                    filePath
                )
            ) {

                fs.unlinkSync(
                    filePath
                );

            }

        }

        await prisma.document.delete({

            where: {
                id: parseInt(id),
            },

        });

        return NextResponse.json({

            success: true,

            message:
                "Document deleted successfully",

        });

    } catch (error) {

        console.log(error);

        return NextResponse.json(
            {

                success: false,

                message:
                    "Failed to delete document",

            },
            {

                status: 500,

            }
        );

    }

}