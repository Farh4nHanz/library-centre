import { Readable } from "stream";
import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { streamToBuffer } from "@/utils/streamToBuffer";

/**
 * Service for interacting with AWS S3.
 *
 * @class
 * @classdesc Handles uploads, downloads, updates, and deletes of files to/from AWS S3.
 */
class S3Service {
  /**
   * The AWS S3 client.
   *
   * @private
   * @type {S3Client}
   */
  private s3Client: S3Client;
  /**
   * The name of the AWS S3 bucket.
   *
   * @private
   * @type {string}
   */
  private bucket: string;

  /**
   * Constructor for S3Service.
   *
   * Initializes the S3 client and bucket name.
   */
  constructor() {
    this.s3Client = new S3Client({
      region: process.env.AWS_REGION!,
      credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY!,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
      },
    });
    this.bucket = process.env.S3_BUCKET_NAME!;
  }

  /**
   * Uploads a file to AWS S3.
   *
   * @async
   * 
   * @param {string} key - The key to use for the uploaded file.
   * @param {Buffer} body - The file contents to upload.
   * @param {string} contentType - The MIME type of the file.
   * 
   * @returns {Promise<string>} - The URL of the uploaded file.
   */
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

  /**
   * Downloads a file from AWS S3.
   *
   * @async
   * 
   * @param {string} key - The key of the file to download.
   * 
   * @returns {Promise<Buffer>} - The file contents as a Buffer.
   */
  getFile = async (key: string): Promise<Buffer> => {
    const command = new GetObjectCommand({
      Bucket: this.bucket,
      Key: key,
    });

    const res = await this.s3Client.send(command);
    return streamToBuffer(res.Body as Readable);
  };

  /**
   * Updates a file in AWS S3.
   *
   * @async
   * 
   * @param {string} key - The key of the file to update.
   * @param {Buffer} body - The new file contents.
   * @param {string} contentType - The MIME type of the file.
   * 
   * @returns {Promise<string>} - The URL of the updated file.
   */
  updateFile = (
    key: string,
    body: Buffer,
    contentType: string
  ): Promise<string> => {
    return this.uploadFile(key, body, contentType);
  };

  /**
   * Deletes a file from AWS S3.
   *
   * @async
   * 
   * @param {string} key - The key of the file to delete.
   */
  deleteFile = async (key: string): Promise<void> => {
    const command = new DeleteObjectCommand({
      Bucket: this.bucket,
      Key: key,
    });

    await this.s3Client.send(command);
  };
}

export const s3Service = new S3Service();
