import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as AWS from 'aws-sdk';
import { v4 as uuid } from 'uuid';
@Injectable({
  providedIn: 'root',
})
export class S3ImgUploaderService {
  constructor(private http: HttpClient) {}
  ID = 'AKIA5D2HIAHB4WX2O5WX';
  SECRET = '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';
  BUCKET_NAME = 'alcoach-app-s3';
  uploadFile(file: any) {
    const contentType = file.type;
    const ext = file.name.split('.').pop();

    const bucket = new AWS.S3({
      accessKeyId: this.ID,
      secretAccessKey: this.SECRET,
      region: 'ap-south-1',
    });
    const params = {
      Bucket: this.BUCKET_NAME,
      Key: 'uploaded-' + uuid() + '.' + ext,
      Body: file,
      ACL: 'public-read',
      ContentType: contentType,
    };
    return bucket.upload(params);
  }

  uploadParamsFile(file: any) {
    const contentType = file.type;
    const ext = file.name.split('.').pop();

    const bucket = new AWS.S3({
      accessKeyId: this.ID,
      secretAccessKey: this.SECRET,
      region: 'ap-south-1',
    });

    const params = {
      Bucket: this.BUCKET_NAME,
      Key: 'uploaded-' + uuid() + '.' + ext,
      Body: file,
      ACL: 'public-read',
      ContentType: contentType,
    };
    let url = bucket.getSignedUrl('putObject', params);
    let options = {
      reportProgress: true,
      observe: 'events',
    };

    return url;
  }
}
