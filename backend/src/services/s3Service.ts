import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { Readable } from "stream";
import { streamToBuffer } from "@/utils/streamToBuffer";

class S3Service {
  private s3Client: S3Client;
  private bucket: string;

  constructor() {
    this.s3Client = new S3Client({
      region: process.env.AWS_REGION!,
      credentials: {
        accessKeyId: process.env.ACCESS_KEY!,
        secretAccessKey: process.env.SECRET_ACCESS_KEY!,
      },
    });
    this.bucket = process.env.S3_BUCKET_NAME!;
  }

  uploadFile = async (
    key: string,
    body: Buffer,
    contentType: string
  ): Promise<string> => {
    const command = new PutObjectCommand({
      Bucket: this.bucket,
      Key: key,
      Body: body,
      ContentType: contentType,
    });

    await this.s3Client.send(command);
    return `https://${this.bucket}.s3.amazonaws.com/${key}`;
  };

  getFile = async (key: string): Promise<Buffer> => {
    const command = new GetObjectCommand({
      Bucket: this.bucket,
      Key: key,
    });

    const res = await this.s3Client.send(command);
    return streamToBuffer(res.Body as Readable);
  };

  updateFile = (
    key: string,
    body: Buffer,
    contentType: string
  ): Promise<string> => {
    return this.uploadFile(key, body, contentType);
  };

  deleteFile = async (key: string): Promise<void> => {
    const command = new DeleteObjectCommand({
      Bucket: this.bucket,
      Key: key,
    });

    await this.s3Client.send(command);
  };
}

export const s3Service = new S3Service();
