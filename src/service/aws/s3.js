import {
  S3Client,
  PutObjectCommand,
  CopyObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  region: process.env.AWS_S3_REGION,
  credentials: {
    accessKeyId: process.env.AWS_S3_ID,
    secretAccessKey: process.env.AWS_S3_SECRET,
  },
});

export async function uploadFileToS3(file, fileName) {
  const fileBuffer = file;

  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: `${fileName}`,
    Body: fileBuffer,
    ContentType: "image/*",
  };

  const command = new PutObjectCommand(params);

  try {
    await s3Client.send(command);
    return process.env.AWS_S3_BUCKET_URL + `/${fileName}`;
  } catch (err) {
    console.error("ERROR(service/aws/s3 > uploadFileToS3)");
  }
}

export async function copyFile(source, destination) {
  const copyParams = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    CopySource: `/${process.env.AWS_S3_BUCKET_NAME}/${source}`,
    Key: destination,
  };

  const copyCommand = new CopyObjectCommand(copyParams);

  try {
    await s3Client.send(copyCommand);
    return;
  } catch (err) {
    console.error("ERROR(service/aws/s3 > copyFile):", err.message);
  }
}

export async function deleteFile(targetKey) {
  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: targetKey,
  };

  const deleteCommand = new DeleteObjectCommand(params);

  try {
    await s3Client.send(deleteCommand);
    return;
  } catch (err) {
    console.error("ERROR(service/aws/s3 > deleteFile):", err.message);
  }
}
