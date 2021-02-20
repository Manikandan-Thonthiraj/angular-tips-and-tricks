import { Injectable, EventEmitter } from '@angular/core';
import S3 from 'aws-sdk/clients/s3';

@Injectable()
export class UploadAwsService {
  FOLDER = '';
  constructor(
  ) { }

  uploadfilePromise(file: File) {
    return new Promise(async (resolve, reject) => {
      try {
        const bucket      = new S3(
          {
            accessKeyId: AWS_ACCESSKEY,
            secretAccessKey: AWS_SECRETKEY,
            region: AWS_S3_DMS_REGION
          }
        );
        const fileName   = new Date().getTime() + '-' + file.name;
        const pathOfFile = this.FOLDER + '/' + fileName;
        const params = {
          Bucket: AWS_S3_DMS_BUCKET,
          Key: pathOfFile,
          Body: file,
          ACL: 'private', // private or public
          ContentDisposition:'inline',
          ContentType:file.type
        };
        bucket.upload(params,  (err, data) => {
          if (err) {
            return reject(err);
          } 
          return resolve(data);
        });
      } catch (err) {
        return reject(err);
      }
    });
  }
 
}