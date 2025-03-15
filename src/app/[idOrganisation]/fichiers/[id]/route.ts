import { s3Client } from "@/core/services/s3.service";
import { NextRequest, NextResponse } from "next/server";

// interface Props {
//     params: {
//         idOrganisation: string;
//         id: string;
//     };
// }

export async function GET(_: NextRequest, { params }: { params: Promise<{ idOrganisation: string; id: string }> }) {
    const { idOrganisation, id } = await params;

    if (!id || !idOrganisation) {
        return NextResponse.json({ error: "Missing file ID or organization ID" }, { status: 400 });
    }

    const prefix = process.env.AWS_S3_FOLDER_PREFIX || "prod";
    const key = `${prefix}/organisations/${idOrganisation}/files/${id}`;

    try {
        const file = await s3Client.getObject({
            Bucket: "plac",
            Key: key,
        });
        
        // return NextResponse.json({ file }, { status: 500 });

        // const file = await s3Client.send(new GetObjectCommand({
        //     Bucket: process.env.AWS_S3_BUCKET,
        //     Key: key,
        // }));
        
        // const file = await s3Client.getObject({
        //     Bucket: process.env.AWS_S3_BUCKET,
        //     Key: key,
        // });
        

        if (!file.Body) {
            return NextResponse.json({ error: "File not found" }, { status: 404 });
        }

        return new NextResponse(file.Body as any as Buffer, {
            status: 200,
            headers: {
                "Content-Type": file.ContentType || "application/octet-stream",
                "Content-Disposition": `inline; filename="${id}"`,
            },
        });
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 });
    }
}
